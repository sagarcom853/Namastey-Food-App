import { useAuth } from '../Context/AuthProvider'
import MemberInfoTable from '../../MemberProfileTable'
import { useState, useEffect } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import axios from 'axios'
import { Link } from 'react-router-dom';
import "./profilePage.css"

const ProfilePage = () => {
    const { user, setAuth, auth } = useAuth()
    const [newProfileImage, setNewProfileImage] = useState(null)
    const [success, setSuccess] = useState('')
    const [isAddressShown, setAddressShown] = useState(false)
    const defaultProfileImage = 'https://cdn2.f-cdn.com/files/download/38545966/4bce6b.jpg'

    let dateString = ''
    if (user && user.dob) {
        let dob = user && user.dob
        let month = new Date(dob).getMonth() + 1
        let date = new Date(dob).getDate()
        let fullyear = new Date(dob).getFullYear()
        dateString = date + '-' + month + '-' + fullyear
    } else {
        dateString = ''
    }

    console.log('user details', user)
    const basicInfoFields = [
        { label: 'Full name', value: user ? user.name : '' },
        { label: 'Email address', value: user ? user.email : '' },
        { label: 'ID', value: user ? user._id : '' },
        { label: 'Password', value: user ? user.password : '' },
        // { label: 'Image', value: user.imageURL ? user.imageURL : newProfileImage ? URL.createObjectURL(newProfileImage) : defaultProfileImage }
        {
            label: 'Image',
            value: user.imageURL
                ? user.imageURL
                : newProfileImage
                    ? newProfileImage
                    : defaultProfileImage
        }
    ];


    let userAdd = user && user.add1 ? user.add1 + ',' + user.add2 + ',' + user.landmark + ',' + user.state + ',' + user.country + ',' + user.pin : ''
    const additionalInfoFields = [
        { label: 'Gender', value: user ? user.gender : '' },
        { label: 'DOB', value: dateString },
        { label: 'Present Address', value: user ? userAdd : '' },
    ];


    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        setNewProfileImage(URL.createObjectURL(file));
        // let newImage = URL.createObjectURL(file)
        let updatedUser = { ...user, imageURL: URL.createObjectURL(file) };
        try {

            const res = await axios.post("http://localhost:8000/user/update", updatedUser
                , {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

            )
            console.log('after image update response', res)
            if (res.status === 200) {
                setSuccess("image updated successfully")
                setAuth({ ...auth, isAuthenticated: true, user: res.data.user })

                setTimeout(() => {
                    setSuccess('')
                }, 3000)
            }
        } catch (error) {
            setSuccess("")
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Server responded with an error:", error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received from the server.");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error setting up the request:", error.message);
            }

        }

    };

    useEffect(() => {
        // Check if the user has imageURL and set it to newProfileImage
        if (user && user.imageURL) {
            setNewProfileImage(user.imageURL);
        }
    }, [user]);

    return (
        <div className=''>
            <div className='flex justify-evenly gap-4 align-center'>
                {
                    success ? <div className='bg-green-700 border-2 w-64 px-4 my-2 text-white rounded-md cursor-pointer'>{success}</div> : ''
                }
                {/* <h1 className='member-name text-center mt-4'>Member Profile Page</h1> */}

            </div>

            <div className='member-intro'>
                <div
                    className='cover-image '
                >
                    <div className='member-image-name'>
                        <div className='edit-icon'  >
                            <label htmlFor='profile-image' >
                                <CameraAltIcon />
                            </label>
                            <input
                                type='file'
                                id='profile-image'
                                accept='image/*'
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                        </div>
                        <img
                            // src={newProfileImage ? URL.createObjectURL(newProfileImage) : user ? user.ImageUrl : defaultProfileImage}
                            // src={user.imageURL ? user.imageURL : defaultProfileImage}
                            // src={user.imageURL ? user.imageURL : newProfileImage ? URL.createObjectURL(newProfileImage) : defaultProfileImage}
                            src={user.imageURL
                                ? user.imageURL
                                : newProfileImage
                                    ? newProfileImage
                                    : defaultProfileImage}
                            className='member-picture'
                            alt='profile-pic'
                        />


                        <div className='flex flex-row'>
                            <div className='member-name'>{user.name}
                                {user.isAdmin && <div className=' text-sm p-0 m-0 text-center w-20 bg-[#00416a] text-white'>Admin*</div>}
                            </div>

                        </div>  <div>
                            <Link to='/basicform' className='button flex justify-end'>Edit Profile</Link>
                        </div>
                    </div>

                    <div className='profile-details' >
                        <div className='details'>
                            <div className='text-2xl mx-auto'> 0</div>
                            <div className='text-xl'> Reviews</div>
                        </div>

                        <div className='details'>
                            <div className='text-2xl mx-auto'> 0</div>
                            <div className='text-xl'> Photos</div>
                        </div>
                        <div className='details'>
                            <div className='text-2xl mx-auto'> 0</div>
                            <div className='text-xl'> Followers</div>
                        </div>
                    </div>

                </div>
            </div>


            <div className='table-container'>
                <MemberInfoTable title="Basic Information" fields={basicInfoFields} />
                <MemberInfoTable title="Additional Information" fields={additionalInfoFields} />
            </div>
            <div className='ml-4 mb-10 pl-4 flex items-center  justify-start gap-2 '>
                <div className='text-[#00416a] font-bold text-xl  '>
                    My addresses
                </div>
                <button className='bg-[#00416a] text-white px-4 py-0.5 text-sm transition-all duration-300 ease-in-out' onClick={() => setAddressShown(!isAddressShown)}>{!isAddressShown ? 'Show Addresses' : 'Hide Addresses'
                }</button>
                <Link to='/address' className='bg-[#00416a] text-white px-4 py-0.5 text-sm '>+Add Address</Link>
            </div>

            {isAddressShown ?
                <table className="w-3/4 ml-8 my-3 p-4 border-collapse border border-gray-300 mb-4 shadow-md transition-all duration-300 ease-in-out">
                    <tbody>
                        {user && user.addresses?.map((address, index) => {
                            let userAdd = address && address.add1 ? address.add1 + ',' + address.add2 + ',' + address.landmark + ',' + address.state + ',' + address.country + ',' + address.pin : ''
                            return <tr key={index} className="border-t border-gray-300 ">
                                <div className='p-4 flex flex-wrap justify-between'>
                                    <div className=''>{userAdd}</div>
                                    <div className=''>
                                        <button className='button'>Set as delivery Address</button>
                                    </div>
                                </div>
                            </tr>
                        }

                        )}
                    </tbody>
                </table>
                :
                ''
            }
        </div>

    )
}

export default ProfilePage

