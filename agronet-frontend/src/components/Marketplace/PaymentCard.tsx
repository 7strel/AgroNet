// import React from "react";
// import { Card } from "@mui/material";
// import { Button } from "@mui/material";
// import { Input } from "@mui/material";
// import { Label } from "@mui/icons-material";

// const PaymentCard: React.FC = () => {
//   return (
//     <Card className="w-96 bg-indigo-800 text-white p-6 rounded-2xl shadow-lg">
//       <div className="flex justify-between items-center">
//         <h2 className="text-lg font-semibold">Card Details</h2>
//         <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
//           <img src="/user-avatar.jpg" alt="User" className="w-full h-full" />
//         </div>
//       </div>
      
//       <div className="mt-4">
//         <Label className="text-sm">Card type</Label>
//         <div className="flex gap-2 mt-2">
//           <img src="/images/mastercard-logo.png" alt="MasterCard" className="h-8 bg-white p-1 rounded-md" />
//           <img src="/images/Visa-logo.png" alt="Visa" className="h-8 bg-white p-1 rounded-md" />
//           <img src="/rupay.png" alt="RuPay" className="h-8 bg-white p-1 rounded-md" />
//           <button className="px-3 py-1 bg-gray-500 rounded-md text-sm">See all</button>
//         </div>
//       </div>

//       <div className="mt-4">
//         <Label className="text-sm">Name on card</Label>
//         <Input className="mt-1 text-black" placeholder="Name" />
//       </div>

//       <div className="mt-4">
//         <Label className="text-sm">Card Number</Label>
//         <Input className="mt-1 text-black" placeholder="1111 2222 3333 4444" />
//       </div>

//       <div className="mt-4 flex gap-4">
//         <div className="w-1/2">
//           <Label className="text-sm">Expiration date</Label>
//           <Input className="mt-1 text-black" placeholder="mm/yy" />
//         </div>
//         <div className="w-1/2">
//           <Label className="text-sm">CVV</Label>
//           <Input className="mt-1 text-black" placeholder="123" />
//         </div>
//       </div>

//       <div className="mt-6 text-sm border-t border-gray-400 pt-4">
//         <div className="flex justify-between">
//           <span>Subtotal</span>
//           <span>$1,668</span>
//         </div>
//         <div className="flex justify-between mt-1">
//           <span>Shipping</span>
//           <span>$4</span>
//         </div>
//         <div className="flex justify-between font-semibold mt-2">
//           <span>Total (Tax incl.)</span>
//           <span>$1,672</span>
//         </div>
//       </div>

//       <Button className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg flex justify-center items-center text-lg">
//         $1,672 Checkout →
//       </Button>
//     </Card>
//   );
// };

// export default PaymentCard;







// import React, { useState } from "react";
// import {
//   Card,
//   TextField,
//   MenuItem,
//   Select,
//   SelectChangeEvent,
//   FormControl,
//   InputLabel,
// } from "@mui/material";

// const PaymentCard: React.FC = () => {
//   const [formData, setFormData] = useState({
//     user: "ho udini.mwale@gmail.com",
//     city: "Kapiri",
//     zip_code: "10101",
//     street: "Fairview",
//     state: "",
//     country: "Zambia",
//     phone_no: "260771098525",
//     payment_mode: "COD",
//     // payment_status: "Unpaid",
//     // status: "Processing",
//     total_amount: 20,
//   });

//   // Separate handlers for text and select
//   const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData((prev) => ({ ...prev, [field]: e.target.value }));
//   };

//   const handleSelectChange = (field: string) => (e: SelectChangeEvent) => {
//     setFormData((prev) => ({ ...prev, [field]: e.target.value }));
//   };

//   return (
//     <Card className="w-96 bg-indigo-800 text-white p-6 rounded-2xl shadow-lg">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">Payment Details</h2>
//       </div>

//       {/* Input Fields */}
//       <div className="space-y-4 text-sm">
//         <TextField
//           label="User Email"
//           value={formData.user}
//           onChange={handleInputChange("user")}
//           fullWidth
//           variant="filled"
//           InputProps={{ className: "bg-white rounded" }}
//         />

//         <TextField
//           label="Street"
//           value={formData.street}
//           onChange={handleInputChange("street")}
//           fullWidth
//           variant="filled"
//           InputProps={{ className: "bg-white rounded" }}
//         />
//         <TextField
//           label="City"
//           value={formData.city}
//           onChange={handleInputChange("city")}
//           fullWidth
//           variant="filled"
//           InputProps={{ className: "bg-white rounded" }}
//         />
//         <TextField
//           label="Zip Code"
//           value={formData.zip_code}
//           onChange={handleInputChange("zip_code")}
//           fullWidth
//           variant="filled"
//           InputProps={{ className: "bg-white rounded" }}
//         />
//         <TextField
//           label="Country"
//           value={formData.country}
//           onChange={handleInputChange("country")}
//           fullWidth
//           variant="filled"
//           InputProps={{ className: "bg-white rounded" }}
//         />
//         <TextField
//           label="Phone Number"
//           value={formData.phone_no}
//           onChange={handleInputChange("phone_no")}
//           fullWidth
//           variant="filled"
//           InputProps={{ className: "bg-white rounded" }}
//         />
//         <FormControl fullWidth variant="filled" className="bg-white rounded">
//           <InputLabel>Payment Mode</InputLabel>
//           <Select
//             value={formData.payment_mode}
//             onChange={handleSelectChange("payment_mode")}
//           >
//             <MenuItem value="COD">COD</MenuItem>
//             <MenuItem value="Card">Card</MenuItem>
//             <MenuItem value="Mobile Money">Mobile Money</MenuItem>
//           </Select>
//         </FormControl>

