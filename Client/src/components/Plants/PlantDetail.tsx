import { Autocomplete, Button, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffectOnce } from "../../hooks/useEffectOnce";
import { useQuery } from "../../hooks/useQuery";
import { format, parseISO } from "date-fns";
import Plant from "../../models/Plant";

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

const PlantDetail: React.FC = () => {
    const query = useQuery();
    const id = query.get("id");
    const navigate = useNavigate();

// #region State
    const [viewMode, setViewMode] = useState<string>(id ? ViewMode.VIEW : ViewMode.ADD);
    const [plant, setPlant] = useState<Plant>(new Plant());
    const [open, toggleOpen] = useState(false);
    const [addNutesDialog, setAddNutesDialog] = useState<string>();
    const [nutesDefault, setNutesDefault] = useState<string>("");
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
                const plant = await res.json();
                setPlant(plant);
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
                    inputValue={nutesDefault}
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
                        setNutesDefault(newInputValue);
                        }}
                    selectOnFocus clearOnBlur handleHomeEndKeys freeSolo
                />
                
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked {...textFieldProps} aria-label="Is Feminized" value={plant?.isFeminized} onChange={e => setPlant({...plant, isFeminized: e.currentTarget.checked})}/>} label="Is Feminized" />
                </FormGroup>
                <TextField label="Target PH" {...textFieldProps} value={plant?.targetPH || 6} type="number" inputProps={{step: 0.1}} onChange={e => setPlant({...plant, targetPH: Number(e.currentTarget.value)})}/>
                <TextField label="Transplant Date" {...dateFieldProps} value={plant?.transplantDate?.substring(0, 10)} type="date" onChange={e => setPlant({...plant, transplantDate: format(parseISO(e.currentTarget.value), 'yyyy-MM-dd')})}/>
                <TextField label="Harvest Date" {...dateFieldProps} value={plant?.harvestDate?.substring(0, 10)} type="date" onChange={e => setPlant({...plant, harvestDate: format(parseISO(e.currentTarget.value), 'yyyy-MM-dd')})}/>
                
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
