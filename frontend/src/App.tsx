import './App.css'
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Divider,
    Paper,
    Typography, useColorScheme
} from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import * as React from "react";
import useEdcVersions from "./hooks/useEdcVersions.ts";
import type {MavenPackageDTO} from "./api/models/maven-package-dto.ts";
import type {ProjectCreateDTO} from "./api/models/project-create-dto.ts";
import useGenerateProject from "./hooks/useGenerateProject.ts";
import ProjectSettings from "./components/ProjectSettings.tsx";
import Dependencies from "./components/Dependencies.tsx";

function App() {
    const {edcVersions, getEdcVersionsError, isLoading} = useEdcVersions();
    const [selectedVersion, setSelectedVersion] = React.useState<string>('');
    const [selectedVersionError, setSelectedVersionError] = React.useState<boolean>(false);
    const [selectedMavenPackages, setSelectedMavenPackages] = React.useState<MavenPackageDTO[]>([]);
    const [selectedMavenPackagesError, setSelectedMavenPackagesError] = React.useState<boolean>(false);
    const [projectName, setProjectName] = React.useState<string>('');
    const [projectNameError, setProjectNameError] = React.useState<boolean>(false);
    const [groupId, setGroupId] = React.useState<string>('');
    const [groupIdError, setGroupIdError] = React.useState<boolean>(false);
    const {isGeneratingProject, createProject} = useGenerateProject();
    const {mode, setMode} = useColorScheme();

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
        let isValid = true;

        if (selectedVersion === '' || isStringOnlyWhitespace(selectedVersion)) {
            setSelectedVersionError(true);
            isValid = false;
        } else {
            setSelectedVersionError(false);
        }

        if (selectedMavenPackages.length === 0) {
            setSelectedMavenPackagesError(true);
            isValid = false;
        } else {
            setSelectedMavenPackagesError(false);
        }

        if (projectName === '' || isStringOnlyWhitespace(projectName)) {
            setProjectNameError(true);
            isValid = false;
        } else {
            setProjectNameError(false);
        }

        if (groupId === '' || isStringOnlyWhitespace(groupId)) {
            setGroupIdError(true);
            isValid = false;
        } else {
            setGroupIdError(false);
        }

        return isValid;
    }

    const isStringOnlyWhitespace = (str: string): boolean => {
        return str.trim().length === 0;
    };

    return (
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
            <Box sx={{display: 'flex', alignItems: 'center', width: '100%'}}>
                <Typography
                    component="h1"
                    variant="h3"
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}
                >
                    EDC Project Initializer
                </Typography>
                <Box sx={{marginLeft: 'auto', zIndex: 1, pr: 10}}>
                    {mode === 'dark' ? (
                        <LightModeIcon
                            sx={{cursor: 'pointer', fontSize: 40}}
                            onClick={() => setMode('light')}
                        />
                    ) : (
                        <DarkModeIcon
                            sx={{cursor: 'pointer', fontSize: 40}}
                            onClick={() => setMode('dark')}
                        />
                    )}
                </Box>
            </Box>

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
                                <ProjectSettings edcVersions={edcVersions} selectedVersion={selectedVersion}
                                                 setSelectedVersion={setSelectedVersion}
                                                 selectedVersionError={selectedVersionError}
                                                 projectName={projectName} setProjectName={setProjectName}
                                                 projectNameError={projectNameError} groupId={groupId}
                                                 setGroupId={setGroupId} groupIdError={groupIdError}/>

                                <Divider orientation="vertical" variant="middle" flexItem/>

                                <Dependencies selectedVersion={selectedVersion}
                                              selectedMavenPackages={selectedMavenPackages}
                                              selectedMavenPackagesError={selectedMavenPackagesError}
                                              handleSelect={handleSelect}/>
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
    )
}

export default App
