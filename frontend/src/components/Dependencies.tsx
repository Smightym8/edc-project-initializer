import {
    Alert,
    Box,
    Button,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import * as React from "react";
import type {MavenPackageDTO} from "../api/models/maven-package-dto.ts";
import AddDependenciesDialog from "./AddDependenciesDialog.tsx";
import {RemoveCircle} from "@mui/icons-material";

interface DependenciesProps {
    selectedVersion: string;
    selectedMavenPackages: MavenPackageDTO[];
    selectedMavenPackagesError: boolean;
    handleSelect: (value: MavenPackageDTO) => () => void;
}

const Dependencies = ({
                          selectedVersion,
                          selectedMavenPackages,
                          selectedMavenPackagesError,
                          handleSelect
                      }: DependenciesProps) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let content;
    if (selectedMavenPackages.length > 0) {
        content = (
            <Box sx={{flexGrow: 1, height: '80%', overflowY: 'auto', p: 2}}>
                <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                    {selectedMavenPackages.map((mavenPackage: MavenPackageDTO) => (
                        <React.Fragment key={mavenPackage.id}>
                            <ListItem>
                                <ListItemButton
                                    onClick={handleSelect(mavenPackage)}>
                                    <ListItemText
                                        id={mavenPackage.id}
                                        primary={mavenPackage.name}/>
                                    <ListItemIcon>
                                        <RemoveCircle color="error"/>
                                    </ListItemIcon>
                                </ListItemButton>
                            </ListItem>
                            <Divider/>
                        </React.Fragment>
                    ))}
                </List>
            </Box>
        );
    } else {
        content = (
            <Box sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80%',
                color: 'text.secondary'
            }}>
                <Typography sx={{
                    color: 'text.secondary'
                }}>
                    No dependencies selected
                </Typography>

                {selectedMavenPackagesError &&
                    <Alert severity="error" variant="outlined"
                           sx={{marginTop: '1em'}}>
                        You have to select at least one dependency.
                    </Alert>}
            </Box>
        );
    }

    return (
        <>
            <Box sx={{flex: 1, padding: '1em'}}>
                <Box sx={{display: 'flex', marginBottom: '1em'}}>
                    <Typography
                        component="h2"
                        variant="h4"
                    >
                        Dependencies
                    </Typography>

                    <Button
                        variant="contained"
                        sx={{marginLeft: 'auto'}}
                        onClick={handleClickOpen}
                        disabled={selectedVersion === ''}
                    >
                        Add Dependencies
                    </Button>
                </Box>
                {content}
            </Box>
            <AddDependenciesDialog
                open={open}
                handleClose={handleClose}
                selectedVersion={selectedVersion}
                selectedMavenPackages={selectedMavenPackages}
                handleSelect={handleSelect}/>
        </>
    );
}

export default Dependencies;