import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ContextSelector} from './ContextSelector';
import {postIncidentToDatabase} from './api'


function IncidentDialog({appContext, onAddFunc, shouldOpen, handleClose}) {

    const [modalOpen, setModelOpen] = useState(shouldOpen)
    const [problem, setProblem] = useState('');
    const [solution, setSolution] = useState('');
    const [selectedContext, setSelectedContext] = useState(appContext);

    const handleContextSelection = (contextSelection) => {
        setSelectedContext(contextSelection)
    }

    const save = ({incident}) => {
        if (incident) {
            update(incident)
        } else {
            const savedIncident = postIncidentToDatabase(problem, solution, selectedContext);
            if (savedIncident) {
                onAddFunc(savedIncident);
            }
        }
        handleClose();
    }

    const update = (incident) => {
        console.log('updating')
        console.log(incident)
    }

    return (
        <Dialog open={shouldOpen} onClose={handleClose}>
            <DialogTitle id="form-dialog-title">Report Incident</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Add details about the incident.
                </DialogContentText>
                <TextField autoFocus
                           margin="dense"
                           id="name"
                           label="Problem"
                           fullWidth
                           multiline
                           rowsMax="4"
                           onChange={(event) => setProblem(event.target.value)}/>
                <TextField margin="dense"
                           id="name"
                           label="Solution"
                           fullWidth
                           onChange={(event) => setSolution(event.target.value)}/>
                <ContextSelector setContext={handleContextSelection}
                                 selectedContext={appContext} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={save} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default IncidentDialog;
