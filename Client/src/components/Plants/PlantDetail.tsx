import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    SxProps,
    TextField,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useEffectOnce } from "../../hooks/useEffectOnce";
import Plant from "../../models/Plant";
import { toShortDate, trimToUndefined } from "../../util/functions";
import GrowLogList from "../Logs/GrowLogList";
import { useAppContext } from "../App";

//#region Enums
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
//#endregion

const autoFlowerSched = ["(18/6)", "(20/4)"];
const photoperiodSched = ["Veg (18/6)", "Bloom (12/12)"];

const Layout: React.FC = () => {
    return (
        <>
            <Routes>
                <Route index element={<PlantDetail />} />
                <Route path="growLogs/*" element={<GrowLogList />} />
            </Routes>
        </>
    );
};

const PlantDetail: React.FC = () => {
    const { plantId } = useParams();
    const navigate = useNavigate();

    // #region State
    const [viewMode, setViewMode] = useState<string>(
        plantId ? ViewMode.VIEW : ViewMode.ADD
    );
    const [editModePlant, setEditModePlant] = useState<Plant>(new Plant());
    const [OGPlant, setOGPlant] = useState<Plant>(new Plant());
    const [open, toggleOpen] = useState(false);
    const [addNutesDialog, setAddNutesDialog] = useState<string>();
    const [lightingSchedOptions, setLightingSchedOptions] = useState<string[]>([
        "",
    ]);
    const { setPageTitle, setFooter } = useAppContext();
    // #endregion
    // #region Dialog methods
    const handleClose = () => {
        setAddNutesDialog("");
        toggleOpen(false);
    };
    const handleSubmitDialog = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setEditModePlant({
            ...editModePlant,
            baseNutrientsBrand: addNutesDialog,
        });
        handleClose();
    };
    // #endregion

    const add = async () => {
        try {
            validateForm();
            const res = await fetch("https://localhost:7247/Plant", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editModePlant),
            });

            if (!res.ok) {
                console.log(res.status, res.statusText);
            } else {
                const data: Plant = await res.json();
                navigate(`/plants?id=${data.id}`);
            }
        } catch (e: any) {
            console.log(JSON.stringify(e));
        }
    };
    const update = async () => {
        try {
            validateForm();
            const res = await fetch(
                `https://localhost:7247/Plant/${editModePlant.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(editModePlant),
                }
            );
            if (!res.ok) {
                console.log(res.status, res.statusText);
            } else {
                const data: Plant = await res.json();
                navigate(`/plants?id=${data.id}`);
            }
        } catch (e: any) {
            console.log(JSON.stringify(e));
        }
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
        setEditModePlant(OGPlant);
        setDefaultLightingSchedule(OGPlant);
    };
    const setDefaultLightingSchedule = (plant: Plant) => {
        if (plant.growType === "Autoflower")
            setLightingSchedOptions(autoFlowerSched);
        if (plant.growType === "Photoperiod")
            setLightingSchedOptions(photoperiodSched);
    };
    const validateForm = () => {
        setEditModePlant({
            ...editModePlant,
            name: trimToUndefined(editModePlant.name),
            strain: trimToUndefined(editModePlant.strain),
            breeder: trimToUndefined(editModePlant.breeder),
            terminationReason: trimToUndefined(editModePlant.terminationReason),
        });
    };

    useEffectOnce(() => {
        const getPlant = async () => {
            if (!plantId) return;
            try {
                const res = await fetch(
                    `https://localhost:7247/Plant/${plantId}`
                );
                if (!res.ok) {
                    console.log(res.status, res.statusText);
                } else {
                    const plant: Plant = await res.json();
                    setEditModePlant(plant);
                    setOGPlant(plant);
                    setDefaultLightingSchedule(plant);
                }
            } catch (e: any) {
                console.log(JSON.stringify(e));
            }
        };
        getPlant();
    }, []);

    useEffect(() => {
        setPageTitle(`${viewMode} Plant`);
        setFooter(Footer);
    }, [viewMode]);

    let textFieldProps: {
        variant?: TextVariants;
        disabled?: boolean;
        InputLabelProps?: { shrink: boolean };
        sx?: SxProps;
    } = {
        sx: { mr: 2 },
    };
    let dateFieldProps: {
        variant?: TextVariants;
        disabled?: boolean;
        InputLabelProps?: { shrink: boolean };
        sx?: SxProps;
    } = {
        sx: { mr: 2 },
        InputLabelProps: { shrink: true },
    };
    if (viewMode === ViewMode.VIEW) {
        textFieldProps = {
            ...textFieldProps,
            variant: TextVariants.STANDARD,
            disabled: true,
            InputLabelProps: { shrink: true },
        };
        dateFieldProps = {
            ...dateFieldProps,
            variant: TextVariants.STANDARD,
            disabled: true,
        };
    } else {
        textFieldProps = {
            ...textFieldProps,
            variant: TextVariants.OUTLINED,
        };
        dateFieldProps = {
            ...dateFieldProps,
            variant: TextVariants.OUTLINED,
        };
    }

    const Footer: React.FC = () => {
        return (
            <Box display="flex" justifyContent="space-around">
                {viewMode === ViewMode.ADD && (
                    <Button variant="contained" color="error" href="/plants">
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
                {viewMode === ViewMode.VIEW && (
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() =>
                            navigate(`/plants/${editModePlant.id}/growLog`)
                        }
                    >
                        Add a Grow Log
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
            <TextField
                label="Name"
                {...textFieldProps}
                value={editModePlant?.name || ""}
                onChange={(e) =>
                    setEditModePlant({
                        ...editModePlant,
                        name: e.currentTarget.value,
                    })
                }
            />
            <TextField
                label="Strain"
                {...textFieldProps}
                value={editModePlant?.strain || ""}
                onChange={(e) =>
                    setEditModePlant({
                        ...editModePlant,
                        strain: e.currentTarget.value,
                    })
                }
            />
            <TextField
                label="Breeder"
                {...textFieldProps}
                value={editModePlant?.breeder || ""}
                onChange={(e) =>
                    setEditModePlant({
                        ...editModePlant,
                        breeder: e.currentTarget.value,
                    })
                }
            />
            <Autocomplete
                options={[
                    "Add new",
                    "General Hydroponics",
                    "Advanced Nutrients",
                ]}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Base Nutrients Brand"
                        {...textFieldProps}
                    />
                )}
                value={editModePlant?.baseNutrientsBrand || ""}
                inputValue={editModePlant?.baseNutrientsBrand || ""}
                onChange={(event, newValue) => {
                    if (newValue === "Add new") {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            toggleOpen(true);
                            setAddNutesDialog(newValue);
                        });
                    } else {
                        setEditModePlant({
                            ...editModePlant,
                            baseNutrientsBrand: newValue || undefined,
                        });
                    }
                }}
                onInputChange={(event, newInputValue) => {
                    // Required for the Autocomplete to be considered "controlled"
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                freeSolo
            />
            <Autocomplete
                options={["Autoflower", "Photoperiod"]}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Grow Type"
                        {...textFieldProps}
                    />
                )}
                value={editModePlant?.growType || ""}
                inputValue={editModePlant?.growType || ""}
                onChange={(event, newValue) => {
                    setEditModePlant({
                        ...editModePlant,
                        growType: newValue || undefined,
                    });
                    if (newValue === "Autoflower") {
                        setLightingSchedOptions(autoFlowerSched);
                    } else if (newValue === "Photoperiod") {
                        setLightingSchedOptions(photoperiodSched);
                    } else {
                        setLightingSchedOptions([""]);
                    }
                }}
                onInputChange={(event, newInputValue) => {
                    // Required for the Autocomplete to be considered "controlled"
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                freeSolo
            />
            <Autocomplete
                options={["LED", "HPS"]}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Lighting Type"
                        {...textFieldProps}
                    />
                )}
                value={editModePlant?.lightingType || ""}
                inputValue={editModePlant?.lightingType || ""}
                onChange={(event, newValue) => {
                    setEditModePlant({
                        ...editModePlant,
                        lightingType: newValue || undefined,
                    });
                }}
                onInputChange={(event, newInputValue) => {
                    // Required for the Autocomplete to be considered "controlled"
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                freeSolo
            />
            <Autocomplete
                options={lightingSchedOptions}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Lighting Schedule"
                        helperText={
                            lightingSchedOptions[0] === ""
                                ? "Choose a Grow Type"
                                : ""
                        }
                        {...textFieldProps}
                    />
                )}
                value={editModePlant?.lightingSchedule || ""}
                inputValue={editModePlant?.lightingSchedule || ""}
                onChange={(event, newValue) => {
                    setEditModePlant({
                        ...editModePlant,
                        lightingSchedule: newValue || undefined,
                    });
                }}
                onInputChange={(event, newInputValue) => {
                    // Required for the Autocomplete to be considered "controlled"
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                freeSolo
            />
            <Autocomplete
                options={["Hydro", "Coco", "Soil"]}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Grow Medium"
                        {...textFieldProps}
                    />
                )}
                value={editModePlant?.growMedium || ""}
                inputValue={editModePlant?.growMedium || ""}
                onChange={(event, newValue) => {
                    setEditModePlant({
                        ...editModePlant,
                        growMedium: newValue || undefined,
                    });
                }}
                onInputChange={(event, newInputValue) => {
                    // Required for the Autocomplete to be considered "controlled"
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                freeSolo
            />

            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            defaultChecked
                            {...textFieldProps}
                            aria-label="Is Feminized"
                            value={editModePlant?.isFeminized}
                            onChange={(e) =>
                                setEditModePlant({
                                    ...editModePlant,
                                    isFeminized: e.currentTarget.checked,
                                })
                            }
                        />
                    }
                    label="Is Feminized"
                />
            </FormGroup>
            <TextField
                label="Target PH"
                {...textFieldProps}
                value={editModePlant?.targetPH || 6}
                type="number"
                inputProps={{ step: 0.1 }}
                onChange={(e) =>
                    setEditModePlant({
                        ...editModePlant,
                        targetPH: Number(e.currentTarget.value),
                    })
                }
            />
            <TextField
                label="Transplant Date"
                {...dateFieldProps}
                value={editModePlant?.transplantDate?.substring(0, 10) || ""}
                type="date"
                onChange={(e) =>
                    setEditModePlant({
                        ...editModePlant,
                        transplantDate: toShortDate(e.currentTarget.value),
                    })
                }
            />
            <TextField
                label="Harvest Date"
                {...dateFieldProps}
                value={editModePlant?.harvestDate?.substring(0, 10) || ""}
                type="date"
                onChange={(e) =>
                    setEditModePlant({
                        ...editModePlant,
                        harvestDate: toShortDate(e.currentTarget.value),
                    })
                }
            />

            <Autocomplete
                options={["Seed", "Active", "Terminated"]}
                renderInput={(params) => (
                    <TextField {...params} label="Status" {...textFieldProps} />
                )}
                value={editModePlant?.status || ""}
                inputValue={editModePlant?.status || ""}
                onChange={(event, newValue) => {
                    setEditModePlant({
                        ...editModePlant,
                        status: newValue || undefined,
                        terminationReason:
                            newValue !== "Terminated"
                                ? undefined
                                : editModePlant.terminationReason,
                    });
                }}
                onInputChange={(event, newInputValue) => {
                    // Required for the Autocomplete to be considered "controlled"
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                freeSolo
            />
            {editModePlant.status === "Terminated" && (
                <TextField
                    label="Termination Reason"
                    {...textFieldProps}
                    value={editModePlant.terminationReason || ""}
                    onChange={(e) =>
                        setEditModePlant({
                            ...editModePlant,
                            terminationReason: e.currentTarget.value,
                        })
                    }
                />
            )}
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmitDialog}>
                    <DialogTitle>Add Base Nutrients</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Did you miss any Nutes in our list? Please, add it!
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={addNutesDialog}
                            onChange={(event) =>
                                setAddNutesDialog(event.target.value)
                            }
                            label="Base Nutrient Brand"
                            type="text"
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
};

export default Layout;
