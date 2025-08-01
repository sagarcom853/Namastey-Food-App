import { useAuth } from "./Context/AuthProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingComponent from "../utils/LoadingComponent";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const { isAuthenticated, user, setAuth, auth } = useAuth();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Err, setErr] = useState("");
  const navigate = useNavigate();
  console.log("orders here", orderDetails);
  console.log("user here", user);

  useEffect(() => {
    setLoading(true);
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/user/fetchUser?email=${user.email}`
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

  const orderDetailsFunc = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th className="border-t">Restaurant Name</th>
            <th>Payment Status</th>
            <th>Payment Time</th>
            <th>Payment Mode</th>
            <th>Delivery Status</th>
            <th>
              <button
                className="button"
                onClick={() => deleteOrders(user.email)}
              >
                DeleteAll
              </button>
            </th>
            {/* <th>Address: </th> */}
          </tr>
        </thead>

        {orderDetails?.orders.map((order) => {
          return (
            <tbody key={order._id}>
              {order.items.map((item) => {
                return (
                  <tr key={item.info.id} className="border-t border-gray-300">
                    <td>{item.info.name}</td>
                    <td>{item.info.restaurantData.name}</td>
                    <td>{order.paymentStatus}</td>
                    <td>{new Date(order.paymentTime).toLocaleString()}</td>
                    <td>{order.paymentMode}</td>
                    <td>{order.DeliveryStatus}</td>
                    <td>
                      <button
                        className="button"
                        onClick={() =>
                          navigate(
                            `/orders/${order._id}/itemId=${item.info.id}`
                          )
                        }
                      >
                        Details...
                      </button>
                    </td>
                    {/* <td><button className="button">Delete</button></td> */}
                  </tr>
                );
              })}
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
            <h1 className="member-name1">Review your past orders:</h1>
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

export default OrderPage;
