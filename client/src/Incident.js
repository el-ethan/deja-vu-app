import React from 'react';

import ReactMarkdown from 'react-markdown';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import CreateIcon from '@material-ui/icons/Create';



function Incident({problem, solution, onDelete, _id}) {
    return (
        <Card className="incident-card">
            <DeleteRoundedIcon className="trash-can" onClick={() => onDelete(_id)}/>
            <CreateIcon className="pencil" />
            <CardContent>
                <div className="card-section">
    	            <Typography variant="h5" component="h2">Problem:</Typography>
                    <div className="stacktrace">
                        <ReactMarkdown id="problem-markdown" source={`\`\`\`\n${problem}\n\`\`\``} />
                    </div>
                </div>
                <div className="card-section">
                    <Typography variant="h5" component="h2">Solution:</Typography>
                    <ReactMarkdown id="solution-markdown" source={solution} />
                </div>
            </CardContent>
    	</Card>
    );
}

export default Incident;
