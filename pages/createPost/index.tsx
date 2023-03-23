import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext, useState, useRef } from 'react';
import { UserContext } from '../../Context/UserContext';
import FirebaseStorageService from '../../firebase/FirebaseStorage';
import handleFileChanged from '../../firebase/handleFileChange';
import { submitPost } from '../../services/graphql';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(-1);
  const fileInputRef = useRef<any>();
  const [text, setText] = useState('');
  const { user } = useContext(UserContext);
  const router = useRouter();

  const resetForm = () => {
    setTitle('');
    setExcerpt('');
    setText('');
  };

  const setFileInputRef = (value: null) => {
    fileInputRef.current.value = value;
  };

  const handlePostSubmit = () => {
    if (!title || !excerpt || !imageUrl || !text) {
      alert('Please fill up all fields');
      return;
    }
    const newPost = {
      title,
      excerpt,
      imageUrl,
      author: user?.email,
      text,
    };

    try {
      submitPost(newPost);
      resetForm();
      alert('Post successfully created');
      router.replace('/');
    } catch (error) {
      alert('Error when creating a post');
    }
  };

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    handleFileChanged(event, setUploadProgress, setImageUrl, setFileInputRef);
  }

  function handleCancel() {
    FirebaseStorageService.deleteFile(imageUrl);
    setFileInputRef(null);
    setImageUrl('');
    setUploadProgress(-1);
  }

  return (
    <div className="container mx-auto px-10">
      <form className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-lg font-semibold mb-4 text-center">
          Create new Post
        </h1>
        <div className="mb-2">
          <label className="font-semibold" htmlFor="title">
            Post Title
            <input
              className="border border-gray-200 p-2 w-full rounded-md text-sm font-medium"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div className="mb-2">
          <label className="font-semibold" htmlFor="excerpt">
            Short description about your post
            <input
              className="border border-gray-200 p-2 w-full rounded-md text-sm font-medium"
              name="excerpt"
              type="text"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </label>
        </div>
        <div className="mb-2">
          <label className="font-semibold" htmlFor="file_input">
            Choose File
            <input
              required
              id="file_input"
              className="block w-full border border-gray-200 cursor-pointer
                rounded-md text-sm file:border-0 file:cursor-pointer
                file:bg-gray-300 file:mr-4 file:p-2
              "
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFile}
            />
          </label>
        </div>
        {uploadProgress > -1 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div
              className="bg-green-700 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
        {imageUrl && (
          <div className="flex justify-center flex-col items-center gap-2">
            <Image src={imageUrl} alt="img" height={200} width={200} />
            <button
              aria-label="delete"
              className="bg-gray-700
                text-lg
                font-medium
                rounded-full
                text-white
                px-8
                py-3
                cursor-pointer
              "
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        )}
        <div className="mb-2">
          <label className="font-semibold" htmlFor="text">
            Text
            <textarea
              className="border h-40 border-gray-200 p-2 w-full rounded-md text-sm font-medium"
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
        </div>
        <button
          className="transition
          duration-500
          ease
          hover:bg-indigo-900
          inline-block
          bg-pink-600
          text-lg
          font-medium
          rounded-full
          text-white
          px-8
          py-3
          cursor-pointer
        "
          type="button"
          onClick={handlePostSubmit}
        >
          submit
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
