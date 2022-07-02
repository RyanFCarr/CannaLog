import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BasePage from "./components/pages/BasePage";
import Home from "./components/pages/Home";
import PlantList from "./components/pages/Plants/PlantList";
import "./index.css";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#7289da",
        },
        foreground: {
            default: "#4C566A",
        },
        background: {
            default: "#2E3440",
            paper: "#2E3440",
            onDefault: "#3B4252",
        },
        text: {
            onDefault: "#D8DEE9",
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route index element={<BasePage title="Welcome" Body={<Home />} Footer={<></>} />} />
                    <Route path="plants/*" element={<PlantList />} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    </ThemeProvider>
);
