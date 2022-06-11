import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { parseISO, differenceInDays } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffectOnce } from "../../hooks/useEffectOnce";
import Plant from "../../models/Plant";

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
                        <TableCell align="right">Strain</TableCell>
                        <TableCell align="right">Breeder</TableCell>
                        <TableCell align="right">Target PH</TableCell>
                        <TableCell align="right">Transplant Date</TableCell>
                        <TableCell align="right">Age</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {plants?.map((plant) => (
                            <TableRow
                                key={plant.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={() => navigate(`/plant?id=${plant.id}`)}
                            >
                            <TableCell component="th" scope="row">
                                {plant.name}
                            </TableCell>
                            <TableCell align="right">{plant.strain}</TableCell>
                            <TableCell align="right">{plant.breeder}</TableCell>
                            <TableCell align="right">{plant.targetPH}</TableCell>
                            <TableCell align="right">{plant.transplantDate?.substring(0, 10)}</TableCell>
                            <TableCell align="right">{plant.transplantDate ? differenceInDays(new Date(), parseISO(plant.transplantDate)).toString() : ""}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>
        </Container>
    )
}

export default PlantList;