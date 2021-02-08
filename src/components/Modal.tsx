import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setStateNewBudget } from '../features/firms/firmsSlice';

type ModalProps = {
  id: number
  text: string
}

const Modal: React.FC<ModalProps> = ({ id, text }) => {
  const [open, setOpen] = useState(false);
  const firm = useSelector((state: RootState) => state.firms.firms.find(firm => firm.id === id));
  const [newBudget, setNewBudget] = useState(0);
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setNewBudget(firm?.budget || 0)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    if (firm) {
      // this should be async action, but I have no server
      dispatch(setStateNewBudget({ id: firm.id, budget: newBudget }));
    }
  };

  const onChangeBudget = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBudget(Number(event.target.value))
  }

  useEffect(() => {
    if (firm) {
      if ((newBudget - firm.budgetSpent) >= 0) {
        setIsValid(true)
      } else {
        setIsValid(false)
      }
    }
  }, [firm, newBudget]);

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {text}
      </Button>
      {
        firm
        ? <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{firm.name}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter new total budget value
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                type="number"
                fullWidth
                value={newBudget}
                onChange={onChangeBudget}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirm} color="primary" disabled={!isValid}>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
          : null
      }

    </div>
  );
}

export default Modal;
