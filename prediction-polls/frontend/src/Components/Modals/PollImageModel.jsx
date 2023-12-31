import React from "react";
import { Button, Modal} from "antd"; 
import useModal from "../../contexts/ModalContext/useModal";
import { ModalNames } from "../../contexts/ModalContext/ModalNames";
import styles from "./PollImageModal.module.css";
import addPollImage from "../../api/requests/addPollImage";


const PollImageModal = ({ pollId }) => {
  const { modals,openModal, closeModal } = useModal();
  const [file, setFile] = React.useState(null);
  const [caption, setCaption] = React.useState("");
  const fileInputRef = React.useRef(null);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleOk = async () => {
    if (file) {
        const imageUploadResult = await UploadPollImage();
        if (!imageUploadResult) {
          console.error("Error uploading the poll image.");
        }
      }
    closeModal(ModalNames.PollImageModal);
    openModal(ModalNames.PollTagModal, null, pollId);
  };

  const handleCancel = () => {
    closeModal(ModalNames.PollImageModal);
    openModal(ModalNames.PollTagModal, null, pollId);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const handlePlaceholderClick = () => {
    fileInputRef.current.click();
  };


  const UploadPollImage = async () => {
    const result = await addPollImage(file, caption, pollId);
    if (result) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <Modal
        title="Add Poll Image"
        open={modals[ModalNames.PollImageModal]}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false} 
        footer={[
          <Button key="back" onClick={handleCancel}>
            Skip
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Add Image
          </Button>,
        ]}
      >
        <p>Would you like to add photo to your poll?</p>

        <div
              className={styles.profileImageWrapperStyle}
              onClick={handlePlaceholderClick}
            >
              {selectedFile  ? (
                <img
                  src={selectedFile }
                  alt="Profile"
                  className={styles.profileImage}
                />
              ) : (
                <div className={styles.profileImagePlaceholder}>
                </div>
              )}
            </div>
            <input
              type="file"
              data-testid="fileInput"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept="image/*"
              style={{ display: "none" }}
            />
      </Modal>
    </>
  );
};

export default PollImageModal;
