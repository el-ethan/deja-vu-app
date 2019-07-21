import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import {ContextSelector} from './ContextSelector';


function IncidentDialog(props) {

    const [modalOpen, setModelOpen] = useState(false)
    const [problem, setProblem] = useState('');
    const [solution, setSolution] = useState('');
    const [selectedContext, setSelectedContext] = useState(props.appContext);

    const handleContextSelection = (contextSelection) => {
        setSelectedContext(contextSelection)
    }

    const handleClickOpen = () => {
        setModelOpen(true);
    };

    const handleClose = () => {
        setModelOpen(false);
    };

    const postIncidentToDatabase = () => {
        const incidentObj = {
            problem: problem,
            solution: solution,
            context: selectedContext
        };

        fetch('/api/incidents', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(incidentObj),
        });
        return incidentObj;
    }

    const save = () => {
        const incident = postIncidentToDatabase();
        props.onAddFunc(incident);
        handleClose();
    }

    return (
        <div className="add-button" title="report incident">
            <Fab color="primary" onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <Dialog
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Report Incident</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add details about the incident.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Problem"
                        fullWidth
                        multiline
                        rowsMax="4"
                        onChange={
                        (event) => setProblem(event.target.value)
                        }
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Solution"
                        fullWidth
                        onChange={
                        (event) => setSolution(event.target.value)
                        }
                    />
                    <ContextSelector setContext={handleContextSelection}
                                     selectedContext={props.appContext} />
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
        </div>
    );
}

export default IncidentDialog;
