import React, { useState } from "react";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { auth, storage } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const [justifyActive, setJustifyActive] = useState("tab1");
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // states for firebase register
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [username, setUsername] = useState("");
  const [imgUrl, setImgUrl] = useState(undefined);

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  const handleRegister = async () => {
    try {
      setError("");
      setLoading(true);
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      ).then((result) => {
        // update user profile
        updateProfile(result.user, {
          displayName: username,
          photoURL: imgUrl,
        }).then(() => {
          toast("Registered", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/");
        });
      });
    } catch {
      setError("Failed to register");
    }
  };

  // firebase login with email and password
  const handleLogin = async () => {
    try {
      setError("");
      setLoading(true);
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword).then(
        () => {
          toast("Loggedin", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      );
      navigate("/");
    } catch {
      setError("Failed to log in");
    }
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
      <MDBTabs
        pills
        justify
        className="mb-3 d-flex flex-row justify-content-between"
      >
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab1")}
            active={justifyActive === "tab1"}
          >
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab2")}
            active={justifyActive === "tab2"}
          >
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === "tab1"}>
          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            id="form1"
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="form2"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />

          <MDBBtn type="button" className="mb-4 w-100" onClick={handleLogin}>
            Sign in
          </MDBBtn>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === "tab2"}>
          <div></div>

          <MDBInput
            wrapperClass="mb-4"
            label="Username"
            id="uname"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <MDBInput
            wrapperClass="mb-4"
            label="Email"
            id="email"
            type="email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="password"
            type="password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />

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
            className="mb-4 mt-2 w-100"
            disabled={!imgUrl}
            onClick={handleRegister}
          >
            Sign up
          </MDBBtn>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
}

export default Login;
