import styles from "./Icon.module.css";
const EditIcon = ({ width, height }) => (

<svg width={width ?? "30"} height={height ?? "30"} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="Edit / Edit_Pencil_Line_01">
<path className={styles.iconEdit} id="Vector" d="M5 25.0001H25M5 25.0001V20.0001L15 10.0001M5 25.0001L10 25.0001L20 15.0001M15 10.0001L18.5858 6.41433L18.5879 6.4122C19.0815 5.9186 19.3288 5.67136 19.6138 5.57876C19.8648 5.49719 20.1353 5.49719 20.3864 5.57876C20.6712 5.67129 20.9181 5.91825 21.411 6.41116L23.5858 8.5859C24.0808 9.08092 24.3284 9.32855 24.4211 9.61396C24.5027 9.86501 24.5027 10.1354 24.4211 10.3865C24.3284 10.6717 24.0812 10.919 23.5869 11.4133L23.5858 11.4143L20 15.0001M15 10.0001L20 15.0001" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</g>
</svg>
)
export default EditIcon;