import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import styles from "./Home.module.css";

function Home() {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <div className={styles.containerStyle}>
      <h1 className={styles.header}>Home Page</h1>
      <Link to="/auth/sign-up">
        <Button className={styles.buttonContainerStyle}>
          Go to Sign Up Page
        </Button>
      </Link>
      <Link to="/auth/sign-in">
        <Button className={styles.buttonContainerStyle} type="dashed">
          Go to Sign In Page
        </Button>
      </Link>
      <Link to="/feed">
        <Button className={styles.buttonContainerStyle}>Go to Feed</Button>
      </Link>
      <Button className={styles.buttonContainerStyle} onClick={toggleTheme}>
        Theme
      </Button>
    </div>
  );
}

export default Home;
