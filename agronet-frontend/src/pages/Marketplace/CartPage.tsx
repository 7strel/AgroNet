import CategoriesList from "../../components/Marketplace/CategoryList";
import Navbar from "../../components/Marketplace/MarketNavBar";
import ShoppingCart from "../../components/Marketplace/Cart";
import PaymentCard from "../../components/Marketplace/PaymentCard";

const CartPage = () => {
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
        <div className="flex gap-4">
            <div className="w-1/2">
                <ShoppingCart />
            </div>
            <div className="w-1/2">
                <PaymentCard totalPrice={0} />
            </div>
        </div>
      </section>
    </main>
  </div>
    );
}


export default CartPage;