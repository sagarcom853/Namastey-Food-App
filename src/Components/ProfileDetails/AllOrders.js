import { useAuth } from ".././Context/AuthProvider";

import { useEffect, useState } from "react";
import axios from "axios";
import LoadingComponent from "../../utils/LoadingComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link, useNavigate } from "react-router-dom";

const AllOrders = () => {
  const { isAuthenticated, user, setAuth, auth, setAuthStorage } = useAuth();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Err, setErr] = useState("");
  const [isDeleteAllBtnActive, setDeleteAllBtnActive] = useState(true);
  const navigate = useNavigate();
  console.log("orders here", orderDetails);
  console.log("user here", user);

  useEffect(() => {
    setLoading(true);
    const fetchOrderDetails = async () => {
      try {
        console.log("inside try all orders");
        const response = await axios.get(
          `http://localhost:8000/order/getOrders`
        );
        if (response.status === 200) {
          setOrderDetails(response.data);
          setLoading(false);
        }
        // setAuth({ ...auth, isAuthenticated: true, user: response.data.user });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (user) {
      fetchOrderDetails();
    }
  }, [user]);

  const deleteOrders = async (email) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/user/deleteOrders",
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setAuth({ ...auth, isAuthenticated: true, user: response.data.user });
        setErr("");
        // setOrderDetails()
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setErr("Items not there...........");
        } else {
          setErr(error.response.data.message || "An error occurred.");
        }
      } else if (error.request) {
        setErr("No response received from the server.");
      } else {
        setErr("Error setting up the request.");
      }
    }
  };

  const handleMarkDelivered = async (orderId, email) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/payment/markDelivered",
        {
          orderId: orderId,
          email: email,
        }
      );
      if (response.status === 200) {
        setAuthStorage({
          ...auth,
          isAuthenticated: true,
          user: response.data.user,
        });
      } else {
        alert("Failed to mark order as delivered");
      }
    } catch (error) {
      console.error("Error marking order as delivered:", error);
    }
  };


  const orderDetailsFunc = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>User Address</th>
            <th>Item Name</th>
            <th className="border-t">Restaurant Name</th>
            <th>Payment Status</th>
            <th>Payment Time</th>
            <th>Payment Mode</th>
            <th>Delivery Status</th>
            <th></th>
            <th>
              <button
                className={isDeleteAllBtnActive ? "button disabled" : "button"}
                disabled={isDeleteAllBtnActive}
                onClick={() => deleteOrders(user.email)}
              >
                DeleteAll
              </button>
            </th>
            {/* <th>Address: </th> */}
          </tr>
        </thead>
        {orderDetails?.orders.map((order) => {
          const DeliveryStatus = order.DeliveryStatus;
          return (
            <tbody key={order._id}>
              <tr
                key={order.items[0].info.id}
                className="border-t border-gray-300"
              >
                <td>{order._id}</td>
                <td>{order.name}</td>
                <td>{order.add1}</td>
                <td>
                  {order.items[0].info.name}
                  {order.items?.length > 1 ? (
                    <Link
                      to={`/orders/${order._id}/itemId=${order.items[0].info.id}?search=${order.email}`}
                      className="text-sm font-bold text-[#00416a]"
                    >
                      +{order.items.length - 1}{" "}
                      {order.items.length - 1 > 1 ? "items" : "item"}
                    </Link>
                  ) : (
                    ""
                  )}
                </td>
                <td>{order.items[0].info.restaurantData.name}</td>
                <td>{order.paymentStatus}</td>
                <td>{new Date(order.paymentTime).toLocaleString()}</td>
                <td>{order.paymentMode}</td>
                <td>{order.DeliveryStatus}</td>
                <td>
                  <button
                    className="button"
                    onClick={() =>
                      navigate(
                        `/orders/${order._id}/itemId=${order.items[0].info.id}?search=${order.email}`
                      )
                    }
                  >
                    Details...
                  </button>
                </td>
                {DeliveryStatus.toLowerCase() !== "delivered" && (
                  <td>
                    <button
                      className="button"
                      onClick={() =>
                        handleMarkDelivered(order._id, order.email)
                      }
                    >
                      Mark Delivered
                    </button>
                  </td>
                )}
                <td>
                  <button className="button">
                    {/* <DeleteIcon /> */}
                    <DeleteOutlineIcon />
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    );
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className="cartContainer-100">
      <div>
        {orderDetails && orderDetails.orders.length > 0 ? (
          <div>
            <h1 className="member-name1">Review All Orders:</h1>
            {!loading && orderDetailsFunc()}
          </div>
        ) : (
          <div className="mx-auto w-96 text-xl">
            {" "}
            <h1>You dont have any orders....Order Items now</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
