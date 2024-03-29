import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { addItem, removeItem, clearCart, setCartItems } from "./Redux/cartSlice";
import { useNavigate, Link } from "react-router-dom";
import { cloudinaryImageId } from "../utils/constant";
import { cartTableLabels } from "../utils/constant";
import { useHook } from "../useHooks/CustomAPIHook";
import { useAuth } from "./Context/AuthProvider";

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
      <p className="py-2">Base price before Tax &nbsp;&nbsp;&#8377; {basePrice?.toFixed(2)}</p>
      {isApplied ? <div>
        <p className="py-2">Discount Applied with coupon &nbsp;&nbsp;&#8377; {discountPrice?.toFixed(2)}</p>
      </div> : ""}
      <p className="py-2">Tax Amount@18% &nbsp;&nbsp;&#8377; {taxAmount?.toFixed(2)}</p>
      <p className="py-2 font-bold">Total Price after Tax&nbsp;&nbsp;&#8377; {pricewithTax?.toFixed(2)}</p>
    </div>
  )
}

function findUniqueObjects(arr, property) {
  const uniqueObjects = [];
  const uniqueTitles = new Set();

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
  else {
    discount = 40;
    unit = "percent"
  }
  if (!isApplied) {
    console.log("disocunt", discount, "unit", unit)
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
  console.log('cart in cart', cart)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user } = useAuth()

  // Save cart data to localStorage whenever the cart changes
  useEffect(() => {
    if (user && user.email) {
      localStorage.setItem(`cart-${user?.email}`, JSON.stringify(cart));
    }
  }, [cart, user, dispatch]);

  return (
    <div className="lg:w-3/4 sm:w-full md:w-full mx-auto p-8 rounded bg-white shadow-2xl mt-8 mb-4 overflow-scroll">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Cart Page</h2>
        {cart.length > 0 ?
          <div className="flex flex-wrap flex-end flex-row gap-6">
            <button className=" text-white px-4 py-1 rounded-md transition-all duration-300 ease-in-out bg-[#00416a] hover:bg-green-700" variant="contained" color="primary" onClick={() => dispatch(clearCart())}>
              Clear Cart
            </button>
            <button className=" text-white px-4 py-1 rounded-md transition-all duration-300 ease-in-out bg-[#00416a] hover:bg-green-700" variant="contained" color="secondary" onClick={() => navigate(-1)}>
              Back
            </button>
          </div> : ''
        }
      </div>
      {cart.length > 0 ?
        <table className="border-collapse border border-gray-300 mb-4 ">
          <thead>
            <tr className="" >
              {cartTableLabels.map((row) => {
                return <th key={row.id} className="p-3 text-left">{row.name}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {cart && cart.map((cartItem, index) => {
              const subtotal = cartItem && cartItem.info && cartItem.info.defaultPrice ? cartItem.info.defaultPrice / 100 : cartItem?.info?.price / 100

              return (
                <tr className='border-t border-gray-300' key={cartItem.info.id} >
                  <td className="p-3">
                    {cartItem.info.imageId ?
                      <Link to={`../restaurant/${cartItem.info.restaurantData.id}`}>
                        <img
                          src={cloudinaryImageId + cartItem.info.imageId}
                          className="w-16 h-16 object-fill rounded-md"
                          alt={cartItem.title}
                        />
                      </Link> : <div className="h-16 w-16 bg-gray-200 rounded-md"></div>

                    }
                    <p className="ml-2 text-sm">{cartItem.info.name}</p>
                  </td>
                  <td className="p-3 text-sm">{cartItem.info.restaurantData.name}</td>
                  <td className="p-3 text-sm">&#8377; {subtotal.toFixed(2)}</td>
                  <td className="flex flex-wrap items-center pt-8">
                    <button className="bg-gray-200 px-3 py-1 rounded-l-md transition-all duration-300 ease-in-out" onClick={() => dispatch(removeItem(index))}>-</button>
                    <p className="p-3 text-sm">{cartItem.quantity} items</p>
                    <button className="bg-gray-200 px-3 py-1 rounded-r-md transition-all duration-300 ease-in-out " onClick={() => dispatch(addItem(cartItem))}>+</button>
                  </td>
                </tr>
              )
            })}
          </tbody>

        </table> : <p className="font-bold text-2xl text-gray-800 flex justify-center items-center my-8">Cart is Empty! Add items</p>
      }



      {/* {cart.length > 0 ? belowLine(cart, ifCouponApplied) : ""} */}
      {cart.length > 0 ?
        <div className='flex justify-end mt-2' >
          <button className=" text-white px-4 py-1 rounded-md transition-all duration-300 ease-in-out bg-[#00416a] hover:bg-green-700" variant="contained" color="secondary" onClick={() => navigate('/payment')}>
            Order Summary
          </button>
        </div> : ''

      }

    </div>
  );
};

export default Cart;