import { Add as AddIcon, ArrowForwardIos as ForwardArrowIcon } from "@mui/icons-material";
import { Button, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { parseISO, differenceInDays } from "date-fns";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffectOnce } from "../../hooks/useEffectOnce";
import Plant from "../../models/Plant";
import PlantDetail from "./PlantDetail";

const Layout: React.FC = () => {
    return (
        <>
            <Routes>
                <Route index element={<PlantList />} />
                <Route path="add" element={<PlantDetail />} />
                <Route path=":plantId/*" element={<PlantDetail />} />
            </Routes>
        </>
    )
}

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
        <Container maxWidth="md" style={{backgroundColor: "grey"}}>
            <Typography variant="h1">Plant List</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Strain</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {!plants?.length && <TableRow><TableCell align="center" colSpan={4}>No rows</TableCell></TableRow>}
                        {plants && plants.map((plant) => (
                            <TableRow
                                key={plant.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {plant.name}
                                </TableCell>
                                <TableCell>{plant.strain}</TableCell>
                                <TableCell>{plant.transplantDate ? `${differenceInDays(plant.harvestDate ? parseISO(plant.harvestDate) : new Date(), parseISO(plant.transplantDate)).toString()} days` : ""}</TableCell>
                                <TableCell>{plant.status}</TableCell>
                                <TableCell><IconButton onClick={() => navigate(`/plant?id=${plant.id}`)}><ForwardArrowIcon/></IconButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button href="/plant" variant="contained" startIcon={<AddIcon />}>Add Plant</Button>
        </Container>
    )
}

export default Layout;