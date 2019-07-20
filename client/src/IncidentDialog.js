import React from 'react';
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


export default class IncidentDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            problem: '',
            solution: '',
            selectedContext: props.appContext
        };
    }

    handleContextSelection = (contextSelection) => {
        this.setState({selectedContext: contextSelection});
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    postIncidentToDatabase = () => {
        const incidentObj = {
            problem: this.state.problem,
            solution: this.state.solution,
            context: this.state.selectedContext
        };

        fetch('/api/incidents', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(incidentObj),
        });
        return incidentObj;
    }

    save = () => {
        const incident = this.postIncidentToDatabase();
        this.props.onAddFunc(incident);
        this.handleClose();
    }

    render() {
        return (
            <div className="add-button" title="report incident">
                <Fab color="primary" onClick={this.handleClickOpen}>
                    <AddIcon />
                </Fab>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
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
                            (event) => this.setState({problem: event.target.value})
                            }
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Solution"
                            fullWidth
                            onChange={
                            (event) => this.setState({solution: event.target.value})
                            }
                        />
                        <ContextSelector
                            setContext={this.handleContextSelection}
                            selectedContext={this.props.appContext}
                            contexts={this.props.contexts} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.save} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
