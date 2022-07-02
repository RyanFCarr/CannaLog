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
import BasePage from "../BasePage";
import GrowLogDetail from "./GrowLogDetail";

const Layout: React.FC = () => {
    const { plantId } = useParams();
    return (
        <>
            <Routes>
                <Route index element={<BasePage title="Grow Log List" Body={<GrowLogList plantId={plantId} />} Footer={<Footer plantId={plantId} />} />} />
                <Route path="add" element={<GrowLogDetail />} />
                <Route path=":growLogId" element={<GrowLogDetail />} />
            </Routes>
        </>
    );
};

interface GrowLogListProps {
    plantId: string | undefined;
}

const GrowLogList: React.FC<GrowLogListProps> = ({ plantId }: GrowLogListProps) => {
    const [growLogs, setGrowLogs] = useState<GrowLog[]>();
    const navigate = useNavigate();

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
        getGrowLogs();
    }, []);

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

interface GrowLogListFooterProps {
    plantId: string | undefined;
}

const Footer: React.FC<GrowLogListFooterProps> = ({ plantId }: GrowLogListFooterProps) => {
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

export default Layout;
