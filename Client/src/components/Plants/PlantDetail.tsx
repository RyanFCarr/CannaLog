import { Autocomplete, Button, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffectOnce } from "../../hooks/useEffectOnce";
import { useQuery } from "../../hooks/useQuery";
import { format, parseISO } from "date-fns";
import Plant from "../../models/Plant";
import { trimToUndefined } from "../../util/functions";

/**
 * TODO
 * 
 * View mode archive
 * Hide them by default on main list
 * Include new tab/checkbox/something to show them
 * 
 * Fix the trimming
 *  Trim in handleSubmit instead of onChange
 *  Maybe make it a validate method
 */



//#region Enums
enum ViewMode {
    VIEW = "View",
    ADD = "Add",
    EDIT = "Edit"
}

enum TextVariants {
    FILLED = 'filled',
    STANDARD = 'standard',
    OUTLINED = 'outlined'
}
//#endregion

const autoFlowerSched = ["(18/6)", "(20/4)"];
const photoperiodSched = ["Veg (18/6)", "Bloom (12/12)"];

const PlantDetail: React.FC = () => {
    const query = useQuery();
    const id = query.get("id");
    const navigate = useNavigate();

// #region State
    const [viewMode, setViewMode] = useState<string>(id ? ViewMode.VIEW : ViewMode.ADD);
    const [editModePlant, setEditModePlant] = useState<Plant>(new Plant());
    const [OGPlant, setOGPlant] = useState<Plant>(new Plant());
    const [open, toggleOpen] = useState(false);
    const [addNutesDialog, setAddNutesDialog] = useState<string>();
    const [lightingSchedOptions, setLightingSchedOptions] = useState<string[]>([""]);
// #endregion
// #region Dialog methods
    const handleClose = () => {
        setAddNutesDialog('');
        toggleOpen(false);
    };
    const handleSubmitDialog = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setEditModePlant({...editModePlant, baseNutrientsBrand: addNutesDialog})
        handleClose();
    };
