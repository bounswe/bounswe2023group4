import React from "react";
import Menu from "../../Components/Menu";
import styles from "./EditProfile.module.css";
import { useParams } from "react-router-dom";
import Users from "../../MockData/Users.json";
import { Button, Input, Form, DatePicker, Checkbox } from "antd";
import PointsButton from "../../Components/PointsButton";
import pointData from "../../MockData/PointList.json";
import moment from "moment";
import getProfileMe from "../../api/requests/profileMe.jsx";
import ProfileIcon from "../../Assets/icons/ProfileIcon.jsx";
import uploadProfilePhoto from "../../api/requests/uploadProfilePhoto.jsx";
import updateProfile from "../../api/requests/editProfile.jsx";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const { username } = useParams();
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = React.useState({
    username: "",
    // fullname: userData.name,
    about: "",
    birthday: "",
    isHidden: null,
  });
  const [file, setFile] = React.useState(null);
  const [caption, setCaption] = React.useState("");
  const fileInputRef = React.useRef(null);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const [userData, setUserData] = React.useState({});
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProfileMe();
        if (response) {
          setUserData(response);
          const newInitialValues = {
            username: response.username,
            // fullname: response.name,
            about: response.biography,
            birthday: response.birthday ? moment(response.birthday) : null,
            isHidden: response.isHidden ,
          };
          setInitialValues(newInitialValues);
          form.setFieldsValue(newInitialValues);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, [username]);


  const submitImage = async () => {
    const result = await uploadProfilePhoto(file, caption);
    if (result) {
      return true;
    } else {
      return false;
    }
  };

  const handleEditProfile = async () => {
    const formUserData = form.getFieldsValue();
    const profileUpdateResult = await updateProfile({
      userId: userData.id,
      username: formUserData.username,
      email: userData.email,
      profile_picture: userData.profileImage,
      biography: formUserData.about,
      birthday: formUserData.birthday ? formUserData.birthday.format("YYYY-MM-DD") : null,
      isHidden: formUserData.isHidden,
    });
  
    if (profileUpdateResult) {
      
      if (file) {
        const imageUploadResult = await submitImage(file);
        if (!imageUploadResult) {
          console.error("Error uploading the profile image.");
          
        }
      }
      
     navigate(`/profile/${formUserData.username}`);
    } else {
      console.error("Error updating the profile.");
    }
  };

 

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file)); 
      setFile(file); 
    }
  };

  const handlePlaceholderClick = () => {
    fileInputRef.current.click(); 
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
            <div
              className={styles.profileImageContainer}
              onClick={handlePlaceholderClick}
            >
              {selectedFile || userData.profile_picture ? (
                <img
                  src={selectedFile || userData.profile_picture}
                  alt="Profile"
                  className={styles.profileImage}
                />
              ) : (<div className={styles.profileImagePlaceholder}>
                <ProfileIcon /> </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept="image/*"
              style={{ display: "none" }} 
            />
          </Form.Item>
          
          <Form.Item
            label={<label className={styles.formLabel}>USERNAME</label>}
            name="username"
            className={styles.formItem}
          >
            <Input
              type="text"
              className={styles.formInputStyle}
              placeholder="username"
              disabled
            />
          </Form.Item>
          {/* <Form.Item label={<label className={styles.formLabel}>FULL NAME</label>} name="fullname" className={styles.formItem}>
            <Input
              type="text"
              className={styles.formInputStyle}
              placeholder="Full Name"
            />
          </Form.Item> */}
          <Form.Item
            label={<label className={styles.formLabel}>ABOUT</label>}
            name="about"
            className={styles.formItem}
          >
            <Input
              className={styles.formInputStyle}
              type="text"
              placeholder="about"
            />
          </Form.Item>
          {/*<Form.Item>
            <p>COVER IMAGE</p>
            <img
              src={userData.thumbnailImage}
              alt="thumbnailImage"
              className={styles.thumbnailImage}
            ></img>
          </Form.Item> */}
          <Form.Item
            label={<label className={styles.formLabel}>BIRTHDAY</label>}
            name="birthday"
            htmlFor="birthday"
            className={styles.formItem}
          >
            <div className={styles.birthdayWrapperStyle}>
              <DatePicker
                id="birthday"
                className={styles.formDatePickerStyle}
                placeholder="01.01.2000"
                format="YYYY-MM-DD"
              />
              <Checkbox id="isHidden">Show in profile</Checkbox>
            </div>
          </Form.Item>
          <Form.Item className={styles.buttonContainer}>
            <div className={styles.buttonWrapper}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.formButtonStyle}
                onClick={handleEditProfile}
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
