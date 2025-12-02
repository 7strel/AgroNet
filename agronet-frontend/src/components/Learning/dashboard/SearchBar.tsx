import { Search } from "lucide-react";


const SearchBar = () => {
    return(
        <div className="relative w-2/3">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none"
            />
      </div>
    );
}



export default SearchBar;