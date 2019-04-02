import React from 'react';

import ReactMarkdown from 'react-markdown';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import CreateIcon from '@material-ui/icons/Create';



function Incident(props) {
    return (
        <Card className="incident-card">
            <DeleteRoundedIcon className="trash-can" onClick={() => props.onDelete(props._id)}/>
            <CreateIcon className="pencil" />
            <CardContent>
                <div className="card-section">
    	            <Typography variant="h5" component="h2">Problem:</Typography>
                    <div className="stacktrace">
                        <ReactMarkdown source={`\`\`\`\n${props.problem}\n\`\`\``} />
                    </div>
                </div>
                <div className="card-section">
                    <Typography variant="h5" component="h2">Solution:</Typography>
                    <ReactMarkdown source={props.solution} />
                </div>
            </CardContent>
    	</Card>
    );
}

export default Incident;
