// styles.js

import { makeStyles } from '@mui/styles'; // Importez makeStyles depuis @mui/styles

export const globalStyles = makeStyles((theme) => ({
  cancelButton: {
    color: theme.palette.primary.main,
    // Autres styles personnalisés si nécessaire
  },
  confirmButton: {
    color: theme.palette.error.main,
    // Autres styles personnalisés si nécessaire
  },
  saveButton: {
    color: theme.palette.success.main,
    // Autres styles personnalisés si nécessaire
  },
}));
