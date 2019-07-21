import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';


function AddButton({handleClickOpen}) {
    return (
        <div className="add-button" title="report incident">
            <Fab color="primary" onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
        </div>
    )
}

export default AddButton;
