import {
    Box,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    type SelectChangeEvent, TextField,
    Typography
} from "@mui/material";
import * as React from "react";


interface ProjectSettingsProps {
    edcVersions: { name: string }[];
    selectedVersion: string;
    setSelectedVersion: (value: string) => void;
    selectedVersionError: boolean;
    projectName: string;
    setProjectName: (value: string) => void;
    projectNameError: boolean;
    groupId: string;
    setGroupId: (value: string) => void;
    groupIdError: boolean;
}

const ProjectSettings: React.FC<ProjectSettingsProps> = ({
                                                             edcVersions,
                                                             selectedVersion,
                                                             selectedVersionError,
                                                             setSelectedVersion,
                                                             projectName,
                                                             setProjectName,
                                                             projectNameError,
                                                             groupId,
                                                             setGroupId,
                                                             groupIdError
                                                         }) => {
    return (
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
    );
}

export default ProjectSettings;