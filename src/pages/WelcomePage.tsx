import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";

import socketService from "../services/socketService";
import gameService from "../services/gameService";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [roomPassword, setRoomPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onStart = async () => {
    const socket = socketService.socket;

    if (!socket) return;

    try {
      await gameService.JoinRoom(socket, roomPassword);
      //   localStorage.setItem("roomPassword", roomPassword);
      setLoading(false);
      navigate("/board");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <Box>Welcome to tic tac toe!</Box>
      <TextField
        id="standard-basic"
        label="Room Password"
        variant="standard"
        onChange={(e) => setRoomPassword(e.target.value)}
        value={roomPassword}
      />
      <Button
        variant="contained"
        disabled={
          !roomPassword.length || !roomPassword.trim().length || loading
        }
        sx={{ width: "100%" }}
        onClick={onStart}
      >
        {loading ? "Loading..." : "Start"}
      </Button>
    </Box>
  );
};

export default WelcomePage;
