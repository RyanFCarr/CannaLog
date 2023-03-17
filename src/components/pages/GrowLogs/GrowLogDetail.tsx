import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GrowLog, { GrowLogDto, GrowLogSaveDto } from "../../../models/GrowLog";
import { toShortDate } from "../../../util/functions";
import { get, post, put } from "../../../util/http";
import BasePage from "../BasePage";
import MultiSelectChip from "../../custom/MultiSelectChip";
import NutrientStepper from "../../custom/NutrientStepper";
import { Additive, AdditiveDto, AdditiveType } from "../../../models/Additive";
import Plant, { PlantDto } from "../../../models/Plant";
import { differenceInCalendarDays } from "date-fns";

enum ViewMode {
  VIEW = "View",
  ADD = "Add",
  EDIT = "Edit",
}

enum TextVariants {
  FILLED = "filled",
  STANDARD = "standard",
  OUTLINED = "outlined",
}

const Layout: React.FC = () => {
  const { plantId, growLogId } = useParams();

  if (!plantId)
    return (
      <div>
        Plant Id is missing. You should report a bug!{" "}
        <a href="https://github.com/RyanFCarr/CannaLog/issues">report a bug</a>
      </div>
    );
  if (!Number.parseInt(plantId))
    return (
      <div>
        Plant Id is not an integer. You should report a bug:{" "}
        <a href="https://github.com/RyanFCarr/CannaLog/issues">report a bug</a>
      </div>
    );

  const [viewMode, setViewMode] = useState<ViewMode>(
    growLogId ? ViewMode.VIEW : ViewMode.ADD
  );
  const [editModeLog, setEditModeLog] = useState<GrowLog>(new GrowLog());
  const [OGLog, setOGLog] = useState<GrowLog>(new GrowLog());
  const [title, setTitle] = useState<string>(`${viewMode} Grow Log`);
  const [openAddNutrient, setOpenAddNutrient] = useState<boolean>(false);
  const [additives, setAdditives] = useState<Additive[]>();

  useEffect(() => {
    setTitle(`${viewMode} Grow Log`);
  }, [viewMode]);

  // useMemo?
  useEffect(() => {
    const getAdditives = async () => {
      const res = await get<AdditiveDto[]>("/api/Additive/");
      if (res.ok && res.parsedBody)
        setAdditives(res.parsedBody.map((a) => Additive.fromDTO(a)));
    };
    getAdditives();
  }, []);

  if (!additives) return <>Loading screen here</>;
  return (
    <>
      <BasePage
        title={title}
        Body={
          <GrowLogDetail
            plantId={Number.parseInt(plantId!)}
            growLogId={growLogId}
            viewMode={viewMode}
            editModeLog={editModeLog}
            setEditModeLog={setEditModeLog}
            setOGLog={setOGLog}
          />
        }
        Footer={
          <Footer
            viewMode={viewMode}
            setViewMode={setViewMode}
            plantId={plantId}
            editModeLog={editModeLog}
            setEditModeLog={setEditModeLog}
            OGLog={OGLog}
            setOpenAddNutrient={setOpenAddNutrient}
          />
        }
      />

      <Dialog onClose={() => setOpenAddNutrient(false)} open={openAddNutrient}>
        <NutrientStepper
          editModeLog={editModeLog}
          setEditModeLog={setEditModeLog}
          additives={additives}
          handleClose={() => setOpenAddNutrient(false)}
        />
      </Dialog>
    </>
  );
};

interface GrowLogDetailProps {
  plantId: number;
  growLogId: string | undefined;
  viewMode: ViewMode;
  editModeLog: GrowLog;
  setEditModeLog: React.Dispatch<React.SetStateAction<GrowLog>>;
  setOGLog: React.Dispatch<React.SetStateAction<GrowLog>>;
}

