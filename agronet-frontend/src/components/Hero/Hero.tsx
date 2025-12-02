import './hero.css';
import { NavLink } from "react-router";

const HeroSection: React.FC = () => {
    return (
      <section className="mt-0 relative text-center text-white w-full">
        <div className="relative w-full h-[800px] shadow-lg">
          <img src="/images/background.jpg" alt="Agriculture Hero" className="w-full h-full object-cover" />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="mt-32 absolute inset-0 flex flex-col justify-center items-center">
          <h2 className="text-8xl font-bold">The Role of Technology<br /> in Revolutionizing<br /> Agriculture</h2>
          <p className="mt-2">Discover how AI and innovation are shaping the future of farming.</p>
          <div className="mt-4">
            <NavLink 
                      to="/signin" ><button className="bg-teal-600 px-6 py-3 rounded-lg text-white cursor-pointer">Get Started</button></NavLink>
            <NavLink 
                      to="/community" ><button className="ml-4 border border-white px-6 py-3 rounded-lg cursor-pointer">Learn More</button></NavLink>            
          </div>
        </div>
      </section>
    );
  };
  
  export default HeroSection;