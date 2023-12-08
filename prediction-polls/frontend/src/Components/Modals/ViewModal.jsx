import React, { useEffect } from "react";
import { Input, DatePicker, Dropdown, Modal, Button, Typography, Menu } from "antd";
import styles from "./Modals.module.css";
const { Text } = Typography;




function ViewModal({ open, setOpen }) {
    let annotationList = [{ annotation_typer: "Berk", annotation_target: "Bjk", annotation_body: "Beşiktaş Club" }, { annotation_typer: "Berke", annotation_target: "Fb", annotation_body: "Fenerbahçe" }];
    const handleViewAnnotateOk = () => {
        setOpen(false)
    };
    return (
        <Modal
            open={open}
            title="Annotations List"
            onOk={handleViewAnnotateOk}
            footer={(_, { OkBtn }) => (
                <>
                    <OkBtn />
                </>
            )}
        >
            {annotationList.length == 0 ? <p>No Annotations are available</p> : (annotationList.map(
                (annotation) => {
                    return <div className={styles.annotationBoxStyle}>
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
        </Modal>
    );

}
export default ViewModal