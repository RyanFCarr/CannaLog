import {
	Autocomplete,
	Box,
	Button,
	InputAdornment,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { AdditiveDosage } from '../../models/AdditiveDosage';
import MobileStepper from './MobileStepper';
import { Additive, AdditiveType } from '../../models/Additive';
import { AdditiveAdjustment, AdditiveAdjustmentType } from '../../models/AdditiveAdjustment';
import GrowLog from '../../models/GrowLog';

interface NutrientStepperProps {
	additives: Additive[];
	editModeLog: GrowLog;
	setEditModeLog: React.Dispatch<React.SetStateAction<GrowLog>>;
	handleClose: () => void;
}

const NutrientStepper: React.FC<NutrientStepperProps> = ({ editModeLog, setEditModeLog, additives, handleClose }) => {
	const [label, setLabel] = useState<string>('');
	const [activeStep, setActiveStep] = useState<number>(0);

	useEffect(() => {
		if (activeStep === 0) setLabel('Add Nutrients');
		if (activeStep === 1) setLabel('Adjust PH');
	}, [activeStep]);

	const setAdjustment = (type: AdditiveAdjustmentType, adjustment?: AdditiveAdjustment) => {
		if (type === AdditiveAdjustmentType.NUTES) {
			editModeLog.nutrientAdjustment = adjustment;

			if (adjustment) editModeLog.finalPPM = adjustment?.finalReading || adjustment?.initialReading;
		}
		if (type === AdditiveAdjustmentType.PH) {
			editModeLog.phAdjustment = adjustment;

			if (adjustment) editModeLog.finalPH = adjustment?.finalReading || adjustment?.initialReading;
		}

		setEditModeLog({ ...editModeLog });
	};

	return (
		<MobileStepper label={label} activeStep={activeStep} setActiveStep={setActiveStep} maxSteps={2} handleClose={handleClose}>
			{activeStep === 0 && (
				<AdditiveAdjustmentStep
					additiveUoM="PPM"
					adjustment={editModeLog.nutrientAdjustment || new AdditiveAdjustment(AdditiveAdjustmentType.NUTES, editModeLog.initialPPM)}
					setAdjustment={(a?: AdditiveAdjustment) => setAdjustment(AdditiveAdjustmentType.NUTES, a)}
					additives={additives.filter(a => a.type === AdditiveType.NUTES)}
				/>
			)}
			{activeStep === 1 && (
				<AdditiveAdjustmentStep
					additiveUoM="PH"
					adjustment={editModeLog.phAdjustment || new AdditiveAdjustment(AdditiveAdjustmentType.PH, editModeLog.initialPH)}
					setAdjustment={(a?: AdditiveAdjustment) => setAdjustment(AdditiveAdjustmentType.PH, a)}
					additives={additives.filter(a => a.type === AdditiveType.PH)}
				/>
			)}
		</MobileStepper>
	);
};

interface AdditiveAdjustmentProps {
	additiveUoM: string;
	additives: Additive[];
	adjustment: AdditiveAdjustment;
	setAdjustment: (a?: AdditiveAdjustment) => void;
}

const AdditiveAdjustmentStep: React.FC<AdditiveAdjustmentProps> = ({
	additiveUoM,
	additives,
	adjustment,
	setAdjustment,
}: AdditiveAdjustmentProps) => {
	const handleAddAdditive = () => {
		if (adjustment.dosages) {
			adjustment.dosages.push(new AdditiveDosage());
		} else {
			adjustment.dosages = [new AdditiveDosage()];
		}

		setAdjustment(adjustment);
	};

	const handleDosageAmount = (value: string, i: number): void => {
		if (!adjustment.dosages) return;

		adjustment.dosages[i] = {
			...adjustment.dosages[i],
			amount: value ? Number.parseFloat(value) : undefined,
		};
		setAdjustment(adjustment);
	};

	const handleAdditiveChange = (name: string, i: number) => {
		if (!adjustment.dosages) return;
		adjustment.dosages[i].additive = additives.find(a => a.name === name)!;
		setAdjustment(adjustment);
	};

	const handleRemove = (index: number) => {
		if (!adjustment.dosages) return;
		adjustment.dosages.splice(index, 1);
		setAdjustment(adjustment);
	};

	const handleFinal = (value?: number) => {
		setAdjustment({ ...adjustment, finalReading: value });
	};

	return (
		<>
			<TableContainer component={Paper} sx={{ mb: 3 }}>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell sx={{ pl: 1, pr: 0 }}></TableCell>
							<TableCell>Additive</TableCell>
							<TableCell align="right">Amount</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{adjustment.dosages &&
							adjustment.dosages.map((dosage, i) => (
								<TableRow
									key={i}
									sx={{
										'&:last-child td, &:last-child th': {
											border: 0,
										},
									}}
								>
									<TableCell align="center" sx={{ pl: 1, pr: 0 }}>
										<CloseIcon
											sx={{
												mt: '16px',
												color: 'error.light',
											}}
											onClick={() => handleRemove(i)}
										/>
									</TableCell>
									<TableCell component="th" scope="row">
										{!dosage.additive?.name && (
											<Autocomplete
												options={additives.map(a => a.name)}
												renderInput={params => <TextField {...params} label="Additive" variant="standard" />}
												value={dosage.additive?.name || ''}
												inputValue={dosage.additive?.name || ''}
												onChange={(event, newValue) => {
													if (newValue) {
														handleAdditiveChange(newValue, i);
													} else {
														dosage.additive = undefined;
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
										)}
										{dosage.additive?.name && dosage.additive.name}
									</TableCell>
									<TableCell align="right">
										<TextField
											label="Amount"
											variant="standard"
											value={dosage.amount || ''}
											type="number"
											InputProps={{
												endAdornment: <InputAdornment position="end">{dosage.unitofMeasure}</InputAdornment>,
											}}
											sx={{ width: '90px' }}
											onChange={e => handleDosageAmount(e.currentTarget.value, i)}
										/>
									</TableCell>
								</TableRow>
							))}
						<TableRow>
							<TableCell align="center" colSpan={3}>
								<Button variant="contained" startIcon={<AddIcon />} onClick={handleAddAdditive}>
									Add Additive
								</Button>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
			<Box display="flex">
				<TextField
					label="Initial"
					variant="standard"
					disabled
					value={adjustment.initialReading || ''}
					type="number"
					sx={{ mr: 3 }}
					InputProps={{
						endAdornment: <InputAdornment position="end">{additiveUoM}</InputAdornment>,
					}}
				/>
				<TextField
					label="Final"
					variant="standard"
					value={adjustment.finalReading || ''}
					type="number"
					InputProps={{
						endAdornment: <InputAdornment position="end">{additiveUoM}</InputAdornment>,
					}}
					onChange={e => {
						handleFinal(e.currentTarget.value ? Number.parseFloat(e.currentTarget.value) : undefined);
					}}
				/>
			</Box>
		</>
	);
};

export default NutrientStepper;
