import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import WelcomePage from "./pages/WelcomePage";
import BoardPage from "./pages/BoardPage";
import { Box } from "@mui/material";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<RootLayout />}
      errorElement={<Box>An error ocured</Box>}
    >
      <Route index element={<WelcomePage />} />
      <Route path="/board" element={<BoardPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
