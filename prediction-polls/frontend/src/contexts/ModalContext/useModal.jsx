import { useContext } from "react";
import { ModalContext } from "./index.jsx";

const useModal = () => {
  const { modals, setModals, setCurrentPollData, currentPollData } =
    useContext(ModalContext);

  const openModal = (modalName, pollData ) => {
    console.log("pollData: ", pollData)
    setCurrentPollData(pollData);  

    setModals({ ...modals, [modalName]: true });
  };

  const closeModal = (modalName) => {
    setModals({ ...modals, [modalName]: false });
  };

  const toggleModal = (modalName) => {
    setModals({ ...modals, [modalName]: !modals[modalName] });
  };


  return { openModal, closeModal, toggleModal, modals, currentPollData };
};

export default useModal;
