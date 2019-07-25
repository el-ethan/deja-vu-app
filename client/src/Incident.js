import React, {useState} from 'react';

import ReactMarkdown from 'react-markdown';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import CreateIcon from '@material-ui/icons/Create';
import IncidentDialog from './IncidentDialog';


function Incident({incident, onDelete, _id}) {

    const [incidentModalOpen, setIncidentModalOpen] = useState(false);
    const handleClickOpen = () => {
        setIncidentModalOpen(true);
    };

    const handleModalClose = () => {
        setIncidentModalOpen(false);
    }

    return (
        <React.Fragment>
            <Card className="incident-card">
                <DeleteRoundedIcon className="trash-can" onClick={() => onDelete(_id)}/>
                <CreateIcon className="pencil" onClick={handleClickOpen}/>
                <CardContent>
                    <div className="card-section">
    	                <Typography variant="h5" component="h2">Problem:</Typography>
                        <div className="stacktrace">
                            <ReactMarkdown id="problem-markdown" source={`\`\`\`\n${incident.problem}\n\`\`\``} />
                        </div>
                    </div>
                    <div className="card-section">
                        <Typography variant="h5" component="h2">Solution:</Typography>
                        <ReactMarkdown id="solution-markdown" source={incident.solution} />
                    </div>
                </CardContent>
    	    </Card>
            <IncidentDialog handleClose={handleModalClose}
                            incidentToEdit={incident}
                            shouldOpen={incidentModalOpen}
                            appContext={incident.context}
                            onAddFunc={null} />
        </React.Fragment>
    );
}

export default Incident;
