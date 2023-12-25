import { useContext } from "react";
import { ModalContext } from "./index.jsx";

const useModal = () => {
  const { modals, setModals, setCurrentPollData, currentPollData,setCurrentPollId ,juryCheckboxState, setJuryCheckboxState,setComments, followerList, setFollowerList, followingList, setFollowingList} =
    useContext(ModalContext);

  const openModal = (modalName, pollData , pollId, comments, followerList, followingList) => {

    setCurrentPollData(pollData);  
    setCurrentPollId(pollId);
    setComments(comments);
    setFollowerList(followerList);
    setFollowingList(followingList);
    setModals({ ...modals, [modalName]: true });
  };

  const closeModal = (modalName) => {
    setModals({ ...modals, [modalName]: false });
  };

  const toggleModal = (modalName) => {
    setModals({ ...modals, [modalName]: !modals[modalName] });
  };


  return { openModal, closeModal, toggleModal, modals, currentPollData,juryCheckboxState ,setJuryCheckboxState , setComments ,setFollowerList,setFollowingList};
};

export default useModal;
