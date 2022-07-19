import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

interface MultiSelectChipProps {
    label: string;
    chips: string[];
    setSelected: (selected: string[]) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(value: string, values: readonly string[], theme: Theme) {
    return {
        fontWeight:
            values.indexOf(value) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const MultiSelectChip: React.FC<MultiSelectChipProps> = ({
    label,
    chips,
    setSelected,
}) => {
    const theme = useTheme();
    const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
        const {
            target: { value },
        } = event;

        // On autofill we get a stringified value.
        const selected = typeof value === "string" ? value.split(",") : value;
        setSelectedValues(selected);
        setSelected(selected);
    };

    return (
        <div>
            <FormControl sx={{ width: 300 }}>
                <InputLabel id="multiple-chip-label">{label}</InputLabel>
                <Select
                    labelId="multiple-chip-label"
                    id="multiple-chip"
                    multiple
                    value={selectedValues}
                    onChange={handleChange}
                    input={
                        <OutlinedInput
                            id="select-multiple-chip"
                            label={label}
                        />
                    }
                    renderValue={(selected) => (
                        <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {chips.map((chip) => (
                        <MenuItem
                            key={chip}
                            value={chip}
                            style={getStyles(chip, selectedValues, theme)}
                        >
                            {chip}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default MultiSelectChip;
