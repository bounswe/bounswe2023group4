import React from "react";
import { Button, Modal, message } from "antd";
import useModal from "../../contexts/ModalContext/useModal";
import { ModalNames } from "../../contexts/ModalContext/ModalNames";
import { useNavigate } from "react-router-dom";
import styles from "./FollowModal.module.css";

const FollowingModal = ({ followingList }) => {
  const { modals, closeModal } = useModal();
  const navigate = useNavigate();

  const handleOk = async () => {
    closeModal(ModalNames.FollowingModal);
  };

  const handleCancel = () => {
    closeModal(ModalNames.FollowingModal);
  };


  const navigateToFollowingProfile = (following) => {
    closeModal(ModalNames.FollowingModal); // Close the modal first
    navigate("/profile/" + following); // Then navigate to the profile
  };

  return (
    <>
      <Modal
        title="Following Users"
        open={modals[ModalNames.FollowingModal]}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {followingList.map((following) => {
          return (
            <div
            className={styles.container}
            key={following}
            >
              <button
                onClick={() => navigateToFollowingProfile(following)}
                className={styles.button}
              >
                <p>
                  <strong>{following}</strong>
                </p>
              </button>
            </div>
          );
        })}
      </Modal>
    </>
  );
};

export default FollowingModal;
