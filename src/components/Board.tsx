import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";

import Square from "./Square";
import gameService from "../services/gameService";
import socketService from "../services/socketService";
import { TBoard } from "../models/room";
import { useAppDispatch, useAppSelector } from "../store";
import { selectRoom } from "../store/selectors/room";
import { setIsMyTurn } from "../store/reducers/room";

const Board = () => {
  const dispatch = useAppDispatch();
  const { playerSymbol } = useAppSelector(selectRoom);

  const [board, setBoard] = useState<TBoard>([
    { value: "" },
    { value: "" },
    { value: "" },
    { value: "" },
    { value: "" },
    { value: "" },
    { value: "" },
    { value: "" },
    { value: "" },
  ]);

  // returns list of the indexes of empty spots on the board
  const emptyIndexies = (board: TBoard) => {
    return board.filter((square) => square.value === "");
  };

  // winning combinations using the board indexies
  const winning = (board: TBoard) => {
    if (
      (board[0].value === playerSymbol &&
        board[1].value === playerSymbol &&
        board[2].value === playerSymbol) ||
      (board[3].value === playerSymbol &&
        board[4].value === playerSymbol &&
        board[5].value === playerSymbol) ||
      (board[6].value === playerSymbol &&
        board[7].value === playerSymbol &&
        board[8].value === playerSymbol) ||
      (board[0].value === playerSymbol &&
        board[3].value === playerSymbol &&
        board[6].value === playerSymbol) ||
      (board[1].value === playerSymbol &&
        board[4].value === playerSymbol &&
        board[7].value === playerSymbol) ||
      (board[2].value === playerSymbol &&
        board[5].value === playerSymbol &&
        board[8].value === playerSymbol) ||
      (board[0].value === playerSymbol &&
        board[4].value === playerSymbol &&
        board[8].value === playerSymbol) ||
      (board[2].value === playerSymbol &&
        board[4].value === playerSymbol &&
        board[6].value === playerSymbol)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const updateGame = (value: "x" | "o", index: number) => {
    // if the square is empty only then update the board
    if (board[index].value === "") {
      const newBoard = [...board];

      newBoard.splice(index, 1, { value });
      setBoard(newBoard);

      if (socketService.socket) {
        gameService.updateGame(socketService.socket, newBoard);

        if (winning(newBoard)) {
          gameService.gameWon(socketService.socket, "You lost!");
          alert("You won!");
        } else if (emptyIndexies(newBoard).length === 0) {
          gameService.gameWon(socketService.socket, "The game is a TIE!");
          alert("The game is a TIE! update game");
        }

        dispatch(setIsMyTurn(false));
      }
    }
  };

  const handleGameUpdate = () => {
    if (socketService.socket)
      gameService.onGameUpdate(socketService.socket, (newBoard) => {
        setBoard(newBoard);
        dispatch(setIsMyTurn(true));
        winning(newBoard);
      });
  };

  const handleGameWon = () => {
    if (socketService.socket) {
      gameService.onGameWon(socketService.socket, (message) => {
        dispatch(setIsMyTurn(false));
        alert(message);
      });
    }
  };

  useEffect(() => {
    handleGameUpdate();
    handleGameWon();
  }, []);

  return (
    <Box>
      <Grid
        container
        rowSpacing={{ xs: 0 }}
        columnSpacing={{ xs: 0 }}
        sx={{
          width: "300px",
          height: "300px",
        }}
      >
        {board.map((board, index) => (
          <Grid item xs={4} key={`board-cell-${index}`}>
            <Square
              value={board.value}
              index={index}
              onSquareClick={updateGame}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Board;
