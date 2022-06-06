import React, { useState, useRef } from "react";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useMoralis } from "react-moralis";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { LoadingOverlay } from '@mantine/core';

const PostShare = () => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState("");
  const imageRef = useRef();
  const { Moralis } = useMoralis()
  const [open, setOpen] = React.useState(false);
  const user = Moralis.User.current()

  const handleClose = () => {
    setOpen(false);
  };


  const create = async (e) => {
    e.preventDefault()
    if (file) {
      setLoading(true)
      const data = file
      const fileData = new Moralis.File(data.name, data)
      await fileData.saveIPFS()
      await Moralis.Cloud.run("createPost", { desc: desc, ipfsHash: fileData.ipfs() });
      setOpen(true);
      setDesc("")
      setFile(null)
      setImage(null)
      setLoading(false)
    } else {
      alert("Select a photo first")
    }
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setFile(img)
      setImage({ image: URL.createObjectURL(img) });
    }
  };

  return (
    <div className="PostShare">
      <LoadingOverlay className="loader-share" visible={loading} />
      <img src={user.attributes.pfp} alt="" />
      <form onSubmit={(e) => create(e)}>
        <input type="text" required defaultValue={desc} onChange={e => setDesc(e.target.value)} placeholder="Share your thoughts..." />
        <div className="postOptions">
          <div className="option" style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <button className="button ps-button">Post</button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={image.image} alt="" />
          </div>
        )}
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Post successfully uploaded, go to your profile to check.
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default PostShare;
