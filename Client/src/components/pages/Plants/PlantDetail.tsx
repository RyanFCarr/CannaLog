import {
	Autocomplete,
	Box,
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControlLabel,
	FormGroup,
	SxProps,
	TextField,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useEffectOnce } from '../../../hooks/useEffectOnce';
import Plant, { PlantDto, PlantSaveDto } from '../../../models/Plant';
import { toShortDate, trimToUndefined } from '../../../util/functions';
import GrowLogList from '../GrowLogs/GrowLogList';
import BasePage from '../BasePage';
import { get, post, put } from '../../../util/functions';
import Table from '../../custom/Table';
import GrowLog, { GrowLogDto } from '../../../models/GrowLog';

//#region Enums
enum ViewMode {
	VIEW = 'View',
	ADD = 'Add',
	EDIT = 'Edit',
}

enum TextVariants {
	FILLED = 'filled',
	STANDARD = 'standard',
	OUTLINED = 'outlined',
}
//#endregion

const autoFlowerSched = ['(18/6)', '(20/4)'];
const photoperiodSched = ['Veg (18/6)', 'Bloom (12/12)'];

const Layout: React.FC = () => {
	const { plantId } = useParams();
	const [viewMode, setViewMode] = useState<string>(plantId ? ViewMode.VIEW : ViewMode.ADD);
	const [title, setTitle] = useState<string>(`${viewMode} Plant`);
	const [editModePlant, setEditModePlant] = useState<Plant>(new Plant());
	const [OGPlant, setOGPlant] = useState<Plant>(new Plant());
	const [lightingSchedOptions, setLightingSchedOptions] = useState<string[]>(['']);

	const setDefaultLightingSchedule = (growType?: string) => {
		if (growType === 'Autoflower') setLightingSchedOptions(autoFlowerSched);
		else if (growType === 'Photoperiod') setLightingSchedOptions(photoperiodSched);
		else setLightingSchedOptions(['']);
	};

	useEffect(() => {
		setTitle(`${viewMode} Plant`);
	}, [viewMode]);

	return (
		<>
			<Routes>
				<Route
					index
					element={
						<BasePage
							title={title}
							Body={
								<PlantDetail
									plantId={plantId}
									viewMode={viewMode}
									editModePlant={editModePlant}
									setEditModePlant={setEditModePlant}
									setOGPlant={setOGPlant}
									setDefaultLightingSchedule={setDefaultLightingSchedule}
									lightingSchedOptions={lightingSchedOptions}
									setLightingSchedOptions={setLightingSchedOptions}
								/>
							}
							Footer={
								<Footer
									plantId={plantId}
									viewMode={viewMode}
									setViewMode={setViewMode}
									editModePlant={editModePlant}
									setEditModePlant={setEditModePlant}
									OGPlant={OGPlant}
									setDefaultLightingSchedule={setDefaultLightingSchedule}
								/>
							}
						/>
					}
				/>
				<Route path="growLogs/*" element={<GrowLogList />} />
			</Routes>
		</>
	);
};

