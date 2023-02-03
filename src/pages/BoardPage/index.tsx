import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

import Board from "../../components/Board";
import socketService from "../../services/socketService";
import gameService from "../../services/gameService";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  setIsGameStarted,
  setIsMyTurn,
  setPlayerSymbol,
} from "../../store/reducers/room";
import { selectRoom } from "../../store/selectors/room";
import { Container } from "./styles";

const BoardPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isGameStarted } = useAppSelector(selectRoom);

  const leaveGame = async () => {
    const socket = socketService.socket;

    if (!socket) return;

    try {
      await gameService.leaveGame(socket);
    } catch (err) {
      alert(err);
    }
    navigate("/");
  };

  const handleGameStart = () => {
    if (socketService.socket) {
      gameService.onStartGame(socketService.socket, (payload) => {
        dispatch(setIsGameStarted(true));
        dispatch(setPlayerSymbol(payload.symbol));
        if (payload.start) {
          dispatch(setIsMyTurn(true));
        } else {
          dispatch(setIsMyTurn(false));
        }
      });
    }
  };

  useEffect(() => {
    handleGameStart();
  }, []);

  //   const joinRoom = async () => {
  //     const roomPassword = localStorage.getItem("roomPassword");
  //     if (socketService.socket && roomPassword) {
  //       await gameService.JoinRoom(socketService.socket, roomPassword);
  //     }
  //   };

  //   useEffect(() => {
  //     // joinRoom();
  //   }, []);

  return (
    <Container>
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          top: "30px",
          right: "30px",
          textTransform: "none",
          borderRadius: "8px",
        }}
        onClick={leaveGame}
      >
        Leave game
      </Button>
      {!isGameStarted ? <Box>Waiting for another player to join</Box> : null}
      <Board />
    </Container>
  );
};

export default BoardPage;
