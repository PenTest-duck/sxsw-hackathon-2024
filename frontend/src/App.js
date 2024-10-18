import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import logo from './logo.svg';
import './App.css';
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import MainPage from "./MainPage";
import Search from "./search";

const theme = createTheme({
    palette: {
      background: {
        default: "#b8f3fc"
      }
    }
  });
  
  function App() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>

          <Routes>
            <Route path="/" element={<MainPage />} />
            
          </Routes>
        </BrowserRouter>
      </ThemeProvider> 
    );
  }
  
  export default App;