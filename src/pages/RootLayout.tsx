import { useEffect } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import socketService from "../services/socketService";

const RootLayout = () => {
  const connectSocket = async () => {
    const socket = await socketService
      .connect("http://localhost:3001")
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  useEffect(() => {
    connectSocket();
  }, []);

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
      <main>
        <Outlet />
      </main>
    </Box>
  );
};

export default RootLayout;
