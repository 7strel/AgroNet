import SearchBar from "./SearchBar";
import LearnNav from "./LearnNav";

const TopNavigation = () => {
    return (
        <>
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-6">
            <SearchBar />
            <LearnNav />

        </div>
        </>
    );
}


export default TopNavigation;