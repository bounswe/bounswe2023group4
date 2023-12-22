// JuryModal.js
import React from 'react';
import { Modal } from 'antd';
import useModal from '../../contexts/ModalContext/useModal';
import { ModalNames } from '../../contexts/ModalContext/ModalNames';
import styles from './JuryModal.module.css';

const JuryModal = () => {
  const { modals, closeModal,setJuryCheckboxState } = useModal();

  const handleCancel = () => {
    closeModal(ModalNames.JuryTermsModal);
  };

  const handleOK = () => {
    setJuryCheckboxState(true); 
    closeModal(ModalNames.JuryTermsModal); 
  };

  return (
    <Modal
      title="Jury Terms"
      open={modals[ModalNames.JuryTermsModal]}
      onCancel={handleCancel}
      onOk={handleOK}
      okText="I Agree"
      cancelText="Cancel"
    >
      <div className={styles.juryRules}>
        <p>Before proceeding to make a decision on the poll in question, please carefully review and agree to the following terms:</p>
        
        <p><strong>1. Impartiality:</strong> I affirm that I have no personal or financial interest in the outcomes of this poll and that I have not participated in the poll. I commit to making an unbiased decision based solely on the poll's content and the evidence provided.</p>
        
        <p><strong>2. Confidentiality:</strong> I understand that my role as a jury member is a position of trust. I agree not to disclose or discuss any details of the poll or its deliberation process outside the official channels provided by the platform.</p>
        
        <p><strong>3. Knowledge and Honesty:</strong> I acknowledge that I am making decisions based on the tags I am interested in and knowledgeable about. I will conduct any necessary research and fact-checking to ensure the accuracy of my decision.</p>
        
        <p><strong>4. Respect and Civility:</strong> I commit to engaging respectfully and constructively with the poll and fellow jury members. I understand that my role is to contribute positively to the community and uphold the platform's standards.</p>
        
        <p><strong>5. Rule Adherence:</strong> I have read and understood the platform's rules and guidelines for jury members, including the consequences of any misconduct or failure to act responsibly. I agree to adhere to these rules throughout the decision-making process.</p>
        
        <p><strong>6. Timely Participation:</strong> I understand the importance of making a timely decision within the 24-hour timeframe and commit to adhering to this schedule to ensure the smooth functioning of the platform.</p>
        
        <p><strong>7. Ethical Conduct:</strong> I promise to conduct myself ethically and responsibly, recognizing the impact my decision may have on the poll's creator, participants, and the platform community.</p>
        
        <p>By clicking "I Agree," you affirm your understanding and commitment to these terms and the responsibilities of being a jury member. Your thoughtful and fair participation is crucial to maintaining the integrity and quality of our community's decision-making process.</p>
      </div>
    </Modal>
  );
};

export default JuryModal;