const GrowLogDetail: React.FC<GrowLogDetailProps> = ({
  plantId,
  growLogId,
  viewMode,
  editModeLog,
  setEditModeLog,
  setOGLog,
}: GrowLogDetailProps) => {
  const [plant, setPlant] = useState<Plant | undefined>();

  useEffect(() => {
    const getGrowLog = async () => {
      let plant: Plant;
      let log: GrowLog = new GrowLog();
      log.plantId = plantId;

      if (growLogId) {
        let growLogResponse = await get<GrowLogDto>(
          `/api/growlog/${growLogId}`
        );
        if (growLogResponse.parsedBody) {
          log = GrowLog.fromDTO(growLogResponse.parsedBody);
        }
      }

      let plantResponse = await get<PlantDto>(`/api/plant/${plantId}`);
      if (plantResponse.parsedBody) {
        plant = Plant.fromDTO(plantResponse.parsedBody);
        log.plantAge = differenceInCalendarDays(
          new Date(log.logDate),
          plant.transplantDate ? new Date(plant.transplantDate) : new Date()
        );

        setPlant(plant);
        setEditModeLog(log);
        setOGLog(log);
      } else {
        // This should hopefully never be hit
        throw new Error("Unable to get Plant");
      }
    };
    try {
      getGrowLog();
    } catch (e: any) {
      console.log(e);
    }
  }, [plantId, growLogId]);

  const setTags = (tags: string[]) => {
    setEditModeLog({
      ...editModeLog,
      tags: tags.join(","),
    });
  };

  let textFieldProps: {
    variant: TextVariants;
    disabled?: boolean;
    InputLabelProps?: { shrink: boolean };
  };
  let dateFieldProps: {
    variant: TextVariants;
    disabled?: boolean;
    InputLabelProps?: { shrink: boolean };
  };
  if (viewMode === ViewMode.VIEW) {
    textFieldProps = {
      variant: TextVariants.STANDARD,
      disabled: true,
      InputLabelProps: { shrink: true },
    };
    dateFieldProps = {
      variant: TextVariants.STANDARD,
      disabled: true,
      InputLabelProps: { shrink: true },
    };
  } else {
    textFieldProps = {
      variant: TextVariants.OUTLINED,
    };
    dateFieldProps = {
      variant: TextVariants.OUTLINED,
      InputLabelProps: { shrink: true },
    };
  }

  return (
    <>
      <Box
        sx={{
          margin: 1,
        }}
      >
        <Typography variant="h3">{plant?.name}</Typography>
        <Typography variant="h6">{editModeLog.plantAge} days old</Typography>
        <TextField
          label="Log Date"
          {...dateFieldProps}
          value={editModeLog.logDate.substring(0, 10) || ""}
          type="date"
          onChange={(e) => {
            if (e.currentTarget.value) {
              const newDate = toShortDate(e.currentTarget.value)!;
              setEditModeLog({
                ...editModeLog,
                logDate: newDate,
                plantAge: differenceInCalendarDays(
                  new Date(newDate),
                  plant?.transplantDate
                    ? new Date(plant.transplantDate)
                    : new Date()
                ),
              });
            }
          }}
        />
        <TextField
          label="Initial PH"
          {...textFieldProps}
          value={editModeLog.initialPH || ""}
          type="number"
          inputProps={{ step: 0.1 }}
          onChange={(e) => {
            setEditModeLog({
              ...editModeLog,
              initialPH: Number.parseFloat(e.currentTarget.value),
            });
          }}
        />
        <TextField
          label="Initial PPM"
          {...textFieldProps}
          value={editModeLog.initialPPM || ""}
          type="number"
          inputProps={{ step: 1 }}
          onChange={(e) => {
            if (!e.currentTarget.value) return;
            setEditModeLog({
              ...editModeLog,
              initialPPM: Number.parseInt(e.currentTarget.value),
            });
          }}
        />
        <TextField
          label="Final PH"
          {...textFieldProps}
          value={editModeLog.finalPH || ""}
          type="number"
          inputProps={{ step: 0.1 }}
          onChange={(e) => {
            setEditModeLog({
              ...editModeLog,
              finalPH: Number.parseFloat(e.currentTarget.value),
            });
          }}
        />
        <TextField
          label="Final PPM"
          {...textFieldProps}
          value={editModeLog.finalPPM || ""}
          type="number"
          inputProps={{ step: 1 }}
          onChange={(e) => {
            setEditModeLog({
              ...editModeLog,
              finalPPM: Number.parseInt(e.currentTarget.value),
            });
          }}
        />
        <TextField
          label="Light Height"
          {...textFieldProps}
          value={editModeLog.lightHeight || ""}
          type="number"
          inputProps={{ step: 1 }}
          onChange={(e) => {
            let lightHeight: number | undefined;
            if (!e.currentTarget.value) {
              lightHeight = undefined;
            } else {
              lightHeight = Number.parseInt(e.currentTarget.value);
            }
            setEditModeLog({
              ...editModeLog,
              lightHeight,
            });
          }}
        />
        <TextField
          label="Plant Height"
          {...textFieldProps}
          value={editModeLog.plantHeight || ""}
          type="number"
          inputProps={{ step: 0.5 }}
          onChange={(e) => {
            let plantHeight: number | undefined;
            if (!e.currentTarget.value) {
              plantHeight = undefined;
            } else {
              plantHeight = Number.parseFloat(e.currentTarget.value);
            }
            setEditModeLog({
              ...editModeLog,
              plantHeight,
            });
          }}
        />
        <TextField
          label="Air Temperature"
          {...textFieldProps}
          value={editModeLog.airTemperature || ""}
          type="number"
          inputProps={{ step: 0.1 }}
          onChange={(e) => {
            let airTemperature: number | undefined;
            if (!e.currentTarget.value) {
              airTemperature = undefined;
            } else {
              airTemperature = Number.parseInt(e.currentTarget.value);
            }
            setEditModeLog({
              ...editModeLog,
              airTemperature,
            });
          }}
        />
        <TextField
          label="Humidity"
          {...textFieldProps}
          value={editModeLog.humidity || ""}
          type="number"
          inputProps={{ step: 0.1 }}
          onChange={(e) => {
            let humidity: number | undefined;
            if (!e.currentTarget.value) {
              humidity = undefined;
            } else {
              humidity = Number.parseInt(e.currentTarget.value);
            }
            setEditModeLog({
              ...editModeLog,
              humidity,
            });
          }}
        />
        <TextField
          label="Grow Medium Temperature"
          {...textFieldProps}
          value={editModeLog.growMediumTemperature || ""}
          type="number"
          inputProps={{ step: 0.1 }}
          onChange={(e) => {
            let growMediumTemperature: number | undefined;
            if (!e.currentTarget.value) {
              growMediumTemperature = undefined;
            } else {
              growMediumTemperature = Number.parseInt(e.currentTarget.value);
            }
            setEditModeLog({
              ...editModeLog,
              growMediumTemperature,
            });
          }}
        />
        <TextField
          label="Notes"
          {...textFieldProps}
          value={editModeLog.notes || ""}
          type="text"
          multiline
          minRows={2}
          maxRows={5}
          onChange={(e) => {
            setEditModeLog({
              ...editModeLog,
              notes: e.currentTarget.value,
            });
          }}
        />
        <MultiSelectChip
          label="Tags"
          chips={["Res Change", "Flush"]}
          setSelected={setTags}
        />
      </Box>
    </>
  );
};

