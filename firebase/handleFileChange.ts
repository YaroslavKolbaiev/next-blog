import { v4 } from 'uuid';
import FirebaseStorageService from './FirebaseStorage';

export default async function handleFileChanged(
  event: React.ChangeEvent<HTMLInputElement>,
  setUploadProgress: (value: number) => void,
  setImageUrl: (value: string) => void,
  setFileInputRef: (value: null) => void,
) {
  const { files } = event.target;
  const file = files![0];

  if (!file) {
    alert('File Select failed. Please try again.');
    return;
  }

  const generatedFileId = v4();

  try {
    const downloadUrl: any = await FirebaseStorageService.uploadFile(
      file,
      `storage/${generatedFileId}`,
      setUploadProgress,
    );

    setImageUrl(downloadUrl);
  } catch (error: any) {
    setUploadProgress(-1);
    setFileInputRef(null);
    alert(error.message);
    throw error;
  }
}
