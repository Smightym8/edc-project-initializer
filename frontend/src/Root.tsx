import {SnackbarProvider} from "./provider/SnackbarProvider.tsx";
import App from "./App.tsx";
import * as React from "react";

const Root = (): React.ReactElement => {
    return (
        <SnackbarProvider>
            <App />
        </SnackbarProvider>
    );
};

export default Root;