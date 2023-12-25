import React, { createContext, useMemo, useState } from "react";
import { ModalNames } from "./ModalNames"; 
const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
  const initialModalStates = Object.keys(ModalNames).reduce((acc, key) => {
    acc[ModalNames[key]] = false;
    return acc;
  }, {});


  const [modals, setModals] = useState(initialModalStates);
  const [params, setParams] = useState({});
  const [currentPollData, setCurrentPollData] = useState(null);
  const [currentPollId, setCurrentPollId] = useState(null);

  const value = useMemo(() => {
    return { modals, setModals, params, setParams,currentPollData,setCurrentPollData,currentPollId,setCurrentPollId };
  }, [modals,params, currentPollData, currentPollId]);

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

export { ModalContext };
