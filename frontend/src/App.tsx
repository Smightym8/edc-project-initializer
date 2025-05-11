import './App.css'
import {
    Box,
    Divider,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from "@mui/material";
import * as React from "react";

function App() {
    const [edcVersions] = React.useState<string[]>(['0.12.0', '0.11.0', '0.10.0', '0.9.0', '0.8.0', '0.7.0', '0.6.0', '0.5.0']);

    return (
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

            <Paper
                elevation={6}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    minWidth: 1200,
                    minHeight: 500,
                    padding: '1em'
                }}>
                <Box sx={{flex: 1, padding: '1em'}}>
                    <Typography
                        component="h2"
                        variant="h4"
                        sx={{textAlign: 'center', marginBottom: '1em'}}>
                        Project Settings
                    </Typography>

                    <FormControl fullWidth required sx={{marginBottom: '2em'}}>
                        <InputLabel id="edc-version-select">EDC Version</InputLabel>
                        <Select
                            labelId="edc-version-select"
                            id="edc-version-select"
                            label="EDC Version"
                        >
                            {edcVersions.map((edcVersion) => (
                                <MenuItem key={edcVersion} value={edcVersion}>
                                    {edcVersion}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth sx={{marginBottom: '2em'}}>
                        <TextField required
                                   id="project-name-text-field"
                                   label="Project Name"
                                   variant="outlined"
                        />
                        <FormHelperText>Required</FormHelperText>
                    </FormControl>

                    <FormControl fullWidth>
                        <TextField required
                                   id="group-id-text-field"
                                   label="Group Id"
                                   variant="outlined"
                        />
                        <FormHelperText>Required</FormHelperText>
                    </FormControl>
                </Box>

                <Divider orientation="vertical" variant="middle" flexItem/>

                <Box sx={{flex: 1, padding: '1rem'}}>
                    <Typography
                        component="h2"
                        variant="h4"
                        sx={{textAlign: 'center', marginBottom: '1em'}}>
                        Dependencies
                    </Typography>
                </Box>
            </Paper>
        </Box>
    )
}

export default App
