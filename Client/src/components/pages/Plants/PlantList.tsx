import {
    Add as AddIcon,
    ArrowForwardIos as ForwardArrowIcon,
} from "@mui/icons-material";
import {
    Box,
    Button,
    Table,
    TableBody,
    TableHead,
    TableRow,
} from "@mui/material";
import TableCell from "../../custom/Themed/ThemedTableCell";
import IconButton from "../../custom/Themed/ThemedIconButton";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffectOnce } from "../../../hooks/useEffectOnce";
import Plant, { PlantDto } from "../../../models/Plant";
import BasePage from "../BasePage";
import PlantDetail from "./PlantDetail";
import { get } from "../../../util/functions";

const Layout: React.FC = () => {
    return (
        <>
            <Routes>
                <Route index element={<BasePage title="Plant List" Body={<PlantList />} Footer={<Footer />} />} />
                <Route path="add/*" element={<PlantDetail />} />
                <Route path=":plantId/*" element={<PlantDetail />} />
            </Routes>
        </>
    );
};

const PlantList: React.FC = () => {
    const [plants, setPlants] = useState<Plant[]>();
    const navigate = useNavigate();

    useEffectOnce(() => {
        const getPlants = async () => {
            try {
                const res = await get<PlantDto[]>("https://localhost:7247/plant");
                if (res.parsedBody) {
                    setPlants(res.parsedBody.map(p => Plant.fromDTO(p)));
                }
            } catch (e: any) {
                console.log(JSON.stringify(e));
            }
        };
        getPlants();
    }, []);

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Strain</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {!plants?.length && (
                    <TableRow>
                        <TableCell align="center" colSpan={4}>
                            No rows
                        </TableCell>
                    </TableRow>
                )}
                {plants &&
                    plants.map((plant) => (
                        <TableRow
                            key={plant.id}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {plant.name}
                            </TableCell>
                            <TableCell>{plant.strain}</TableCell>
                            <TableCell>{plant.status}</TableCell>
                            <TableCell>
                                <IconButton
                                    onClick={() =>
                                        navigate(`/plants/${plant.id}`)
                                    }
                                >
                                    <ForwardArrowIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
};

const Footer: React.FC = () => {
    return (
        <Box display="flex" justifyContent="space-around" mt={1.5}>
            <Button href="/plants/add" variant="contained" startIcon={<AddIcon />}>
                Add Plant
            </Button>
        </Box>
    );
};

export default Layout;
