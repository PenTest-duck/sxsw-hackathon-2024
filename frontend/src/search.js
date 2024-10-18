import { createTheme, TextField, ThemeProvider, Typography } from "@mui/material";
import React from "react";

const theme = createTheme({
    palette: {
      background: {
        default: "#b8f3fc"
      }
    }
  });
  
function Search() {
    return (
      <ThemeProvider theme={theme}>
        <Typography variant="h4" >Enter in your Product URL </Typography>
        <TextField id="outlined-basic" label="Product_URL" variant="outlined" />
        <Typography variant="h4" >Enter in your Customer URL </Typography>
        <TextField id="outlined-basic" label="Customer_URL" variant="outlined" />
      </ThemeProvider>
    );
  };

export default Search;