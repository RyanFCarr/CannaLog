import { Add as AddIcon } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffectOnce } from "../../../hooks/useEffectOnce";
import Plant, { PlantDto } from "../../../models/Plant";
import BasePage from "../BasePage";
import PlantDetail from "./PlantDetail";
import { get } from "../../../util/http";
import Table from "../../custom/Table";

const Layout: React.FC = () => {
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <BasePage
              title="Plant List"
              Body={<PlantList />}
              Footer={<Footer />}
            />
          }
        />
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
        const res = await get<PlantDto[]>("/api/plant");
        if (res.parsedBody) {
          setPlants(res.parsedBody.map((p) => Plant.fromDTO(p)));
        }
      } catch (e: any) {
        console.log(JSON.stringify(e));
      }
    };
    getPlants();
  }, []);

  return (
    <Table
      data={plants}
      columnHeaders={["Name", "Strain", "Status"]}
      onRowClick={(plant: Plant) => navigate(`/plants/${plant.id}`)}
    />
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
