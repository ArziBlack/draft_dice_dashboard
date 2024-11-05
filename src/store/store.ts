import { action, thunk, createStore, Action, Thunk } from "easy-peasy";
import axios from "axios";
import { IHome, ILibrary } from "./types";

interface ISubscribers {
  id: number;
  name: string;
  isSubscribed: boolean;
}

export interface StoreModel {
  subscribers: ISubscribers[];
  home_post: IHome[];
  library_post: ILibrary[];
  loading: boolean;
  message: string | null;
  error: string | null;

  fetchHome_Posts: Thunk<StoreModel>;
  fetchLibrary_Posts: Thunk<StoreModel>;
  createHome_Post: Thunk<StoreModel, IHome>;
  createLibraryPosts: Thunk<StoreModel, ILibrary>;
  SetSubscribers: Action<StoreModel, ISubscribers[]>;
  setHome_posts: Action<StoreModel, IHome[]>;
  setMessage: Action<StoreModel, string | null>;
  setLibrary_posts: Action<StoreModel, ILibrary[]>;
  setLoading: Action<StoreModel, boolean>;
  setError: Action<StoreModel, string | null>;

  fetchSubscribers: Thunk<StoreModel>;
}

const storeModel: StoreModel = {
  subscribers: [],
  home_post: [],
  library_post: [],
  loading: false,
  message: "",
  error: null,

  SetSubscribers: action((state, payload) => {
    state.subscribers = payload;
  }),

  setMessage: action((state, payload) => {
    state.message = payload;
  }),

  setHome_posts: action((state, payload) => {
    state.home_post = payload;
  }),

  setLibrary_posts: action((state, payload) => {
    state.library_post = payload;
  }),

  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
  setError: action((state, payload) => {
    state.error = payload;
  }),

  fetchSubscribers: thunk(async (actions) => {
    actions.setLoading(true);
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      actions.SetSubscribers(response.data);
      actions.setError(null);
    } catch (error) {
      actions.setError("Failed to fetch users");
    } finally {
      actions.setLoading(false);
    }
  }),

  createHome_Post: thunk(async (actions, payload) => {
    actions.setLoading(true);
    try {
      const response = await axios.post("www.com", payload);
      actions.setMessage(response.data.message);
      actions.setError(null);
      return response.data.message;
    } catch (error) {
      actions.setError("Failed to create a home post");
    } finally {
      actions.setLoading(false);
    }
  }),

  createLibraryPosts: thunk(async (actions, payload) => {
    actions.setLoading(true);
    try {
      const response = await axios.post("www.com", payload);
      actions.setMessage(response.data.message);
      actions.setError(null);
      return response.data.message;
    } catch (error) {
      actions.setError("Failed to create a library post");
    } finally {
      actions.setLoading(false);
    }
  }),

  fetchHome_Posts: thunk(async (actions) => {
    actions.setLoading(true);
    try {
      const response = await axios.get("www.com");
      actions.setHome_posts(response.data);
      actions.setError(null);
    } catch (error) {
      actions.setError("Failed to fetch posts");
    } finally {
      actions.setLoading(false);
    }
  }),

  fetchLibrary_Posts: thunk(async (actions) => {
    actions.setLoading(true);
    try {
      const response = await axios.get("www.com");
      actions.setLibrary_posts(response.data);
      actions.setError(null);
    } catch (error) {
      actions.setError("Failed to fetch posts");
    } finally {
      actions.setLoading(false);
    }
  }),
};

export const store = createStore(storeModel);
