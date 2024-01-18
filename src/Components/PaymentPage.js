import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart } from './Redux/cartSlice';
import { useAuth } from './Context/AuthProvider';
import axios from 'axios';
import { SummaryTableLabels } from '../utils/constant';
import { cloudinaryImageId } from '../utils/constant';
import LoadingComponent from '../utils/LoadingComponent';

const PaymentPage = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user, setAuth, auth } = useAuth();
    const [loading, setLoading] = useState(false)
    const cart = useSelector((store) => store?.cart.items);
    const [paymentMode, setPaymentMode] = useState('');
    const navigate = useNavigate();
    let userAdd = user && user.add1 ? user.add1 + ',' + user.add2 + ',' + user.landmark + ',' + user.state + ',' + user.country + ',' + user.pin : ''

    // Save cart data to localStorage whenever the cart changes
    useEffect(() => {
        if (user && user.email) {
            localStorage.setItem(`cart-${user?.email}`, JSON.stringify(cart));
        }
    }, [cart, user]);

    if (cart.length > 0) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = cart.reduce((total, item) => total + (item.info.defaultPrice ? item.info.defaultPrice / 100 : item.info.price / 100) * item.quantity, 0);
        let cashDeliveryCharge = paymentMode === 'cash' || totalPrice < 149 ? '40' : ''
        const totalPriceWithTax = totalPrice + 0.18 * totalPrice + Number(cashDeliveryCharge)

        const handleChange = (e) => {
            setPaymentMode(e.target.value);
        };

        const handlePayment = async () => {
            console.log(window)
            setLoading(true)
            try {
                const response = await axios.post(
                    'http://localhost:8000/user/createOrder',
                    { email: user.email, cart: cart, paymentMode: paymentMode, totalAmount: totalPrice, totalAmountwithCharges: totalPriceWithTax },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.status === 200) {

                    // const options = {
                    //     key: '',
                    //     amount: 'response_Amount',
                    //     currency: 'INR',
                    //     name: 'Namaste Foods',
                    //     description: 'Best Foods available here',
                    //     image: '',
                    //     order_id: '',
                    //     callback_url: 'http:localhost/8000/payment/paymentVerification',
                    //     prefill: {
                    //         name: user.name,
                    //         email: user.email,
                    //         contact: '9853105135'
                    //     },
                    //     notes: {
                    //         "address": "Razorpay corporate office",
                    //     }
                    // }

                    console.log(response)
                    dispatch(clearCart());
                    alert('Payment Successful!');
                    navigate(`/orders/${response.data.orderId}/itemId=null`)
                    setAuth({ ...auth, isAuthenticated: true, user: response.data.user });
                    setLoading(false)
                }
            } catch (error) {
                setLoading(false)
                console.error('Error during payment:', error.message);
            } finally {
                setLoading(false);
            }
        }

        return (
            <div className="mx-auto p-8 bg-white rounded shadow-lg mt-8 mb-4  w-3/4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h1>
                    <button
                        className="bg-[#00416a] hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => navigate(-1)}
                    >
                        Go Back
                    </button>
                </div>

                <table className="w-full border-collapse border border-gray-300 mb-4 shadow-md">
                    <thead>
                        <tr>
                            {SummaryTableLabels.map((label) => {
                                return <th key={label.id} className="p-3 text-sm">{label.name}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((car) => (
                            <>
                                <tr key={car.info.id} className="border-t border-gray-300">
                                    <td className="p-3">
                                        {/* {car.info.imageId ? (
                                            <Link to={`../restaurant/${car.info.restaurantData.id}`}>
                                                <img
                                                    src={cloudinaryImageId + car.info.imageId}
                                                    className="w-16 h-16 object-fill rounded-md"
                                                    alt={car.title}
                                                />
                                            </Link>
                                        ) : (
                                            <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
                                        )} */}
                                        <p className="ml-2 text-sm">{car.info.name}</p>
                                    </td>
                                    <td className="p-3 text-sm">{car.info.restaurantData.name}</td>
                                    <td className="p-3 text-sm">&#8377;{car.info.defaultPrice ? car.info.defaultPrice / 100 : car.info.price / 100}</td>
                                    <td className="p-3 text-sm">{car.quantity}&nbsp;{car.quantity > 1 ? 'items' : 'item'}</td>
                                    <td className="p-3 text-sm">&#8377;{(car.info.defaultPrice ? car.info.defaultPrice / 100 : car.info.price / 100) * car.quantity}</td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                    <thead>
                        <tr className="p-3 text-sm border-t border-gray-300">
                            <td className='p-3 text-sm '></td>
                            <td className='p-3 text-sm '></td>
                            <td className='p-3 text-sm '></td>
                            <td className='p-3 text-sm '>{totalItems}&nbsp;{totalItems > 1 ? 'items' : 'item'}</td>
                            <td className='p-3 text-sm font-bold'>&#8377;{totalPrice.toFixed(2)}</td>
                        </tr>
                    </thead>
                </table>
                {loading && <LoadingComponent />}


                <div className='flex flex-wrap gap-2 justify-start w-full'>
                    <div className='w-5/12'>
                        <div className={`border border-text-300 pl-4 shadow-md ${paymentMode === 'cash? h-32: h-28'}`} >
                            <div className="flex flex-col justify-between text-sm">
                                <div className="flex gap-2 border-gray-300 p-1">
                                    <p className="font-bold text-gray-800">Total Items:</p>
                                    <p>{totalItems}&nbsp;{totalItems > 1 ? 'items' : 'item'}</p>
                                </div>

                                {totalPrice <= 149 ?
                                    <div className="flex  gap-2 border-gray-300 p-1">
                                        <p className="font-bold text-gray-800">Delivery Charge for order below 149: </p>
                                        <p className='font-bold'>&#8377;{cashDeliveryCharge}</p>
                                    </div> : ''
                                }
                                {paymentMode === 'cash' ?
                                    <div className="flex  gap-2 border-gray-300 p-1">
                                        <p className="font-bold text-gray-800">Charge for cash on delivery option: </p>
                                        <p className='font-bold'>&#8377;{cashDeliveryCharge}</p>
                                    </div> : <div className="flex  gap-2 border-gray-300 p-1">
                                        <p className="font-bold text-gray-800">Charge for upi and card: </p>
                                        <p className='line-through'>&#8377;{cashDeliveryCharge}</p>
                                        <p className='font-bold'>Free</p>
                                    </div>
                                }
                                <div className="flex gap-2 border-gray-300 p-1">
                                    <p className="font-bold text-gray-800">Total Price with Tax@18%:</p>
                                    <p className='font-bold'>&#8377;{totalPriceWithTax.toFixed(2)}</p>
                                </div>
                                <div className="flex gap-2 border-gray-300 p-1">
                                    <p className="font-bold text-gray-800">Rounding off : </p>
                                    <p className='font-bold'>&#8377;{Math.ceil(totalPriceWithTax.toFixed(2))}</p>
                                </div>
                            </div>
                        </div>
                        <div className="border mt-2 border-gray-300 shadow-md p-4">
                            <h1 className="member-name mb-2 ">Payment Options</h1>
                            <div className='flex flex-col gap-2'>
                                <label className="cursor-pointer inline-flex items-center border border-gray-300 p-1 w-full shadow-sm">
                                    <input type="radio" name="payment" value="cash" onChange={handleChange} className="mx-2" />
                                    Cash on Delivery

                                </label>

                                <label className="cursor-pointer inline-flex items-center border border-gray-300 p-1 w-full shadow-sm">
                                    <input type="radio" name="payment" value="card" onChange={handleChange} className="mx-2" />
                                    Pay By Card
                                </label>

                                <label className="cursor-pointer inline-flex items-center border border-gray-300 p-1 w-full shadow-sm">
                                    <input type="radio" name="payment" value="upi" onChange={handleChange} className="mx-2" />
                                    Pay By UPI
                                </label>
                                {paymentMode && (
                                    <button
                                        className="bg-[#00416a] hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300"
                                        onClick={handlePayment}
                                    >
                                        Proceed to Payment
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>
                    <div className='border mt-2 flex flex-wrap flex-col w-6/12 border-gray-300 shadow-md p-4 relative'>
                        <div className='absolute right-0 bg-[#00416a] text-white px-4 py-0.5 top-0 text-sm'>Selected Address</div>
                        <h1 className='member-name'>Billing Details: </h1>
                        <div className='bg-[#d3d3d3] p-2'>
                            <div className='mb-2 text-[#00416a] font-bold'>{user.name}</div>
                            <div className='text-sm text-[#00416a] font-semibold'>{user.email}</div>
                            <div className='text-sm text-[#00416a] font-semibold'>9853105135</div>
                            <div className='text-sm text-[#00416a] '>{userAdd}</div>
                        </div>
                        <div className='pt-2'>
                            <h3 className='text-white font-bold bg-[#00416a] hover:bg-green-700 text-center cursor-pointer w-auto px-2 py-1'> +Add new Address</h3>
                        </div>
                    </div>

                </div>






            </div>
        );
    }

};

export default PaymentPage;
