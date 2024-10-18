import { Box, createTheme, ThemeProvider, Typography, TextField, Stack, Button } from "@mui/material";
import React from "react";

const theme = createTheme({
    palette: {
      background: {
        default: "#b8f3fc"
      }
    }
  });
  
function MainPage() {
    return (
      <Stack allign = 'center' direction = 'column'>
      <ThemeProvider theme={theme}>
        <Typography variant="h4" align="center" >Guiding you through</Typography>
        <div> </div>
        <b><Typography variant="h1" align="center">B2B Marketing</Typography></b>
        <div> </div>
        <Typography variant="h4" align="center">Sell your product personalised, and fast.</Typography>
        <div>

        </div>
        <Box
      component="img"
      sx={{
        height: 233,
        width: 350,
        maxHeight: { xs: 233, md: 167 },
        maxWidth: { xs: 350, md: 250 },
      }}
      alt="Background"
      src="https://github.com/PenTest-duck/sxsw-hackathon-2024/blob/main/frontend/public/download.png"
/>
        <Box align = 'center'>
        <Typography variant="h4" >Enter in your Product URL </Typography>
        <TextField id="outlined-basic" label="Product_URL" variant="outlined" align = 'center'/>
        <Typography variant="h4" >Enter in your Customer URL </Typography>
        <TextField id="outlined-basic" label="Customer_URL" variant="outlined" align = 'center'/>
        </Box>
        <div>
        <Box align = 'center' letterSpacing={(6)}>
        <Button variant="contained">Submit</Button>
        </Box>
        </div>
      </ThemeProvider>
      </Stack>
    );
  }

export default MainPage;