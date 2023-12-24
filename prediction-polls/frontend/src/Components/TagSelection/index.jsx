// TagSelection.js
import React, { useState, useEffect } from "react";
import styles from './TagSelection.module.css';

const TagSelection = ({ initialTags, onTagChange }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // Ensure initialTags is defined before setting the state
    if (initialTags) {
      setTags(initialTags);
    }
  }, [initialTags]);

  const handleTagChange = (tag) => {
    const updatedTags = tags.map((t) =>
      t.topic === tag.topic ? { ...t, isSelected: !t.isSelected } : t
    );

    setTags(updatedTags);
    onTagChange(updatedTags);
  };

  return (
    <div className={styles.tagSelection}>
      <p className={styles.tagTitle}>Select Tags:</p>
      <div className={styles.tagList}>
        {tags.map(({ topic, isSelected }) => (
          <label key={topic} className={styles.tagLabel}>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleTagChange({ topic, isSelected })}
            />
            {topic}
          </label>
        ))}
      </div>
    </div>
  );
};

export default TagSelection;