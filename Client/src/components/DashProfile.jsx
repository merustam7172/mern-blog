import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileStart, updateProfileSuccess, updateProfileFailure } from "../redux/user/userSlice.js";

const DashProfile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef();
  const [formData, setFormData] = useState({});
  const [updateSuccessfully, setUpdateSuccessfully] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setUploadError('File size should be less than 2MB');
        return;
      }
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    try {
      setLoading(true);
      setUploadError(null);
      const formData = new FormData();
      formData.append('profilePicture', imageFile);

      const response = await fetch('/api/user/upload-image', {
        method: 'POST',
        body: formData,
      });

      const imageLink = await response.json();
      
      setFormData(prevData => ({
        ...prevData,
        profilePicture: imageLink // Add image link to formDat
      }));
      console.log(formData);

      if (!response.ok) {
        throw new Error(data.error);
      }
            
      setUploadError(null);
    } catch (error) {
      setUploadError(error.message);
    } finally {
      setLoading(false);
    }
  };



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value 
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(Object.keys(formData).length === 0){
      return;
    }
    try {
      dispatch(updateProfileStart());
      setUpdateSuccessfully(false);
      const userId = currentUser._id;
      const res = await fetch(`/api/user/update/${userId}`, {
        method : 'PUT',
        headers :  {'Content-Type' : 'application/json'},
        body : JSON.stringify(formData)
      });

      const data = await res.json();

      if(data.success === false){
        return dispatch(updateProfileFailure(data.message));
      }
      if(res.ok){
        dispatch(updateProfileSuccess(data))
        setUpdateSuccessfully(true);
      }
      
    } catch (error) {
      dispatch(updateProfileFailure(error.message))
      console.log(error.message)
    }
  }

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          ref={filePickerRef} 
          className="hidden" 
        />
        <div 
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" 
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
            
          />
          {/* {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white">Uploading...</span>
            </div>
          )} */}
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput 
          type="password" 
          id="password" 
          placeholder="password" 
          onChange={handleChange}
        />
        {
          Object.keys(formData).length === 0 ? null : (
            <Button 
          type="submit" 
          gradientDuoTone="purpleToBlue" 
          outline
          disabled={loading}
        >
          Update
        </Button>
          )
        }
        
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
      {uploadError && (
        <Alert className='mt-5' color='failure'>
          {uploadError}
        </Alert>
      )}
      {
        updateSuccessfully && (
          <Alert className='mt-5' color='success'>
          User Profile Updated Succefully
        </Alert>
        )
      }
    </div>
  );
};

export default DashProfile;