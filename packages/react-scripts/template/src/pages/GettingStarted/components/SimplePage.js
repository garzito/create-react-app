/* Structural Modules */
import React, { useState } from 'react';

/* UI Modules */
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

/* Functional Modules */
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  section: {
    width: 500,
    margin: 30,
    border: '1px solid #eaeaea',
    padding: 10,
  },
  value: {
    color: '#0367ae',
  },
});

export const SimplePage = () => {
  const classes = useStyles();
  const [boundVal, changeBoundVal] = useState('Simple Tester');
  const [enteredVal, changeEnteredVal] = useState('');
  const [tempVal, changeTempVal] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = e => {
    e.preventDefault();
    setOpen(false);
    changeEnteredVal(tempVal);
  };
  const handleBindingValueChange = e => changeBoundVal(e.target.value);
  const handleTempValueChange = e => changeTempVal(e.target.value);

  return (
    <main>
      <h1>Simple binding example</h1>
      <section className={classes.section}>
        <p>Typing something in the input line will immediately show it in the text below after Hello.</p>
        <TextField
          id="standard-with-placeholder"
          label="Two way binding example"
          fullWidth
          className={classes.textField}
          margin="normal"
          onChange={handleBindingValueChange}
          defaultValue={boundVal}
        />
        <p>Hello <span className={classes.value}>{boundVal}</span>!</p>
      </section>
      <section className={classes.section}>
        <p>
          Click on the "Show Dialog" button to show the dialog. Fill in the City/State field and click "Save".
          This will show what was entered. If you click "Cancel" it will just close the dialog.
        </p>
        <p>City/State From Dialog: <span className={classes.value}>{enteredVal}</span></p>
        <Button variant="contained" color="info" onClick={handleOpen}>Show Dialog</Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <form onSubmit={handleSubmit}>
            <DialogTitle id="form-dialog-title">View</DialogTitle>
            <DialogContent>
              <DialogContentText>
                ID: 101
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="City/State"
                fullWidth
                onChange={handleTempValueChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained" color="info">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </section>
    </main>
  );
};

export default SimplePage;