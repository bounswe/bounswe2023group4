import React, { useState } from "react";
import { Button, Modal } from "antd";
import useModal from "../../contexts/ModalContext/useModal";
import { ModalNames } from "../../contexts/ModalContext/ModalNames";
import styles from "./PollTagModal.module.css";
import getTags from "../../api/requests/getTags";

const PollTagModal = () => {
  const { modals, closeModal } = useModal();
  const [category, setCategory] = React.useState("");
  const [tagResponse, setTagResponse] = React.useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  const getTagResponse = async () => {
    try {
      const response = await getTags({ keyword: category });
      if (response) {
        setTagResponse(response);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleFindCategories = async () => {
    await getTagResponse();
  };

  const handleOk = () => {
    closeModal(ModalNames.PollTagModal);
  };

  const handleCancel = () => {
    closeModal(ModalNames.PollTagModal);
  };

  const toggleTagSelection = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  return (
    <>
      <Modal
        title="Add Poll Categories"
        open={modals[ModalNames.PollTagModal]}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Add
          </Button>,
        ]}
      >
        <div className={styles.container}>
          <p className={styles.text}>Can you add a category to your poll?</p>

          <input
            type="text"
            placeholder="Enter a category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.inputStyle}
          />
          <button onClick={handleFindCategories} className={styles.buttonStyle}>
            Find Available Categories
          </button>
          <p className={styles.text}>
            Available Categories(Multiple can be selected)
          </p>
          {tagResponse === null ? null : tagResponse.length > 0 ? (
            <div className={styles.optionContainer}>
              {tagResponse.map((tag) => (
                <div
                  key={tag.id}
                  className={`${styles.option} ${
                    selectedTags.includes(tag.id) ? styles.selectedOption : ""
                  }`}
                  onClick={() => toggleTagSelection(tag.id)}
                >
                  <p>{tag.label}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.text}>No available tags found</p>
          )}
        </div>
      </Modal>
    </>
  );
};

export default PollTagModal;
