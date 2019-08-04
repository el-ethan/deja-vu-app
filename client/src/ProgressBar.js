import React from 'react';
import PropTypes from 'prop-types';
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

ProgressBar.propTypes = {
    loadInProgress: PropTypes.bool.isRequired
};

export default ProgressBar;
