import * as React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

interface EdcVersionConfirmationDialogProps {
    open: boolean;
    handleClose: (isConfirmed: boolean) => void;
}

const EdcVersionConfirmationDialog: React.FC<EdcVersionConfirmationDialogProps> = ({
                                                                                       open,
                                                                                       handleClose,
                                                                                   }) => {
    return (
        <Dialog open={open} onClose={() => handleClose(false)}>
            <DialogTitle id="edc-version-confirmation-dialog-title">
                {"Do you want to change the EDC version?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    If you change the EDC version, all selected dependencies will be removed.
                    The dependencies need to have all the same EDC version.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => handleClose(false)}>No</Button>
                <Button variant="contained" onClick={() => handleClose(true)} color="primary">Yes</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EdcVersionConfirmationDialog;