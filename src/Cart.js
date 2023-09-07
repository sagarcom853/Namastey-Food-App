import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "./Redux/cartSlice";
import { Button } from "@mui/material";
import { addItem, removeItem } from "./Redux/cartSlice";
import { useNavigate } from "react-router-dom";
let cloudinaryImageId =
  "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/";

const CartItem = ({ item, index }) => {
  const dispatch = useDispatch()
  const subtotal = (item.info.price / 100) * item.quantity;

  return (
    <div className="flex flex-wrap justify-between p-4 border-b border-gray-300 items-center">
      <div className="flex flex-wrap gap-10 items-center">
        <img
          alt='food'
          className='h-24 w-28 rounded-md'
          src={
            cloudinaryImageId + item.info.imageId
          }
        />
        <h3 className="text-lg font-semibold w-128">{item.info.name}</h3>
        <p className="text-gray-600">&#8377; {(item.info.price / 100).toFixed(2)}</p>
      </div>
      <div className="flex items-center">
        <button className="bg-gray-200 px-3 py-1 rounded-l-md transition-all duration-300 ease-in-out" onClick={() => dispatch(removeItem(index))}>-</button>
        <p className="px-3">{item.quantity} items</p>
        <button className="bg-gray-200 px-3 py-1 rounded-r-md transition-all duration-300 ease-in-out " onClick={() => dispatch(addItem(item))}>+</button>
      </div>
      <p className="text-lg">&#8377; {subtotal.toFixed(2)}</p>
      <div className="flex justify-between p-4 border-b border-gray-300 items-center">
      </div>
    </div>
  );
};

const belowLine = (cart, ifCouponApplied) => {
  let totalQuantity = cart.reduce((previous, current) => {
    return previous + current.quantity
  }, 0)
  let basePrice = cart.reduce((previous, current) => {
    return previous + current.info.price / 100 * current.quantity
  }, 0)
  const { isApplied, discount, unit } = ifCouponApplied
  let pricewithTax
  let discountPrice
  let totalPrice
  let taxAmount
  if (isApplied) {
    if (unit === "absolute") {
      discountPrice = Number(discount)
      totalPrice = basePrice - discountPrice
      taxAmount = totalPrice * 0.18
      pricewithTax = totalPrice + taxAmount
    }
    else if (unit === "percent")
      discountPrice = basePrice * 0.01 * Number(discount)
    totalPrice = basePrice - discountPrice
    taxAmount = totalPrice * 0.18
    pricewithTax = totalPrice + taxAmount
  }
  // if (isApplied) {
  //   discountPrice = basePrice * 0.01 * Number(discount)
  //   totalPrice = basePrice - discountPrice
  //   pricewithTax = basePrice + basePrice * 0.18
  // }
  else {
    taxAmount = basePrice * 0.18
    pricewithTax = basePrice + taxAmount

  }

  return (
    <div className="flex flex-wrap flex-col items-end mr-14 p-4 border-b border-gray-300">
      <p className="py-2">Total items {totalQuantity}</p>
      <p className="py-2">Base price before Tax &nbsp;&nbsp;&#8377; {basePrice.toFixed(2)}</p>
      {isApplied ? <div>
        <p className="py-2">Discount Applied with coupon &nbsp;&nbsp;&#8377; {discountPrice.toFixed(2)}</p>
      </div> : ""}
      <p className="py-2">Tax Amount@18% &nbsp;&nbsp;&#8377; {taxAmount.toFixed(2)}</p>
      <p className="py-2 font-bold">Total Price after Tax&nbsp;&nbsp;&#8377; {pricewithTax.toFixed(2)}</p>
    </div>
  )
}

function findUniqueObjects(arr, property) {
  const uniqueObjects = [];
  const uniqueTitles = new Set();
  console.log("array", arr)

  for (const item of arr) {
    if (item.info && item.info.offerTags) {
      for (const offerTag of item?.info?.offerTags) {
        if (!uniqueTitles.has(offerTag[property])) {
          uniqueTitles.add(offerTag[property]);
          uniqueObjects.push(item);
        }
      }
    }

  }
  console.log(uniqueObjects)
  return uniqueObjects;
}

const handleApplyOffers = (iter, setCoupedApplied, ifCouponApplied) => {
  const { isApplied } = ifCouponApplied
  let unit = ""
  let discount = 0
  console.log('iter', iter)
  if (iter.title === '₹125 OFF') {
    discount = 125;
    unit = "absolute"
  } else if (iter.title === '20% OFF') {
    discount = 20
    unit = "percent"
  }
  if (!isApplied) {
    setCoupedApplied({ ...ifCouponApplied, isApplied: true, discount, unit })
  } else {
    setCoupedApplied({ ...ifCouponApplied, isApplied: false, discount: 0, unit })
  }
}

const offersTag = (item, setCoupedApplied, ifCouponApplied) => {
  const { isApplied } = ifCouponApplied
  const uniqueItems = findUniqueObjects(item, 'title');
  return uniqueItems?.map((it) => {
    return it?.info?.offerTags?.map((iter, index) => {
      return (
        <div key={index} className="flex flex-wrap gap-10">
          <p>Available Coupons</p>
          <button className={ifCouponApplied.isApplied ? 'bg-gray-500 border-1 border-gray p-2' : "border-1 border-gray p-2"} key={iter.title}
            style={{ backgroundColor: isApplied ? "#999999" : `${iter.backgroundColor}`, color: `${iter.color}` }}
            onClick={() => handleApplyOffers(iter, setCoupedApplied, ifCouponApplied)}
          >
            {iter.title} using {iter.subTitle}
          </button>
        </div>
      )
    })

  })
}

const Cart = () => {
  const [ifCouponApplied, setCoupedApplied] = useState({ isApplied: false, discount: "" })
  const cart = useSelector((store) => store?.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  return (
    <div className="p-6 m-6">
      <div className="flex flex-wrap justify-between">
        <h2 className="text-2xl font-semibold mb-4">Cart Page</h2>
        <div className="flex flex-wrap flex-end flex-row gap-6">
          <Button className="bg-black text-white px-4 rounded-md h-10 transition-all duration-300 ease-in-out" variant="contained" color="primary" onClick={() => dispatch(clearCart())}>
            Clear Cart
          </Button>
          <Button className="bg-black text-white px-4 rounded-md h-10 transition-all duration-300 ease-in-out" variant="contained" color="secondary" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-gray-600">You saved rupees on this order</p>
        <h2 className="text-2xl font-semibold">Items Added {cart.length}</h2>
      </div>

      <div>
        {offersTag(cart, setCoupedApplied, ifCouponApplied)}
        {cart && cart.map((item, index) => (
          <>
            <CartItem key={index} index={index} item={item} />

          </>
        ))}
      </div>

      {cart.length > 0 ? belowLine(cart, ifCouponApplied) : ""}
    </div>
  );
};

export default Cart;
