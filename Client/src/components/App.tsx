import { Add as AddIcon } from "@mui/icons-material";
import {
    Box,
    Button,
    Container,
    Divider,
    Paper,
    Typography,
} from "@mui/material";
import React, { FunctionComponent, ReactElement, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import NavBar from "./NavBar";

type ContextType = {
    setPageTitle(title: string): React.Dispatch<React.SetStateAction<string>>;
    setFooter(
        footer: FunctionComponent
    ): React.Dispatch<React.SetStateAction<FunctionComponent>>;
};

const App: React.FC = () => {
    const [pageTitle, setPageTitle] = useState<string>("");
    const [Footer, setFooter] = useState<FunctionComponent>(DefaultFooter);
    return (
        <Box
            sx={{
                color: "text.onDefault",
            }}
        >
            <NavBar />
            <Paper
                sx={{
                    my: 3,
                    mx: "auto",
                    minHeight: "700px",
                    width: "80vw",
                    display: "flex",
                    flexDirection: "column",
                    color: "text.onDefault",
                }}
                elevation={2}
            >
                <Typography
                    variant="h3"
                    sx={{ pt: 1 }}
                    textAlign="center"
                    minHeight="80px"
                >
                    {pageTitle}

                    <Divider />
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        minHeight: "600px",
                    }}
                >
                    <Paper
                        sx={{
                            mt: 2,
                            mx: 2,
                            width: "auto",
                            backgroundColor: "foreground.default",
                        }}
                        elevation={3}
                    >
                        <Outlet context={{ setPageTitle, setFooter }} />
                    </Paper>
                    <Box
                        height="60px"
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-around"
                    >
                        <>
                            <Divider />
                            {Footer}
                        </>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default App;

export function useAppContext() {
    return useOutletContext<ContextType>();
}

const DefaultFooter: React.FC = () => {
    return <></>;
};
