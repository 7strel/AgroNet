import { useState, useEffect } from "react";
import { Search, Folder, MessageSquare, User, Plus, MoreVertical } from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch} from '../../redux/store';
import { setSelectedChat } from '../../redux/slices/AIChatSlice';
import { fetchQuestions } from "../../redux/slices/questionSlice";
import { selectQuestionsList, selectQuestionsLoading, selectQuestionsError } from "../../redux/selectors/questionSelectors";

const categories = [
  { name: "Weather prediction", color: "border-gray-500" },
  { name: "Disease detection", color: "border-blue-500" },
  { name: "Yield prediction", color: "border-green-500" },
  { name: "Price forecasting", color: "border-red-500" },
];

// const recentChats = [
//   "How can I increase the number of...",
//   "What’s the best approach to...",
//   "What’s the best approach to...",
// ];

export default function Sidebar() {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState("");
  const questions = useSelector(selectQuestionsList);
  const isLoading = useSelector(selectQuestionsLoading);
  const isError = useSelector(selectQuestionsError);
  
  

  useEffect(()=>{
    dispatch(fetchQuestions())
  },[dispatch])

  console.log(questions);

  if (isLoading) {
    return <p className="text-center text-white-500">Loading products...</p>;
}

if (isError) {
    return <p className="text-center text-red-500">Error: {isError}</p>;
}

  return (
    <div className="w-72 h-screen bg-black text-white p-4 flex flex-col">
      <NavLink to="/" className="flex items-center space-x-2 text-2xl font-bold text-gray-800">
          <img src="/images/commodity-white.png" width={50} height={50} alt="Logo" />
        </NavLink>

      {/* New Chat Button */}
      <NavLink to="/ai">
        <Button className="w-full bg-gray-800 hover:bg-gray-700 flex items-center justify-between px-4 py-2 rounded-lg mb-4">
          Begin a New Chat <Plus className="w-5 h-5" />
        </Button>
      </NavLink>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
      </div>

      {/* AI Agents */}
      <div className="mb-4">
        <h2 className="text-gray-400 text-sm mb-2">AI Agents</h2>
        {categories.map((category) => (

          <div
            key={category.name}
            className={`flex justify-between items-center bg-gray-800 p-3 rounded-lg mb-2 border-l-4 ${category.color}`}
          >
            <div className="flex items-center gap-2">
              <Folder className="w-5 h-5 text-gray-400" />
              <span>{category.name}</span>
            </div>
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </div>
        ))}
      </div>

      {/* Recent Chats */}
      <div className="mb-4">
        <h2 className="text-gray-400 text-sm mb-2">Recent Chats</h2>

        <div className="relative overflow-hidden rounded-lg">
          {/* Parallax Background */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 animate-parallax"
            aria-hidden="true"
          />

          {/* Scrollable Chats */}
          <div className="relative overflow-y-auto max-h-80 p-1 space-y-2">
            {questions.map((chat, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-800 p-3 rounded-lg hover:bg-gray-700 cursor-pointer"
                onClick={() =>
                  dispatch(setSelectedChat({ question: chat.title, answer: chat.answers[0].body }))
                }
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                  <span className="truncate w-48">{chat.title}</span>
                </div>
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* User Profile */}
      <div className="mt-auto bg-gray-800 p-3 rounded-lg flex justify-between items-center">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-gray-400" />
          <NavLink to="/ai/profile">
            <span>User Profile</span>
          </NavLink>
        </div>
        {/* <MoreVertical className="w-4 h-4 text-gray-400" /> */}
      </div>
    </div>
  );
}
