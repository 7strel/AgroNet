import React, {useState} from "react";
import { Card, CardContent, InputAdornment, TextField, Button, Input } from "@mui/material";
import { EmojiEmotions} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {  ImageIcon } from "lucide-react";
import { addPost } from "../../redux/slices/postsSlice";

const PostInputBar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState("");
  const [content, setText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);



  const handlePost = () => {
    if (!title || !content) {
      alert("Please enter both a title and some text.");
      return;
    }

    dispatch(addPost({ title, content, image: imageFile }))
      .unwrap()
      .then(() => {
        setTitle("");
        setText("");
        setImageFile(null);
      })
      .catch((error) => {
        console.error("Failed to post:", error);
      });
  };



  return (
    <Card className="shadow-lg border border-gray-700 bg-gray-800 rounded-lg max-w-3xl mx-auto">
      <CardContent className="flex items-center p-3 space-x-3">
        {/* Smaller Avatar */}
        {/* <Avatar className="w-8 h-8 bg-gray-600">
          <Person className="text-teal-600 text-sm" />
        </Avatar> */}

        <TextField
          variant="outlined"
          placeholder="Share your thoughts..."
          fullWidth
          size="medium"
          multiline
          minRows={1}
          maxRows={6} // or whatever fits your UI best
          onChange={(e) => setText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmojiEmotions className="text-teal-600" />
              </InputAdornment>
            ),
            className:
              "text-white placeholder-gray-400 rounded-md border border-gray-300 focus:border-green-400 focus:outline-none",
          }}
        />


        {/* 🚀 Stunning Green Gradient Button with Spacing */}
        <Button
          variant="contained"
          size="small"
          onClick={handlePost}
          className="ml-4 px-4 py-2 text-white rounded-md 
                     bg-gradient-to-r from-green-500 to-teal-500 shadow-lg 
                     hover:from-green-600 hover:to-teal-600 
                     transition-all duration-300 transform hover:scale-105 
                     focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
        >
          🌿 Post
        </Button>
      </CardContent>
      <div className="flex items-center p-3 space-x-3">
        {/* <span className="text-gray-600 cursor-pointer">title</span> */}
        <Input placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
        {/* <ImageIcon className="cursor-pointer" /> */}
        <input
          accept="image/*"
          type="file"
          id="image-upload"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setImageFile(file);
            }
          }}
        />
        <label htmlFor="image-upload">
          <ImageIcon className="cursor-pointer text-teal-600" />
        </label>
        {imageFile && <span className="text-xs text-green-400">{imageFile.name}</span>}
      </div>
    </Card>
  );
};

export default PostInputBar;
