import './App.css'
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Divider,
    FormControl,
    FormHelperText,
    InputLabel, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
    MenuItem,
    Paper,
    Select, type SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import * as React from "react";
import useEdcVersions from "./hooks/useEdcVersions.ts";
import AddDependenciesDialog from "./components/AddDependenciesDialog.tsx";
import type {MavenPackageDTO} from "./api/models/maven-package-dto.ts";
import RemoveCircle from '@mui/icons-material/RemoveCircle';
import type {ProjectCreateDTO} from "./api/models/project-create-dto.ts";
import useGenerateProject from "./hooks/useGenerateProject.ts";

function App() {
    const {edcVersions, getEdcVersionsError, isLoading} = useEdcVersions();
    const [selectedVersion, setSelectedVersion] = React.useState<string>('');
    const [selectedVersionError, setSelectedVersionError] = React.useState<boolean>(false);
    const [open, setOpen] = React.useState(false);
    const [selectedMavenPackages, setSelectedMavenPackages] = React.useState<MavenPackageDTO[]>([]);
    const [selectedMavenPackagesError, setSelectedMavenPackagesError] = React.useState<boolean>(false);
    const [projectName, setProjectName] = React.useState<string>('');
    const [projectNameError, setProjectNameError] = React.useState<boolean>(false);
    const [groupId, setGroupId] = React.useState<string>('');
    const [groupIdError, setGroupIdError] = React.useState<boolean>(false);
    const {isGeneratingProject, createProject} = useGenerateProject();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelect = (value: MavenPackageDTO) => () => {
        const currentIndex = selectedMavenPackages.findIndex(item => item.id === value.id);
        const newChecked = [...selectedMavenPackages];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setSelectedMavenPackages(newChecked);
    };

    const handleGenerateProject = () => {
        if (!isFormValid()) {
            return;
        }

        const projectCreateDto: ProjectCreateDTO = {
            projectName: projectName,
            groupId: groupId,
            dependencies: selectedMavenPackages
        }

        createProject(projectCreateDto);
    }

    const isFormValid = (): boolean => {
        let isValid = false;

        if (selectedVersion === '') {
            setSelectedVersionError(true);
        } else {
            setSelectedVersionError(false);
            isValid = true;
        }

        if (selectedMavenPackages.length === 0) {
            setSelectedMavenPackagesError(true);
        } else {
            setSelectedMavenPackagesError(false);
            isValid = true;
        }

        if (projectName === '') {
            setProjectNameError(true);
        } else {
            setProjectNameError(false);
            isValid = true;
        }

        if (groupId === '') {
            setGroupIdError(true);
        } else {
            setGroupIdError(false);
            isValid = true;
        }

        return isValid;
    }

    return (
        <>
            <Box sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '2em',
                padding: '2.5em 0',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Typography
                    component="h1"
                    variant="h3">
                    EDC Project Initializer
                </Typography>

                {(() => {
                    if (isLoading) {
                        return <CircularProgress/>;
                    } else if (getEdcVersionsError) {
                        return (
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Alert severity="error" variant="outlined" sx={{maxWidth: 500}}>
                                    {getEdcVersionsError}
                                </Alert>
                            </Box>
                        );
                    } else {
                        return (
                            <Paper
                                elevation={6}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    minWidth: 1200,
                                    minHeight: 600,
                                    maxHeight: 600,
                                    padding: '1em'
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flex: 1,
                                        overflowY: 'hidden',
                                    }}
                                >
                                    <Box sx={{flex: 1, padding: '1em'}}>
                                        <Typography
                                            component="h2"
                                            variant="h4"
                                            sx={{marginBottom: '1em'}}
                                        >
                                            Project Settings
                                        </Typography>

                                        <FormControl fullWidth sx={{marginBottom: '2em'}} error={selectedVersionError}>
                                            <InputLabel id="edc-version-select">EDC Version</InputLabel>
                                            <Select
                                                labelId="edc-version-select"
                                                id="edc-version-select"
                                                label="EDC Version"
                                                value={selectedVersion}
                                                onChange={(e: SelectChangeEvent) => {
                                                    setSelectedVersion(e.target.value);
                                                }}
                                            >
                                                {edcVersions.map((edcVersion) => (
                                                    <MenuItem key={edcVersion.name} value={edcVersion.name}>
                                                        {edcVersion.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {selectedVersionError &&
                                                <FormHelperText>You have to select a version.</FormHelperText>}
                                        </FormControl>

                                        <FormControl fullWidth sx={{marginBottom: '2em'}} error={projectNameError}>
                                            <TextField
                                                required
                                                error={projectNameError}
                                                value={projectName}
                                                onChange={(e) => setProjectName(e.target.value)}
                                                id="project-name-text-field"
                                                label="Project Name"
                                                variant="outlined"/>

                                            {projectNameError &&
                                                <FormHelperText>Project name is required.</FormHelperText>}
                                        </FormControl>

                                        <FormControl fullWidth error={groupIdError}>
                                            <TextField
                                                required
                                                error={groupIdError}
                                                value={groupId}
                                                onChange={(e) => setGroupId(e.target.value)}
                                                id="group-id-text-field"
                                                label="Group Id"
                                                variant="outlined"/>

                                            {groupIdError && <FormHelperText>Group Id is required.</FormHelperText>}
                                        </FormControl>
                                    </Box>

                                    <Divider orientation="vertical" variant="middle" flexItem/>

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
                                        {selectedMavenPackages.length > 0 ? (
                                            <Box sx={{flexGrow: 1, height: '80%', overflowY: 'auto', p: 2}}>
                                                <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                                                    {selectedMavenPackages.map((mavenPackage: MavenPackageDTO) => (
                                                        <React.Fragment key={mavenPackage.id}>
                                                            <ListItem>
                                                                <ListItemButton onClick={handleSelect(mavenPackage)}>
                                                                    <ListItemText
                                                                        id={mavenPackage.id}
                                                                        primary={mavenPackage.name}
                                                                    />
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
                                        ) : (
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
                                                    <Alert severity="error" variant="outlined" sx={{ marginTop: '1em' }}>
                                                        You have to select at least one dependency.
                                                    </Alert>
                                                }
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: '6em'
                                    }}
                                >
                                    <Button
                                        variant='contained'
                                        loading={isGeneratingProject}
                                        onClick={handleGenerateProject}>
                                        Generate Project
                                    </Button>
                                </Box>
                            </Paper>
                        );
                    }
                })()}
            </Box>
            <AddDependenciesDialog
                open={open}
                handleClose={handleClose}
                selectedVersion={selectedVersion}
                selectedMavenPackages={selectedMavenPackages}
                handleSelect={handleSelect}
            />
        </>
    )
}

export default App
