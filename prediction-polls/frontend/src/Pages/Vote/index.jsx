import Menu from "../../Components/Menu";
import PollCard from "../../Components/PollCard";
import styles from "./Vote.module.css";
import PointsButton from "../../Components/PointsButton";
import pointData from "../../MockData/PointList.json"
import { Button, Input, Dropdown, Popover, Modal } from 'antd';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import getProfileMe from "../../api/requests/profileMe.jsx";





function Vote() {
  let { id } = useParams();
  let parsedID = parseInt(id);
  const [userData, setUserData] = useState({});
  const canvasRef = useRef(null);


  React.useEffect(() => {
    const data = getProfileMe();
    data.then((result) => {
      setUserData(result);
    });
  }, [])
  const retrievePoll = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        },
      };
      let url = `${process.env.REACT_APP_BACKEND_LINK}/polls/${parsedID}`
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      if (response.status === 200 && data) {
        if (data.pollType == "discrete") {
          data.isCustomPoll = false;
        }
        else {
          data.isCustomPoll = true;
        }
        if (data.closingDate != null) {
          data.closingDate = data.closingDate.slice(0, 10);
        }
        return data;
      }
      else {
        navigate("/feed");
      }
    }
    catch (error) {
      navigate("/feed");
    }
  };
  const fetchData = async () => {
    try {
      const result = await retrievePoll();
      setPolldata(result);
      setPolldataOriginal(JSON.parse(JSON.stringify(result)));
      setSentence((result.isCustomPoll) ? "Please enter a suitable answer to the poll" : "Choose the option you want to vote for");
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoaded(true);
    }
  };
  const fetchAnnotations = async () => {
    const url = `${process.env.REACT_APP_Annotation_LINK}/annotations?source=${window.location.href}`;
    const response = await fetch(url);

    const result = await response.json();
    setAnnotationList(result.annotations);

  }

  const navigate = useNavigate();
  const [polldata, setPolldata] = React.useState(null);
  const [polldataOriginal, setPolldataOriginal] = React.useState(null);
  const [sentence, setSentence] = React.useState(null);
  const [betPoint, setBetPoint] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const [isLoaded, setLoaded] = React.useState(false);
  const [answer, setAnswer] = React.useState(null);
  const [viewAnnotation, setOpenViewAnnotate] = React.useState(false);
  const [annotationList, setAnnotationList] = React.useState([]);
  const [selectedText, setSelectedText] = React.useState("");
  const [annotationBody, setAnnotationBody] = React.useState("");
  const [showPopOver, setPopOver] = React.useState(false);
  const [prefix, setPrefix] = React.useState("");
  const [suffix, setSuffix] = React.useState("");
  const [showAnnotation, setShowAnnotation] = React.useState(false);
  const [showImageAnnotationModal, setShowImageAnnotationModal] = React.useState(false);
  const [selectedAnnotationList, setSelectedAnnotationList] = React.useState([]);
  const [selectionBody, setSelectionBody] = React.useState({ startX: 0, endX: 0, startY: 0, endY: 0 });
  const showViewAnnotateModal = async () => {
    await fetchAnnotations();
    setSelectedAnnotationList(Array(annotationList.length).fill(false));
    setShowAnnotation(true);
    setOpenViewAnnotate(true);

  };
  const showMyViewAnnotateModal = async () => {
    await fetchAnnotations();
    let myannotationList = annotationList.filter((annotation) => {
      return annotation.creator.toLowerCase().includes(localStorage.getItem("username").toLowerCase());
    })
    setAnnotationList(myannotationList);
    setSelectedAnnotationList(Array(annotationList.length).fill(false));
    setShowAnnotation(true);
    setOpenViewAnnotate(true);
  }
  const hideViewAnnotateModal = () => {
    setOpenViewAnnotate(false);
    setShowAnnotation(false);
    setPolldata(JSON.parse(JSON.stringify(polldataOriginal)));
  }


  useEffect(() => {
    fetchData();

  }, []);


  const drawSelection = () => {
    if (showImageAnnotationModal) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Clear previous selection
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Redraw the background image
      const image = new Image();
      image.src = polldata.pollImage;

      image.onload = () => {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Draw the highlighted rectangle
        const { startX, startY, endX, endY } = selectionBody;
        //const startX = 200;
        //const startY = 200;
        //const endX   = 300;
        //const endY   = 300;
        const width = endX - startX;
        const height = endY - startY;

        // Draw the border of the rectangle
        context.strokeStyle = 'yellow';
        context.lineWidth = 5;
        context.strokeRect(startX, startY, width, height);

      };
    }
  };

  useEffect(() => {
    drawSelection();

  }, [showImageAnnotationModal]);
  const handleVoting = async () => {
    try {
      console.log("isOpen");
      console.log(polldata.isOpen);
      if (polldata.isOpen == true) {
        if (polldata.pollType == "discrete" && /^[0-9]*$/.test(betPoint) == true) {
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({
              choiceId: answer,
              points: parseInt(betPoint)
            })
          };
          let url = `${process.env.REACT_APP_BACKEND_LINK}/polls/discrete/${parsedID}/vote`
          const response = await fetch(url, requestOptions);
          if (response.status === 200) {
            setMessage("Voted successfully!");
            setTimeout(() => {
              window.location.replace("/feed")
            }, 700);
          }
          else {
            setMessage("An error has occurred!");
          }
        }
        else if (polldata.pollType == "continuous" && /^[0-9]*$/.test(betPoint) == true) {
          if (polldata.cont_poll_type == "date") {
            const requestOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
              },
              body: JSON.stringify({
                choice: answer,
                points: parseInt(betPoint)
              })
            };
            let url = `${process.env.REACT_APP_BACKEND_LINK}/polls/continuous/${parsedID}/vote`
            const response = await fetch(url, requestOptions);
            if (response.status === 200) {
              setMessage("Voted successfully!");
            }
            else {
              setMessage("An error has occurred!");
            }
          }
          else {
            if (/^[-+]?\d*\.?\d*$/.test(answer) == true) {
              const requestOptions = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                },
                body: JSON.stringify({
                  choice: answer,
                  points: parseInt(betPoint)
                })
              };
              let url = `${process.env.REACT_APP_BACKEND_LINK}/polls/continuous/${parsedID}/vote`
              const response = await fetch(url, requestOptions);
              if (response.status === 200) {
                setMessage("Voted successfully!");
                setTimeout(() => {
                  window.location.replace("/feed")
                }, 700);
              }
              else {
                setMessage("An error has occurred!");
              }
            }
            else {
              setMessage("The response should be numeric!");
            }
          }
        }
        else {
          setMessage("The bet points should be integer numbers!");
        }
      }
      else {
        setMessage("The poll isn't open for voting!");
      }
    }
    catch (error) {
      navigate("/feed");
    }
  };
  const itemList = [{ key: "Display All Annotations", value: showViewAnnotateModal }, { key: "Display My Annotations", value: showMyViewAnnotateModal }, { key: "Hide Annotations", value: hideViewAnnotateModal }]
  const items = itemList.map((item) => {
    return { label: <div className={styles.contextMenuOption} onClick={item.value}>{item.key}</div>, key: item.key }
  });
  //let annotationList = [{ annotation_typer: "Berk", annotation_target: "finals", annotation_body: "Final Match", prefix: "in the ", suffix: " in the next", annotation_date: "12/10/2021" }, { annotation_typer: "Berke", annotation_target: "Maverics", annotation_body: "A basketball team", prefix: "", suffix: "", annotation_date: "14/10/2021" }];
  const handleOpenChange = (newOpen) => {
    if (selectedText.length > 0) {
      setPopOver(newOpen);
    }
  };
  const hide = () => {
    setSelectedText("");
    setPrefix("");
    setSuffix("");
    setAnnotationBody("");
    setPopOver(false);
  };

  const formatDate = (date) => {
    const dateObject = new Date(date);

    const year = dateObject.getFullYear(); // Get the year (e.g., 2023)
    const month = dateObject.getMonth(); // Get the month (0-indexed, so add 1 to get the actual month)
    const day = dateObject.getDate();
    const monthNamesShort = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const shortMonthName = monthNamesShort[month];
    const dateString = `${shortMonthName} ${day}, ${year}`;

    return dateString
  }
  const handleAnnotation = async () => {
    if (selectedText.length > 0) {


      const url = `${process.env.REACT_APP_Annotation_LINK}/annotations`;
      const requestBody = {
        "@context": "http://www.w3.org/ns/anno.jsonld",
        "type": "Annotation",
        "target": {
          "source": `${window.location.href}`,
          "selector": {
            "type": "TextQuoteSelector",
            "exact": `${selectedText}`,
            "prefix": `${prefix}`,
            "suffix": `${suffix}`
          }
        },
        "body": {
          "type": "TextualBody",
          "value": `${annotationBody}`,
          "format": "text/plain"
        },
        "creator": `${process.env.REACT_APP_FRONTEND_LINK}/profile/${localStorage.getItem("username")}`
      };
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ld+json',
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify({ ...requestBody })
      };

      const response = await fetch(url, requestOptions);
    }
    setSelectedText("");
    setPrefix("");
    setSuffix("");
    setAnnotationBody("");
    setPopOver(false);

  };

  const handleClick = () => {
    setSelectedText("");
    setPrefix("");
    setSuffix("");
    setAnnotationBody("");
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const elements = document.elementsFromPoint(rect.x, rect.y);
      // Iterate through elements and find the target element
      const targetElement = elements.find((element) => {
        const rect = element.getBoundingClientRect();
        return (
          rect.x >= rect.left &&
          rect.x <= rect.right &&
          rect.y >= rect.top &&
          rect.y <= rect.bottom
        );
      });
      const textContent = targetElement.innerHTML;
      const val = selection.toString();
      setSelectedText(val);
      //console.log(targetElement.innerHTML);
      const index = textContent.indexOf(val);

      if (index !== -1) {
        const contextLength = 10; // You can adjust this value to get more or less surrounding text
        const start = Math.max(0, index - contextLength);
        const end = Math.min(textContent.length, index + val.length + contextLength);

        const prefix = textContent.substring(start, index);
        const suffix = textContent.substring(index + val.length, end);
        setPrefix(prefix);
        setSuffix(suffix);
      }

    }
    setPopOver(true);

  };

  const formatCreator = (url) => {
    let userName = "";
    for (let i = url.length - 1; i > -1; i = i - 1) {
      if (url[i] == '\/') {
        break;
      }
      else {
        userName = url[i] + userName;
      }
    }
    return userName;

  }
  const handleAnnotationClick = (annotation) => {
    if (annotation.target.selector.type == "TextQuoteSelector") {
      const searchWords = `${annotation.target.selector.prefix}${annotation.target.selector.exact}${annotation.target.selector.suffix}`;
      let pollContent = JSON.parse(JSON.stringify(polldataOriginal));
      if (pollContent.question.includes(searchWords)) {
        const index = pollContent.question.indexOf(annotation.target.selector.exact);
        const start = 0
        const end = pollContent.question.length;
        const body = `<mark>${annotation.target.selector.exact}</mark>`;
        const prefix = pollContent.question.substring(start, index);
        const suffix = pollContent.question.substring(index + annotation.target.selector.exact.length, end);
        const newString = `${prefix}${body}${suffix}`;
        pollContent.question = newString;
      }
      else {
        if (pollContent.pollType == "discrete") {
          pollContent.options.map((option) => {
            if (option.choice_text.includes(searchWords)) {
              const index = option.choice_text.indexOf(annotation.target.selector.exact);
              const start = 0;
              const end = option.choice_text.length;
              const body = `<mark>${annotation.target.selector.exact}</mark>`;
              const prefix = option.choice_text.substring(start, index);
              const suffix = option.choice_text.substring(index + annotation.target.selector.exact.length, end);
              const newString = `${prefix}${body}${suffix}`;
              pollContent.options[pollContent.options.indexOf(option)].choice_text = newString;
            }
          });
        }
      }
      console.log(pollContent);
      return pollContent;
    }
    else {

    }

  };

  const handleClose = () => {
    setShowImageAnnotationModal(false);
  };
  if (isLoaded == true) {
    return (
      <div className={styles.page}>
        <Modal
          open={showImageAnnotationModal}
          footer={null}
          onCancel={handleClose}
        >
          <canvas
            width={400} // Set your desired canvas width
            height={300} // Set your desired canvas height
            ref={canvasRef} />
        </Modal>
        <Menu currentPage="Vote" />
        <div className={styles.page_row}>
          <Dropdown
            menu={{
              items,
            }}
            trigger={['contextMenu']}
          >
            <div
              className={styles.poll}>
              <Popover
                align={{ offset: [0, 10] }}
                content={
                  <div className={styles.annotationPopOverStyle}><p>{selectedText}</p>
                    <Input
                      className={styles.annotationTextBox}
                      id="AnnotationInput"
                      value={annotationBody}
                      placeholder="Annotation"
                      onChange={(e) => setAnnotationBody(e.target.value)}
                    />
                    <div>
                      <Button
                        className={styles.annotationButton}
                        onClick={handleAnnotation}>Annotate</Button>
                      <Button
                        className={styles.annotationButton}
                        onClick={hide}>Close
                      </Button>
                    </div>
                  </div>
                }
                title="Annotate"
                trigger="click"
                open={showPopOver}
                onOpenChange={handleOpenChange}
              >
                <PollCard PollData={polldata} setAnswer={setAnswer} clickTextFunction={handleClick} />
              </Popover>
            </div>
          </Dropdown>
          <div className={styles.choice_column}>
            <PointsButton point={userData?.points ?? 0} />
            <div className={styles.infoText}><div>{sentence}</div>
              <div id="statement" className={styles.chooseText}>How many points do you want to place?</div>
              <div><Input
                id="bet"
                className={styles.inputStyle}
                placeholder=""
                onChange={(e) => setBetPoint(e.target.value)}
              /></div>
              <div className={styles.buttonDivStyle}><Button
                id="submitButton"
                className={styles.bottonStyle}
                onClick={handleVoting}
              >Vote</Button></div>
              <div className={styles.messageStyle}>{message}</div>
            </div></div>
        </div>

        {viewAnnotation == true ?
          <div className={styles.AnnotationList}>
            {showAnnotation ? <div>
              <div className={styles.columnStyle}>

                <div className={styles.annotationBoxStyle}
                  onClick={() => {
                    //const startX = 200;
                    //const startY = 200;
                    //const endX   = 300;
                    //const endY   = 300;
                    const dataDimensions = { startX: 200, startY: 200, endX: 300, endY: 300 }
                    setSelectionBody(dataDimensions);
                    setShowImageAnnotationModal(true);
                    drawSelection();
                  }}>
                  <span className={styles.annotationTarget}>
                    {`Image Annotation`}
                  </span>
                  <span className={styles.annotationBody}>
                    {`Sport Type`}
                  </span>
                </div>

                {annotationList.length == 0 ? <p>No Annotations are available</p> : (annotationList.map(
                  (annotation, index) => {
                    return <div onClick={() => {
                      const output = handleAnnotationClick(annotation);
                      setPolldata(output);
                      setSelectedAnnotationList(Array(annotationList.length).fill(false));
                      var index = annotationList.indexOf(annotation);
                      var newList = [];
                      for (let i = 0; i < annotationList.length; i++) {
                        if (i == index) {
                          newList = [...newList, true];
                        }
                        else {
                          newList = [...newList, false];
                        }
                      }
                      setSelectedAnnotationList(newList);
                    }
                    }
                      className={selectedAnnotationList[index] ? styles.selectedAnnotationBoxStyle : styles.annotationBoxStyle}
                    >
                      <div className={styles.annotationRow}>
                        <span>{formatCreator(annotation.creator)}</span>
                        <span>{formatDate(annotation.created)}</span>
                      </div>
                      <span className={styles.annotationTarget}>
                        {annotation.target.selector.exact}
                      </span>
                      <span className={styles.annotationBody}>
                        {`${annotation.body.value}`}
                      </span>
                    </div>;
                  }
                ))}
              </div></div> : <div></div>}
          </div> : <div></div>
        }
      </div >


    )
  }
}

export default Vote;
