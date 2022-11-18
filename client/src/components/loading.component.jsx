import { Box, CircularProgress, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='100vh'
    >
      <Box textAlign='center'>
        <CircularProgress />
        <Typography variant='h5'>Loading...</Typography>
      </Box>
    </Box>
  );
};

export default Loading;
