import React from "react";
import { Modal } from "antd";
import useModal from "../../contexts/ModalContext/useModal";
import { ModalNames } from "../../contexts/ModalContext/ModalNames";
import {
  FacebookShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,

  RedditIcon,
} from "react-share";
import styles from "./ShareModal.module.css";

const ShareModal = ({ pollData }) => {
  const { modals, closeModal } = useModal();

  const handleCancel = () => {
    closeModal(ModalNames.ShareModal);
  };
  const shareUrl = pollData
    ? `http://ec2-3-78-169-139.eu-central-1.compute.amazonaws.com:3000/vote/${pollData.id}`
    : "http://ec2-3-78-169-139.eu-central-1.compute.amazonaws.com:3000/";
  const title = pollData
    ? `Check this poll ${pollData.question} `
    : "Check this website";
  console.log("pollData: ", pollData);

  return (
    <>
      <Modal
        title="Share Poll"
        open={modals[ModalNames.ShareModal]}
        onCancel={handleCancel}
        className={styles.shareModal}
        footer={null}
      >
        <FacebookShareButton url={shareUrl}>
          <FacebookIcon size={36} className={styles.shareModalOptionButton} />
        </FacebookShareButton>

        <TwitterShareButton url={shareUrl}>
          <TwitterIcon size={36} className={styles.shareModalOptionButton} />
        </TwitterShareButton>

        <WhatsappShareButton url={shareUrl}>
          <WhatsappIcon size={36} className={styles.shareModalOptionButton} />
        </WhatsappShareButton>

        <RedditShareButton url={shareUrl} title={title}>
          <RedditIcon size={36} className={styles.shareModalOptionButton} />
        </RedditShareButton>
      </Modal>
    </>
  );
};

export default ShareModal;
