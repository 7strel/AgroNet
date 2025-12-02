import Chatbot from "./Chatbot";


export default function MainSection() {


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white bg-gray-100 text-black px-4">


      {/* Category Tabs
      <nav className="flex gap-4 bg-gray-100 p-2 rounded-full mb-6">
        {categories.map((category) => (
          <button
            key={category}
            className={clsx(
              "px-4 py-2 rounded-full transition",
              activeCategory === category ? "bg-black text-white" : "bg-transparent text-gray-600"
            )}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </nav> */}

      {/* Main Content */}
      <div className="text-center max-w-2xl">
        <h2 className="text-3xl font-bold">
          How can we <span className="text-black-500">assist</span> you today?
        </h2>
        <p className="text-gray-600 mt-2">
          Get expert guidance powered by AI agents.
        </p>
      </div>

      {/* Options Grid
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 max-w-3xl">
        {options.map((option) => (
          <div key={option.title} className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center">
            <div>
              <h3 className="font-bold">{option.title}</h3>
              <p className="text-sm text-gray-600">{option.description}</p>
            </div>
            <span className="text-x cursor-pointer">➡️</span>
          </div>
        ))}
      </div> */}

      {/* Chat Input */}
      <div className="mt-12 w-full max-w-2xl flex items-center bg-gray-100 p-4 rounded-full">
        <Chatbot />
      </div>
    </div>
  );
}
