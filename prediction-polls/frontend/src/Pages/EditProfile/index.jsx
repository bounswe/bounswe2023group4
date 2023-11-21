import React from "react";
import Menu from "../../Components/Menu";
import styles from "./EditProfile.module.css";
import { useParams } from "react-router-dom";
import Users from "../../MockData/Users.json";
import {
  Button,
  Input,
  Form,
  DatePicker,
  Checkbox,
  Typography,
  Divider,
} from "antd";
import PointsButton from "../../Components/PointsButton";
import pointData from "../../MockData/PointList.json";
import moment from "moment";

function EditProfile() {
  const { username } = useParams();
  const [form] = Form.useForm();


  const userData = Users.userList.filter(
    (user) => user.username === username
  )[0];

  const initialValues = {
    username: userData.username,
    fullname: userData.name,
    about: userData.about,
    birthday: userData.birthday ? moment(userData.birthday) : null, 
  };

  return (
    <div className={styles.page}>
      <Menu currentPage="Profile" />
      <div className={styles.editProfileInfo}>
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          form={form}
          validateTrigger="onSubmit"
          className={styles.formStyle}
          initialValues={initialValues}
        >
          <Form.Item className={styles.profileImageWrapperStyle}>
            <img
              src={userData.image}
              alt="profileImage"
              className={styles.profileImage}
            ></img>
          </Form.Item>
          <Form.Item label={<label className={styles.formLabel}>USERNAME</label> }name="username" className={styles.formItem}>
            <Input
              type="text"
              className={styles.formInputStyle}
              placeholder="username"
            />
          </Form.Item>
          <Form.Item label={<label className={styles.formLabel}>FULL NAME</label>} name="fullname" className={styles.formItem}>
            <Input
              type="text"
              className={styles.formInputStyle}
              placeholder="Full Name"
            />
          </Form.Item>
          <Form.Item label={<label className={styles.formLabel}>ABOUT</label>} name="about" className={styles.formItem}>
            <Input
              className={styles.formInputStyle}
              type="text"
              placeholder="about"
            />
          </Form.Item>
          <Form.Item>
            <p>COVER IMAGE</p>
            <img
              src={userData.thumbnailImage}
              alt="thumbnailImage"
              className={styles.thumbnailImage}
            ></img>
          </Form.Item>
          <Form.Item label={<label className={styles.formLabel}>BIRTHDAY</label>} name="birthday" htmlFor="birthday" className={styles.formItem}>
            <div className={styles.birthdayWrapperStyle}>
              <DatePicker
                id="birthday"
                className={styles.formDatePickerStyle}
                placeholder="01.01.2000"
                format="YYYY-MM-DD"
              />
              <Checkbox>Show in profile</Checkbox>
            </div>
          </Form.Item>
          <Form.Item className={styles.buttonContainer} >
            <div className={styles.buttonWrapper}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.formButtonStyle}
              >
                Save Changes
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.pointCol}>
        <PointsButton points={pointData.points} />
        <p className={styles.badgesText}>Badges</p>
        <p>(You can choose at most 3)</p>
        <div className={styles.badgesContainer}>
          <div className={styles.badgeCheckbox}>
            <Checkbox />
            <div className={styles.badge}>
              <p className={styles.badgeText}>1</p>
              <p className={styles.badgeText}>Basketball</p>
            </div>
          </div>
          <div className={styles.badgeCheckbox}>
            <Checkbox />
            <div className={styles.badge}>
              <p className={styles.badgeText}>1</p>
              <p className={styles.badgeText}>Politics</p>
            </div>
          </div>
          <div className={styles.badgeCheckbox}>
            <Checkbox />
            <div className={styles.badge}>
              <p className={styles.badgeText}>1</p>
              <p className={styles.badgeText}>Football</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
