import {
    Add as AddIcon,
    ArrowForwardIos as ForwardArrowIcon,
} from "@mui/icons-material";
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import TableCell from "../Themed/ThemedTableCell";
import IconButton from "../Themed/ThemedIconButton";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffectOnce } from "../../hooks/useEffectOnce";
import Plant from "../../models/Plant";
import { useAppContext } from "../App";
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
    );
};

const PlantList: React.FC = () => {
    const [plants, setPlants] = useState<Plant[]>();
    const navigate = useNavigate();
    const { setPageTitle, setFooter } = useAppContext();
    const pageTitle = "Plant List";

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
        setPageTitle(pageTitle);
        setFooter(Footer);
        getPlants();
    }, []);

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Strain</TableCell>
                    {/* <TableCell>Age</TableCell> */}
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
                            {/* <TableCell>
                                        {plant.transplantDate
                                            ? `${differenceInDays(
                                                  plant.harvestDate
                                                      ? parseISO(
                                                            plant.harvestDate
                                                        )
                                                      : new Date(),
                                                  parseISO(plant.transplantDate)
                                              ).toString()} days`
                                            : ""}
                                    </TableCell> */}
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
            <Button href="/plant" variant="contained" startIcon={<AddIcon />}>
                Add Plant
            </Button>
        </Box>
    );
};

export default Layout;
