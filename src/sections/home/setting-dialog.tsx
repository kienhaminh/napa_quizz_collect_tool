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
import type { FC } from 'react';
import { ITeamInfo } from 'src/types/team';
import { getTeam } from 'src/api/request';

interface Props {
  onSubmit: (teamInfo: ITeamInfo) => void;
}

const SettingDialog: FC<Props> = ({ onSubmit }) => {
  const { handleClose, handleOpen, open } = useDialog();
  const [teamName, setTeamName] = useState('');

  const fetchTeamInfo = async () => {
    try {
      const res = await getTeam({ teamName });
      onSubmit(res);
      handleClose();
    } catch (err) {}
  };

  useEffect(() => {
    handleOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog
      onClose={handleClose}
      open={open}
    >
      <DialogTitle>Set game data</DialogTitle>
      <DialogContent>
        <Stack>
          <TextField
            label="Team Name"
            onChange={(e) => setTeamName(e.target.value)}
            value={teamName}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          variant="contained"
          onClick={fetchTeamInfo}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default SettingDialog;