interface PlantDetailProps {
	viewMode: string;
	plantId: string | undefined;
	editModePlant: Plant;
	setEditModePlant: React.Dispatch<React.SetStateAction<Plant>>;
	setOGPlant: React.Dispatch<React.SetStateAction<Plant>>;
	setDefaultLightingSchedule: (growType?: string) => void;
	lightingSchedOptions: string[];
	setLightingSchedOptions: React.Dispatch<React.SetStateAction<string[]>>;
}
const PlantDetail: React.FC<PlantDetailProps> = ({
	plantId,
	viewMode,
	editModePlant,
	setEditModePlant,
	setOGPlant,
	setDefaultLightingSchedule,
	lightingSchedOptions,
	setLightingSchedOptions,
}: PlantDetailProps) => {
	const navigate = useNavigate();
	// #region State
	const [open, toggleOpen] = useState(false);
	const [addNutesDialog, setAddNutesDialog] = useState<string>();
	const [growLogs, setGrowLogs] = useState<GrowLog[]>([]);
	// #endregion
	// #region Dialog methods
	const handleClose = () => {
		setAddNutesDialog('');
		toggleOpen(false);
	};
	const handleSubmitDialog = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setEditModePlant({
			...editModePlant,
			baseNutrientsBrand: addNutesDialog,
		});
		handleClose();
	};
	// #endregion

	useEffectOnce(() => {
		const getData = async () => {
			if (!plantId) return;
			try {
				const plantRes = await get<PlantDto>(`https://localhost:7247/Plant/${plantId}`);
				//TODO: HTTP code handling e.g.: 404
				if (plantRes.parsedBody) {
					const plant: Plant = Plant.fromDTO(plantRes.parsedBody);
					setEditModePlant(plant);
					setOGPlant(plant);
					setDefaultLightingSchedule(plant.growType);
				}
				const logRes = await get<GrowLogDto[]>(`https://localhost:7247/Plant/${plantId}/Growlog`);
				if (logRes.parsedBody) {
					const logs: GrowLog[] = logRes.parsedBody.map(l => GrowLog.fromDTO(l));
					setGrowLogs(logs);
				}
			} catch (e: any) {
				console.log(JSON.stringify(e));
			}
		};
		getData();
	}, [plantId]);

	let textFieldProps: {
		variant?: TextVariants;
		disabled?: boolean;
		InputLabelProps?: { shrink: boolean };
		sx?: SxProps;
	} = {
		sx: { mr: 2 },
	};
	let dateFieldProps: {
		variant?: TextVariants;
		disabled?: boolean;
		InputLabelProps?: { shrink: boolean };
		sx?: SxProps;
	} = {
		sx: { mr: 2 },
		InputLabelProps: { shrink: true },
	};
	if (viewMode === ViewMode.VIEW) {
		textFieldProps = {
			...textFieldProps,
			variant: TextVariants.STANDARD,
			disabled: true,
			InputLabelProps: { shrink: true },
		};
		dateFieldProps = {
			...dateFieldProps,
			variant: TextVariants.STANDARD,
			disabled: true,
		};
	} else {
		textFieldProps = {
			...textFieldProps,
			variant: TextVariants.OUTLINED,
		};
		dateFieldProps = {
			...dateFieldProps,
			variant: TextVariants.OUTLINED,
		};
	}

	if (!editModePlant) return <>Loading screen here</>;
	return (
		<Box
			sx={{
				margin: 1,
			}}
		>
			<TextField
				label="Name"
				{...textFieldProps}
				value={editModePlant?.name || ''}
				onChange={e =>
					setEditModePlant({
						...editModePlant,
						name: e.currentTarget.value,
					})
				}
			/>
			<TextField
				label="Strain"
				{...textFieldProps}
				value={editModePlant?.strain || ''}
				onChange={e =>
					setEditModePlant({
						...editModePlant,
						strain: e.currentTarget.value,
					})
				}
			/>
			<TextField
				label="Breeder"
				{...textFieldProps}
				value={editModePlant?.breeder || ''}
				onChange={e =>
					setEditModePlant({
						...editModePlant,
						breeder: e.currentTarget.value,
					})
				}
			/>
			<Autocomplete
				options={['Add new', 'General Hydroponics', 'Advanced Nutrients']}
				renderInput={params => <TextField {...params} label="Base Nutrients Brand" {...textFieldProps} />}
				value={editModePlant?.baseNutrientsBrand || ''}
				inputValue={editModePlant?.baseNutrientsBrand || ''}
				onChange={(event, newValue) => {
					if (newValue === 'Add new') {
						// timeout to avoid instant validation of the dialog's form.
						setTimeout(() => {
							toggleOpen(true);
							setAddNutesDialog(newValue);
						});
					} else {
						setEditModePlant({
							...editModePlant,
							baseNutrientsBrand: newValue || undefined,
						});
					}
				}}
				onInputChange={() => {
					// Required for the Autocomplete to be considered "controlled"
				}}
				selectOnFocus
				clearOnBlur
				handleHomeEndKeys
				freeSolo
			/>
			<Autocomplete
				options={['Autoflower', 'Photoperiod']}
				renderInput={params => <TextField {...params} label="Grow Type" {...textFieldProps} />}
				value={editModePlant?.growType || ''}
				inputValue={editModePlant?.growType || ''}
				onChange={(event, newValue) => {
					setEditModePlant({
						...editModePlant,
						growType: newValue || undefined,
					});
					if (newValue === 'Autoflower') {
						setLightingSchedOptions(autoFlowerSched);
					} else if (newValue === 'Photoperiod') {
						setLightingSchedOptions(photoperiodSched);
					} else {
						setLightingSchedOptions(['']);
					}
				}}
				onInputChange={() => {
					// Required for the Autocomplete to be considered "controlled"
				}}
				selectOnFocus
				clearOnBlur
				handleHomeEndKeys
				freeSolo
			/>
			<Autocomplete
				options={['LED', 'HPS']}
				renderInput={params => <TextField {...params} label="Lighting Type" {...textFieldProps} />}
				value={editModePlant?.lightingType || ''}
				inputValue={editModePlant?.lightingType || ''}
				onChange={(event, newValue) => {
					setEditModePlant({
						...editModePlant,
						lightingType: newValue || undefined,
					});
				}}
				onInputChange={() => {
					// Required for the Autocomplete to be considered "controlled"
				}}
				selectOnFocus
				clearOnBlur
				handleHomeEndKeys
				freeSolo
			/>
			<Autocomplete
				options={lightingSchedOptions}
				renderInput={params => (
					<TextField
						{...params}
						label="Lighting Schedule"
						helperText={lightingSchedOptions[0] === '' ? 'Choose a Grow Type' : ''}
						{...textFieldProps}
					/>
				)}
				value={editModePlant?.lightingSchedule || ''}
				inputValue={editModePlant?.lightingSchedule || ''}
				onChange={(event, newValue) => {
					setEditModePlant({
						...editModePlant,
						lightingSchedule: newValue || undefined,
					});
				}}
				onInputChange={() => {
					// Required for the Autocomplete to be considered "controlled"
				}}
				selectOnFocus
				clearOnBlur
				handleHomeEndKeys
				freeSolo
			/>
			<Autocomplete
				options={['Hydro', 'Coco', 'Soil']}
				renderInput={params => <TextField {...params} label="Grow Medium" {...textFieldProps} />}
				value={editModePlant?.growMedium || ''}
				inputValue={editModePlant?.growMedium || ''}
				onChange={(event, newValue) => {
					setEditModePlant({
						...editModePlant,
						growMedium: newValue || undefined,
					});
				}}
				onInputChange={() => {
					// Required for the Autocomplete to be considered "controlled"
				}}
				selectOnFocus
				clearOnBlur
				handleHomeEndKeys
				freeSolo
			/>

			<FormGroup>
				<FormControlLabel
					control={
						<Checkbox
							checked={editModePlant?.isFeminized || false}
							aria-label="Is Feminized"
							value={editModePlant?.isFeminized || false}
							onChange={e =>
								setEditModePlant({
									...editModePlant,
									isFeminized: e.currentTarget.checked,
								})
							}
						/>
					}
					label="Is Feminized"
				/>
			</FormGroup>
			<TextField
				label="Target PH"
				{...textFieldProps}
				value={editModePlant?.targetPH || ''}
				type="number"
				inputProps={{ step: 0.1 }}
				onChange={e =>
					setEditModePlant({
						...editModePlant,
						targetPH: Number(e.currentTarget.value),
					})
				}
			/>
			<TextField
				label="Transplant Date"
				{...dateFieldProps}
				value={editModePlant?.transplantDate?.substring(0, 10) || ''}
				type="date"
				onChange={e =>
					setEditModePlant({
						...editModePlant,
						transplantDate: toShortDate(e.currentTarget.value),
					})
				}
			/>
			<TextField
				label="Harvest Date"
				{...dateFieldProps}
				value={editModePlant?.harvestDate?.substring(0, 10) || ''}
				type="date"
				onChange={e =>
					setEditModePlant({
						...editModePlant,
						harvestDate: toShortDate(e.currentTarget.value),
					})
				}
			/>

			<Autocomplete
				options={['Seed', 'Active', 'Terminated']}
				renderInput={params => <TextField {...params} label="Status" {...textFieldProps} />}
				value={editModePlant?.status || ''}
				inputValue={editModePlant?.status || ''}
				onChange={(event, newValue) => {
					setEditModePlant({
						...editModePlant,
						status: newValue || undefined,
						terminationReason: newValue !== 'Terminated' ? undefined : editModePlant.terminationReason,
					});
				}}
				onInputChange={() => {
					// Required for the Autocomplete to be considered "controlled"
				}}
				selectOnFocus
				clearOnBlur
				handleHomeEndKeys
				freeSolo
			/>
			{editModePlant.status === 'Terminated' && (
				<TextField
					label="Termination Reason"
					{...textFieldProps}
					value={editModePlant.terminationReason || ''}
					onChange={e =>
						setEditModePlant({
							...editModePlant,
							terminationReason: e.currentTarget.value,
						})
					}
				/>
			)}
			<Table
				columnHeaders={["Log Date", "Plant Age"]}
				data={growLogs}
				onRowClick={(growLog: GrowLog) => navigate(`/plants/${growLog.plantId}/growLogs/${growLog.id}`)}
				sx={{ marginTop: 2 }}
				title={"Grow Logs"}
			/>
			<Dialog open={open} onClose={handleClose}>
				<form onSubmit={handleSubmitDialog}>
					<DialogTitle>Add Base Nutrients</DialogTitle>
					<DialogContent>
						<DialogContentText>Did you miss any Nutes in our list? Please, add it!</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							value={addNutesDialog}
							onChange={event => setAddNutesDialog(event.target.value)}
							label="Base Nutrient Brand"
							type="text"
							variant="standard"
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button type="submit">Add</Button>
					</DialogActions>
				</form>
			</Dialog>
		</Box>
	);
};

