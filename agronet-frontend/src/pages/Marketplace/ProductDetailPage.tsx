import CategoriesList from "../../components/Marketplace/CategoryList";
import Navbar from "../../components/Marketplace/MarketNavBar";
import ProductDetails from "../../components/Marketplace/ProductDetails";
// import products from "../../Dummy-data/productdata";


const ProductDetailPage = () => {

    // const product = products[0];
    return(
    <div className="flex flex-col h-screen bg-gray-900 text-white">
    {/* Navbar at the top */}
    <Navbar />

    {/* Main content section */}
    <main className="flex flex-1 overflow-hidden">
      {/* Sidebar: Categories List with scroll if needed */}
      <aside className="w-1/4 p-4 bg-gray-800 overflow-auto">
        <CategoriesList />
      </aside>

      {/* Product List taking remaining space */}   
      <section className="flex-1 p-4 overflow-auto">
        <ProductDetails />
      </section>
    </main>
  </div>
    );
}


export default ProductDetailPage;