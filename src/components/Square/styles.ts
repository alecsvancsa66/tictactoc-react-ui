import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";

export const StyledSquare = styled(Button)({
  position: "relative",
  width: "100%",
  height: "100%",
  borderRadius: "12px",
  fontSize: "46px",
});

export const StyledValue = styled(Box)({
  position: "absolute",
  margin: "auto",
});
