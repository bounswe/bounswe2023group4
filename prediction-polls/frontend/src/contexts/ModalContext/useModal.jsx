import { useContext } from "react";
import { ModalContext } from "./index.jsx";

const useModal = () => {
  const { modals, setModals, setCurrentPollData, currentPollData,setCurrentPollId ,setComments} =
    useContext(ModalContext);

  const openModal = (modalName, pollData , pollId, comments) => {

    setCurrentPollData(pollData);  
    setCurrentPollId(pollId);
    setComments(comments);
    setModals({ ...modals, [modalName]: true });
  };

  const closeModal = (modalName) => {
    setModals({ ...modals, [modalName]: false });
  };

  const toggleModal = (modalName) => {
    setModals({ ...modals, [modalName]: !modals[modalName] });
  };


  return { openModal, closeModal, toggleModal, modals, currentPollData, setComments };
};

export default useModal;
