import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  StorageError,
} from "firebase/storage";
import { ChangeEvent, useState } from "react";
import { storage } from "@/config/firebase";
import { useStoreActions } from "./useEasyPeasy";
import { IFirebaseError } from "@/interfaces/errors";

export interface Message {
  message: string;
}

function useFireStore() {
  const { setImageUrl } = useStoreActions((actions) => actions);
  const [firebaseError, setFirebaseError] = useState<IFirebaseError>();
  const [uploadProgress, setProgress] = useState<number>(0);
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const fileSizeLimit = 5 * 1024 * 1024; // 5MB
  const validTypes = ["jpeg", "png", "gif"];
  const [fileSize, setFileSize] = useState<number>();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const fileType = file.type.split("/")[1];
      setFileSize(file.size);
      if (!validTypes.includes(fileType)) {
        setMessage("Invalid file type. Only JPEG, PNG, and GIF are allowed.");
        setImage(null);
        setPreview(null);
        return;
      }

      if (file.size > fileSizeLimit) {
        setMessage("File size exceeds 5MB limit.");
        setImage(null);
        setPreview(null);
        return;
      }

      setImage(file);
      setMessage("");

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  const uploadImage = (view: string = "home") => {
    if (image === null) return;
    setIsLoading(true);
    const storageRef = ref(storage, `${view}/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error: StorageError) => {
        console.error("Upload failed", error);
        setFirebaseError(error as IFirebaseError);
        setIsLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImageUrl(downloadURL);
          setUrl(downloadURL);
          setIsLoading(false);
        });
      }
    );
  };

  return {
    firebaseError,
    uploadProgress,
    url,
    preview,
    image,
    handleImageChange,
    uploadImage,
    message,
    fileSizeLimit,
    fileSize,
    isLoading,
  };
}

export default useFireStore;
