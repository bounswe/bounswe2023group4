import React, { useContext } from 'react';
import { ModalContext } from './index';
import { ModalNames } from './ModalNames';
import ShareModal from '../../Components/Modals/ShareModal';
import CommentModal from '../../Components/Modals/CommentModal';
import ReportModal from '../../Components/Modals/ReportModal';
import  getProfileMe  from '../../api/requests/profileMe';
import JuryModal from '../../Components/Modals/JuryModal';
import PollTagModal from '../../Components/Modals/PollTagModal';

const Modals = () => {
    const { modals, currentPollData, currentPollId } = useContext(ModalContext);
    const [userData, setUserData] = React.useState({});
    const sampleComments = [
      { userImage: "https://img.freepik.com/free-vector/cheerful-cute-dog-white-background_1308-132991.jpg?w=740&t=st=1702992483~exp=1702993083~hmac=4bc7bff825f51605eb9b31375b1dc3760e3298036f2e34015507c31a39bdd8e0", userName: "User1", text: "This is a comment." },
      { userImage: "https://img.freepik.com/free-vector/cheerful-cute-dog-white-background_1308-132991.jpg?w=740&t=st=1702992483~exp=1702993083~hmac=4bc7bff825f51605eb9b31375b1dc3760e3298036f2e34015507c31a39bdd8e0", userName: "User2", text: "Another comment." },
    ];

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
      {modals[ModalNames.CommentModal] && <CommentModal previousComments={sampleComments} userImage={userData.profile_picture} usename={userData.username}/> }
      {modals[ModalNames.ReportModal] && <ReportModal />} 
      {modals[ModalNames.JuryTermsModal] && <JuryModal />}
    </>
  );
};

export default Modals;
