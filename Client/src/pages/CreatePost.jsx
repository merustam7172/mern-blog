import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [formData, setFormData] = useState({});

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

      const imageLink = await response.json();
      setFormData((prevData) => ({
        ...prevData,
        image: imageLink, // Add image link to formDat
      }));

      setLoading(false);
      console.log("Post image link",imageLink);

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

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            // onChange={(e) =>
            //   setFormData({ ...formData, title: e.target.value })
            // }
          />
          <Select
          // onChange={(e) =>
          //   setFormData({ ...formData, category: e.target.value })
          // }
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
            Upload image
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
        />

        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
