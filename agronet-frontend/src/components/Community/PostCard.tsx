import { Heart } from "lucide-react";
import { Post } from "../../redux/slices/postsSlice";
import { useNavigate } from "react-router";
import { useDispatch } from 'react-redux';
import { AppDispatch } from "../../redux/store";
import { setSelectedPost } from "../../redux/slices/postsSlice";
import { incrementPostViews } from "../../redux/slices/postsSlice";

interface PostCardProps extends Post {

}


const PostCard: React.FC<PostCardProps> = ({ id, title, content, image, views, comments}) => {

  const post = {id, title, content, image, views, comments}

  const dispatch = useDispatch<AppDispatch>(); 
  const navigate = useNavigate();

  const handleViewDetails = () => {
      dispatch(setSelectedPost(post))
      dispatch(incrementPostViews(id));
      navigate(`/post/${id}`)
  }


  return (
    <div className="bg-white text-white p-5 rounded-2xl flex gap-4 shadow-lg mt-4 cursor-pointer" onClick={handleViewDetails}>
      <img src={post.image} alt={post.title} className="w-16 h-16 rounded-lg" />
      <div className="flex-1">
        <h2 className="text-black text-lg font-semibold">{post.title}</h2>
        <div className="flex gap-2 my-2">
          {/* {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-700 text-sm px-2 py-1 rounded-lg"
            >
              {tag}
            </span>
          ))} */}
        </div>
        {/* <p className="text-sm text-gray-400">
          {post.author} • {post.date}
        </p> */}
        <div className="flex justify-between mt-3 text-gray-400 text-sm">
          <span>{post.views}</span>
          {/* <span>{post.likes} Likes</span> */}
          <span>{post.comments} Comments</span>
        </div>
      </div>
      <button>
        <Heart
        //   className={`h-6 w-6 ${post.liked ? "text-red-500" : "text-gray-500"}`}
        //   fill={post.liked ? "#EF4444" : "none"}
        />
      </button>
    </div>
  );
};


export  default PostCard;