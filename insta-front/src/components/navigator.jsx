import React, { useEffect, useState } from "react";
import { MDBNavbar, MDBContainer } from "mdb-react-ui-kit";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase";

export default function Navigator() {
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      window.location = "/auth";
    });
  };

  return (
    <MDBNavbar expand="lg" height={"100px"} light bgColor="light">
      <MDBContainer size="md d-flex align-items-center">
        <div>
          <img src="/logo.png" alt="Insta logo" />
        </div>
        <div className="d-flex align-items-center gap-3">
          {user && (
            <>
              <div>
                <img
                  style={{
                    width: "30px",
                    height: "30px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                  src={user?.photoURL}
                  alt="Profile"
                />
              </div>
              <div>
                <div>{user && user?.displayName}</div>
                <div>{user && user?.email}</div>
              </div>
              <div>
                <img
                  onClick={handleLogout}
                  src="/logout.png"
                  className="logout"
                  alt="Insta logo"
                />
              </div>
            </>
          )}
        </div>
      </MDBContainer>
    </MDBNavbar>
  );
}
