import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider, FormControl, InputLabel,
    List,
    ListItem,
    ListItemButton,
    ListItemText, MenuItem, Pagination, Select, Typography,
    type SelectChangeEvent, Alert
} from "@mui/material";
import useEdcMavenPackages from "../hooks/useEdcMavenPackages.ts";
import type {MavenPackageDTO} from "../api/models/maven-package-dto.ts";
import {useEffect, useState} from "react";
import * as React from "react";

interface AddDependenciesDialogProps {
    open: boolean;
    handleClose: () => void;
    selectedVersion: string;
    selectedMavenPackages: MavenPackageDTO[];
    handleSelect: (value: MavenPackageDTO) => () => void;
}

const AddDependenciesDialog = ({
                                   open,
                                   handleClose,
                                   selectedVersion,
                                   selectedMavenPackages,
                                   handleSelect
                               }: AddDependenciesDialogProps) => {
    const [pagination, setPagination] = useState({page: 1, pageSize: 25});
    const {mavenPackagesResponse, error, isLoading, fetchMavenPackages} = useEdcMavenPackages(selectedVersion, pagination.page, pagination.pageSize);

    useEffect(() => {
        if (open) {
            fetchMavenPackages();
        }
    }, [open, pagination, fetchMavenPackages, selectedVersion]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPagination(prev => ({...prev, page: value}));
    };

    const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
        const newPageSize = event.target.value;
        setPagination({page: 1, pageSize: newPageSize});
    };

    let content;
    if (isLoading) {
        content = (
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CircularProgress/>
            </Box>
        );
    } else if (error) {
        content = (
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Alert severity="error" variant="outlined" sx={{maxWidth: 500}}>
                    {error}
                </Alert>
            </Box>
        );
    } else if (mavenPackagesResponse?.mavenPackages.length === 0) {
        content = (
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Alert severity="info" variant="outlined" sx={{maxWidth: 500}}>
                    No Maven packages found for the selected version {selectedVersion}.
                </Alert>
            </Box>
        );
    } else {
        content = (
            <>
                <Box sx={{flexGrow: 1, overflowY: 'auto', pr: 1}}>
                    <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                        {mavenPackagesResponse?.mavenPackages.map((mavenPackage: MavenPackageDTO) => (
                            <React.Fragment key={mavenPackage.id}>
                                <ListItem>
                                    <ListItemButton
                                        selected={selectedMavenPackages.some(item => item.id === mavenPackage.id)}
                                        onClick={handleSelect(mavenPackage)}
                                    >
                                        <ListItemText id={mavenPackage.id} primary={mavenPackage.name}/>
                                    </ListItemButton>
                                </ListItem>
                                <Divider/>
                            </React.Fragment>
                        ))}
                    </List>
                </Box>
                <Box sx={{mt: 2}}>
                    <Typography align="center" sx={{mb: 1}}>
                        Page: {mavenPackagesResponse?.paginationInfo.currentPage}
                    </Typography>
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Pagination
                            count={mavenPackagesResponse?.paginationInfo.totalPages}
                            page={mavenPackagesResponse?.paginationInfo.currentPage}
                            onChange={handlePageChange}
                            showFirstButton
                            showLastButton/>
                        <FormControl sx={{minWidth: 120}}>
                            <InputLabel id="page-size-select-label">Rows</InputLabel>
                            <Select
                                labelId="page-size-select-label"
                                id="page-size-select"
                                value={pagination.pageSize}
                                label="Rows"
                                onChange={handlePageSizeChange}
                            >
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={25}>25</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </>
        );
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Add Dependencies</DialogTitle>
            <DialogContent sx={{p: 2}}>
                <Box sx={{display: 'flex', flexDirection: 'column', height: '70vh'}}>
                    {content}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddDependenciesDialog;