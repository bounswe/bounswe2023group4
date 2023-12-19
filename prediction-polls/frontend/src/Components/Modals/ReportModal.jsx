import React from "react";
import { Button, Modal } from "antd";
import useModal from "../../contexts/ModalContext/useModal";
import { ModalNames } from "../../contexts/ModalContext/ModalNames";

const ReportModal = () => {
  const { modals, closeModal } = useModal();

  const handleOk = () => {
    closeModal(ModalNames.ReportModal);
  };

  const handleCancel = () => {
    closeModal(ModalNames.ReportModal);
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
