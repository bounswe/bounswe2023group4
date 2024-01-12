import React, { useContext } from 'react';
import { ModalContext } from './index';
import { ModalNames } from './ModalNames';
import ShareModal from '../../Components/Modals/ShareModal';
import CommentModal from '../../Components/Modals/CommentModal';
import ReportModal from '../../Components/Modals/ReportModal';
import  getProfileMe  from '../../api/requests/profileMe';
import JuryModal from '../../Components/Modals/JuryModal';
import PollTagModal from '../../Components/Modals/PollTagModal';
import FollowerModal from '../../Components/Modals/FollowerModal';
import FollowingModal from '../../Components/Modals/FollowingModal';
import PollImageModal from '../../Components/Modals/PollImageModel';
import ImageModal from '../../Components/Modals/ImageModal';

const Modals = () => {
    const { modals, currentPollData, currentPollId , comments, followerList, followingList} = useContext(ModalContext);
    const [userData, setUserData] = React.useState({});

    React.useEffect(() => {
      const fetchData = async () => {
        try {
          
            const response = await getProfileMe();
            if (response) {
              setUserData(response);
            }
         
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };
  
      fetchData();
    }, []);

  return (
    <>
      {modals[ModalNames.PollTagModal] && <PollTagModal pollId={currentPollId}/>} 
      {modals[ModalNames.ShareModal] && <ShareModal pollData={currentPollData}/>}
      {modals[ModalNames.CommentModal] && <CommentModal previousComments={comments} userImage={userData.profile_picture} pollId={currentPollId}/> }
      {modals[ModalNames.ReportModal] && <ReportModal pollId={currentPollId} />} 
      {modals[ModalNames.JuryTermsModal] && <JuryModal />}
      {modals[ModalNames.FollowerModal] && <FollowerModal followerList={followerList} />}
      {modals[ModalNames.FollowingModal] && <FollowingModal followingList={followingList} />}
      {modals[ModalNames.PollImageModal] && <PollImageModal pollId={currentPollId} />}
      {modals[ModalNames.ImageModal] && <ImageModal pollData={currentPollData}/>}

    </>
  );
};

export default Modals;
