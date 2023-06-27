import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
        history.push("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {authUser ? (
        <>
          <Typography
            variant="subtitle1"
            color="secondary"
            fontWeight="bold"
          >{`Usted se autentico como : ${authUser.email}`}</Typography>

          <Button onClick={userSignOut} variant="contained" color="secondary">
            Cerrar Sesion
          </Button>
        </>
      ) : (
        <Typography
          variant="subtitle1"
          color="secondary"
          fontWeight="bold"
        >
          Sesion Inactiva
        </Typography>
      )}
    </div>
  );
};

export default AuthDetails;
