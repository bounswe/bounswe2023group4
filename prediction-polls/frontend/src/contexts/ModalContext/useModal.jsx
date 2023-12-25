import { useContext } from "react";
import { ModalContext } from "./index.jsx";

const useModal = () => {
  const { modals, setModals, setCurrentPollData, currentPollData,setCurrentPollId ,juryCheckboxState, setJuryCheckboxState} =
    useContext(ModalContext);

  const openModal = (modalName, pollData , pollId) => {

    setCurrentPollData(pollData);  
    setCurrentPollId(pollId);
    setModals({ ...modals, [modalName]: true });
  };

  const closeModal = (modalName) => {
    setModals({ ...modals, [modalName]: false });
  };

  const toggleModal = (modalName) => {
    setModals({ ...modals, [modalName]: !modals[modalName] });
  };


  return { openModal, closeModal, toggleModal, modals, currentPollData,juryCheckboxState ,setJuryCheckboxState };
};

export default useModal;
