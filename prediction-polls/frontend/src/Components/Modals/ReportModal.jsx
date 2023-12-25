import React from "react";
import { Button, Modal, message } from "antd"; // Import message from antd for feedback
import useModal from "../../contexts/ModalContext/useModal";
import { ModalNames } from "../../contexts/ModalContext/ModalNames";
import postReportPoll from "../../api/requests/reportPoll";

const ReportModal = ({ pollId }) => {
  const { modals, closeModal } = useModal();

  const handleOk = async () => {
    await reportPoll();
  };

  const handleCancel = () => {
    closeModal(ModalNames.ReportModal);
  };

  const reportPoll = async () => {
    try {
      const response = await postReportPoll(pollId);
      if (response && response.message == "Report added successfully") { 
        message.success("Poll reported successfully"); 
        closeModal(ModalNames.ReportModal); 
      } else {
        message.error("You have already reported this poll"); 
        closeModal(ModalNames.ReportModal);
      }
    } catch (error) {
      message.error("An error occurred while reporting the poll"); 
    }
  };

  return (
    <>
      <Modal
        title="Report Poll"
        open={modals[ModalNames.ReportModal]}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" danger onClick={handleOk}>
            Report
          </Button>,
        ]}
      >
        <p>Are you sure you want to report this poll?</p>
      </Modal>
    </>
  );
};

export default ReportModal;
