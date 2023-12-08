import React, { useEffect } from "react";
import { Modal, Form, Button, Input, Typography } from "antd";
import styles from "./Modals.module.css";
const { Text } = Typography;


function AddModal({ open, setOpen, expressions, setShowSuccessModal }) {
    const [annotatedBody, setAnnotatedBody] = React.useState("");
    const [annotation, setAnnotation] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [showMessage, setShowMessage] = React.useState(false);
    const handleAddAnnotateOk = () => {
        let found = false;
        expressions.map((expression) => {
            if (expression.toLowerCase().includes(annotatedBody.toLowerCase()) == true && annotatedBody.replace(" ", "") != "" && annotation.replace(" ", "") != "") {
                found = true;
                console.log("Found");
            }
        }
        );
        if (found == false) {
            setMessage("Please check your input!")
            setAnnotatedBody("");
            setAnnotation("");
            setShowMessage(true);
        }
        else {
            setMessage("");
            setShowMessage(false);
            setAnnotatedBody("");
            setAnnotation("");
            setOpen(false);
            setShowSuccessModal(true);
        }

    };
    const handleAddAnnotateCancel = () => {
        setMessage("");
        setShowMessage(false);
        setAnnotatedBody("");
        setAnnotation("");
        setOpen(false);
        setOpen(false);
    };
    return (
        <Modal
            open={open}
            title="Add an annotation"
            onOk={handleAddAnnotateOk}
            onCancel={handleAddAnnotateCancel}
            footer={(_, { OkBtn, CancelBtn }) => (
                <>
                    <CancelBtn />
                    <OkBtn />
                </>
            )}
        >
            <Form>
                <Form.Item>
                    <Text className={styles.labelStyle}>Type the expression you want to annotate:</Text>
                    <Input
                        value={annotatedBody}
                        size="large"
                        placeholder="Taylor Swift"
                        onChange={(e) => setAnnotatedBody(e.target.value)}
                    />
                </Form.Item>
                <Form.Item>
                    <Text className={styles.labelStyle}>Type the annotation:</Text>
                    <Input
                        value={annotation}
                        size="large"
                        placeholder="An American Singer"
                        onChange={(e) => setAnnotation(e.target.value)}
                    />
                </Form.Item>
                {showMessage ? <Form.Item>
                    <Text className={styles.messageStyle}>{message}</Text>
                </Form.Item> : <p></p>}
            </Form>
        </Modal>
    );

}
export default AddModal