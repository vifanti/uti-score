import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import faker from 'faker';

faker.locale = 'pt_BR';
// import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface TokenData {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

interface AuthState {
  tokenData: TokenData;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@UtiScore:token',
        '@UtiScore:user',
      ]);

      if (token[1] && user[1]) {
        // api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({ tokenData: JSON.parse(token[1]), user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    // const response = await api.post('sessions', {
    //   email,
    //   password,
    // });

    const { tokenData, user } = {
      tokenData: {
        access_token: 'access_token',
        expires_in: 5,
        refresh_token: 'refresh_token',
        scope: 'scope',
        token_type: 'token_type',
      },
      user: {
        id: 'id',
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: 'email',
        avatarUrl: 'https://i.pravatar.cc/150',
      },
    };

    await AsyncStorage.multiSet([
      ['@UtiScore:token', JSON.stringify(tokenData)],
      ['@UtiScore:user', JSON.stringify(user)],
    ]);

    // api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ tokenData, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@UtiScore:user', '@UtiScore:token']);

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      await AsyncStorage.setItem('@UtiScore:user', JSON.stringify(user));

      setData({
        tokenData: data.tokenData,
        user,
      });
    },
    [setData, data.tokenData],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, loading, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
