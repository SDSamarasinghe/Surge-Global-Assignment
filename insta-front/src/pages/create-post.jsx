import React, { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth, storage } from "../firebase";
import client from "../utils/axios";

const CreatePost = () => {
  // states for firebase upload
  const [imgUrl, setImgUrl] = useState(undefined);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
        navigate("/auth");
      }
    });
  }, []);

  const handlePostCreate = () => {
    client
      .post(`/api/posts`, {
        userName: user.displayName,
        imagePath: imgUrl,
      })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImageSelectChange = (e) => {
    const file = e.target.files[0];

    // get file name
    const fileName = file.name;

    const storageRef = ref(storage, `${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // 'file' comes from the Blob or File API
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
        });
      }
    );
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <label class="form-label" for="image">
        Choose an image
      </label>

      <input
        onChange={handleImageSelectChange}
        type="file"
        class="form-control"
        id="image"
      />

      <MDBBtn
        className="mb-4 w-100 mt-4"
        disabled={!imgUrl}
        onClick={handlePostCreate}
      >
        Create Post
      </MDBBtn>
    </MDBContainer>
  );
};

export default CreatePost;
