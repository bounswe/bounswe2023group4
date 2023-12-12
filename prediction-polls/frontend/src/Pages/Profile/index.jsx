import React from "react";
import Menu from "../../Components/Menu";
import styles from "./Profile.module.css";
import Users from "../../MockData/Users.json";
import EditIcon from "../../Assets/icons/EditIcon.jsx";
import moment from "moment";

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
  const [pollData, setPollData] = React.useState({ pollList: [] });
  const [userData, setUserData] = React.useState({});
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND_LINK + "/polls",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Received non-JSON response from server");
        }

        const data = await response.json();

        // Modify each poll in the data array
        const modifiedData = data.map((poll) => {
          if (poll.closingDate != null) {
            poll.closingDate = poll.closingDate.slice(0, 10);
          }
          if (poll.pollType === "discrete") {
            return { ...poll, isCustomPoll: false };
          } else {
            return { ...poll, isCustomPoll: true };
          }
        });
        const reversedData = [...modifiedData].reverse();
        setPollData({ pollList: reversedData });
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    };

    fetchData();
  }, []);

  const userMeUsername = localStorage.getItem("username");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (username?.toLowerCase() === userMeUsername?.toLowerCase()) {
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
            {userData.profile_picture == null ? (
              <div className={styles.profileImagePlaceholder}>
                {" "}
                <ProfileIcon />
              </div>
            ) : (
              <img
                src={userData.profile_picture}
                alt="profileImage"
                className={styles.profileImage}
              ></img>
            )}
          </div>
          <div className={styles.info}>
            <div className={styles.nameAndButton}>
              <div className={styles.name}>
                <p className={styles.nameUsernameText}>{userData.username}</p>
              </div>
              <div className={styles.buttonContainer}>
                {userData.username?.toLowerCase() === userMeUsername?.toLowerCase() ? (
                  <>
                    <button
                      className={styles.button}
                      onClick={() =>
                        navigate(`/editProfile/${userData.username}`)
                      }
                    >
                      <EditIcon />
                      <p className={styles.buttonText}>Edit Profile</p>
                    </button>
                  </>
                ) : (
                  <button className={styles.button}>
                    <p className={styles.buttonText}>Follow</p>
                  </button>
                )}
              </div>
            </div>
            <div className={styles.aboutContainer}>
              {userData.isHidden == false ? (
                userData.birthday ? (
                  <>
                    {" "}
                    <p className={styles.aboutTitle}>Birthday</p>
                    <p className={styles.aboutText}>{userData.birthday}</p>
                  </>
                ) : null
              ) : null}

              <p className={styles.aboutTitle}>About</p>
              <p className={styles.aboutText}>{userData.biography}</p>
              {(userData.isHidden == 0 && userData.birthday!= null)&& <p>{moment(userData.birthday, "YYYY-MM-DD").format("MMMM Do, YYYY")}</p>}
            </div>
            <div className={styles.badgesContainer}>
              {userData.badges &&
                userData.badges
                .filter(badge => badge.isSelected !== 0) 
                .map((badge, index) => (
                  <Badge number={badge.rank} text={badge.topic} key={index} />
                ))}
            </div>
          </div>
        </div>
        {pollData.pollList.map((poll, index) => (
          <PollCard className={styles.pollCard} PollData={poll} key={poll.id} />
        ))}
      </div>
      <div className={styles.pointButton}>
        <PointsButton point={userData?.points ?? 0} />{" "}
      </div>
    </div>
  );
}

export default Profile;
