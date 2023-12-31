import React from "react";
import { Modal } from "antd";
import useModal from "../../contexts/ModalContext/useModal";
import { ModalNames } from "../../contexts/ModalContext/ModalNames";
import styles from "./ImageModal.module.css";

const ImageModal = ({ pollData }) => {
  const { modals, closeModal } = useModal();

  const handleClose = () => {
    closeModal(ModalNames.ImageModal);
  };

  return (
    <Modal
      visible={modals[ModalNames.ImageModal]}
      footer={null}
      onCancel={handleClose}
      className={styles.container}
    >
      <div className={styles.imagecontainer}>
        <img src={pollData.pollImage} alt="Enlarged" className={styles.image} />
      </div>
    </Modal>
  );
};

export default ImageModal;
