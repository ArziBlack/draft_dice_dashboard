export const URLS = {
  home: {
    getHomePost: "/home",
    createHomePost: "/home",
    updateHomePost: (id: string) => `/home/${id}`,
    deleteHomePost: (id: string) => `/home/${id}`,
  },
  library: {
    createLibraryPost: "/library",
    getLibraryPost: "/library",
    updateLibraryPost: (id: string) => `/library/${id}`,
    deleteLibraryPost: (id: string) => `/library/${id}`,
  },
};
