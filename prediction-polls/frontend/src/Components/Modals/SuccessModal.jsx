
import React, { useEffect } from "react";
import { Modal, Form, Button, Input, Typography } from "antd";
import styles from "./Modals.module.css";
const { Text } = Typography;


function SuccessModal({ open, setOpen }) {
    const handleSuccessOk = () => {
        setOpen(false);
    }
    return (
        <Modal
            open={open}
            title="Success"
            onOk={handleSuccessOk}
            footer={(_, { OkBtn }) => (
                <>
                    <OkBtn />
                </>
            )}
        >
            <Text className={styles.successStyle}>You have added your annotation Successfully!</Text>
        </Modal>
    );
}
export default SuccessModal