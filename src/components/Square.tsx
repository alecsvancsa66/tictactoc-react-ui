import { Button } from "@mui/material";

import { useAppSelector } from "../store";
import { selectRoom } from "../store/selectors/room";

interface ISquare {
  value: string;
  onSquareClick: (value: "x" | "o", index: number) => void;
  index: number;
}

const Square = ({ value, onSquareClick, index }: ISquare) => {
  const { playerSymbol } = useAppSelector(selectRoom);

  return (
    <>
      {playerSymbol ? (
        <Button
          variant="outlined"
          sx={{ height: "100%", width: "100%", borderRadius: "8px" }}
          onClick={() => onSquareClick(playerSymbol, index)}
        >
          {value}
        </Button>
      ) : null}
    </>
  );
};

export default Square;
