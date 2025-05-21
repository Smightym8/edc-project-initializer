import {SnackbarProvider} from "./provider/SnackbarProvider.tsx";
import App from "./App.tsx";
import * as React from "react";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const theme = createTheme({
    colorSchemes: {
        dark: true,
    },
});

const Root = (): React.ReactElement => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider>
                <App/>
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default Root;