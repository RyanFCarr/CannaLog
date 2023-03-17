import { Add as AddIcon } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { useEffectOnce } from "../../../hooks/useEffectOnce";
import GrowLog, { GrowLogDto } from "../../../models/GrowLog";
import { get } from "../../../util/http";
import Table from "../../custom/Table";
import BasePage from "../BasePage";
import GrowLogDetail from "./GrowLogDetail";

const Layout: React.FC = () => {
  const { plantId } = useParams();
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <BasePage
              title="Grow Log List"
              Body={<GrowLogList plantId={plantId} />}
              Footer={<Footer plantId={plantId} />}
            />
          }
        />
        <Route path="add" element={<GrowLogDetail />} />
        <Route path=":growLogId" element={<GrowLogDetail />} />
      </Routes>
    </>
  );
};

interface GrowLogListProps {
  plantId: string | undefined;
}

const GrowLogList: React.FC<GrowLogListProps> = ({
  plantId,
}: GrowLogListProps) => {
  const [growLogs, setGrowLogs] = useState<GrowLog[]>();
  const navigate = useNavigate();

  useEffectOnce(() => {
    const getGrowLogs = async () => {
      try {
        const res = await get<GrowLogDto[]>("/api/GrowLog");
        if (res.parsedBody) {
          setGrowLogs(res.parsedBody.map((g) => GrowLog.fromDTO(g)));
        }
      } catch (e: any) {
        console.log(JSON.stringify(e));
      }
    };
    getGrowLogs();
  }, []);

  return (
    <Table
      data={growLogs}
      columnHeaders={["Log Date", "Plant Age", "Final PH", "Final PPM"]}
      onRowClick={(growLog: GrowLog) =>
        navigate(`/plants/${growLog.plantId}/growlogs/${growLog.id}`)
      }
    />
  );
};

interface GrowLogListFooterProps {
  plantId: string | undefined;
}

const Footer: React.FC<GrowLogListFooterProps> = ({
  plantId,
}: GrowLogListFooterProps) => {
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
