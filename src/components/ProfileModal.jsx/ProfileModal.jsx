import { Modal, useMantineTheme, Input, InputWrapper } from "@mantine/core";
import { useState } from "react";
import { useMoralis } from "react-moralis";

import "./ProfileModal.css"
function ProfileModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();
  const { Moralis } = useMoralis()
  const user = Moralis.User.current()
  const [username, setUsername] = useState(user.attributes.username)
  const [bio, setBio] = useState(user.attributes.bio)

  const update = async (e) =>{
    e.preventDefault()
    const User = Moralis.Object.extend("_User")
    const query = new Moralis.Query(User)
    const myDetails = await query.first()
    if(bio){
      myDetails.set("bio", bio)
    }
    if(username){
      myDetails.set("username", username)
    }
    await myDetails.save()
    window.location.reload()
  }

  return (
    <Modal
      overlayColor={
        theme.colors.dark[9]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      classNames={{ modal: 'Profile-Modal' }}
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm" onSubmit={update}>
        <h3>Edit Info</h3>
        <div>
          <span><b>Username</b></span>
          <input
            type="text"
            defaultValue={username}
            className="infoInput"
            name="Username"
            onChange={(e)=> setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div>
        <span><b>Bio</b></span>
          <textarea
            rows={3}
            type="text"
            defaultValue={bio}
            className="infoInput area"
            name="bio"
            onChange={(e)=> setBio(e.target.value)}
            placeholder="Write your bio.."
          />
        </div>
        {/* <div>
            Profile Image 
            <input type="file" name='profileImg'/>
            Cover Image
            <input type="file" name="coverImg" />
        </div> */}

        <button className="button infoButton">Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
