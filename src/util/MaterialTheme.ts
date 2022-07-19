import { PaletteOptions, Theme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Theme {
        palette: {
            foreground: {
                default: string;
            }
            background: {
                dark: string;
                onDefault: string;
            },
            text: {
                onDefault: string;
            }
        };
    }
    interface TypeBackground {
        dark?: string;
        onDefault?: string;
    }
    interface TypeText {
        onDefault?: string;
    }
    interface PaletteOptions {
        foreground?: {
            default?: string;
        }
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
    }
}