import React, { useEffect } from "react";
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
import getPollsOpenedMe from "../../api/requests/getPollsOpenedMe.jsx";
import followUser from "../../api/requests/followUser.jsx";
import unfollowUser from "../../api/requests/unfollowUser.jsx";
import getfollowerList from "../../api/requests/followerList.jsx";
import getfollowedList from "../../api/requests/followedList.jsx";
import getPollsOpened from "../../api/requests/getPollsOpened.jsx";
import useModal from "../../contexts/ModalContext/useModal.jsx";
import { ModalNames } from "../../contexts/ModalContext/ModalNames.js";

function Profile() {
  const { username } = useParams();
  const [pollData, setPollData] = React.useState({ pollList: [] });
  const [userData, setUserData] = React.useState({});
  const [followerListData, setFollowerListData] = React.useState([]);
  const [followedListData, setFollowedListData] = React.useState([]);
  const [followedMeList, setFollowedMeList] = React.useState([]);
  const [userMeData, setUserMeData] = React.useState({});
  const [isFollowed, setIsFollowed] = React.useState(false);

  console.log("followData", followerListData);

  const { openModal, setFollowerList, setFollowingList } = useModal();

  const fetchPollsMe = async () => {
    try {
      const response = await getPollsOpenedMe();
      const data = response;

      const modifiedData = data.map((poll) => {
        if (poll.closingDate != null) {
          poll.closingDate = poll.closingDate.slice(0, 10);
        }
        return poll.pollType === "discrete"
          ? { ...poll, isCustomPoll: false }
          : { ...poll, isCustomPoll: true };
      });
      const reversedData = [...modifiedData].reverse();
      setPollData({ pollList: reversedData });
    } catch (error) {
      console.error("Error fetching polls:", error);
    }
  };

  const fetchPollsUser = async (username) => {
    try {
      const response = await getPollsOpened(username);
      const data = response;

      const modifiedData = data.map((poll) => {
        if (poll.closingDate != null) {
          poll.closingDate = poll.closingDate.slice(0, 10);
        }
        return poll.pollType === "discrete"
          ? { ...poll, isCustomPoll: false }
          : { ...poll, isCustomPoll: true };
      });
      const reversedData = [...modifiedData].reverse();
      setPollData({ pollList: reversedData });
    } catch (error) {
      console.error("Error fetching polls:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProfileMe();
        const data = response;
        setUserMeData(data);
      } catch (error) {
        console.error("Error fetching userMe:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchFollowed = async () => {
      try {
        console.log("userDatainuseeffect", userData);
        const followedList = await getfollowedList(userData.id);
        

        setFollowedListData(followedList.followedList);
        setFollowingList(followedList.followedList);
      } catch (error) {
        console.error("Error fetching followed:", error);
      }
    };
    const fetchFollower = async () => {
      try {
        const followerList = await getfollowerList(userData.id);

        setFollowerListData(followerList.followerList);
        setFollowerList(followerList.followerList);
      } catch (error) {
        console.error("Error fetching follower:", error);
      }
    };

    fetchFollowed();
    fetchFollower();
  }, [userData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const followedMeList = await getfollowedList(userMeData.id);
        const followedMeListData = followedMeList.followedList;
        setFollowedMeList(followedMeListData);
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    };

    fetchData();
  }, [userMeData]);

  const userMeUsername = localStorage.getItem("username");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (username?.toLowerCase() === userMeUsername?.toLowerCase()) {
          const response = await getProfileMe();
          if (response) {
            setUserData(response);
          }
          fetchPollsMe();
        } else {
          const response = await getProfile(username);
          if (response) {
            setUserData(response);
          }
          console.log("username", username);
          fetchPollsUser(username);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, [username, userMeUsername]);

  useEffect(() => {
    const isUserFollowed = followedMeList?.includes(userData.username);
    setIsFollowed(isUserFollowed);
  }, [followedMeList, userData]);

  const handleFollowUser = async () => {
    try {
      const response = await followUser(userMeData.id, userData.id);
      if (response) {
        setIsFollowed(true);
        fetchAndUpdateFollowerList();
        fetchAndUpdateFollowingList();
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollowUser = async () => {
    try {
      const response = await unfollowUser(userMeData.id, userData.id);
      if (response) {
        setIsFollowed(false);
        fetchAndUpdateFollowerList();
        fetchAndUpdateFollowingList();
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  const openFollowersModal = () => {
    openModal(ModalNames.FollowerModal, null, null, null, followerListData);
  };

  const openFollowingModal = () => {
    openModal(
      ModalNames.FollowingModal,
      null,
      null,
      null,
      null,
      followedListData
    );
  };

  const fetchAndUpdateFollowerList = async () => {
    try {
      const followerList = await getfollowerList(userData.id);
      setFollowerListData(followerList.followerList);
      setFollowerList(followerList.followerList);
    } catch (error) {
      console.error("Error fetching follower:", error);
    }
  };

  const fetchAndUpdateFollowingList = async () => {
    try {
      const followedList = await getfollowedList(userData.id);
      setFollowedListData(followedList.followedList);
      setFollowingList(followedList.followedList);
    } catch (error) {
      console.error("Error fetching followed:", error);
    }
  };

  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <Menu currentPage="Profile" />
      <div className={styles.profileInfo}>
        <div className={styles.card}>
          <div className={styles.thumbnailAndButtons}>
            <div className={styles.followButtons}>
              <button
                className={styles.followButton}
                onClick={openFollowersModal}
              >
                {followerListData.length} Followers
              </button>
              <button
                className={styles.followButton}
                onClick={openFollowingModal}
              >
                {followedListData.length} Following
              </button>
            </div>
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
          </div>
          <div className={styles.info}>
            <div className={styles.nameAndButton}>
              <div className={styles.name}>
                <p className={styles.nameUsernameText}>{userData.username}</p>
              </div>
              <div className={styles.buttonContainer}>
                {userData.username?.toLowerCase() ===
                userMeUsername?.toLowerCase() ? (
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
                ) : isFollowed == true ? (
                  <button
                    className={styles.unFollowButton}
                    onClick={handleUnfollowUser}
                  >
                    <p className={styles.buttonText}>Unfollow</p>
                  </button>
                ) : (
                  <button className={styles.button} onClick={handleFollowUser}>
                    <p className={styles.buttonText}>Follow</p>
                  </button>
                )}
              </div>
            </div>
            <div className={styles.aboutContainer}>
              {userData.isHidden == 0 && userData.birthday != null && (
                <>
                  <p className={styles.aboutTitle}>Birthday</p>
                  <p>
                    {moment(userData.birthday, "YYYY-MM-DD").format(
                      "MMMM Do, YYYY"
                    )}
                  </p>
                </>
              )}
              {userData.isHidden == 0 && (
                <>
                  <p className={styles.aboutTitle}>About</p>
                  <p className={styles.aboutText}>{userData.biography}</p>
                </>
              )}
            </div>
            <div className={styles.badgesContainer}>
              {userData.isHidden == 0 && (
                <>
                  {userData.badges &&
                    userData.badges
                      .filter((badge) => badge.isSelected !== 0)
                      .map((badge, index) => (
                        <Badge
                          number={badge.rank}
                          text={badge.topic}
                          key={index}
                        />
                      ))}
                </>
              )}
            </div>
          </div>
        </div>
        {userData.isHidden == 0 &&
          pollData.pollList.map((poll, index) => (
            <PollCard
              className={styles.pollCard}
              PollData={poll}
              key={poll.id}
            />
          ))}
      </div>
      <div className={styles.pointButton}>
        <PointsButton point={userMeData?.points ?? 0} />{" "}
      </div>
    </div>
  );
}

export default Profile;
