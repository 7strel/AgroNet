import React, { useEffect } from "react";
import { AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from "../../redux/slices/postsSlice";
import { selectPostsList, selectPostsLoading, selectPostsError } from "../../redux/selectors/postsSelectors"; 
import PostCard from "./PostCard";


const PostList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); 
  const posts = useSelector(selectPostsList); // Get posts from Redux state
  const isLoading = useSelector(selectPostsLoading); // Check if loading
  const error = useSelector(selectPostsError); // Check for errors


      // **Fetch posts when component mounts**
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  console.log(posts);

  if (isLoading) {
      return <p className="text-center text-white-500">Loading products...</p>;
  }

  if (error) {
      return <p className="text-center text-red-500">Error: {error}</p>;
  }
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} id={post.id} title={post.title} content={post.content} image={post.image} views={post.views} comments={post.comments}/>
      ))}
    </div>
  );
};

export default PostList;
