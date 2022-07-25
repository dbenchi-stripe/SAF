import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RestoreIcon from "@mui/icons-material/Restore";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const DisasterRecoveryDialog = ({
  openDialog,
  setOpenDialog,
  numberOfAlreadyAnsweredQuestions,
  cancelOnClick,
  restoreOnClick,
}) => (
  <Dialog
    open={openDialog}
    onClose={(_, reason) => {
      // When the user click outside the dialog, the reason is set to backdropClick
      // This code prevents the user from closing the Dialog accidentally by clicking outside the Dialog
      if (reason !== "backdropClick") {
        setOpenDialog(false);
      }
    }}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      Pick up where we left off? &#128517;
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        You have already answered {numberOfAlreadyAnsweredQuestions + 1}{" "}
        questions.
      </DialogContentText>
      <DialogContentText id="alert-dialog-description">
        Do you want to move forward with the latest evaluation?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        startIcon={<DeleteForeverIcon />}
        color="error"
        variant="contained"
        onClick={cancelOnClick}
      >
        No, delete it
      </Button>
      <Button
        startIcon={<RestoreIcon />}
        variant="contained"
        color="success"
        onClick={restoreOnClick}
      >
        Yes, let us continue
      </Button>
    </DialogActions>
  </Dialog>
);
