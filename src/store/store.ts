import { action, thunk, createStore, Action, Thunk } from "easy-peasy";
import { IHome, IHomeResponse, ILibrary, ILibraryResponse } from "./types";
import { axiosInstance } from "@/config/axios";
import { URLS } from "./urls";

interface ISubscribers {
  id: number;
  name: string;
  isSubscribed: boolean;
}

export interface StoreModel {
  subscribers: ISubscribers[];
  home_post: IHomeResponse[];
  library_post: ILibraryResponse[];
  loading: boolean;
  message: string | null;
  error: string | null;
  imageURL: string;

  serverTest: Thunk<StoreModel>;
  fetchHome_Posts: Thunk<StoreModel>;
  fetchLibrary_Posts: Thunk<StoreModel>;
  createHomePost: Thunk<StoreModel, IHome>;
  createLibraryPosts: Thunk<StoreModel, ILibrary>;
  updateHome_Post: Thunk<StoreModel, { id: string; body: IHome }>;
  updateLibrary_Post: Thunk<StoreModel, { id: string; body: ILibrary }>;
  deleteHome_Post: Thunk<StoreModel, string>;
  deleteLibrary_Post: Thunk<StoreModel, string>;

  SetSubscribers: Action<StoreModel, ISubscribers[]>;
  setImageUrl: Action<StoreModel, string>;
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
  imageURL: "",

  SetSubscribers: action((state, payload) => {
    state.subscribers = payload;
  }),

  setMessage: action((state, payload) => {
    state.message = payload;
  }),

  setHome_posts: action((state, payload: IHomeResponse[]) => {
    state.home_post = payload;
  }),

  setLibrary_posts: action((state, payload: ILibraryResponse[]) => {
    state.library_post = payload;
  }),

  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
  setError: action((state, payload) => {
    state.error = payload;
  }),

  setImageUrl: action((state, payload) => {
    state.imageURL = payload;
  }),

  serverTest: thunk(async (actions) => {
    actions.setLoading(true);
    try {
      const response = axiosInstance.get("/dice");
      return response;
    } catch (error) {
      actions.setError("Failed to ping server");
    } finally {
      actions.setLoading(false);
    }
  }),

  fetchSubscribers: thunk(async (actions) => {
    actions.setLoading(true);
    try {
      const response = await axiosInstance.get(
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

  createHomePost: thunk(async (actions, payload) => {
    actions.setLoading(true);
    try {
      const response = await axiosInstance.post(
        URLS.home.createHomePost,
        payload
      );
      actions.setMessage(response.data.message);
      actions.setError(null);
      return response.data;
    } catch (error) {
      actions.setError("Failed to create a home post");
      console.log(error);
    } finally {
      actions.setLoading(false);
    }
  }),

  createLibraryPosts: thunk(async (actions, payload) => {
    actions.setLoading(true);
    try {
      const response = await axiosInstance.post(
        URLS.library.createLibraryPost,
        payload
      );
      actions.setMessage(response.data.message);
      actions.setError(null);
      return response.data.message;
    } catch (error) {
      actions.setError("Failed to create a library post");
    } finally {
      actions.setLoading(false);
    }
  }),

  updateHome_Post: thunk(
    async (actions, { id, body }: { id: string; body: IHome }) => {
      actions.setLoading(true);
      try {
        const response = await axiosInstance.put(
          URLS.home.updateHomePost(id),
          body
        );
        return response.data;
      } catch (error) {
        actions.setError("Failed to create a library post");
      } finally {
        actions.setLoading(false);
      }
    }
  ),

  updateLibrary_Post: thunk(
    async (actions, { id, body }: { id: string; body: ILibrary }) => {
      actions.setLoading(true);
      try {
        const response = await axiosInstance.put(
          URLS.library.updateLibraryPost(id),
          body
        );
        return response.data;
      } catch (error) {
        actions.setError("Failed to fetch posts");
      } finally {
        actions.setLoading(false);
      }
    }
  ),

  deleteHome_Post: thunk(async (actions, id) => {
    actions.setLoading(true);
    try {
      const response = await axiosInstance.delete(URLS.home.deleteHomePost(id));
      return response.data;
    } catch (error) {
      actions.setError("Failed to fetch posts");
    } finally {
      actions.setLoading(false);
    }
  }),

  deleteLibrary_Post: thunk(async (actions, id) => {
    actions.setLoading(true);
    try {
      const response = await axiosInstance.delete(
        URLS.library.updateLibraryPost(id)
      );
      return response.data.message;
    } catch (error) {
      actions.setError("Failed to fetch posts");
    } finally {
      actions.setLoading(false);
    }
  }),

  fetchHome_Posts: thunk(async (actions) => {
    actions.setLoading(true);
    try {
      const response = await axiosInstance.get(URLS.home.getHomePost);
      actions.setHome_posts(response.data.data);
      actions.setError(null);
    } catch (error) {
      actions.setError("Failed to fetch posts");
      console.log(error);
    } finally {
      actions.setLoading(false);
    }
  }),

  fetchLibrary_Posts: thunk(async (actions) => {
    actions.setLoading(true);
    try {
      const response = await axiosInstance.get(URLS.library.getLibraryPost);
      actions.setLibrary_posts(response.data.data);
      actions.setError(null);
    } catch (error) {
      actions.setError("Failed to fetch posts");
    } finally {
      actions.setLoading(false);
    }
  }),
};

const store = createStore(storeModel);
export default store;
