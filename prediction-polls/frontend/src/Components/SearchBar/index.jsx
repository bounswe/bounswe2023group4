import React, { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from "./SearchBar.module.css";

function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchTrigger = () => {
    onSearch(searchText);
  };

  return (
    <div className={styles.searchbar}>
      <Input
        style={{ padding: '10px' }}
        placeholder="Search with question, tag, and creator name"
        value={searchText}
        onChange={handleInputChange}
        onPressEnter={handleSearchTrigger}
        suffix={
          <span onClick={handleSearchTrigger} style={{ cursor: 'pointer' }}>
            <SearchOutlined />
          </span>
        }
        allowClear
      />
    </div>
  );
}

export default SearchBar;
