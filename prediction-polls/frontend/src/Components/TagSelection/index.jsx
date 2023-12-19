import React, { useState } from "react";
import styles from './TagSelection.module.css';

const mockTags = ["sport", "NBA", "education"];

const TagSelection = ({ selectedTags, onTagChange }) => {
  const handleTagChange = (tag) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((selectedTag) => selectedTag !== tag)
      : [...selectedTags, tag];

    onTagChange(updatedTags);
  };

  return (
    <div className={styles.tagSelection}>
      <p className={styles.tagTitle}>Select Tags:</p>
      <div className={styles.tagList}>
        {mockTags.map((tag) => (
          <label key={tag} className={styles.tagLabel}>
            <input
              type="checkbox"
              checked={selectedTags.includes(tag)}
              onChange={() => handleTagChange(tag)}
            />
            {tag}
          </label>
        ))}
      </div>
    </div>
  );
};

export default TagSelection;