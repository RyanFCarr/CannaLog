import { Autocomplete, Button, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Plant from "../../models/Plant";

const EditPlant: React.FC = () => {
    const [plant, setPlant] = useState<Plant>(new Plant());
    const [open, toggleOpen] = useState(false);
    const [addNutesDialog, setAddNutesDialog] = useState<string>();
    const [nutesDefault, setNutesDefault] = useState<string>("");

    const handleClose = () => {
        setAddNutesDialog('');
        toggleOpen(false);
    };
    const handleSubmitDialog = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPlant({...plant, BaseNutrientsBrand: addNutesDialog})
        handleClose();
    };

    const handleSave = () => {
        console.log(JSON.stringify(plant));
        fetch("https://localhost:7247/Plant", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(plant)
        })
        .then(res => res.json())
        .then(res => alert(JSON.stringify(res)));
    }
    return (
        <>
            <Container maxWidth="sm" style={{backgroundColor: "grey"}}>
                <Typography variant="h1">
                    Add Plant
                </Typography>
                <TextField label="Name" variant="outlined" onChange={e => setPlant({...plant, Name: e.currentTarget.value})}/>
                <TextField label="Strain" variant="outlined" onChange={e => setPlant({...plant, Strain: e.currentTarget.value})}/>
                <TextField label="Breeder" variant="outlined" onChange={e => setPlant({...plant, Breeder: e.currentTarget.value})}/>
                <Autocomplete
                    options={["Add new", "General Hydroponics", "Advanced Nutrients"]}
                    renderInput={(params) => <TextField {...params} label="Base Nutrients Brand" variant="outlined" />}
                    value={plant?.BaseNutrientsBrand || ""}
                    inputValue={nutesDefault}
                    onChange={(event, newValue) => {
                        if (newValue === 'Add new') {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            toggleOpen(true);
                            setAddNutesDialog(newValue);
                        });
                        } else {
                            setPlant({...plant, BaseNutrientsBrand: newValue || undefined})
                        }
                    }}
                    onInputChange={(event, newInputValue) => {
                        setNutesDefault(newInputValue);
                      }}
                    selectOnFocus clearOnBlur handleHomeEndKeys freeSolo
                />
                
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked aria-label="Is Feminized" onChange={e => setPlant({...plant, IsFeminized: e.currentTarget.checked})}/>} label="Is Feminized" />
                </FormGroup>
                <TextField label="Target PH" variant="outlined" type="number" defaultValue={6.0} inputProps={{step: 0.1}} onChange={e => setPlant({...plant, TargetPH: Number(e.currentTarget.value)})}/>
                <TextField label="Transplant Date" variant="outlined" type="date" InputLabelProps={{shrink: true}} onChange={e => setPlant({...plant, TransplantDate: new Date(e.currentTarget.value)})}/>
                <TextField label="Harvest Date" variant="outlined" type="date" InputLabelProps={{shrink: true}} onChange={e => setPlant({...plant, HarvestDate: new Date(e.currentTarget.value)})}/>
                
                <Button variant="contained" color="error" onClick={() => alert('Are you sure?')}>Discard</Button>
                <Button variant="contained" color="success" onClick={handleSave}>Save</Button>
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

export default EditPlant;
