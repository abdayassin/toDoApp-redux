import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { globalStyles } from './styles'; // Importez les styles globaux

function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  const classes = globalStyles(); // Obtenez les styles globaux définis

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} className={classes.cancelButton}>Cancel</Button> {/* Appliquez la classe de style cancelButton */}
        <Button onClick={onConfirm} className={classes.confirmButton} color="error" autoFocus>Confirm</Button> {/* Appliquez la classe de style confirmButton */}
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
