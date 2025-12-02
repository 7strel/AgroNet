import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import ReduceCapacityOutlinedIcon from '@mui/icons-material/ReduceCapacityOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';

import products from '../../Dummy-data/products';
import forumPosts from '../../Dummy-data/forumPosts';
import testimonials from '../../Dummy-data/testimonials';

import { NavLink } from "react-router";

const HeroSection: React.FC = () => {

  const setServicesIcon = (service:string) => {
  
    if(service === "Course & Learning")
      return (<MenuBookOutlinedIcon />);
    if(service === "Marketplace")
      return (<ShoppingCartOutlinedIcon />);
    if(service === "Artificial Intelligence")
      return (<SmartToyOutlinedIcon />);
    if(service === "Community")
      return (<ReduceCapacityOutlinedIcon />);
  }


    return (
        <>
            {/*Our Story*/}
            <section className="bg-gray-100 min-h-screen flex items-center justify-center px-6 md:px-16 w-full">
              <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left Text Section */}
                <div className="text-gray-800">
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    Our Passion for Agriculture<br /> Nurturing Growth and Sustaining the Future
                  </h1>
                  <p className="mt-4 text-gray-600">
                    Li Europan lingues es membres del sam familie. Lor separat existentie es un myth.
                    Por scientie, musica, sport etc, litot Europa usa li sam vocabular.
                  </p>
                    <NavLink 
                      to="/signin" ><button className="mt-6 px-6 py-3 bg-teal-600 text-white font-medium rounded-lg shadow-md hover:bg-green-800 cursor-pointer">
                    Get Started
                  </button></NavLink>
                </div>

                {/* Right Image Section */}
                <div className="relative">
                  <div className="overflow-hidden rounded-3xl shadow-lg">
                    <img
                      src="/images/hero.png"
                      alt="Agriculture Field"
                      width={400}
                      height={500}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white shadow-lg px-6 py-3 rounded-lg">
                    <span className="text-lg font-semibold text-gray-800">Since 2025</span>
                  </div>
                </div>
              </div>
          </section>
    
          {/* Services Section */}
          <section className="relative mt-18 py-16 text-center z-10">
            <h3 className="text-3xl font-semibold">Our Services</h3>
            <div className="flex justify-center gap-8 mt-8">
              {["Course & Learning", "Marketplace", "Artificial Intelligence", "Community"].map((service, index) => (
                <div key={index} className="p-6 bg-white shadow-md rounded-lg w-52">
                  {setServicesIcon(service)}
                  <p className="text-lg font-semibold">{service}</p>
                </div>
              ))}
            </div>
          </section>
    
          {/* Featured Products */}
          <section className="bg-gray-100 py-12 text-center">
              <h2 className="text-3xl font-bold text-gray-800">Our Featured Product</h2>
              <p className="text-gray-500 mt-2">
                Li Europan lingues es membres del sam familie. Lor separat existentie es un myth Por scientie, musica.
              </p>
              <div className="flex flex-wrap justify-center gap-6 mt-8">
                {products.map((product) => (
                  <div
                    key={product.name}
                    className="bg-white rounded-2xl shadow-lg p-6 w-60 text-center"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="rounded-xl h-32 w-full object-cover"
                    />
                    <h3 className="text-xl font-semibold mt-4">{product.name}</h3>
                    <p className="text-gray-500 mt-2 text-sm">
                      Li Europan lingues es membres del sam familie. Lor separat existentie es un myth.
                    </p>
                  </div>
                ))}
              </div>
              <NavLink to="/marketplace" className="text-blue-500 font-bold">See all product</NavLink>
        </section>
        <section className="relative h-screen w-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/drone.png')" }}
              >
                <div className="absolute inset-0 bg-opacity-50"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-center items-start h-full px-10 lg:px-24 text-white">
                <h1 className="text-4xl md:text-6xl font-bold max-w-2xl">
                  Sustainable Farming Meets Technology:
                  <br />
                  Building a Greener Future
                </h1>
                <div className="mt-6 flex gap-4">
                  <NavLink to="/community"><button className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white text-lg font-semibold rounded-lg cursor-pointer">
                    Learn More
                  </button></NavLink>
                  <button className="px-6 py-3 border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white hover:text-black cursor-pointer">
                    Contact Us
                  </button>
                </div>
              </div>
        </section>








    <section className="flex flex-col lg:flex-row items-center justify-between px-10 py-16 lg:px-24">
      {/* Left Side - Text Content */}
      <div className="max-w-lg">
        <h2 className="text-4xl font-bold text-black">
          The Benefits of Choosing Our Expertise
        </h2>
        <p className="mt-4 text-gray-600">
          Li Europan lingues es membres del sam familie. Lor separat existentie
          es un myth. Por scientie, musica, sport etc, litot Europa usa li sam
          vocabular.
        </p>
        <NavLink to="/community"><button className="mt-6 px-6 py-3 bg-teal-700 text-white text-lg font-semibold rounded-lg flex items-center gap-2 hover:bg-teal-800 cursor-pointer">
          Learn More →
        </button></NavLink>
      </div>

      {/* Right Side - Stats Card */}
      <div className="bg-teal-900 text-white p-8 rounded-xl mt-10 lg:mt-0 lg:ml-10 w-full lg:w-1/2">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-3  bg-opacity-20 rounded-full">
              <StarOutlinedIcon  />
            </div>
            <div>
              <h3 className="text-2xl font-bold">5+</h3>
              <p className="text-gray-300">Years Of Experience</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3  bg-opacity-20 rounded-full">
              <ViewInArOutlinedIcon />
            </div>
            <div>
              <h3 className="text-2xl font-bold">40+</h3>
              <p className="text-gray-300">Product</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-opacity-20 rounded-full">
              <CheckCircleOutlineOutlinedIcon />
            </div>
            <div>
              <h3 className="text-2xl font-bold">2,458+</h3>
              <p className="text-gray-300">Satisfied Customers</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-opacity-20 rounded-full">
              <GroupOutlinedIcon />
            </div>
            <div>
              <h3 className="text-2xl font-bold">10</h3>
              <p className="text-gray-300">Local Team Members</p>
            </div>
          </div>
        </div>
      </div>
    </section>













          {/* Testimonials */}
          <section className="bg-gray-100 py-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Testimonials</h2>
            <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
              Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular.
            </p>
            <div className="flex items-center justify-center mt-8">
              <button className="bg-white p-3 rounded-full shadow-lg mr-4">
                <ArrowLeftOutlinedIcon className="text-gray-700" />
              </button>
              <div className="bg-teal-800 text-white rounded-2xl p-6 flex items-center max-w-3xl">
                <img
                  src={testimonials[0].image}
                  alt={testimonials[0].name}
                  className="w-24 h-24 rounded-xl object-cover mr-6"
                />
                <div className="text-left">
                  <div className="flex text-yellow-400 mb-2">
                    {[...Array(testimonials[0].rating)].map((_, i) => (
                      <StarOutlineOutlinedIcon key={i} />
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold">{testimonials[0].name}</h3>
                  <p className="text-gray-300 text-sm">{testimonials[0].role}</p>
                  <p className="mt-2 text-gray-200">{testimonials[0].testimonial}</p>
                </div>
              </div>
              <button className="bg-white p-3 rounded-full shadow-lg ml-4">
                <ArrowRightOutlinedIcon className="text-gray-700" />
              </button>
              </div>
           </section>
    
          {/* Forum */}
          <section className="bg-gray-100 py-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Our Forum</h2>
            <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
              Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {forumPosts.map((post, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 w-80 text-left">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="rounded-xl h-48 w-full object-cover"
                  />
                  <h3 className="text-xl font-semibold mt-4">{post.title}</h3>
                  {/* <p className="text-gray-500 mt-2 text-sm">{post.description}</p> */}
                  <NavLink to="/community" className="text-blue-500 font-bold">Read More</NavLink>
                </div>
              ))}
            </div>
          </section>
        </>
    );
  };
  
  export default HeroSection;