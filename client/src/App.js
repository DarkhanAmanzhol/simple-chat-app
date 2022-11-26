import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Login from "./pages/login-register/Login";
import Register from "./pages/login-register/Register";
import SideBar from "./components/side-bar.component";
import Welcome from "./components/welcome.component";
import ChatScreen from "./components/chat-screen";
import { Box } from "@mui/material";
import NotFound from "./pages/not-found/NotFound";
import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { CHECK_TOKEN } from "./graphql/queries";

const ChatRoutes = ({ setLoggedIn }) => {
  return (
    <Box display='flex'>
      <Routes>
        <Route path='/' element={<SideBar setLoggedIn={setLoggedIn} />}>
          <Route path='' element={<Welcome />} />
          <Route path=':id/:fullName' element={<ChatScreen />} />
        </Route>
      </Routes>
    </Box>
  );
};

function App() {
  const token = localStorage.getItem("jwt");

  const [loggedIn, setLoggedIn] = useState(token ? true : false);

  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login setLoggedIn={setLoggedIn} />} />
        <Route
          path='/register'
          element={<Register setLoggedIn={setLoggedIn} />}
        />
        {loggedIn && (
          <Route path='/*' element={<ChatRoutes setLoggedIn={setLoggedIn} />} />
        )}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
