import React, { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from "./SearchBar.module.css";

function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = value => {
    setSearchText(value);
    onSearch(value);
  };

  return (
    <div className={styles.searchbar}>
      <Input
        style={{ padding: '10px' }}
        placeholder="Search with question, tag, and creator name"
        value={searchText}
        onChange={e => handleSearch(e.target.value)}
        prefix={<SearchOutlined />}
        allowClear
      />
    </div>
  );
}

export default SearchBar;
