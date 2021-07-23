import { useState } from 'react';

import {
  Box,
  Paper,
  Hidden,
  Button,
  InputBase,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
  alpha,
} from '@material-ui/core';

import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';

import { useUsers } from '../context/UseUsersContext';

import { Modal } from '../components/Modal';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Home(): JSX.Element {
  const { users } = useUsers();

  const [open, setOpen] = useState(false);

  const handleToggleModal = () => setOpen(!open);

  return (
    <Paper elevation={3}>
      <Box p={2}>
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
              onClick={handleToggleModal}
            >
              Novo Usuário
            </Button>
          </Hidden>

          <Hidden smUp>
            <Button
              variant="contained"
              size="small"
              onClick={handleToggleModal}
            >
              <AddIcon fontSize="small" />
            </Button>
          </Hidden>

          <Modal open={open} onClose={handleToggleModal} />
        </Box>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Pesquisar…"
            inputProps={{ 'aria-label': 'pesquisar' }}
          />
        </Search>

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
                  <TableCell padding="none">
                    <Box gap={1} display="flex" justifyContent="flex-end">
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
      </Box>
    </Paper>
  );
}
