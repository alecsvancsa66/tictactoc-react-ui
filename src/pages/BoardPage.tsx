import { Box } from "@mui/material";

import Board from "../components/Board";

const BoardPage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Board />
    </Box>
  );
};

export default BoardPage;
