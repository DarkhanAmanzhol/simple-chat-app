import { Stack, Typography } from "@mui/material";

const Welcome = () => {
  console.log("Wlcome!");
  return (
    <Stack justifyContent="center" alignItems="center" flexGrow={1}>
      <Typography variant="h3">Let's chat!</Typography>
    </Stack>
  );
};

export default Welcome;
