import React from "react";
import Menu from "../../Components/Menu";
import styles from "./Profile.module.css";
import Users from "../../MockData/Users.json";
import EditIcon from "../../Assets/icons/EditIcon.jsx";
import pollData from "../../MockData/PollData.json";
import PollCard from "../../Components/PollCard";
import { useNavigate } from "react-router-dom";
import PointsButton from "../../Components/PointsButton";
import pointData from "../../MockData/PointList.json";
import { useParams } from "react-router-dom";
import getProfileMe from "../../api/requests/profileMe.jsx";
import getProfile from "../../api/requests/profile.jsx";
import ProfileIcon from "../../Assets/icons/ProfileIcon.jsx";
import Badge from "../../Components/Badge/index.jsx";

function Profile() {
  const { username } = useParams();
  const [userData, setUserData] = React.useState({});

  const userMeUsername = localStorage.getItem("username");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (username === userMeUsername) {
          const response = await getProfileMe();
          if (response) {
            setUserData(response);
          }
        } else {
          const response = await getProfile(username);
          if (response) {
            setUserData(response);
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, [username, userMeUsername]);


  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <Menu currentPage="Profile" />
      <div className={styles.profileInfo}>
        <div className={styles.card}>
          <div className={styles.thumbnailImage}>
            {userData.profile_picture == null ? 
            <div 
              className={styles.profileImagePlaceholder} > <ProfileIcon/></div> : 
              <img
              src={userData.profile_picture}
              alt="profileImage"
              className={styles.profileImage}
            ></img>
            }
            
          </div>
          <div className={styles.info}>
            <div className={styles.nameAndButton}>
              <div className={styles.name}>
                <p className={styles.nameUsernameText}>{userData.username}</p>
              </div>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.button}
                  onClick={() => navigate(`/editProfile/${userData.username}`)}
                >
                  {userData.username === userMeUsername ? (
                    <>
                      <EditIcon />
                      <p className={styles.buttonText}>Edit Profile</p>
                    </>
                  ) : (
                    <p className={styles.buttonText}>Follow</p>
                  )}
                </button>
              </div>
            </div>
            <div className={styles.aboutContainer}>
              <p className={styles.aboutTitle}>About</p>
              <p className={styles.aboutText}>{userData.biography}</p>
            </div>
            <div className={styles.badgesContainer}>
              {userData.badges && userData.badges.length > 0 && (
                userData.badges.map((badge, index) => (

                  <Badge number={badge.rank} text={badge.topic} key={index} />
                ))
              )}

            </div>
          </div>
        </div>
        {pollData.pollList.map((poll, index) => (
          <PollCard PollData={poll} key={index} />
        ))}
      </div>
      <div className={styles.pointButton}>
      <PointsButton points={pointData.points} /></div>
    </div>
  );
}

export default Profile;