interface GrowLogDetailFooterProps {
  viewMode: ViewMode;
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
  plantId: string | undefined;
  editModeLog: GrowLog;
  setEditModeLog: React.Dispatch<React.SetStateAction<GrowLog>>;
  OGLog: GrowLog;
  setOpenAddNutrient: React.Dispatch<React.SetStateAction<boolean>>;
}

const Footer: React.FC<GrowLogDetailFooterProps> = ({
  viewMode,
  setViewMode,
  plantId,
  editModeLog,
  setEditModeLog,
  OGLog,
  setOpenAddNutrient,
}: GrowLogDetailFooterProps) => {
  const navigate = useNavigate();
  const add = async () => {
    try {
      const res = await post<GrowLogSaveDto, GrowLogDto>(
        "/api/GrowLog",
        GrowLogSaveDto.fromView(editModeLog)
      );

      if (res.parsedBody) {
        setViewMode(ViewMode.VIEW);
        navigate(
          `/plants/${res.parsedBody.plantId}/growlogs/${res.parsedBody.id}`
        );
      }
    } catch (e: any) {
      console.log(e);
    }
  };
  const update = async () => {
    try {
      const res = await put<GrowLogSaveDto, GrowLogDto>(
        `/api/GrowLog/${editModeLog.id}`,
        GrowLogSaveDto.fromView(editModeLog)
      );
      if (res.parsedBody) {
        setViewMode(ViewMode.VIEW);
        navigate(
          `/plants/${res.parsedBody.plantId}/growlogs/${res.parsedBody.id}`
        );
      }
    } catch (e: any) {
      console.log(e);
    }
  };
  const handleSubmit = () => {
    if (viewMode === ViewMode.VIEW) {
      setViewMode(ViewMode.EDIT);
    } else if (viewMode === ViewMode.ADD) {
      add();
    } else {
      update();
    }
  };
  const handleEditDiscard = () => {
    setViewMode(ViewMode.VIEW);
    setEditModeLog(OGLog);
  };
  return (
    <Box display="flex" justifyContent="space-around" sx={{ mt: 1.5, mb: 2 }}>
      {viewMode === ViewMode.ADD && (
        <Button
          variant="contained"
          color="error"
          href={`/plants/${plantId}/growlogs`}
        >
          Discard
        </Button>
      )}
      {viewMode === ViewMode.EDIT && (
        <Button variant="contained" color="error" onClick={handleEditDiscard}>
          Discard
        </Button>
      )}

      <Button variant="contained" color="success" onClick={handleSubmit}>
        {viewMode === ViewMode.VIEW ? "Edit" : "Save"}
      </Button>
      {(viewMode === ViewMode.EDIT || viewMode === ViewMode.ADD) && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setOpenAddNutrient(true);
          }}
        >
          Log Additives
        </Button>
      )}
    </Box>
  );
};

export default Layout;
