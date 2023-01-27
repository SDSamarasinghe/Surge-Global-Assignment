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
      <MDBContainer size="md d-flex">
        <h3> Home </h3>
        <p
          style={{
            paddingTop: "5px",
          }}
        >
          {user && user.email}
        </p>
      </MDBContainer>
    </MDBNavbar>
  );
}
