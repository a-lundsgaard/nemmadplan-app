import { useEffect, useState } from "react";
import axios from "axios";

export const useUploadForm = (url: string) => {
  const [progress, setProgress] = useState(0);
  
  const uploadForm = async (formData: FormData) => {
    return await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const progress = (progressEvent.loaded / progressEvent.total) * 50;
        setProgress(progress);
      },
      onDownloadProgress: (progressEvent) => {
        const progress =  50 + (progressEvent.loaded / progressEvent.total) * 50;
        setProgress(progress);
      },
    });
  };
  return { uploadForm, progress };
};
