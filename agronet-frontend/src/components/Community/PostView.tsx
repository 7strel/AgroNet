// import React from "react";
// import { useAppSelector } from "../../redux/hooks/hooks";

// const PostView: React.FC = () => {
//    const post = useAppSelector((state) => state.posts.selectedPost)
 
//    if (!post) return <p>No product selected.</p>

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
//       {post.post_image && (
//         <img
//           src={post.post_image}
//           alt="Post"
//           className="w-full rounded-xl shadow-md mb-4"
//         />
//       )}
//       <p className="text-white-700 text-lg mb-6">{post.text}</p>

//       <div className="flex justify-between text-sm text-gray-500 mb-4">
//         <span>{post.views} views</span>
//         <span>{post.comments?.length || 0} comments</span>
//       </div>

//       <div>
//         <h2 className="text-xl font-semibold mb-2">Comments</h2>
//         <div className="space-y-4">
//           {/* {post.comments?.length ? (
//             post.comments.map((comment, index) => (
//               <div key={index} className="border p-3 rounded-md bg-white shadow">
//                 <div className="font-semibold">{comment.user}</div>
//                 <div className="text-gray-700">{comment.message}</div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-400 italic">No comments yet.</p>
//           )} */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostView;
import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks";
import {
  addComment,
  editComment,
  deleteComment,
  fetchComments,
} from "../../redux/slices/commentSlice";
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  userId: string;
  [key: string]: any;
}

const PostView: React.FC = () => {
  const post = useAppSelector((state) => state.posts.selectedPost);
  const { comments, loading, error } = useAppSelector((state) => state.comments);
  const dispatch = useAppDispatch();

  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");

  useEffect(() => {
    if (post?.id) {
      dispatch(fetchComments(post.id));
    }
  }, [post?.id, dispatch]);

  const getToken = () => localStorage.getItem("user_token");

  const getUserIdFromToken = (): number => {
    try {
      const token = getToken();
      if (!token) return 0;
      const decoded: DecodedToken = jwtDecode(token);
      return Number(decoded.user_id) || 0;
    } catch {
      return 0;
    }
  };

  const userId = getUserIdFromToken();

  console.log(userId);

  const handleAddComment = () => {
    if (!newComment.trim() || !post) return;

    dispatch(
      addComment({
        postId: post.id,
        content: newComment,
      })
    );

    setNewComment("");
  };

  const handleEditClick = (commentId: number, content: string) => {
    setEditingCommentId(commentId);
    setEditingContent(content);
  };

  const handleSaveEdit = () => {
    if (!editingCommentId || !editingContent.trim()) return;
    dispatch(editComment({ id: editingCommentId, content: editingContent }));
    setEditingCommentId(null);
    setEditingContent("");
  };

  const handleDelete = (commentId: number) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      dispatch(deleteComment(commentId));
    }
  };

  if (!post) return <p>No post selected.</p>;

  const postComments = comments.filter((comment) => comment.post === post.id);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="w-full rounded-xl shadow-md mb-4"
        />
      )}

      <p className="text-white-700 text-lg mb-6">{post.content}</p>

      <div className="flex justify-between text-sm text-gray-500 mb-4">
        <span>{post.views} views</span>
        <span>{postComments.length} comments</span>
      </div>

      {/* Comment input */}
      <div className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-3 border rounded-md mb-2"
        />
        <button
          onClick={handleAddComment}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Submit Comment
        </button>
      </div>

      {/* Comments Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Comments</h2>

        {loading ? (
          <p className="text-gray-400">Loading comments...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : postComments.length ? (
          <div className="space-y-4">
            {postComments.map((comment) => (
              <div
                key={comment.id}
                className="border p-3 rounded-md bg-white shadow"
              >
                <div className="font-semibold text-sm text-gray-700">
                  {comment.userId}
                </div>

                {editingCommentId === comment.id ? (
                  <>
                    <textarea
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      className="w-full p-2 border mt-1 mb-2"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="bg-green-600 text-white px-2 py-1 rounded text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingCommentId(null)}
                        className="bg-gray-300 text-black px-2 py-1 rounded text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-gray-800 mb-1">{comment.content}</div>
                    <div className="text-xs text-gray-400 mb-2">
                      {new Date(comment.created).toLocaleString()}
                    </div>
                  </>
                )}

                {comment.userId === userId && editingCommentId !== comment.id && (
                  <div className="flex gap-3 text-sm text-blue-600">
                    <button onClick={() => handleEditClick(comment.id, comment.content)}>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default PostView;
