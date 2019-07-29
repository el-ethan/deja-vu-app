import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

function ProgressBar({loadInProgress}) {

    return (
        <div>
            {
                loadInProgress && <LinearProgress style={{marginTop: '1rem'}} />
            }
        </div>
    );
};

export default ProgressBar;
