import { SxProps, Theme } from "@mui/material/styles";

export default class ThemedComponent {
    public static sx: SxProps<Theme> = {
        color: "text.onDefault",
    };
}