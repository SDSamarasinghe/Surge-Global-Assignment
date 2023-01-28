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

  return (
    <MDBNavbar expand="lg" height={"100px"} light bgColor="light">
      <MDBContainer size="md d-flex align-items-center">
        <div>
          <img src="/logo.png" alt="Insta logo" />
        </div>
        <div className="pt-2">
          <p>{user && user.email}</p>
        </div>
      </MDBContainer>
    </MDBNavbar>
  );
}
