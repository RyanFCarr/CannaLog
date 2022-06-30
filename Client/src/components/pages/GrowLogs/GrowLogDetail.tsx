import { Box, Button, TextField, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEffectOnce } from "../../../hooks/useEffectOnce";
import GrowLog from "../../../models/GrowLog";
import { toShortDate } from "../../../util/functions";
import { useAppContext } from "../App";
import MultiSelectChip from "../../custom/MultiSelectChip";
import NutrientStepper from "../../custom/NutrientStepper";
import { AdditiveDto } from "../../../models/Additive";

enum ViewMode {
    VIEW = "View",
    ADD = "Add",
    EDIT = "Edit",
}

enum TextVariants {
    FILLED = "filled",
    STANDARD = "standard",
    OUTLINED = "outlined",
}

const Additives: AdditiveDto[] = [
    { id: 1, brand: "General Hydroponics", name: "Micro" },
    { id: 2, brand: "General Hydroponics", name: "Bloom" },
    { id: 3, brand: "General Hydroponics", name: "CaliMag" },
];

const GrowLogDetail: React.FC = () => {
    const { plantId, growLogId } = useParams();

    const [viewMode, setViewMode] = useState<string>(
        growLogId ? ViewMode.VIEW : ViewMode.ADD
    );
    const [editModeLog, setEditModeLog] = useState<GrowLog>(new GrowLog());
    const [OGLog, setOGLog] = useState<GrowLog>(new GrowLog());
    const { setPageTitle, setFooter } = useAppContext();

    useEffectOnce(() => {
        const getGrowLog = async () => {
            if (!growLogId) return;
            try {
                const res = await fetch(
                    `https://localhost:7247/plants/${plantId}/growlog/${growLogId}`
                );
                if (!res.ok) {
                    console.log(res.status, res.statusText);
                } else {
                    const log: GrowLog = await res.json();
                    setEditModeLog(log);
                    setOGLog(log);
                }
            } catch (e: any) {
                console.log(JSON.stringify(e));
            }
        };
        setPageTitle(`${viewMode} Grow Log`);
        setFooter(Footer);
        getGrowLog();
    }, []);

    useEffect(() => {
        setPageTitle(`${viewMode} Grow Log`);
        setFooter(Footer);
    }, [viewMode]);

    const setTags = (tags: string[]) => {
        setEditModeLog({
            ...editModeLog,
            tags: tags.join(","),
        });
    };

    const add = async () => {
        try {
            // const res = await fetch("https://localhost:7247/GrowLog", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(editModeLog),
            // });

            // if (!res.ok) {
            //     console.log(res.status, res.statusText);
            // } else {
            //     const data: GrowLog = await res.json();
            //     navigate(`/plants/${plantId}/growlogs/${data.id}`);
            // }
            console.table(editModeLog);
        } catch (e: any) {
            console.log(JSON.stringify(e));
        }
    };
    const update = async () => {
        // try {
        //     const res = await fetch(
        //         `https://localhost:7247/GrowLog/${editModeLog.id}`,
        //         {
        //             method: "PUT",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //             body: JSON.stringify(editModeLog),
        //         }
        //     );
        //     if (!res.ok) {
        //         console.log(res.status, res.statusText);
        //     } else {
        //         const data: GrowLog = await res.json();
        //         navigate(`/plants/${plantId}/growlogs/${data.id}`);
        //     }
        // } catch (e: any) {
        //     console.log(JSON.stringify(e));
        // }
        console.table(editModeLog);
    };
    const handleSubmit = () => {
        if (viewMode === ViewMode.VIEW) {
            setViewMode(ViewMode.EDIT);
        } else if (viewMode === ViewMode.ADD) {
            add();
            setViewMode(ViewMode.VIEW);
        } else {
            update();
            setViewMode(ViewMode.VIEW);
        }
    };
    const handleEditDiscard = () => {
        setViewMode(ViewMode.VIEW);
        setEditModeLog(OGLog);
    };

    let textFieldProps: {
        variant: TextVariants;
        disabled?: boolean;
        InputLabelProps?: { shrink: boolean };
    };
    let dateFieldProps: {
        variant: TextVariants;
        disabled?: boolean;
        InputLabelProps?: { shrink: boolean };
    };
    if (viewMode === ViewMode.VIEW) {
        textFieldProps = {
            variant: TextVariants.STANDARD,
            disabled: true,
            InputLabelProps: { shrink: true },
        };
        dateFieldProps = {
            variant: TextVariants.STANDARD,
            disabled: true,
            InputLabelProps: { shrink: true },
        };
    } else {
        textFieldProps = {
            variant: TextVariants.OUTLINED,
        };
        dateFieldProps = {
            variant: TextVariants.OUTLINED,
            InputLabelProps: { shrink: true },
        };
    }

    const Footer: React.FC = () => {
        return (
            <Box
                display="flex"
                justifyContent="space-around"
                sx={{ mt: 1.5, mb: 2 }}
            >
                {viewMode === ViewMode.ADD && (
                    <Button
                        variant="contained"
                        color="error"
                        href={`/plants/${plantId}/growlogs`}
                    >
                        Discard
                    </Button>
                )}
                {viewMode === ViewMode.EDIT && (
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleEditDiscard}
                    >
                        Discard
                    </Button>
                )}

                <Button
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                >
                    {viewMode === ViewMode.VIEW ? "Edit" : "Save"}
                </Button>
                {(viewMode === ViewMode.EDIT || viewMode === ViewMode.ADD) && (
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            // Open Nutrient Stepper
                        }}
                    >
                        Add Additives
                    </Button>
                )}
            </Box>
        );
    };

    return (
        <Box
            sx={{
                margin: 1,
            }}
        >
            <NutrientStepper
                initialPPM={editModeLog.initialPPM}
                initialPH={editModeLog.initialPH}
                additives={Additives}
            />
            <Typography variant="h3">{editModeLog.plantName}</Typography>
            <Typography variant="h6">{editModeLog.plantAge} days</Typography>
            <TextField
                label="Log Date"
                {...dateFieldProps}
                value={editModeLog.logDate.substring(0, 10) || ""}
                type="date"
                onChange={(e) => {
                    if (e.currentTarget.value) {
                        setEditModeLog({
                            ...editModeLog,
                            logDate: toShortDate(e.currentTarget.value)!,
                        });
                    } else {
                        // VALIDATION
                    }
                }}
            />
            <TextField
                label="Initial PH"
                {...textFieldProps}
                value={editModeLog.initialPH}
                type="number"
                inputProps={{ step: 0.1 }}
                onChange={(e) => {
                    setEditModeLog({
                        ...editModeLog,
                        initialPH: Number.parseFloat(e.currentTarget.value),
                    });
                }}
            />
            <TextField
                label="Initial PPM"
                {...textFieldProps}
                value={editModeLog.initialPPM}
                type="number"
                inputProps={{ step: 1 }}
                onChange={(e) => {
                    if (!e.currentTarget.value) return;
                    setEditModeLog({
                        ...editModeLog,
                        initialPPM: Number.parseInt(e.currentTarget.value),
                    });
                }}
            />
            <TextField
                label="Final PH"
                {...textFieldProps}
                value={editModeLog.finalPH}
                type="number"
                inputProps={{ step: 0.1 }}
                onChange={(e) => {
                    setEditModeLog({
                        ...editModeLog,
                        finalPH: Number.parseFloat(e.currentTarget.value),
                    });
                }}
            />
            <TextField
                label="Final PPM"
                {...textFieldProps}
                value={editModeLog.finalPPM}
                type="number"
                inputProps={{ step: 1 }}
                onChange={(e) => {
                    setEditModeLog({
                        ...editModeLog,
                        finalPPM: Number.parseInt(e.currentTarget.value),
                    });
                }}
            />
            <TextField
                label="Light Height"
                {...textFieldProps}
                value={editModeLog.lightHeight}
                type="number"
                inputProps={{ step: 1 }}
                onChange={(e) => {
                    let lightHeight: number | undefined;
                    if (!e.currentTarget.value) {
                        lightHeight = undefined;
                    } else {
                        lightHeight = Number.parseInt(e.currentTarget.value);
                    }
                    setEditModeLog({
                        ...editModeLog,
                        lightHeight,
                    });
                }}
            />
            <TextField
                label="Plant Height"
                {...textFieldProps}
                value={editModeLog.plantHeight}
                type="number"
                inputProps={{ step: 1 }}
                onChange={(e) => {
                    let plantHeight: number | undefined;
                    if (!e.currentTarget.value) {
                        plantHeight = undefined;
                    } else {
                        plantHeight = Number.parseInt(e.currentTarget.value);
                    }
                    setEditModeLog({
                        ...editModeLog,
                        plantHeight,
                    });
                }}
            />
            <TextField
                label="Air Temperature"
                {...textFieldProps}
                value={editModeLog.airTemperature}
                type="number"
                inputProps={{ step: 0.1 }}
                onChange={(e) => {
                    let airTemperature: number | undefined;
                    if (!e.currentTarget.value) {
                        airTemperature = undefined;
                    } else {
                        airTemperature = Number.parseInt(e.currentTarget.value);
                    }
                    setEditModeLog({
                        ...editModeLog,
                        airTemperature,
                    });
                }}
            />
            <TextField
                label="Humidity"
                {...textFieldProps}
                value={editModeLog.humidity}
                type="number"
                inputProps={{ step: 0.1 }}
                onChange={(e) => {
                    let humidity: number | undefined;
                    if (!e.currentTarget.value) {
                        humidity = undefined;
                    } else {
                        humidity = Number.parseInt(e.currentTarget.value);
                    }
                    setEditModeLog({
                        ...editModeLog,
                        humidity,
                    });
                }}
            />
            <TextField
                label="Grow Medium Temperature"
                {...textFieldProps}
                value={editModeLog.growMediumTemperature}
                type="number"
                inputProps={{ step: 0.1 }}
                onChange={(e) => {
                    let growMediumTemperature: number | undefined;
                    if (!e.currentTarget.value) {
                        growMediumTemperature = undefined;
                    } else {
                        growMediumTemperature = Number.parseInt(
                            e.currentTarget.value
                        );
                    }
                    setEditModeLog({
                        ...editModeLog,
                        growMediumTemperature,
                    });
                }}
            />
            <TextField
                label="Notes"
                {...textFieldProps}
                value={editModeLog.notes}
                type="text"
                multiline
                minRows={2}
                maxRows={5}
                onChange={(e) => {
                    setEditModeLog({
                        ...editModeLog,
                        notes: e.currentTarget.value,
                    });
                }}
            />
            <MultiSelectChip
                label="Tags"
                chips={["Res Change", "Flush"]}
                setSelected={setTags}
            />
        </Box>
    );
};

export default GrowLogDetail;
