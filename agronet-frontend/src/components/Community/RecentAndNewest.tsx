// import React, { useEffect } from "react";
// import { AppDispatch } from "../../redux/store";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchNewestPost } from "../../redux/slices/postsSlice";
// import { fetchRecentPosts } from "../../redux/slices/postsSlice";



// import {
//   selectNewestPost,
//   selectRecentPosts,
//   selectPostsLoading,
//   selectPostsError
// } from "../../redux/selectors/postsSelectors";
// import PostCard from "./PostCard";

// const RecentAndNewest: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const newestPost = useSelector(selectNewestPost);
//   const recentPosts = useSelector(selectRecentPosts);
//   const isLoading = useSelector(selectPostsLoading);
//   const error = useSelector(selectPostsError);

//   useEffect(() => {
//   dispatch(fetchNewestPost());
//   dispatch(fetchRecentPosts());
//   }, [dispatch]);

//   if (isLoading) {
//     return <p className="text-center text-white-500">Loading posts...</p>;
//   }

//   if (error) {
//     return <p className="text-center text-red-500">Error: {error}</p>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto space-y-6">
//       {newestPost && (
//         <div className="space-y-2">
//           <h2 className="text-xl font-bold text-white">🔥 Newest Post</h2>
//           <PostCard
//             key={newestPost.id}
//             id={newestPost.id}
//             title={newestPost.title}
//             content={newestPost.content}
//             image={newestPost.image}
//             views={newestPost.views}
//             comments={newestPost.comments}
//           />
//         </div>
//       )}

//       {recentPosts.length > 0 && (
//         <div className="space-y-2">
//           <h2 className="text-xl font-semibold text-white">🕓 Recent Posts</h2>
//           {recentPosts.map((post) => (
//             <PostCard
//               key={post.id}
//               id={post.id}
//               title={post.title}
//               content={post.content}
//               image={post.image}
//               views={post.views}
//               comments={post.comments}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecentAndNewest;



import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "../../redux/store";
import { fetchNewestAndRecentPosts } from "../../redux/slices/postsSlice";
import { selectNewestPosts, selectRecentPosts, selectPostsLoading, selectPostsError } from "../../redux/selectors/postsSelectors";
import PostCard from "./PostCard";

const RecentAndNewest: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const newest = useSelector(selectNewestPosts);
  const recent = useSelector(selectRecentPosts);
  const loading = useSelector(selectPostsLoading);
  const error = useSelector(selectPostsError);

  useEffect(() => {
    dispatch(fetchNewestAndRecentPosts());
  }, [dispatch]);

  if (loading) return <p className="text-center text-white-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">🔥 Newest Posts</h2>
        <div className="space-y-4">
          {newest.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-2">🕓 Recent Posts</h2>
        <div className="space-y-4">
          {recent.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentAndNewest;
