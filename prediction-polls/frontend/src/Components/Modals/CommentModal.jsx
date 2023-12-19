import React, { useState } from 'react';
import { Modal, Input} from 'antd';
import useModal from '../../contexts/ModalContext/useModal';
import { ModalNames } from '../../contexts/ModalContext/ModalNames';
import styles from './CommentModal.module.css';

const CommentModal = ({ previousComments ,userImage,username}) => {
  const { modals, closeModal } = useModal();
  const [newComment, setNewComment] = useState('');


  const handleCancel = () => {
    closeModal(ModalNames.CommentModal);
  };

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  const submitComment = () => {
   // Submit new comment logic here
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
            <img src={comment.userImage} alt={comment.userName} className={styles.userImage} />
            <strong>{comment.userName}</strong>: {comment.text}
          </div>
        ))}
      </div>
      <div className={styles.newCommentSection}>
        <img src={userImage} alt="Your Name" className={styles.userImage} />
        <Input
          placeholder="Add a comment..."
          value={newComment}
          onChange={handleInputChange}
          onPressEnter={submitComment}
          className={styles.commentInput}
        />
        <button className={styles.shareButton} onClick={submitComment}>Submit</button>
      </div>
    </Modal>
  );
};

export default CommentModal;
