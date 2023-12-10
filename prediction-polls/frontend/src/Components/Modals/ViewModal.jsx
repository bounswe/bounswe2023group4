import React from "react";
import { Modal, Typography } from "antd";
import PollCard from "../../Components/PollCard";
import styles from "./Modals.module.css";
const { Text } = Typography;




function ViewModal({ open, setOpen, pollContent, pollID }) {
    const [contentHTML, setPollContent] = React.useState(pollContent);
    let annotationList = [{ annotation_typer: "Berk", annotation_target: "Bjk", annotation_body: "Beşiktaş Club", annotation_date: "12/10/2021" }, { annotation_typer: "Berke", annotation_target: "Fb", annotation_body: "Fenerbahçe", annotation_date: "11/12/2022" }];
    const handleViewAnnotateOk = () => {
        setPollContent(pollContent);
        setOpen(false);
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
            title="Annotations List"
            onOk={handleViewAnnotateOk}
            footer={(_, { OkBtn }) => (
                <>
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
                <div className={styles.columnStyle}>
                    {annotationList.length == 0 ? <p>No Annotations are available</p> : (annotationList.map(
                        (annotation) => {
                            return <div className={styles.annotationBoxStyle} onClick={
                                () => {
                                    let text = annotation.annotation_target
                                    var temp = pollContent;
                                    let annotatableTexts = document.getElementsByName(`annotatable_Text${pollID}`);
                                    for (let counter = 0; counter < annotatableTexts.length; counter = counter + 1) {
                                        let original = annotatableTexts[counter].innerHTML;
                                        let formatted = original;
                                        let allCases = letterCasePermutation(text);
                                        allCases.map((val) => {
                                            formatted = formatted.replaceAll(val, "<mark>" + val + "</mark>");
                                            temp = temp.replaceAll(original, formatted);
                                        });

                                    }
                                    setPollContent(temp);
                                }}>
                                <div className={styles.firstLineStyle}>
                                    {annotation.annotation_typer}<span>&nbsp;</span>has<span>&nbsp;</span>annotated<span>&nbsp;</span>
                                    <div className={styles.annotationTargetStyle}>
                                        {annotation.annotation_target}</div><span>&nbsp;</span>as:
                                </div>
                                <div>
                                    {annotation.annotation_body}
                                </div>
                                <div>
                                    {`Annotation Time: ${annotation.annotation_date}`}
                                </div>
                            </div>;
                        }
                    ))}
                </div>
            </div>
        </Modal >
    );

}
export default ViewModal