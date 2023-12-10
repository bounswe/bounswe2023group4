import React, { useEffect } from "react";
import { Modal, Form, Button, Input, Typography } from "antd";
import styles from "./Modals.module.css";
const { Text } = Typography;


function AddModal({ open, setOpen, expressions, setShowSuccessModal, pollContent, pollID }) {
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
            setPollContent(pollContent);
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
        setPollContent(pollContent);
    };

    function letterCasePermutation(input) {
        const result = [];

        function generatePermutations(current, index) {
            if (index === input.length) {
                result.push(current);
                return;
            }

            // Handle lowercase
            generatePermutations(current + input[index].toLowerCase(), index + 1);

            // Handle uppercase
            generatePermutations(current + input[index].toUpperCase(), index + 1);
        }

        generatePermutations('', 0);
        return result;
    }
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
                                let textOriginal = e.target.value;
                                let text = e.target.value.replaceAll(/^\s+|\s+$/g, '');
                                var temp = pollContent;
                                let annotatableTexts = document.getElementsByName(`annotatable_Text${pollID}`);
                                if (text != "") {
                                    for (let counter = 0; counter < annotatableTexts.length; counter = counter + 1) {
                                        let original = annotatableTexts[counter].innerHTML;
                                        let formatted = original;
                                        let allCases = letterCasePermutation(text);
                                        allCases.map((val) => {
                                            formatted = formatted.replaceAll(val, "<mark>" + val + "</mark>");
                                            temp = temp.replaceAll(original, formatted);
                                        });

                                    }
                                }
                                setAnnotatedBody(textOriginal);
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