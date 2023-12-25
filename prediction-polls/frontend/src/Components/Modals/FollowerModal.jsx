import React from "react";
import { Button, Modal, message } from "antd";
import useModal from "../../contexts/ModalContext/useModal";
import { ModalNames } from "../../contexts/ModalContext/ModalNames";
import { useNavigate } from "react-router-dom";
import styles from "./FollowModal.module.css";

const FollowerModal = ({ followerList }) => {
  const { modals, closeModal } = useModal();
  const navigate = useNavigate();

  const navigateToFollowerProfile = (follower) => {
    closeModal(ModalNames.FollowerModal); 
    navigate("/profile/" + follower); 
  };

  return (
    <Modal
      title="Follower Users"
      open={modals[ModalNames.FollowerModal]}
      onOk={() => closeModal(ModalNames.FollowerModal)}
      onCancel={() => closeModal(ModalNames.FollowerModal)}
      footer={null}
    >
      {followerList.map((follower) => (
        <div
         className={styles.container}
          key={follower} 
        >
          <button
            onClick={() => navigateToFollowerProfile(follower)}
            className={styles.button}
          >
            <p>
              <strong>{follower}</strong>
            </p>
          </button>
        </div>
      ))}
    </Modal>
  );
};

export default FollowerModal;
