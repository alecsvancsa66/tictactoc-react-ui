import { useEffect } from "react";
import { Box } from "@mui/material";

import Board from "../components/Board";
import socketService from "../services/socketService";
import gameService from "../services/gameService";
import { useAppDispatch, useAppSelector } from "../store";
import {
  setIsGameStarted,
  setIsMyTurn,
  setPlayerSymbol,
} from "../store/reducers/room";
import { selectRoom } from "../store/selectors/room";

const BoardPage = () => {
  const dispatch = useAppDispatch();
  const { isGameStarted } = useAppSelector(selectRoom);

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

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {!isGameStarted ? <Box>Waiting for another player</Box> : null}
      <Board />
    </Box>
  );
};

export default BoardPage;
