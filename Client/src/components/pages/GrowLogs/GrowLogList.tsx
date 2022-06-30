import {
    Add as AddIcon,
    ArrowForwardIos as ForwardArrowIcon,
} from "@mui/icons-material";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Box,
    Button,
} from "@mui/material";
import { useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { useEffectOnce } from "../../../hooks/useEffectOnce";
import GrowLog from "../../../models/GrowLog";
import { toShortDate } from "../../../util/functions";
import { useAppContext } from "../App";
import GrowLogDetail from "./GrowLogDetail";

const Layout: React.FC = () => {
    return (
        <>
            <Routes>
                <Route index element={<GrowLogList />} />
                <Route path="add" element={<GrowLogDetail />} />
                <Route path=":growLogId" element={<GrowLogDetail />} />
            </Routes>
        </>
    );
};

const GrowLogList: React.FC = () => {
    const { plantId } = useParams();
    const [growLogs, setGrowLogs] = useState<GrowLog[]>();
    const navigate = useNavigate();
    const { setPageTitle, setFooter } = useAppContext();
    const pageTitle = "Grow Log List";

    useEffectOnce(() => {
        const getGrowLogs = async () => {
            try {
                const res = await fetch("https://localhost:7247/GrowLog");
                if (!res.ok) {
                    console.log(res.status, res.statusText);
                } else {
                    setGrowLogs(await res.json());
                }
            } catch (e: any) {
                console.log(JSON.stringify(e));
            }
        };
        setPageTitle(pageTitle);
        setFooter(Footer);
        getGrowLogs();
    }, []);

    const Footer: React.FC = () => {
        return (
            <Box display="flex" justifyContent="space-around" mt={1.5}>
                <Button
                    href={`/plants/${plantId}/growlogs/add`}
                    variant="contained"
                    startIcon={<AddIcon />}
                >
                    Add Grow Log
                </Button>
            </Box>
        );
    };

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Log Date</TableCell>
                    <TableCell>Plant Age</TableCell>
                    <TableCell>Final PH</TableCell>
                    <TableCell>Final PPM</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {!growLogs?.length && (
                    <TableRow>
                        <TableCell align="center" colSpan={4}>
                            No rows
                        </TableCell>
                    </TableRow>
                )}
                {growLogs &&
                    growLogs.map((log) => (
                        <TableRow
                            key={log.id}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {toShortDate(log.logDate?.toString())}
                            </TableCell>
                            <TableCell>{log.plantAge}</TableCell>
                            <TableCell>{log.finalPH}</TableCell>
                            <TableCell>{log.finalPPM}</TableCell>
                            <TableCell>
                                <IconButton
                                    onClick={() =>
                                        navigate(
                                            `/plants/${plantId}/growlogs/${log.id}`
                                        )
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

export default Layout;
