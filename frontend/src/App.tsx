import './App.css'
import {
    Box,
    Button,
    CircularProgress,
    Divider,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Paper,
    Select, type SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";
import * as React from "react";
import useEdcVersions from "./hooks/useEdcVersions.ts";
import AddDependenciesDialog from "./components/AddDependenciesDialog.tsx";

function App() {
    const {edcVersions, error, isLoading} = useEdcVersions();
    const [selectedVersion, setSelectedVersion] = React.useState<string>('');
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '2em',
                paddingTop: '2.5em',
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
                    } else if (error) {
                        return (
                            <Typography
                                component="h2"
                                variant="h5"
                                sx={{textAlign: 'center'}}
                            >
                                {`Error loading EDC versions: ${error}`}
                            </Typography>
                        );
                    } else {
                        return (
                            <Paper
                                elevation={6}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    minWidth: 1200,
                                    minHeight: 500,
                                    padding: '1em',
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

                                    <FormControl fullWidth required sx={{marginBottom: '2em'}}>
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
                                        <FormHelperText>Required</FormHelperText>
                                    </FormControl>

                                    <FormControl fullWidth sx={{marginBottom: '2em'}}>
                                        <TextField
                                            required
                                            id="project-name-text-field"
                                            label="Project Name"
                                            variant="outlined"/>
                                        <FormHelperText>Required</FormHelperText>
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <TextField
                                            required
                                            id="group-id-text-field"
                                            label="Group Id"
                                            variant="outlined"/>
                                        <FormHelperText>Required</FormHelperText>
                                    </FormControl>
                                </Box>

                                <Divider orientation="vertical" variant="middle" flexItem/>

                                <Box sx={{flex: 1, padding: '1rem'}}>
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
                                </Box>
                            </Paper>
                        );
                    }
                })()}
            </Box>
            <AddDependenciesDialog open={open} handleClose={handleClose}/>
        </>
    )
}

export default App
