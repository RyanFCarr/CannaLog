import { Autocomplete, Button, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffectOnce } from "../../hooks/useEffectOnce";
import { useQuery } from "../../hooks/useQuery";
import { format, parseISO } from "date-fns";
import Plant from "../../models/Plant";

/**
 * Discard button on Add
 * navigate to main list (essentially back, if able to access from multiple screens)
 * 
 * Discard button on Edit
 * Need to be able to revert to saved data
 * Which means we need to track two models, the old and new
 * On save, POST the new via update method
 * On discard, reset new to old and change mode back to view
 * 
 * View mode retire/hide/soft delete
 * Decide on verbage
 * Create flag
 * Hide them by default on main list
 * Include new tab/checkbox/something to show them
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
    const [plant, setPlant] = useState<Plant>(new Plant());
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
        setPlant({...plant, baseNutrientsBrand: addNutesDialog})
        handleClose();
    };
// #endregion 

    const add = async () => {
        const res = await fetch("https://localhost:7247/Plant", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(plant)
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
            const res = await fetch(`https://localhost:7247/Plant/${plant.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(plant)
            })
            if (!res.ok) {
                console.log(res.status, res.statusText);
            } else {
                const data: Plant = await res.json();
                navigate(`/?id=${data.id}`);
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

    useEffectOnce(() => {
        const getPlant = async () => {
            if (!id) return;
            try {
                const res = await fetch(`https://localhost:7247/Plant/${id}`);
                if (!res.ok) {
                    console.log(res.status, res.statusText);
                } else {
                    const plant = await res.json();
                    setPlant(plant);
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
                <TextField label="Name" {...textFieldProps} value={plant?.name || ""} onChange={e => setPlant({...plant, name: e.currentTarget.value})}/>
                <TextField label="Strain" {...textFieldProps} value={plant?.strain || ""} onChange={e => setPlant({...plant, strain: e.currentTarget.value})}/>
                <TextField label="Breeder" {...textFieldProps} value={plant?.breeder || ""} onChange={e => setPlant({...plant, breeder: e.currentTarget.value})}/>
                <Autocomplete
                    options={["Add new", "General Hydroponics", "Advanced Nutrients"]}
                    renderInput={(params) => <TextField {...params} label="Base Nutrients Brand" {...textFieldProps} />}
                    value={plant?.baseNutrientsBrand || ""}
                    inputValue={plant?.baseNutrientsBrand || ""}
                    onChange={(event, newValue) => {
                        if (newValue === 'Add new') {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            toggleOpen(true);
                            setAddNutesDialog(newValue);
                        });
                        } else {
                            setPlant({...plant, baseNutrientsBrand: newValue || undefined})
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
                    value={plant?.growType || ""}
                    inputValue={plant?.growType || ""}
                    onChange={(event, newValue) => {
                        setPlant({...plant, growType: newValue || undefined});
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
                    value={plant?.lightingType || ""}
                    inputValue={plant?.lightingType || ""}
                    onChange={(event, newValue) => {
                        setPlant({...plant, lightingType: newValue || undefined})
                    }}
                    onInputChange={(event, newInputValue) => {
                        // Required for the Autocomplete to be considered "controlled"
                    }}
                    selectOnFocus clearOnBlur handleHomeEndKeys freeSolo
                />
                <Autocomplete
                    options={lightingSchedOptions}
                    renderInput={(params) => <TextField {...params} label="Lighting Schedule" helperText={lightingSchedOptions[0] === "" ? "Choose a Grow Type" : ""} {...textFieldProps} />}
                    value={plant?.lightingSchedule || ""}
                    inputValue={plant?.lightingSchedule || ""}
                    onChange={(event, newValue) => {
                        setPlant({...plant, lightingSchedule: newValue || undefined})
                    }}
                    onInputChange={(event, newInputValue) => {
                        // Required for the Autocomplete to be considered "controlled"
                    }}
                    selectOnFocus clearOnBlur handleHomeEndKeys freeSolo
                />
                <Autocomplete
                    options={["Hydro", "Coco", "Soil"]}
                    renderInput={(params) => <TextField {...params} label="Grow Medium" {...textFieldProps} />}
                    value={plant?.growMedium || ""}
                    inputValue={plant?.growMedium || ""}
                    onChange={(event, newValue) => {
                        setPlant({...plant, growMedium: newValue || undefined})
                    }}
                    onInputChange={(event, newInputValue) => {
                        // Required for the Autocomplete to be considered "controlled"
                    }}
                    selectOnFocus clearOnBlur handleHomeEndKeys freeSolo
                />
                
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked {...textFieldProps} aria-label="Is Feminized" value={plant?.isFeminized} onChange={e => setPlant({...plant, isFeminized: e.currentTarget.checked})}/>} label="Is Feminized" />
                </FormGroup>
                <TextField label="Target PH" {...textFieldProps} value={plant?.targetPH || 6} type="number" inputProps={{step: 0.1}} onChange={e => setPlant({...plant, targetPH: Number(e.currentTarget.value)})}/>
                <TextField label="Transplant Date" {...dateFieldProps} value={plant?.transplantDate?.substring(0, 10) || ""} type="date" onChange={e => setPlant({...plant, transplantDate: format(parseISO(e.currentTarget.value), 'yyyy-MM-dd')})}/>
                <TextField label="Harvest Date" {...dateFieldProps} value={plant?.harvestDate?.substring(0, 10) || ""} type="date" onChange={e => setPlant({...plant, harvestDate: format(parseISO(e.currentTarget.value), 'yyyy-MM-dd')})}/>
                
                <Button variant="contained" color="error" onClick={() => alert('Are you sure?')}>Discard</Button>
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
