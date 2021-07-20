import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../services/api';

interface User {
  id?: string;
  name: string;
  email: string;
  createdAt?: string;
}

interface UsersContextProps {
  users: User[];
  totalCount: number;
  // getUser: (id: string) => Promise<User>;
  getUsers: (page: number, search?: string) => void;
  createUser: (user: User) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

interface UsersProviderProps {
  children: ReactNode;
}

const UsersContext = createContext<UsersContextProps>({} as UsersContextProps);

export function UsersProvider({ children }: UsersProviderProps): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);

  const [totalCount, setTotalCount] = useState(0);

  async function getUsers(page: number, search = ''): Promise<void> {
    const { data, headers } = await api.get('users', {
      // params: {
      //   page,
      //   name: search,
      // },
    });

    const totalCount = Number(headers['x-total-count']);

    const users = data.users.map((user: User) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        // createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
        //   day: '2-digit',
        //   month: '2-digit',
        //   year: 'numeric',
        // }),
      };
    });

    setUsers(users);
    setTotalCount(totalCount);
  }

  useEffect(() => {
    getUsers(1);
  }, []);

  async function createUser(user: User) {
    try {
      await api.post('users', {
        user: {
          ...user,
          createdAt: new Date(),
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function updateUser(user: User) {
    try {
      const response = await api.put(`users/${user.id}`, {
        user: {
          ...user,
        },
      });

      const newUser = response.data.user;

      setUsers(
        users.map(user => {
          if (user.id === newUser.id) {
            return {
              ...user,
              name: newUser.name,
              email: newUser.email,
            };
          }
          return user;
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteUser(id: string) {
    try {
      await api.delete(`users/${id}`);

      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  // async function getUser(id: string) {
  //   try {
  //     const response = await api.get(`users/${id}`);

  //     return response.data.user;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <UsersContext.Provider
      value={{
        users,
        totalCount,
        // getUser,
        getUsers,
        createUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers(): UsersContextProps {
  const context = useContext(UsersContext);

  return context;
}
