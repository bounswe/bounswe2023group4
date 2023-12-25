import React, { useState, useEffect } from "react";
import { Modal, Input } from "antd";
import useModal from "../../contexts/ModalContext/useModal";
import { ModalNames } from "../../contexts/ModalContext/ModalNames";
import styles from "./CommentModal.module.css";
import ProfileIcon from "../../Assets/icons/ProfileIcon.jsx";
import postComment from "../../api/requests/postComment";
import getPollComments from "../../api/requests/getPollComments";

const CommentModal = ({ previousComments, userImage, pollId }) => {
  const { modals, closeModal, setComments } = useModal();
  const [newComment, setNewComment] = useState("");

  const handleCancel = () => {
    closeModal(ModalNames.CommentModal);
  };

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  useEffect(() => {
    if (modals[ModalNames.CommentModal]) {
      const fetchComments = async () => {
        const updatedComments = await getPollComments(pollId);
        setComments(updatedComments);
      };
  
      fetchComments();
    }
  }, [modals[ModalNames.CommentModal]]);

  const submitComment = async () => {
    if (newComment.trim() === "") {
      alert("Please enter a comment."); 
      return;
    }

    const response = await postComment(pollId, newComment);
    if (response) {
      const updatedComments = await getPollComments(pollId);
    setComments(updatedComments);
      setNewComment("");
      console.log("Comment added successfully", response);
    } else {
      // Handle error
      console.error("Failed to submit comment");
    }
  };

  return (
    <Modal
      title="Comments"
      open={modals[ModalNames.CommentModal]}
      onCancel={handleCancel}
      footer={null}
      className={`${styles.modalContainer} ${styles.customModal}`}
    >
      <div className={styles.commentsSection}>
        {previousComments.map((comment, index) => (
          <div key={index} className={styles.comment}>
            <strong>{comment.username}</strong>: {comment.comment_text}
          </div>
        ))}
      </div>
      <div className={styles.newCommentSection}>
        {userImage == null ? (
          <div className={styles.userImagePlaceholder}>
            <ProfileIcon width={20} height={20} />
          </div>
        ) : (
          <img src={userImage} alt="Your Name" className={styles.userImage} />
        )}
        <Input
          placeholder="Add a comment..."
          value={newComment}
          onChange={handleInputChange}
          onPressEnter={submitComment}
          className={styles.commentInput}
        />
        <button className={styles.shareButton} onClick={submitComment}>
          Submit
        </button>
      </div>
    </Modal>
  );
};

export default CommentModal;
