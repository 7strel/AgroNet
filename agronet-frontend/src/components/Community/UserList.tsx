// import React, {useEffect} from "react";
// import { AppDispatch } from "../../redux/store";
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchUsers } from "../../redux/slices/userSlice";
// import { selectUsersList, selectUsersError, selectUsersLoading } from "../../redux/selectors/userSelectors";


// // interface UserListProps {
// //   users: User[];
// // }

// export const UserList: React.FC = () => {
//     const dispatch = useDispatch<AppDispatch>(); 
//     const users = useSelector(selectUsersList); // Get posts from Redux state
//     const isLoading = useSelector(selectUsersLoading); // Check if loading
//     const error = useSelector(selectUsersError); // Check for errors

//     useEffect(() => {
//       dispatch(fetchUsers());
//     }, [dispatch]);
  
//     console.log(users);
  
//     if (isLoading) {
//         return <p className="text-center text-white-500">Loading products...</p>;
//     }
  
//     if (error) {
//         return <p className="text-center text-red-500">Error: {error}</p>;
//     }


//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Users</h2>
//       <div className="space-y-4">
//         {users.map((user) => (
//           <div
//             key={user.id}
//             className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 hover:scale-[1.01] transition-transform duration-150 cursor-pointer"
//           >
//             <img
//               src={user.profile_image}
//               alt={user.email}
//               className="w-14 h-14 rounded-full ring-2 ring-teal-500"
//             />
//             <div className="flex-1">
//               <p className="text-lg font-medium text-gray-900 dark:text-white">
//                 {user.email}
//               </p>
//               <p className="text-sm text-gray-500 dark:text-gray-300">{user.email}</p>
//             </div>
//             {/* <span
//               className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
//                 user.isOnline
//                   ? "bg-green-100 text-green-800"
//                   : "bg-red-100 text-red-800"
//               }`}
//             >
//               {user.isOnline ? "Online" : "Offline"}
//             </span> */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import { AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/slices/userSlice";
import { selectUsersList, selectUsersError, selectUsersLoading } from "../../redux/selectors/userSelectors";
import { followUser, unfollowUser } from "../../redux/slices/followSlice";

export const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsersList);
  const isLoading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);

  // Local state to track which users have been followed
  const [followedUsers, setFollowedUsers] = useState<number[]>([]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFollowToggle = async (userId: number) => {
    if (followedUsers.includes(userId)) {
      await dispatch(unfollowUser(userId));
      setFollowedUsers((prev) => prev.filter((id) => id !== userId));
    } else {
      await dispatch(followUser(userId));
      setFollowedUsers((prev) => [...prev, userId]);
    }
  };

  if (isLoading) {
    return <p className="text-center text-white-500">Loading users...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 hover:scale-[1.01] transition-transform duration-150 cursor-pointer"
          >
            <img
              src={user.profile_image}
              alt={user.email}
              className="w-14 h-14 rounded-full ring-2 ring-teal-500"
            />
            <div className="flex-1">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {user.email}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {user.email}
              </p>
            </div>
            <button
              onClick={() => handleFollowToggle(user.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                followedUsers.includes(user.id)
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-teal-500 text-white hover:bg-teal-600"
              }`}
            >
              {followedUsers.includes(user.id) ? "Unfollow" : "Follow"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
