import React, { useState, useRef } from "react";
import ProfileImage from "../../img/profileImg.jpg";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useMoralis } from "react-moralis";

const PostShare = () => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState();
  const imageRef = useRef();
  const { Moralis } = useMoralis()

  const create = async (e) => {
    e.preventDefault()
    if (file) {
      setLoading(true)
      const data = file
      const fileData = new Moralis.File(data.name, data)
      await fileData.saveIPFS()
      await Moralis.Cloud.run("test", { desc: desc, ipfsHash: fileData.ipfs() });
      setLoading(false)
    } else {
      alert("Select a photo firts")
    }
  }

  // const savePost = async(e) => {
  //   e.preventDefault()
  //   const Posts = Moralis.Object.extend("Posts")
  //   const newPost = new Posts();
  //   newPost.set("postOwnerAcc", account)
  //   newPost.set("postDescription", desc )

  //   if(file){
  //     const data = file
  //     const fileData = new Moralis.File(data.name, data)
  //     await fileData.saveIPFS()
  //     newPost.set("postImage", fileData.ipfs())
  //   }

  //   newPost.set("userId", data[0].objectId)
  //   await newPost.save();
  //   window.location.reload()
  // }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setFile(img)
      setImage({ image: URL.createObjectURL(img) });
    }
  };

  return (
    <div className="PostShare">
      <img src={ProfileImage} alt="" />
      <form onSubmit={(e) => create(e)}>
        <input type="text" required value={desc} onChange={e => setDesc(e.target.value)} placeholder="Share your thoughts..." />
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
    </div>
  );
};

export default PostShare;
