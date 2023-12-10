import React, { useEffect } from "react";
import { Modal, Form, Button, Input, Typography } from "antd";
import styles from "./Modals.module.css";
const { Text } = Typography;


function AddModal({ open, setOpen, expressions, setShowSuccessModal, pollContent }) {
    const [contentHTML, setPollContent] = React.useState(pollContent);
    const [annotatedBody, setAnnotatedBody] = React.useState("");
    const [annotation, setAnnotation] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [showMessage, setShowMessage] = React.useState(false);
    const handleAddAnnotateOk = () => {
        let found = false;
        expressions.map((expression) => {
            if (expression.includes(annotatedBody) == true && annotatedBody.replace(" ", "") != "" && annotation.replace(" ", "") != "") {
                found = true;
                console.log("Found");
            }
        }
        );
        if (found == false) {
            setMessage("The input should be included in the poll")
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
            centered
            width={1200}
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
            <div className={styles.modalStyle}>
                <div
                    className={styles.pollStyle}
                >
                    <div dangerouslySetInnerHTML={{ __html: (contentHTML == null ? pollContent : contentHTML) }}>
                    </div>
                </div>
                <Form>
                    <Form.Item>
                        <Text className={styles.labelStyle}>Type an excerpt from the poll to annotate:</Text>
                        <Input
                            value={annotatedBody}
                            size="large"
                            placeholder="Taylor Swift"
                            onChange={(e) => {
                                let text = e.target.value;
                                let val = e.target.value.length;
                                var temp = pollContent;
                                if (text != "") {
                                    temp = temp.replaceAll(text, "<mark>" + text + "</mark>");

                                }
                                setAnnotatedBody(text)
                                setPollContent(temp);
                            }
                            }
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
            </div>

        </Modal>
    );

}
export default AddModal