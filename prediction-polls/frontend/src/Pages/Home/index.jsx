import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Colors } from "../../theme/color";
import { ThemeContext } from "../../contexts/ThemeContext";

function Home() {
  const { theme, setTheme } = useContext(ThemeContext);
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: Colors[theme].neutural.white,
    height: "100vh",
  };
  const buttonContainerStyle = {
    marginTop: "20px",
    backgroundColor: Colors[theme].primary[200],
    color: Colors[theme].neutural.black,
  };
  const header = {
    color: Colors[theme].neutural.black,
  }
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div style={containerStyle}>
      <h1 style={header}>Home Page</h1>
      <Link to="/auth/sign-up">
        <Button style={buttonContainerStyle}>Go to Sign Up Page</Button>
      </Link>
      <Link to="/auth/sign-in">
        <Button style={buttonContainerStyle} type="dashed">
          Go to Sign In Page
        </Button>
      </Link>
      <Button style={buttonContainerStyle} onClick={toggleTheme}>
        Theme
      </Button>
    </div>
  );
}

export default Home;
