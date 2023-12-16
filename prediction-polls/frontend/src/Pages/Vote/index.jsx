import Menu from "../../Components/Menu";
import PollCard from "../../Components/PollCard";
import styles from "./Vote.module.css";
import PointsButton from "../../Components/PointsButton";
import pointData from "../../MockData/PointList.json"
import { Button, Input, Dropdown, Popover } from 'antd';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import getProfileMe from "../../api/requests/profileMe.jsx";




function Vote() {
  let { id } = useParams();
  let parsedID = parseInt(id);
  const [userData, setUserData] = useState({});


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


  const navigate = useNavigate();
  const [polldata, setPolldata] = React.useState(null);
  const [polldataOriginal, setPolldataOriginal] = React.useState(null);
  const [sentence, setSentence] = React.useState(null);
  const [betPoint, setBetPoint] = React.useState(0);
  const [message, setMessage] = React.useState("");
  const [isLoaded, setLoaded] = React.useState(false);
  const [answer, setAnswer] = React.useState(null);
  const [viewAnnotation, setOpenViewAnnotate] = React.useState(false);
  const [selectedText, setSelectedText] = React.useState("");
  const [showPopOver, setPopOver] = React.useState(false);
  const [prefix, setPrefix] = React.useState("");
  const [suffix, setSuffix] = React.useState("");

  const showViewAnnotateModal = () => {
    setOpenViewAnnotate(true);
  };
  const hideViewAnnotateModal = () => {
    setOpenViewAnnotate(false);
    setPolldata(JSON.parse(JSON.stringify(polldataOriginal)));
  }

  useEffect(() => {
    fetchData();
  }, []);


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
            if (/^[0-9]*$/.test(answer) == true) {
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
  const itemList = [{ key: "View Annotations", value: showViewAnnotateModal }, { key: "Hide Annotations", value: hideViewAnnotateModal }]
  const items = itemList.map((item) => {
    return { label: <div className={styles.contextMenuOption} onClick={item.value}>{item.key}</div>, key: item.key }
  });
  let annotationList = [{ annotation_typer: "Berk", annotation_target: "finals", annotation_body: "Final Match", prefix: "in the ", suffix: " in the next", annotation_date: "12/10/2021" }, { annotation_typer: "Berke", annotation_target: "Maverics", annotation_body: "A basketball team", prefix: "", suffix: "", annotation_date: "14/10/2021" }];
  const handleOpenChange = (newOpen) => {
    setPopOver(newOpen);

  };
  const hide = () => {
    setPopOver(false);
  };
  const handleAnnotation = () => {

  };

  const handleClick = () => {
    setSelectedText("");
    setPrefix("");
    setSuffix("");
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
  const formatDate = (date) => {
    const parts = date.split("/");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months in JavaScript are zero-based
    const year = parseInt(parts[2], 10);

    // Create a Date object
    const dateObject = new Date(year, month, day);

    // Get the short form of the month name
    const monthNamesShort = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const shortMonthName = monthNamesShort[dateObject.getMonth()];
    const dateString = `${shortMonthName} ${day}, ${year}`;

    return dateString
  }
  const handleAnnotationClick = (annotation) => {
    const searchWords = `${annotation.prefix}${annotation.annotation_target}${annotation.suffix}`;
    let pollContent = JSON.parse(JSON.stringify(polldataOriginal));
    if (pollContent.question.includes(searchWords)) {
      const index = pollContent.question.indexOf(annotation.annotation_target);
      const start = 0
      const end = pollContent.question.length;
      const body = `<mark>${annotation.annotation_target}</mark>`;
      const prefix = pollContent.question.substring(start, index);
      const suffix = pollContent.question.substring(index + annotation.annotation_target.length, end);
      const newString = `${prefix}${body}${suffix}`;
      pollContent.question = newString;
    }
    else {
      if (pollContent.pollType == "discrete") {
        pollContent.options.map((option) => {
          if (option.choice_text.includes(searchWords)) {
            const index = option.choice_text.indexOf(annotation.annotation_target);
            const start = 0;
            const end = option.choice_text.length;
            const body = `<mark>${annotation.annotation_target}</mark>`;
            const prefix = option.choice_text.substring(start, index);
            const suffix = option.choice_text.substring(index + annotation.annotation_target.length, end);
            const newString = `${prefix}${body}${suffix}`;
            pollContent.options[pollContent.options.indexOf(option)].choice_text = newString;
          }
        });
      }
    }
    console.log(pollContent);
    return pollContent;
  };
  if (isLoaded == true) {
    return (

      <div className={styles.page}>
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
                  <div className={styles.annotationBoxStyle}><p>{selectedText}</p>
                    <Input
                      className={styles.annotationTextBox}
                      id="AnnotationInput"
                      placeholder="Annotation"
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
            <div className={styles.columnStyle}>
              {annotationList.length == 0 ? <p>No Annotations are available</p> : (annotationList.map(
                (annotation) => {
                  return <div className={styles.annotationBoxStyle} onClick={() => {
                    const output = handleAnnotationClick(annotation);
                    setPolldata(output);
                  }
                  }>
                    <div className={styles.annotationRow}>
                      <span>{annotation.annotation_typer}</span>
                      <span>{formatDate(annotation.annotation_date)}</span>
                    </div>
                    <span className={styles.annotationTarget}>
                      {annotation.annotation_target}
                    </span>
                    <span className={styles.annotationBody}>
                      {`${annotation.annotation_body}`}
                    </span>
                  </div>;
                }
              ))}
            </div> </div> : <div></div>
        }
      </div>


    )
  }
}

export default Vote;
