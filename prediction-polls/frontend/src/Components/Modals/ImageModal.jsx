import { React, useRef, useEffect, useState } from "react";
import { Modal, Popover, Input, Button } from "antd";
import useModal from "../../contexts/ModalContext/useModal";
import { ModalNames } from "../../contexts/ModalContext/ModalNames";
import styles from "./ImageModal.module.css";
import { useLocation } from "react-router-dom";


const ImageModal = ({ pollData }) => {
  const location = useLocation();
  const { modals, closeModal } = useModal();
  const canvasRef = useRef(null);
  const [selection, setSelection] = useState({ startX: 0, startY: 0, endX: 0, endY: 0 });
  const [isSelecting, setIsSelecting] = useState(false);
  const [showPopOver, setPopOver] = useState(false);
  const [annotationBody, setAnnotationBody] = useState("");
  const [isSelectionVisible, setIsSelectionVisible] = useState(true);


  const handleHideButtonClick = () => {
    clearCanvas();
  };

  const handleAnnotation = async () => {

    const url = `${process.env.REACT_APP_Annotation_LINK}/annotations`;
    const requestBody = {
      "@context": "http://www.w3.org/ns/anno.jsonld",
      "type": "Annotation",
      "target": {
        "source": `${window.location.href}`,
        "selector": {
          "type": "TextQuoteSelector",
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


    handleHideButtonClick();
    setPopOver(false);
  }


  const handleClose = () => {
    closeModal(ModalNames.ImageModal);
  };

  const drawPollImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const image = new Image();
    image.src = pollData.pollImage;

    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }

  useEffect(() => {
    drawPollImage();
  }, []);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setSelection({ startX: offsetX, startY: offsetY, endX: offsetX, endY: offsetY });
    setIsSelecting(true);
  };

  const handleMouseMove = (e) => {
    if (isSelecting) {
      const { offsetX, offsetY } = e.nativeEvent;
      setSelection((prevSelection) => ({
        ...prevSelection,
        endX: offsetX,
        endY: offsetY,
      }));
    }
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
    if (selection.startX != selection.endX) {
      setPopOver(true);
    }
    // Perform actions with the selected area if needed
    console.log('Selected Area:', selection);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPollImage();
  };
  const hide = () => {
    setAnnotationBody("");
    setPopOver(false);
    handleHideButtonClick();
    clearCanvas();
  };

  const drawSelection = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Clear previous selection
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw the background image
    const image = new Image();
    image.src = pollData.pollImage;

    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Draw the highlighted rectangle
      const { startX, startY, endX, endY } = selection;
      const width = endX - startX;
      const height = endY - startY;

      context.fillStyle = 'rgba(0, 0, 255, 0.4)'; // Blue color with 50% opacity
      context.fillRect(startX, startY, width, height);

      // Draw the border of the rectangle
      context.strokeStyle = 'blue';
      context.lineWidth = 2;
      context.strokeRect(startX, startY, width, height);

    };
  };
  useEffect(() => {
    drawSelection();
  }, [selection]);
  return (
    <Modal
      visible={modals[ModalNames.ImageModal]}
      footer={null}
      onCancel={handleClose}
      className={styles.container}
    >
      {location.pathname.includes("vote") == true ?
        < div className={styles.imagecontainer}>
          <Popover
            align={{ offset: [0, 10] }}
            content={
              <div className={styles.annotationPopOverStyle}>
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
                    onClick={handleAnnotation}
                  >Annotate</Button>
                  <Button
                    className={styles.annotationButton}
                    onClick={hide}>
                    Close
                  </Button>
                </div>
              </div>
            }
            title="Annotate"
            trigger="click"
            open={showPopOver}
          //onOpenChange={handleOpenChange}
          >
            <canvas
              width={400} // Set your desired canvas width
              height={300} // Set your desired canvas height
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              ref={canvasRef} />
          </Popover>
        </div>
        :
        <canvas
          width={400} // Set your desired canvas width
          height={300} // Set your desired canvas height
          ref={canvasRef} />
      }

    </Modal >
  );
};

export default ImageModal;
