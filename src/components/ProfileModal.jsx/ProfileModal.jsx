import { Loader, LoadingOverlay, Modal, useMantineTheme} from "@mantine/core";
import { useRef, useState } from "react";
import { useMoralis } from "react-moralis";
import { UilScenery } from "@iconscout/react-unicons";

import "./ProfileModal.css"

const load = () => {
  return <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem"}}>
    <Loader color="orange" size="xl" variant="bars" />
    <span style={{fontWeight: "600"}}>Window will reload after updating.</span>
  </div>
}

function ProfileModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();
  const { Moralis } = useMoralis()
  const user = Moralis.User.current()
  const [username, setUsername] = useState(user.attributes.username)
  const [bio, setBio] = useState(user.attributes.bio)
  const [pfp, setPfp] = useState(user.attributes.pfp)
  const [cover, setCover] = useState(user.attributes.cover)
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [file2, setFile2] = useState(null);
  const [image2, setImage2] = useState(null);
  const [loading, setLoading] = useState(false);
  const imageRef = useRef();
  const imageRef2 = useRef();

  const update = async (e) => {
    e.preventDefault()
    setLoading(true)
    const User = Moralis.Object.extend("_User")
    const query = new Moralis.Query(User)
    const myDetails = await query.first()
    if (bio !== user.attributes.bio) {
      myDetails.set("bio", bio)
    }
    if (username !== user.attributes.username) {
      myDetails.set("username", username)
    }
    
    if (file) {
      const data = file
      const filename = data.name.replace(/[^0-9a-zA-Z.]/g, '');
      const fileData = new Moralis.File(filename, data)
      await fileData.saveIPFS()
      myDetails.set("pfp", fileData.ipfs())
    }

    if (file2) {
      const data2 = file2
      const filename2 = data2.name.replace(/[^0-9a-zA-Z.]/g, '');
      const fileData2 = new Moralis.File(filename2, data2)
      await fileData2.saveIPFS()
      myDetails.set("cover", fileData2.ipfs())
    }
    
    await myDetails.save()
    setLoading(false)
    window.location.reload()
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setFile(img)
      setImage({ image: URL.createObjectURL(img) });
    }
  };

  const onImageChange2 = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setFile2(img)
      setImage2({ image: URL.createObjectURL(img) });
    }
  };

  const closeModal = () => {
    if(!loading){
      setModalOpened(false)
      setFile(null)
      setImage(null)
      setFile2(null)
      setImage2(null)
      setPfp(user.attributes.pfp)
      setCover(user.attributes.cover)
      setUsername(user.attributes.username)
      setBio(user.attributes.bio)
    }
  }

  return (
    <Modal
      overlayColor={theme.colors.dark[9]}
      overlayOpacity={0.55}
      overlayBlur={3}
      classNames={{ modal: 'Profile-Modal' }}
      opened={modalOpened}
      onClose={() => closeModal()}
    >
      <LoadingOverlay overlayColor="rgba(0, 0, 0, 0.4)" loader={load()} radius="lg" visible={loading} />
      <form className="infoForm" onSubmit={update}>
        <span><b>Edit Info</b></span>
        <div>
          <span><b>Profile Picture</b></span>
          <div className="update-profile">
            <div className="update-image-preview">
              <img src={image ? image.image : pfp} alt="" />
            </div>
            <div className="option" style={{ color: "var(--photo)" }}
              onClick={() => imageRef.current.click()}
            >
              <UilScenery />
              Select Photo
            </div>
            <div style={{ display: "none" }}>
              <input
                type="file"
                name="myImage"
                ref={imageRef}
                onChange={onImageChange}
              />
            </div>
          </div>
        </div>
        <div>
          <span><b>Cover Picture</b></span>
          <div className="update-profile">
            <div className="update-image-preview2">
              <img src={image2 ? image2.image : cover} alt="" />
            </div>
            <div className="option" style={{ color: "var(--photo)" }}
              onClick={() => imageRef2.current.click()}
            >
              <UilScenery />
              Select Photo
            </div>
            <div style={{ display: "none" }}>
              <input
                type="file"
                name="myImage"
                ref={imageRef2}
                onChange={onImageChange2}
              />
            </div>
          </div>
        </div>
        <div>
          <span><b>Username</b></span>
          <input
            type="text"
            defaultValue={username}
            className="infoInput"
            name="Username"
            onChange={(e) => setUsername(e.target.value)}
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
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write your bio.."
          />
        </div>
        <button className="button infoButton">Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
