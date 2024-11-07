export interface IHome {
  id?: string;
  title: string;
  description: string;
  image: File | string | null;
  content: string;
}

export interface IHomeResponse {
  _id: string;
  title: string;
  description: string;
  image: File | string | null;
  content: string;
}

export interface ILibrary {
  id?: string;
  title: string;
  video_id: string | null;
  image: string | null;
  content: string;
}

export interface ILibraryResponse {
  _id: string;
  title: string;
  video_id: string | null;
  image: string | null;
  content: string;
}
