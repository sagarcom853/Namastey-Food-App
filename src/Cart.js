import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@mui/material";
import RestaurantData from './restaurants.json'

const Cart = ({plates,changePlates}) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const orderId = params.get("orderId");
  var results = RestaurantData.filter(function (item) {
    return Number(item.id) === Number(id);
  });

  const orderDetail = results[0].menu_items.filter((res) => {
    return res.id === orderId;
  });

  const subtotal = plates * orderDetail[0].price;
  const tax = 0.125 * subtotal;
  const delivery_fee = results[0].delivery_fee;
  return (
    <>
      <h2 className='cart-header'>Cart Page</h2>
      <div>
        <p>Delivery in {results[0].timeToDeliver}&nbsp;minutes</p>
        <p>You saved rupees on this order</p>
      </div>
      <h2>Items Added</h2>

      <div className='cart-container'>
        <div>
          <p>Name : {orderDetail[0].name}</p>
          <p>Price: {orderDetail[0].price} Rupees</p>
        </div>
        <div>
          <div className='plates-button'>
            <span
              type='button'
              onClick={() => changePlates(plates + 1)}
              className='button-count'
            >
              +
            </span>
            <p className='plate-Count'>{plates}&nbsp;plates</p>
            <span
              type='button'
              onClick={() => changePlates(plates === 0 ? 0 : plates - 1)}
              className='button-count'
            >
              -
            </span>
          </div>
          <div>
            <p>Subtotal: {subtotal} </p>
            <p>Delivery Charges: {delivery_fee}</p>
            <p>Tax on the Order: {tax}</p>
            <p>Total Amount to be paid: {subtotal + delivery_fee + tax}</p>
            <div>
              <Link
                to={{
                  pathname: "/hotelPageIndi",
                  search: `?id=${id}`,
                }}
              >
                <Button variant='contained' size='medium' color='info'>
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