interface PlantDetailFooterProps {
	viewMode: string;
	setViewMode: React.Dispatch<React.SetStateAction<string>>;
	plantId: string | undefined;
	editModePlant: Plant;
	setEditModePlant: React.Dispatch<React.SetStateAction<Plant>>;
	OGPlant: Plant;
	setDefaultLightingSchedule: (growType?: string) => void;
}
const Footer: React.FC<PlantDetailFooterProps> = ({
	plantId,
	viewMode,
	setViewMode,
	editModePlant,
	setEditModePlant,
	OGPlant,
	setDefaultLightingSchedule,
}: PlantDetailFooterProps) => {
	const navigate = useNavigate();

	const validateForm = () => {
		setEditModePlant({
			...editModePlant,
			name: trimToUndefined(editModePlant.name),
			strain: trimToUndefined(editModePlant.strain),
			breeder: trimToUndefined(editModePlant.breeder),
			terminationReason: trimToUndefined(editModePlant.terminationReason),
		});
	};

	const add = async () => {
		try {
			validateForm();
			const res = await post<PlantSaveDto, PlantDto>('https://localhost:7247/Plant', PlantSaveDto.fromView(editModePlant));

			if (res.parsedBody) {
				const data: Plant = Plant.fromDTO(res.parsedBody);
				setViewMode(ViewMode.VIEW);
				navigate(`/plants/${data.id}`);
			}
		} catch (e: any) {
			console.log(e);
		}
	};
	const update = async () => {
		try {
			validateForm();
			const res = await put<PlantSaveDto, PlantDto>(`https://localhost:7247/Plant/${editModePlant.id}`, PlantSaveDto.fromView(editModePlant));

			if (res.parsedBody) {
				const data: Plant = Plant.fromDTO(res.parsedBody);
				setViewMode(ViewMode.VIEW);
				navigate(`/plants/${data.id}`);
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
		setEditModePlant(OGPlant);
		setDefaultLightingSchedule(OGPlant.growType);
	};

	return (
		<Box display="flex" justifyContent="space-around">
			{viewMode === ViewMode.ADD && (
				<Button variant="contained" color="error" href="/plants">
					Discard
				</Button>
			)}
			{viewMode === ViewMode.EDIT && (
				<Button variant="contained" color="error" onClick={handleEditDiscard}>
					Discard
				</Button>
			)}

			<Button variant="contained" color="success" onClick={handleSubmit}>
				{viewMode === ViewMode.VIEW ? 'Edit' : 'Save'}
			</Button>
			{viewMode === ViewMode.VIEW && (
				<Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate(`/plants/${plantId}/growlogs/add`)}>
					Add a Grow Log
				</Button>
			)}
		</Box>
	);
};

export default Layout;
