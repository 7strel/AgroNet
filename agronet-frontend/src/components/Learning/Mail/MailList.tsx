import messages from "../../../Dummy-data/messages";




const MessageList: React.FC = () => {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Messages</h2>
        <div className="bg-gray-100 p-2 rounded-lg flex space-x-4 text-gray-500">
          <span className="font-bold text-black">All Messages</span>
          <span>The Newest</span>
          <span>Top Rated</span>
          <span>Forum</span>
        </div>
        <div className="mt-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="flex items-center bg-gray-200 p-4 rounded-lg"
            >
              <img
                src={msg.avatar}
                alt={msg.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div className="flex-1">
                <p className="font-bold text-lg">
                  {msg.name}
                  {msg.handle && <span className="text-gray-500">{msg.handle}</span>}
                </p>
                <p className="text-gray-700">{msg.message}</p>
              </div>
              <div className="text-gray-500 flex items-center">
                <span className="mr-2">⏰ {msg.time}</span>
                {msg.isBookmarked ? <span>📖</span> : <span>📚</span>}
              </div>
              <button className="ml-4 bg-black text-white px-4 py-2 rounded-lg cursor-pointer">
                View message
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default MessageList;
  