import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDialog } from 'src/hooks/use-dialog';
import { useEffect, useState } from 'react';

const SettingDialog = () => {
  const { handleClose, handleOpen, open } = useDialog();
  const [teamInfo, setTeamInfo] = useState({});

  useEffect(() => {
    handleOpen();
  }, []);

  return (
    <Dialog
      onClose={handleClose}
      open={open}
    >
      <DialogTitle>Set game data</DialogTitle>
      <DialogContent>
        <Stack>
          <TextField label="Team ID or Team Name" />
        </Stack>
      </DialogContent>
      <DialogActions>
        <LoadingButton variant="contained">Submit</LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default SettingDialog;
