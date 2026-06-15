import { useState } from "react";

import { useNavigate } from "react-router-dom";
import api from "../api/axios";

import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box
} from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const formData = new URLSearchParams();
  
      formData.append("username", email);
      formData.append("password", password);

      console.log("Email:", email);
      console.log("Password:", password);
  
      const response = await api.post(
        "/auth/login",
        formData,
        {
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
        }
      );
  
      localStorage.setItem(
        "token",
        response.data.access_token
      );
  
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          marginTop: 10
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
        >
          Expense Tracker
        </Typography>

        <Box
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            label="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <Button
            variant="contained"
            onClick={handleLogin}
           >
            Login
            </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;