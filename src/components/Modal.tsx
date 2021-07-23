import {
  Box,
  Grid,
  Button,
  TextField,
  IconButton,
  Typography,
  Modal as MaterialModal,
} from '@material-ui/core';

import { Close as CloseIcon } from '@material-ui/icons';

const style = {
  position: 'absolute' as const,
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

export function Modal({ open, onClose }: ModalProps): JSX.Element {
  return (
    <MaterialModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style }} component="form">
        <IconButton
          onClick={onClose}
          aria-label="close"
          sx={{ mt: -4, float: 'right' }}
        >
          <CloseIcon />
        </IconButton>

        <Typography component="h1" variant="h5">
          Cadastrar Usuário
        </Typography>

        {/* <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}> */}
        <Grid gap={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TextField
              size="small"
              autoComplete="fname"
              name="nome"
              required
              fullWidth
              id="nome"
              label="Nome"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              autoComplete="fname"
              type="email"
              name="email"
              required
              fullWidth
              id="email"
              label="E-mail"
              autoFocus
              sx={{ mt: 2 }}
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Salvar
          </Button>
        </Grid>
      </Box>
    </MaterialModal>
  );
}
