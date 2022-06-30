import {
    Autocomplete,
    Box,
    Button,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { ChangeEvent, useEffect, useState } from "react";
import { AdditiveDosageDto } from "../../models/AdditiveDosage";
import MobileStepper from "./MobileStepper";
import { AdditiveDto } from "../../models/Additive";

interface NutrientStepperProps {
    initialPH: number;
    initialPPM: number;
    additives: AdditiveDto[];
}

const NutrientStepper: React.FC<NutrientStepperProps> = ({
    initialPPM,
    initialPH,
    additives,
}) => {
    const [label, setLabel] = useState<string>("");
    const [activeStep, setActiveStep] = useState<number>(0);

    useEffect(() => {
        if (activeStep === 0) setLabel("Add Nutrients");
        if (activeStep === 1) setLabel("Adjust PH");
    }, [activeStep]);

    return (
        <MobileStepper
            label={label}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            maxSteps={2}
        >
            {activeStep === 0 && (
                <AddNutrients initialPPM={initialPPM} additives={additives} />
            )}
            {activeStep === 1 && <AdjustPH initialPH={initialPH} />}
        </MobileStepper>
    );
};

const AddNutrients: React.FC<{
    initialPPM: number;
    additives: AdditiveDto[];
}> = ({
    initialPPM,
    additives,
}: {
    initialPPM: number;
    additives: AdditiveDto[];
}) => {
    const [finalPPM, setFinalPPM] = useState<number | undefined>(initialPPM);
    const [dosages, setDosages] = useState<AdditiveDosageDto[] | undefined>();

    const handleAddAdditive = () => {
        if (dosages) {
            setDosages([...dosages, new AdditiveDosageDto()]);
        } else {
            setDosages([new AdditiveDosageDto()]);
        }
    };

    const handleDosageAmount = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        i: number
    ): void => {
        if (!dosages) return;

        dosages[i] = {
            ...dosages[i],
            amount: e.currentTarget.value
                ? Number.parseFloat(e.currentTarget.value)
                : undefined,
        };
        setDosages([...dosages]);
    };

    const handleAdditiveChange = (name: string, i: number) => {
        if (!dosages) return;
        dosages[i].additive = additives.filter((a) => a.name === name)[0];
        setDosages([...dosages]);
    };

    return (
        <>
            <TableContainer component={Paper} sx={{ mb: 3 }}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Additive</TableCell>
                            <TableCell align="right">Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dosages &&
                            dosages.map((dosage, i) => (
                                <TableRow
                                    key={i}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {!dosage.additive?.name && (
                                            <Autocomplete
                                                options={additives.map(
                                                    (a) => a.name
                                                )}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Additive"
                                                        variant="standard"
                                                    />
                                                )}
                                                value={
                                                    dosage.additive?.name || ""
                                                }
                                                inputValue={
                                                    dosage.additive?.name || ""
                                                }
                                                onChange={(event, newValue) => {
                                                    if (newValue) {
                                                        handleAdditiveChange(
                                                            newValue,
                                                            i
                                                        );
                                                    } else {
                                                        dosage.additive =
                                                            undefined;
                                                    }
                                                }}
                                                onInputChange={(
                                                    event,
                                                    newInputValue
                                                ) => {
                                                    // Required for the Autocomplete to be considered "controlled"
                                                }}
                                                selectOnFocus
                                                clearOnBlur
                                                handleHomeEndKeys
                                                freeSolo
                                            />
                                        )}
                                        {dosage.additive?.name &&
                                            dosage.additive.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        <TextField
                                            label="Amount"
                                            variant="standard"
                                            value={dosage.amount || ""}
                                            type="number"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        {dosage.unitofMeasure}
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{ width: "80px" }}
                                            onChange={(e) =>
                                                handleDosageAmount(e, i)
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        <TableRow>
                            <TableCell align="center" colSpan={2}>
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={handleAddAdditive}
                                >
                                    Add Additive
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display="flex">
                <TextField
                    label="Initial PPM"
                    variant="standard"
                    disabled
                    value={initialPPM}
                    type="number"
                    sx={{ mr: 3 }}
                />
                <TextField
                    label="Final PPM"
                    variant="standard"
                    value={finalPPM}
                    type="number"
                    onChange={(e) => {
                        setFinalPPM(
                            e.currentTarget.value
                                ? Number.parseFloat(e.currentTarget.value)
                                : undefined
                        );
                    }}
                />
            </Box>
        </>
    );
};

const AdjustPH: React.FC<{ initialPH: number }> = ({
    initialPH,
}: {
    initialPH: number;
}) => {
    return <>Adjust PH</>;
};

export default NutrientStepper;
