// import  { useState } from "react";
// import { Send } from "@mui/icons-material";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../../redux/store";


const MailChat = ({ activeChat }: { activeChat: any }) => {

  // const dispatch = useDispatch();
  // const messages = useSelector((state: RootState) => state.chat.messages);
  // const [input, setInput] = useState("");

  // useEffect(() => {
  //     dispatch(initializeWebSocket());
  // }, [dispatch]);

  // const handleSendMessage = () => {
  //     if (input.trim()) {
  //         dispatch(sendMessage(input));
  //         setInput("");
  //     }
  // };
  return (
    <div className="w-full max-w-2xl mx-auto border rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-white flex items-center border-b">
        <img
          src="/images/man-derek.png"
          alt="Profile"
          className="rounded-full w-10 h-10 mr-3"
        />
        <div>
          <p className="font-bold">{activeChat.name}</p>
          <p className="text-sm text-gray-500">@{activeChat.name.toLowerCase().replace(" ", "")}</p>
        </div>
        {/* <button className="ml-auto px-4 py-2 bg-black text-white rounded-lg">Back to messages</button> */}
      </div>

      {/* Chat Messages */}
      <div className="p-4 bg-gray-100 h-96 overflow-y-auto">
        {/* Received Message */}
        <div className="flex mb-4">
          <div className="flex items-center">
            <span className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-2">OP</span>
            <div className="bg-white p-3 rounded-lg shadow-md max-w-xs">
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            </div>
          </div>
        </div>

        {/* Sent Message */}
        <div className="flex justify-end mb-4">
          <div className="bg-teal-600 text-white p-3 rounded-lg shadow-md max-w-xs">
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          </div>
          <img
            src="/images/man-derek.png"
            alt="User Profile"
            className="rounded-full w-8 h-8 ml-2"
          />
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-white flex items-center">
        <input
          type="text"
          placeholder="Write your message"
          className="flex-1 p-2 border rounded-lg outline-none"
        />
        <button className="ml-2 bg-black text-white p-2 rounded-lg flex items-center cursor-pointer">
          {/* <Send /> */}
        </button>
      </div>
    </div>
  );
};

export default MailChat;
