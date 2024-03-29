import { useAuth } from ".././Context/AuthProvider"
import { useEffect, useState } from 'react'
import axios from "axios"
import LoadingComponent from "../../utils/LoadingComponent";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
    const { isAuthenticated, user, setAuth, auth } = useAuth();
    const [usersDetails, setUsersDetails] = useState(null);
    const [loading, setLoading] = useState(false)
    const [Err, setErr] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()
    console.log('users here', usersDetails)

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/user/users`);
            if (response.status === 200) {
                setUsersDetails(response.data);
                setLoading(false)
            }
            // setAuth({ ...auth, isAuthenticated: true, user: response.data.user });

        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };
    useEffect(() => {
        setLoading(true)

        if (user) {
            fetchUserDetails();
        }
    }, [success]);

    const deleteUser = async (email) => {
        setLoading(true)
        try {
            const response = await axios.post('http://localhost:8000/user/delete', {
                email: email
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )

            if (response.status === 200) {
                setLoading(false)
                setSuccess(response.message)
                // setAuth({ ...auth, isAuthenticated: true, user: response.data.user });
                setErr('')
                // setOrderDetails()
            }

        } catch (error) {
            setSuccess('')
            if (error.response) {
                if (error.response.status === 404) {
                    setErr("Items not there...........")
                } else {
                    setErr(error.response.data.message || 'An error occurred.');
                }
            } else if (error.request) {
                setErr('No response received from the server.');
            } else {
                setErr('Error setting up the request.');
            }
        }
    }

    const handleMakeAdmin = async (user) => {
        setLoading(true)
        let updatdUser = { ...user, isAdmin: !user.isAdmin }
        try {
            const response = await axios.post('http://localhost:8000/user/update',
                updatdUser
                ,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )

            if (response.status === 200) {
                setSuccess(response.data.message)
                fetchUserDetails()
                // setAuth({ ...auth, isAuthenticated: true, user: response.data.user });
                setErr('')
                setLoading(false)

                // setOrderDetails()
            }

        } catch (error) {
            setSuccess('')
            setLoading(false)
            if (error.response) {
                if (error.response.status === 404) {
                    setErr("Items not there...........")
                } else {
                    setErr(error.response.data.message || 'An error occurred.');
                }
            } else if (error.request) {
                setErr('No response received from the server.');
            } else {
                setErr('Error setting up the request.');
            }
        }
    }

    const orderDetailsFunc = () => {
        return (
            <table>
                <thead>
                    <tr>
                        <th >Name</th>
                        <th className="border-t">Address</th>
                        <th>state</th>
                        <th>Gender</th>
                        <th>isAdmin</th>
                        <th><button className="button" disabled>DeleteAll</button></th>
                        {/* <th>Address: </th> */}
                    </tr>
                </thead>

                {usersDetails?.map((user1) => {
                    return (
                        <tbody key={user1._id}>
                            <tr key={user1._id} className='border-t border-gray-300'>
                                <td>{user1.name}</td>
                                <td>{user1.add1}</td>
                                <td>{user1.state}</td>
                                <td>{user1.gender}</td>
                                <td>{user1.isAdmin ? 'Yes' : 'No'} &nbsp;
                                    {user.email !== user1.email && <button className="button" onClick={() => handleMakeAdmin(user1)}>{!user1.isAdmin ? 'make admin' : 'Remove'}</button>}
                                </td>
                                {/* <td><button className="button" onClick={() => navigate(`/orders/${order._id}/itemId=${item.info.id}`)}>Details...</button></td> */}

                                <td>
                                    {user.email !== user1.email &&
                                        <button onClick={() => deleteUser(user1.email)} className="button">Delete</button>
                                    }
                                </td>
                            </tr>


                        </tbody>
                    )
                })}
            </table>
        )
    }

    if (loading) {
        return (<LoadingComponent />)
    }

    return (
        <div className="cartContainer-100">
            <div>
                {usersDetails && usersDetails.length > 0 ?
                    <div>
                        <h1 className="member-name1">
                            Here are all users using...
                        </h1>
                        {!loading && orderDetailsFunc()}
                    </div>
                    :
                    <div
                        className='mx-auto w-96 text-xl'
                    > <h1>No users registered yet....</h1></div>

                }
            </div>



        </div>
    )
}

export default OrderPage