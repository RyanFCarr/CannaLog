import { Box, Divider, Paper, Typography } from "@mui/material";
import { ReactNode } from "react";
import NavBar from "../custom/NavBar";

interface BasePageProps {
    title: string,
    Body: ReactNode,
    Footer: ReactNode
}

const BasePage: React.FC<BasePageProps> = ({ title, Body, Footer }: BasePageProps) => {
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
                    {title}
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
                        {Body}
                    </Paper>
                    <Box
                        height="60px"
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-around"
                    >
                        <Divider />
                        {Footer}
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default BasePage;
