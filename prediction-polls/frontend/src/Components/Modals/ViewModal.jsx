import React from "react";
import { Modal, Typography } from "antd";
import PollCard from "../../Components/PollCard";
import styles from "./Modals.module.css";
const { Text } = Typography;




function ViewModal({ open, setOpen, pollContent }) {
    const [contentHTML, setPollContent] = React.useState(pollContent);
    let annotationList = [{ annotation_typer: "Berk", annotation_target: "Bjk", annotation_body: "Beşiktaş Club" }, { annotation_typer: "Berke", annotation_target: "Fb", annotation_body: "Fenerbahçe" }];
    const handleViewAnnotateOk = () => {
        setOpen(false)
    };



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
                    <div dangerouslySetInnerHTML={{ __html: (contentHTML == null? pollContent:contentHTML) }}>
                    </div>
                </div>
                <div className={styles.columnStyle}>
                    {annotationList.length == 0 ? <p>No Annotations are available</p> : (annotationList.map(
                        (annotation) => {
                            return <div className={styles.annotationBoxStyle} onClick={
                                () => {
                                    var temp = pollContent;
                                    temp = temp.replaceAll(annotation.annotation_target, "<mark>" + annotation.annotation_target + "</mark>");
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
                            </div>;
                        }
                    ))}
                </div>
            </div>
        </Modal >
    );

}
export default ViewModal