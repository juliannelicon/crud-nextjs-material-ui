import {
  Box,
  Paper,
  Hidden,
  Button,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';

import {
  Add as AddIcon,
  // Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';

import { useUsers } from '../context/UseUsersContext';

export default function Home(): JSX.Element {
  const { users } = useUsers();

  return (
    <Paper elevation={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
        padding={1}
      >
        <Typography component="h1" variant="h5">
          Gerenciador de Usuários
        </Typography>

        <Hidden smDown>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<AddIcon />}
          >
            Novo Usuário
          </Button>
        </Hidden>

        <Hidden smUp>
          <Button variant="contained" size="small">
            <AddIcon fontSize="small" />
          </Button>
        </Hidden>
      </Box>

      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <Hidden smDown>
                <TableCell>E-mail</TableCell>
              </Hidden>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <Hidden smDown>
                  <TableCell>{user.email}</TableCell>
                </Hidden>
                <TableCell align="right">
                  <Box gap={1} display="flex" justifyContent="end">
                    <Box>
                      <Hidden smDown>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<EditIcon />}
                        >
                          Editar
                        </Button>
                      </Hidden>
                      <Hidden smUp>
                        <Button variant="contained" size="small">
                          <EditIcon fontSize="small" />
                        </Button>
                      </Hidden>
                    </Box>
                    <Box>
                      <Hidden smDown>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<DeleteIcon />}
                        >
                          Apagar
                        </Button>
                      </Hidden>
                      <Hidden smUp>
                        <Button variant="contained" size="small">
                          <DeleteIcon fontSize="small" />
                        </Button>
                      </Hidden>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
