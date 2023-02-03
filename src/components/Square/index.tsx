import { useAppSelector } from "../../store";
import { selectRoom } from "../../store/selectors/room";
import { StyledSquare, StyledValue } from "./styles";

interface ISquare {
  value: string;
  onSquareClick: (value: "x" | "o", index: number) => void;
  index: number;
}

const Square = ({ value, onSquareClick, index }: ISquare) => {
  const { playerSymbol, isMyTurn } = useAppSelector(selectRoom);

  return (
    <>
      {playerSymbol ? (
        <StyledSquare
          variant="outlined"
          sx={{
            borderTop:
              index === 0 || index === 1 || index === 2
                ? "0px"
                : "1px solid #90caf9",
            borderLeft:
              index === 0 || index === 3 || index === 6
                ? "0px"
                : "1px solid #90caf9",
            borderRight:
              index === 2 || index === 5 || index === 8
                ? "0px"
                : "1px solid #90caf9",
            borderBottom:
              index === 6 || index === 7 || index === 8
                ? "0px"
                : "1px solid #90caf9",
          }}
          onClick={
            isMyTurn ? () => onSquareClick(playerSymbol, index) : () => null
          }
        >
          <StyledValue>{value}</StyledValue>
        </StyledSquare>
      ) : null}
    </>
  );
};

export default Square;