// #endregion 

    const add = async () => {
        const res = await fetch("https://localhost:7247/Plant", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editModePlant)
        })
        if (!res.ok) {
            console.log(res.status, res.statusText);
        } else {
            const data: Plant = await res.json();
            navigate(`/?id=${data.id}`);
        }
    }
    const update = async () => {
        try {
            const res = await fetch(`https://localhost:7247/Plant/${editModePlant.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editModePlant)
            })
            if (!res.ok) {
                console.log(res.status, res.statusText);
            } else {
                const data: Plant = await res.json();
                navigate(`/plant?id=${data.id}`);
            }
        } catch (e: any) {
            console.log(JSON.stringify(e));
        }
    }
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
    }
    const handleEditDiscard = () => {
        setViewMode(ViewMode.VIEW);
        setEditModePlant(OGPlant);
        setDefaultLightingSchedule(OGPlant);
    }
    const setDefaultLightingSchedule = (plant: Plant) => {
        if (plant.growType === "Autoflower")
            setLightingSchedOptions(autoFlowerSched);
        if (plant.growType === "Photoperiod")
            setLightingSchedOptions(photoperiodSched);
    }

    useEffectOnce(() => {
        const getPlant = async () => {
            if (!id) return;
            try {
                const res = await fetch(`https://localhost:7247/Plant/${id}`);
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

    let textFieldProps: {
        variant: TextVariants,
        disabled?: boolean,
        InputLabelProps?: {shrink: boolean}
    };
    let dateFieldProps: {
        variant: TextVariants,
        disabled?: boolean,
        InputLabelProps?: {shrink: boolean}
    };
    if (viewMode === ViewMode.VIEW) {
        textFieldProps = {
            variant: TextVariants.STANDARD,
            disabled: true,
            InputLabelProps: {shrink: true}
        };
        dateFieldProps = {
            variant: TextVariants.STANDARD,
            disabled: true,
            InputLabelProps: {shrink: true}
        }
    } else {
        textFieldProps = {
            variant: TextVariants.OUTLINED
        };
        dateFieldProps = {
            variant: TextVariants.OUTLINED,
            InputLabelProps: {shrink: true}
        };
    }

    return (
        <>
            <Container maxWidth="sm" style={{backgroundColor: "grey"}}>
                <Typography variant="h1">
                    {viewMode} Plant
                </Typography>
                <TextField label="Name" {...textFieldProps} value={editModePlant?.name || ""} onChange={e => setEditModePlant({...editModePlant, name: trimToUndefined(e.currentTarget.value)})}/>
                <TextField label="Strain" {...textFieldProps} value={editModePlant?.strain || ""} onChange={e => setEditModePlant({...editModePlant, strain: trimToUndefined(e.currentTarget.value)})}/>
                <TextField label="Breeder" {...textFieldProps} value={editModePlant?.breeder || ""} onChange={e => setEditModePlant({...editModePlant, breeder: trimToUndefined(e.currentTarget.value)})}/>
                <Autocomplete
                    options={["Add new", "General Hydroponics", "Advanced Nutrients"]}
                    renderInput={(params) => <TextField {...params} label="Base Nutrients Brand" {...textFieldProps} />}
                    value={editModePlant?.baseNutrientsBrand || ""}
                    inputValue={editModePlant?.baseNutrientsBrand || ""}
                    onChange={(event, newValue) => {
                        if (newValue === 'Add new') {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            toggleOpen(true);
                            setAddNutesDialog(newValue);
                        });
                        } else {
                            setEditModePlant({...editModePlant, baseNutrientsBrand: newValue || undefined})
                        }
                    }}
                    onInputChange={(event, newInputValue) => {
                        // Required for the Autocomplete to be considered "controlled"
                    }}
                    selectOnFocus clearOnBlur handleHomeEndKeys freeSolo
                />
                <Autocomplete
                    options={["Autoflower", "Photoperiod"]}
                    renderInput={(params) => <TextField {...params} label="Grow Type" {...textFieldProps} />}
                    value={editModePlant?.growType || ""}
                    inputValue={editModePlant?.growType || ""}
                    onChange={(event, newValue) => {
                        setEditModePlant({...editModePlant, growType: newValue || undefined});
                        if (newValue === "Autoflower") {
                            setLightingSchedOptions(autoFlowerSched);
                        }else if (newValue === "Photoperiod") {
                            setLightingSchedOptions(photoperiodSched);
                        } else {
                            setLightingSchedOptions([""]);
                        }
                    }}
                    onInputChange={(event, newInputValue) => {
                        // Required for the Autocomplete to be considered "controlled"
                    }}
                    selectOnFocus clearOnBlur handleHomeEndKeys freeSolo
                />
                <Autocomplete
                    options={["LED", "HPS"]}
                    renderInput={(params) => <TextField {...params} label="Lighting Type" {...textFieldProps} />}
                    value={editModePlant?.lightingType || ""}
                    inputValue={editModePlant?.lightingType || ""}
                    onChange={(event, newValue) => {
                        setEditModePlant({...editModePlant, lightingType: newValue || undefined})
                    }}
                    onInputChange={(event, newInputValue) => {
                        // Required for the Autocomplete to be considered "controlled"
                    }}
                    selectOnFocus clearOnBlur handleHomeEndKeys freeSolo
                />
                <Autocomplete
                    options={lightingSchedOptions}
                    renderInput={(params) => <TextField {...params} label="Lighting Schedule" helperText={lightingSchedOptions[0] === "" ? "Choose a Grow Type" : ""} {...textFieldProps} />}
                    value={editModePlant?.lightingSchedule || ""}
                    inputValue={editModePlant?.lightingSchedule || ""}
                    onChange={(event, newValue) => {
                        setEditModePlant({...editModePlant, lightingSchedule: newValue || undefined})
                    }}
                    onInputChange={(event, newInputValue) => {
                        // Required for the Autocomplete to be considered "controlled"
                    }}
                    selectOnFocus clearOnBlur handleHomeEndKeys freeSolo
                />
                <Autocomplete
                    options={["Hydro", "Coco", "Soil"]}
                    renderInput={(params) => <TextField {...params} label="Grow Medium" {...textFieldProps} />}
                    value={editModePlant?.growMedium || ""}
                    inputValue={editModePlant?.growMedium || ""}
                    onChange={(event, newValue) => {
                        setEditModePlant({...editModePlant, growMedium: newValue || undefined})
                    }}
                    onInputChange={(event, newInputValue) => {
                        // Required for the Autocomplete to be considered "controlled"
                    }}
                    selectOnFocus clearOnBlur handleHomeEndKeys freeSolo
                />
                
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked {...textFieldProps} aria-label="Is Feminized" value={editModePlant?.isFeminized} onChange={e => setEditModePlant({...editModePlant, isFeminized: e.currentTarget.checked})}/>} label="Is Feminized" />
                </FormGroup>
                <TextField label="Target PH" {...textFieldProps} value={editModePlant?.targetPH || 6} type="number" inputProps={{step: 0.1}} onChange={e => setEditModePlant({...editModePlant, targetPH: Number(e.currentTarget.value)})}/>
                <TextField label="Transplant Date" {...dateFieldProps} value={editModePlant?.transplantDate?.substring(0, 10) || ""} type="date" onChange={e => setEditModePlant({...editModePlant, transplantDate: format(parseISO(e.currentTarget.value), 'yyyy-MM-dd')})}/>
                <TextField label="Harvest Date" {...dateFieldProps} value={editModePlant?.harvestDate?.substring(0, 10) || ""} type="date" onChange={e => setEditModePlant({...editModePlant, harvestDate: format(parseISO(e.currentTarget.value), 'yyyy-MM-dd')})}/>

                <Autocomplete
                    options={["Seed", "Active", "Terminated"]}
                    renderInput={(params) => <TextField {...params} label="Status" {...textFieldProps} />}
                    value={editModePlant?.status || ""}
                    inputValue={editModePlant?.status || ""}
                    onChange={(event, newValue) => {
                        setEditModePlant({...editModePlant, status: newValue || undefined, terminationReason: newValue !== "Terminated" ? undefined : editModePlant.terminationReason})
                    }}
                    onInputChange={(event, newInputValue) => {
                        // Required for the Autocomplete to be considered "controlled"
                    }}
                    selectOnFocus clearOnBlur handleHomeEndKeys freeSolo
                />
                {editModePlant.status === "Terminated" && <TextField label="Termination Reason" {...textFieldProps} value={editModePlant.terminationReason || ""} onChange={e => setEditModePlant({...editModePlant, terminationReason: trimToUndefined(e.currentTarget.value)})} />}

                {viewMode === ViewMode.ADD && <Button variant="contained" color="error" href="/plants">Discard</Button>}
                {viewMode === ViewMode.EDIT && <Button variant="contained" color="error" onClick={handleEditDiscard}>Discard</Button>}
                
                <Button variant="contained" color="success" onClick={handleSubmit}>{viewMode === ViewMode.VIEW ? "Edit" : "Save"}</Button>
            </Container>
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
        </>
    )
    
}

export default PlantDetail;
