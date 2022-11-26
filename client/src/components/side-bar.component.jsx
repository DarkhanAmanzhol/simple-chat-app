import { Box, Typography, Divider, Stack } from "@mui/material";
import UserCard from "./user-card.component";
import LogoutIcon from "@mui/icons-material/Logout";
import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../graphql/queries";
import Loading from "./loading.component";

const SideBar = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const { data, loading, error, client } = useQuery(GET_ALL_USERS);

  const logOutUser = () => {
    client.resetStore();
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <Box
        backgroundColor='#f7f7f7'
        height='100vh'
        width='250px'
        padding='10px'
      >
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='h6'>Chat</Typography>
          <LogoutIcon onClick={logOutUser} />
        </Stack>
        <Divider />
        {loading ? (
          <Loading />
        ) : error ? (
          logOutUser()
        ) : (
          data.users?.map((user) => {
            return <UserCard key={user.id} user={user} />;
          })
        )}
      </Box>
      <Outlet context={{ hello: "World" }} />
    </>
  );
};

export default SideBar;
