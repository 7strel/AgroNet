import { useState } from "react";
import { Paperclip, Mic, ArrowRight } from "lucide-react";


const ChatInput = () => {
  const [message, setMessage] = useState("");

  // const sendMessage = async() => {
  //     try {
  //       const response = await axios.post(`${ai_model_url}`, {
  //         headers: {
  //           Authorization: `Bearer ${model_api_key}`,
  //           "HTTP-Referer": "<YOUR_SITE_URL>",
  //           "X-Title": "<YOUR_SITE_NAME>",
  //           "Content-Type": "application/json" // Attach the token to the request
  //         },        
  //       });
  //       return response.data.products;
  //     } catch (error: any) {
  //       return error.message;
  //     }
  // }

  return (
    <div className="flex items-center w-full bg-gray-200 p-2 rounded-full shadow-md">
      <button className="p-2 text-gray-500 hover:text-gray-700 cursor-pointer">
        <Paperclip size={20} />
      </button>
      <input
        type="text"
        placeholder="Type your prompt here"
        className="flex-1 bg-transparent outline-none px-2 text-gray-700"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="p-2 text-gray-500 hover:text-gray-700 cursor-pointer">
        <Mic size={20} />
      </button>
      <button className="p-2 text-white bg-black rounded-full hover:bg-green-600 ml-2 cursor-pointer">
        <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default ChatInput;
