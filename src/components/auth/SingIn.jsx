import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        // Redirigir al usuario a la página "admin" después de iniciar sesión
        history.push("/admin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signInWithGoogle = async () => {
    try{
      await signInWithPopup (auth, googleProvider);
      // Redirigir al usuario a la página "admin" después de iniciar sesión
      history.push("/admin");
    } catch (err){
      console.error(err);
    }

  }


  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Accede con tu cuenta ahora 
        </Typography>
        <form onSubmit={signIn}>
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
          Iniciar Sesion
          </Button>

          <Box sx={{ mt: 2 }}>

          <Button type="submit" variant="contained" color="secondary" fullWidth onClick={signInWithGoogle}>Inicia Sesion con google
          
          </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;
