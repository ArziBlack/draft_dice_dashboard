import { action, thunk, createStore, Action, Thunk } from 'easy-peasy';
import axios from 'axios';

interface User {
  id: number;
  name: string;
}

interface StoreModel {
  users: User[];
  loading: boolean;
  error: string | null;

  setUsers: Action<StoreModel, User[]>;
  setLoading: Action<StoreModel, boolean>;
  setError: Action<StoreModel, string | null>;

  fetchUsers: Thunk<StoreModel>;
}

const storeModel: StoreModel = {
  users: [],
  loading: false,
  error: null,

  setUsers: action((state, payload) => {
    state.users = payload;
  }),

  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
  setError: action((state, payload) => {
    state.error = payload;
  }),

  fetchUsers: thunk(async (actions) => {
    actions.setLoading(true);
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      actions.setUsers(response.data);
      actions.setError(null);
    } catch (error) {
      actions.setError('Failed to fetch users');
    } finally {
      actions.setLoading(false);
    }
  }),
};

export const store = createStore(storeModel);
