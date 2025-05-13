import {CircularProgress, Dialog, DialogContent, DialogTitle} from "@mui/material";
import useEDCMavenPackages from "../hooks/useEDCMavenPackages.ts";
import type {MavenPackageDTO} from "../api/models/maven-package-dto.ts";

interface AddDependenciesDialogProps {
    open: boolean;
    handleClose: () => void;
}

const AddDependenciesDialog = ({open, handleClose}: AddDependenciesDialogProps) => {
    const {mavenPackagesResponse, error, isLoading} = useEDCMavenPackages();

    let content;

    if (isLoading) {
        content = <CircularProgress/>;
    } else if (error) {
        content = <p>{error}</p>;
    } else {
        content = (
            <ul>
                {mavenPackagesResponse?.mavenPackages.map((mavenPackage: MavenPackageDTO) => (
                    <li key={mavenPackage.id}>
                        {mavenPackage.name}
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Dependencies</DialogTitle>
            <DialogContent>
                {content}
            </DialogContent>
        </Dialog>
    );
}

export default AddDependenciesDialog;