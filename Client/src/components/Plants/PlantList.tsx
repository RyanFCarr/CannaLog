import { Add as AddIcon } from "@mui/icons-material";
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { parseISO, differenceInDays } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffectOnce } from "../../hooks/useEffectOnce";
import Plant from "../../models/Plant";


/**
 * Determine what to do when there are no records
 * Add btn
 */


const PlantList: React.FC = () => {
    const [plants, setPlants] = useState<Plant[]>();
    const navigate = useNavigate();

    useEffectOnce(() => {
        const getPlants = async () => {
            try {
                const res = await fetch("https://localhost:7247/plant");
                if (!res.ok) {
                    console.log(res.status, res.statusText);
                } else {
                    setPlants(await res.json());
                }
            } catch (e: any) {
                console.log(JSON.stringify(e));
            }
        };
        getPlants();
    }, []);

    return (
        <Container maxWidth="sm" style={{backgroundColor: "grey"}}>
            <Typography variant="h1">Plant List</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Strain</TableCell>
                        <TableCell>Breeder</TableCell>
                        <TableCell>Target PH</TableCell>
                        <TableCell>Transplant Date</TableCell>
                        <TableCell>Age</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {!plants?.length && <TableRow><TableCell align="center" colSpan={6}>No rows</TableCell></TableRow>}
                        {plants && plants.map((plant) => (
                            <TableRow
                                key={plant.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={() => navigate(`/plant?id=${plant.id}`)}
                            >
                            <TableCell component="th" scope="row">
                                {plant.name}
                            </TableCell>
                            <TableCell>{plant.strain}</TableCell>
                            <TableCell>{plant.breeder}</TableCell>
                            <TableCell>{plant.targetPH}</TableCell>
                            <TableCell>{plant.transplantDate?.substring(0, 10)}</TableCell>
                            <TableCell>{plant.transplantDate ? differenceInDays(new Date(), parseISO(plant.transplantDate)).toString() : ""}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button href="/plant" variant="contained" startIcon={<AddIcon />}>Add Plant</Button>
        </Container>
    )
}

export default PlantList;