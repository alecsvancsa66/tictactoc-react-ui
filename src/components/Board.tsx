import { useState } from "react";
import { Box, Grid } from "@mui/material";

import Square from "./Square";

const Board = () => {
  const [board, setBoard] = useState([
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

  console.log(board);

  const updateGame = (value: "x" | "o", index: number) => {
    // if the square is empty only then update the board
    if (board[index].value === "") {
      const newBoard = [...board];

      newBoard.splice(index, 1, { value });
      setBoard(newBoard);
    }
  };

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
