import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Stepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import CloseIcon from '@mui/icons-material/Close';

interface MobileStepperProps {
    label: string;
    maxSteps: number;
    activeStep: number;
    setActiveStep: React.Dispatch<React.SetStateAction<number>>;
    children: React.ReactNode;
    handleClose: () => void;
}

const MobileStepper: React.FC<MobileStepperProps> = ({
    label,
    maxSteps,
    activeStep,
    setActiveStep,
    children,
    handleClose,
}: MobileStepperProps) => {
    const theme = useTheme();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
            <Paper
                square
                elevation={0}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: 50,
                    px: 2,
                    bgcolor: "background.default",
                    color: "text.onDefault"
                }}
            >
                <div></div>
                <Typography>{label}</Typography>
                <CloseIcon onClick={handleClose} />
            </Paper>
            <Box sx={{ maxWidth: 400, width: "100%", p: 2 }}>{children}</Box>
            <Stepper
                sx={{ color: "text.onDefault" }}
                variant="text"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Next
                        {theme.direction === "rtl" ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                    >
                        {theme.direction === "rtl" ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
        </Box>
    );
};

export default MobileStepper;
