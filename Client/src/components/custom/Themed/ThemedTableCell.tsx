import { TableCell, TableCellProps } from "@mui/material";
import React, { ReactNode } from "react";
import ThemedComponent from "./ThemedComponent";

interface ThemedCellProps extends TableCellProps {
    children?: ReactNode;
}

const ThemedTableCell: React.FC<ThemedCellProps> = (props) => {
    const sx = {
        ...ThemedComponent.sx,
        ...props.sx,
    };
    return (
        <TableCell sx={sx} {...props}>
            {props.children}
        </TableCell>
    );
};

export default ThemedTableCell;
