import { Alert, Button, FileInput, Select, Spinner, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const UpdatePost = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const {currentUser} = useSelector((state) => state.user )
  const {postId} = useParams();
    console.log("postid",postId)
  
  const uploadPostImage = async () => {
    try {
      setLoading(true);
      setUploadError(null);
      const formData = new FormData();
      formData.append("PostImage", file);

      const response = await fetch("/api/post/upload-postImage", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(data.error);
      }

      const imageLink = await response.json();
      console.log("checking image link",imageLink)
      setFormData((prevData) => ({
        ...prevData,
        image: imageLink, // Add image link to formDat
      }));

      setLoading(false);
      // console.log("Post image link",imageLink);

      

      setUploadError(null);
    } catch (error) {
      setUploadError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = async(e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method : 'PUT',
        headers : {
          'Content-Type' :  'application/json',
        },
        body : JSON.stringify(formData),
      })

      const data = await res.json();
      
      if(!res.ok){
        setPublishError(data.message);
        return;
      }
      else{
        setPublishError(null);
        navigate(`/post/${data.slug}`)
      }
    } catch (error) {
      setPublishError('Something went wrong')
    }
  }

  useEffect(() => {
    try {
        const fetchPost = async() => {
            const res = await fetch(`/api/post/getposts?postId=${postId}`);
            const data = await res.json();
            console.log(data.posts[0]);
            if(!res.ok){
                console.log(data.message);
                setPublishError(data.message);
                return;
            }
            else{
                setPublishError(null)
                setFormData(data.posts[0])
            }
        } 
        fetchPost();
    } catch (error) {
     console.log(error.message)   
    }
  }, [postId])
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update a post</h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <Select
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          value={formData.category}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={uploadPostImage}
          >
            {
              loading ? (
                <Spinner className="w-5" value="loading..."></Spinner>
              ) : (<p>Upload Image</p>)
            }
          </Button>
        </div>
        {
          uploadError && (
            <Alert className="mt-5" color="failure">
              Please select an image
            </Alert>
          )
        }
        {
          formData.image && 
          (
            <img src={formData.image}
              alt="upload"
              className="w-full h-72 object-cover">
            </img>
          )
        }
        <ReactQuill
          theme="snow"
          placeholder="write something..."
          className="h-72 mb-12"
          required
          onChange={ (value) => {
            setFormData({
              ...formData,
              content : value
            })
          }}
          value={formData.content}
        />

        <Button type="submit" gradientDuoTone="purpleToPink">
          Update post
        </Button>
        {
          publishError && 
          <Alert className="mt-5" color="failure">
          {publishError}
        </Alert>
        }
      </form>
    </div>
  );
};

export default UpdatePost;
