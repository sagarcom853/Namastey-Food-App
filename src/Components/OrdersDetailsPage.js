import { useAuth } from "./Context/AuthProvider"
import { useEffect, useState } from 'react'
import axios from "axios"
import { useParams, useSearchParams, Link } from "react-router-dom"
import LoadingComponent from "../utils/LoadingComponent"
import { assets, cloudinaryImageId } from "../utils/constant"
import { useNavigate } from "react-router-dom"

const SuccessPage = () => {
    const { user } = useAuth()
    const [orderDetails, setOrderDetails] = useState([]);
    const [userDetails, setUserDetails] = useState([])
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const [searchParams] = useSearchParams()
    const email = searchParams.get('search')
    const navigate = useNavigate()
    const id = params.id
    const itemId = params.itemId.split('=')[1] === 'null' ? null : params.itemId.split('=')[1]
    let filteredOrder = orderDetails && orderDetails.filter((order) => {
        return order._id === id
    })

    useEffect(() => {
        if (user) {
            fetchOrderDetails();
        }
    }, [user]);

    const fetchOrderDetails = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`http://localhost:8000/user/fetchUser?email=${email ? email : user.email}`);
            setUserDetails(response.data)
            setOrderDetails(response.data.orders);
            setLoading(false)
            // setAuth({ ...auth, isAuthenticated: true, user: response.data.user });

        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const orderDetailsFunc = () => {
        if (itemId !== 'null' && itemId !== null) {
            let itemDetails = filteredOrder[0].items.filter((order) => {
                return order.info.id === itemId
            })
            let otherItemsData = filteredOrder[0].items.filter((order) => {
                return order.info.id !== itemId
            })
            itemDetails = itemDetails[0]
            return (
                <>
                    {renderItem(itemDetails)}
                    {otherItemsData.length > 0 ? <>
                        <div className="member-name1">Other products in the order</div>
                        {renderOtherProducts(otherItemsData)}
                    </> : ' '}

                </>
            )
        }
        return otherItems(filteredOrder)
    }

    const otherItems = (filteredOrder) => {
        return (filteredOrder.map((order) => {
            return (
                <div key={order._id}>
                    {order.items.map((item) => {
                        return renderItem(item)
                    })}
                </div>
            )
        }))
    }

    const renderOtherProducts = (otherItemsData) => {
        return otherItemsData.map((item) => {
            return renderItem(item)
        })
    }

    const renderItem = (item) => {
        return (
            <>
                <div className="flex flex-wrap justify-start gap-4 border border-text-300 mb-2 p-4 shadow-md" key={item.info.id}>
                    {item.info.imageId ? (
                        <Link to={`../restaurant/${item.info.restaurantData.id}`}>
                            <img
                                src={assets + item.info.imageId}
                                className="w-32 h-28 object-fill rounded-md"
                                alt={item.title}
                            />
                        </Link>
                    ) : (
                        <Link to={`../restaurant/${item.info.restaurantData.id}`}>
                            <div className="w-32 h-28  bg-gray-200 rounded-md"></div>
                        </Link>
                    )}
                    <div >
                        <div className="font-bold text-md mb-0.5">{item.info.name}</div>
                        <div className="mb-0.5 text-sm">Catagory: {item.info.category}</div>
                        <div className="mb-0.5 text-sm">Price: &#8377;{item.info.defaultPrice ? item.info.defaultPrice / 100 : item?.info?.price / 100}</div>
                        <div className="mb-0.5 text-sm">Restaurant: {item.info.restaurantData.name}</div>
                    </div>
                </div>
            </>

        )
    }
    const deliveryDetails = () => {
        const { name, email, addresses } = userDetails
        let address = addresses[1]
        let userAdd = address.add1 ? address.add1 + ',' + address.add2 + ',' + address.landmark + ',' + address.state + ',' + address.country + ',' + address.pin : ''
        return (
            <div className="border border-text-300 mb-2 p-4 shadow-md">
                <h1 className="member-name1">Delivery Address</h1>
                {userDetails &&
                    <>
                        <p>{name}</p>
                        <p>{email}</p>

                    </>
                }
                <p>{userAdd}</p>
            </div>
        )
    }

    const completeOrderDetails = () => {
        return filteredOrder.map((filter) => {
            return (
                <div key={filter._id} className="border border-text-300 mb-2 p-4 shadow-md text-sm">
                    <h1 className="member-name1 mb-2">Payment Details</h1>
                    <div className="mb-0.5"><span className="font-semibold"> Order ID:</span> {filter._id}</div>
                    <div className="mb-0.5"><span className="font-semibold"> Paymode Mode:</span> {filter.paymentMode}</div>
                    <div className="mb-0.5"><span className="font-semibold mb-0.5">Ordered Date: </span> {new Date(filter.paymentTime).toLocaleString()}</div>
                    <div className="mb-0.5"><span className="font-semibold mb-0.5">Payment Status: </span> {filter.paymentStatus}</div>
                    <div className="mb-0.5"><span className="font-semibold mb-0.5">Total Amount before Tax:</span> &#8377;{filter?.totalAmount?.toFixed(2)}</div>
                    <div className="mb-0.5"><span className="font-semibold mb-0.5">Total Amount After Tax: </span>&#8377;{filter?.totalAmountwithCharges?.toFixed(2)}</div>
                </div>
            )
        })
    }


    if (loading) {
        return <LoadingComponent />
    }

    const handleGoBack = () => {
        if (itemId === null) {
            console.log('goback')
            navigate("/home", { replace: true });
        } else {
            navigate(-1);
        }
    }

    return (
        <div className="mx-auto p-8 bg-white rounded shadow-lg mt-2 mb-4 w-4/8">
            <button className=" text-white px-6 py-1 mb-4 rounded-md transition-all duration-300 ease-in-out bg-[#00416a] hover:bg-green-700" onClick={() => handleGoBack()}>
                Back
            </button>
            <h1 className="member-name1">
                order Details:
            </h1>
            <div className="flex flex-wrap gap-2">
                <div className="flex-1">
                    {orderDetails && orderDetails.length > 0 ?
                        <div >{orderDetailsFunc()}
                        </div> : 'No order details available.'}
                </div>

                <div className="border border-text-300 mb-2 p-4 shadow-md">
                    <h1 className="member-name1">Billing Details</h1>
                    {userDetails && userDetails.length > 0 && <div className="">{deliveryDetails()}</div>}
                    <div> {completeOrderDetails()} </div>
                </div>

            </div>
        </div>
    )
}

export default SuccessPage