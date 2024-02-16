import React from 'react';
import { Alert, Snackbar, SnackbarCloseReason } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast } from '../store/toastSlice'; // Assuming you have a RootState type defined
import { RootState } from '../store';

const Toast: React.FC = () => {
    const { isOpen, text, severity } = useSelector((state: RootState) => state.toast);
    const dispatch = useDispatch();
    
    const handleClose = (event: any, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
          return;
        }
        dispatch(hideToast());
    };
  
    return (
        <Snackbar open={isOpen} autoHideDuration={1500} onClose={handleClose}>
            <Alert variant="filled" severity={severity as any /* or you can add a check for null/undefined */}>
                {text}
            </Alert>
        </Snackbar>
    );
}


export { Toast };
