import React from "react";
import AppRouter from "./Routes/Router";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ModalContextProvider } from "./contexts/ModalContext";
import Modals from "./contexts/ModalContext/Modals";
function App() {
  return (
    <ThemeProvider>
      <ModalContextProvider>
        <AppRouter />
        <Modals/>     
      </ModalContextProvider>
    </ThemeProvider>
    
  );
}

export default App;


