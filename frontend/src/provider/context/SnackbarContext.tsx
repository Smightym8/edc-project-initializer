import {createContext} from "react";
import type {AlertColor} from "@mui/material";

interface SnackbarContextType {
    showSnackbar: (severity: AlertColor, message: string) => void;
}

export const SnackbarContext = createContext<SnackbarContextType | null>(null);