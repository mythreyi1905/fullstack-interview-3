import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function AlertDialog({children, responseController, yes, no, heading, content,openControl, disableYes}) {



  const handleClose = (e,agree) => {
    responseController(agree);
  };

  return (
    <div>
 
      <Dialog
        open={openControl}
        onClose={(e) => handleClose(e, false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      
      >
        <DialogTitle id="alert-dialog-title">
          {heading}
        </DialogTitle>
        <DialogContent >
          <DialogContentText  id="alert-dialog-description">
            {content}
          </DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>

          <Button variant='text' onClick={(e) => handleClose(e,false)}>{no}</Button>
          <Button disabled={disableYes} variant='text' onClick={(e) => handleClose(e,true)} autoFocus>
            {yes}
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}