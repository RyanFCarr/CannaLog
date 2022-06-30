import { Box, Divider, Paper, Typography } from "@mui/material";
import React, { FunctionComponent, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import NavBar from "../custom/NavBar";

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
                    my: 1,
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
                    sx={{ mt: 1 }}
                    textAlign="center"
                    minHeight="70px"
                >
                    {pageTitle}
                </Typography>
                <Divider />
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
                            m: 2,
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

/**
 * Several issues with how we handle this footer, but it works.
 * We cannot style it directly from the App level, we can style
 * the components around it and we can style it on the child component.
 * This makes generic styling for all footers a little difficult.
 * The Fragment it is in is required.
 * Vertical centering is the ideal, but I can't find a way to do it.
 * Got close, but applying flex:1 to a parent element to make it grow to fill
 * makes the button grow as well. Which is dumb since the flex property is on the parent, not the button.
 * Currently using different margins on the child componenets to get close enough to centered.
 */
const DefaultFooter: React.FC = () => {
    return <></>;
};
