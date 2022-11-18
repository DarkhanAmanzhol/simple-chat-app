import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      height='100vh'
    >
      <Box textAlign='center'>
        <Typography variant='h3'>You typed wrong link</Typography>
        <Link to='/login'>Return back</Link>
      </Box>
    </Box>
  );
};

export default NotFound;