//         {/* <FormControl fullWidth variant="filled" className="bg-white rounded">
//           <InputLabel>Payment Status</InputLabel>
//           <Select
//             value={formData.payment_status}
//             onChange={handleSelectChange("payment_status")}
//           >
//             <MenuItem value="Unpaid">Unpaid</MenuItem>
//             <MenuItem value="Paid">Paid</MenuItem>
//           </Select>
//         </FormControl> */}

//         {/* <FormControl fullWidth variant="filled" className="bg-white rounded">
//           <InputLabel>Status</InputLabel>
//           <Select
//             value={formData.status}
//             onChange={handleSelectChange("status")}
//           >
//             <MenuItem value="Processing">Processing</MenuItem>
//             <MenuItem value="Shipped">Shipped</MenuItem>
//             <MenuItem value="Delivered">Delivered</MenuItem>
//           </Select>
//         </FormControl> */}
//       </div>

//       <button
//         className="w-full mt-6 bg-teal-600 text-white py-3 rounded-lg flex justify-center items-center text-lg cursor-pointer"
//       >
//         ZMW{24} Checkout →
//       </button>
//     </Card>
//   );
// };

// export default PaymentCard;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { createOrder } from "../../redux/slices/orderSlice";
import { cartTotal } from "./Cart";
import { order_items } from "./Cart";



import {
  Card,
  TextField,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";

type FormData = {
  street: string;
  city: string;
  zip_code: string;
  country: string;
  phone_no: string;
  payment_mode: string;
  total_amount: number;
  order_items: any;
  // Optional extra fields
  card_name?: string;
  card_number?: string;
  card_expiry?: string;
  card_cvv?: string;
  mobile_wallet_number?: string;
};

interface PaymentCardProps {
  totalPrice: number;
  // quantity: number;
}

const PaymentCard: React.FC<PaymentCardProps> = ({totalPrice}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<FormData>({
    street: "",
    city: "",
    zip_code: "",
    country: "",
    phone_no: "",
    payment_mode: "COD",
    total_amount: cartTotal ? cartTotal : totalPrice,
    order_items: order_items,
  });

  const handleInputChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSelectChange =
    (field: keyof FormData) => (e: SelectChangeEvent) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleCheckout = () => {
    dispatch(createOrder(formData));
  };

  return (
    <Card className="w-96 bg-indigo-800 text-white p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Payment Details</h2>
      </div>

      <div className="space-y-4 text-sm">
        <TextField
          label="Street"
          value={formData.street}
          onChange={handleInputChange("street")}
          fullWidth
          variant="filled"
          InputProps={{ className: "bg-white rounded" }}
        />
        <TextField
          label="City"
          value={formData.city}
          onChange={handleInputChange("city")}
          fullWidth
          variant="filled"
          InputProps={{ className: "bg-white rounded" }}
        />
        <TextField
          label="Zip Code"
          value={formData.zip_code}
          onChange={handleInputChange("zip_code")}
          fullWidth
          variant="filled"
          InputProps={{ className: "bg-white rounded" }}
        />
        <TextField
          label="Country"
          value={formData.country}
          onChange={handleInputChange("country")}
          fullWidth
          variant="filled"
          InputProps={{ className: "bg-white rounded" }}
        />
        <TextField
          label="Phone Number"
          value={formData.phone_no}
          onChange={handleInputChange("phone_no")}
          fullWidth
          variant="filled"
          InputProps={{ className: "bg-white rounded" }}
        />

        <FormControl fullWidth variant="filled" className="bg-white rounded">
          <InputLabel>Payment Mode</InputLabel>
          <Select
            value={formData.payment_mode}
            onChange={handleSelectChange("payment_mode")}
          >
            <MenuItem value="COD">COD</MenuItem>
            <MenuItem value="Card">Card</MenuItem>
            <MenuItem value="Mobile Money">Mobile Money</MenuItem>
          </Select>
        </FormControl>

        {/* Dynamic Fields */}
        {formData.payment_mode === "Card" && (
          <>
            <TextField
              label="Cardholder Name"
              value={formData.card_name || ""}
              onChange={handleInputChange("card_name")}
              fullWidth
              variant="filled"
              InputProps={{ className: "bg-white rounded" }}
            />

            <TextField
              label="Card Number"
              value={formData.card_number || ""}
              onChange={handleInputChange("card_number")}
              fullWidth
              variant="filled"
              InputProps={{ className: "bg-white rounded" }}
            />
            <TextField
              label="Expiry Date (MM/YY)"
              value={formData.card_expiry || ""}
              onChange={handleInputChange("card_expiry")}
              fullWidth
              variant="filled"
              InputProps={{ className: "bg-white rounded" }}
            />
            <TextField
              label="CVV"
              value={formData.card_cvv || ""}
              onChange={handleInputChange("card_cvv")}
              fullWidth
              variant="filled"
              InputProps={{ className: "bg-white rounded" }}
            />
          </>
        )}

        {formData.payment_mode === "Mobile Money" && (
          <TextField
            label="Mobile Wallet Number"
            value={formData.mobile_wallet_number || ""}
            onChange={handleInputChange("mobile_wallet_number")}
            fullWidth
            variant="filled"
            InputProps={{ className: "bg-white rounded" }}
          />
        )}
      </div>

      <button
        onClick={handleCheckout}
        className="w-full mt-6 bg-teal-600 text-white py-3 rounded-lg flex justify-center items-center text-lg cursor-pointer"
      >
        ZMW {formData.total_amount} Checkout →
      </button>
    </Card>
  );
};

export default PaymentCard;
