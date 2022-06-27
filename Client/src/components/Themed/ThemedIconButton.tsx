import { IconButton, IconButtonProps } from "@mui/material";
import React, { ReactNode } from "react";
import ThemedComponent from "./ThemedComponent";

interface ThemedIconButtonProps extends IconButtonProps {
    children?: ReactNode;
}

const ThemedIconButton: React.FC<ThemedIconButtonProps> = (props) => {
    const sx = {
        ...ThemedComponent.sx,
        ...props.sx,
    };
    return (
        <IconButton sx={sx} {...props}>
            {props.children}
        </IconButton>
    );
};

export default ThemedIconButton;
