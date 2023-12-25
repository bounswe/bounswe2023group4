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
  const [comments, setComments] = React.useState([]);
  const [juryCheckboxState, setJuryCheckboxState] = useState(false);
  const [followerList, setFollowerList] = useState([]);
  const [followingList, setFollowingList] = useState([]);


  const value = useMemo(() => {
    return { modals, setModals, params, setParams,currentPollData,setCurrentPollData,currentPollId,setCurrentPollId ,juryCheckboxState, 
      setJuryCheckboxState ,comments,setComments ,followerList,setFollowerList ,followingList,setFollowingList };
  }, [modals,params, currentPollData, currentPollId , juryCheckboxState, comments, followerList, followingList]);

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

export { ModalContext };
