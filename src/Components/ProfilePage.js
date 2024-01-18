import { useAuth } from './Context/AuthProvider'
import MemberInfoTable from '../MemberProfileTable'
import { useState, useEffect } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import axios from 'axios'

const ProfilePage = () => {
    const { user, setAuth, auth } = useAuth()
    const [newProfileImage, setNewProfileImage] = useState(null)
    const [success, setSuccess] = useState('')
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
        <div>
            <div className='flex justify-evenly gap-4 align-center'>
                {
                    success ? <div className='bg-green-700 border-2 w-64 px-4 my-2 text-white rounded-md cursor-pointer'>{success}</div> : ''
                }
                <h1 className='member-name text-center mt-4'>Member Profile Page</h1>

            </div>

            <div className='member-total'>
                <div className='member-intro'>
                    <div
                        className='cover-image'
                        style={{ backgroundImage: `url('https://tse4.mm.bing.net/th?id=OIP.X0upBc_m8UmXj6ljIoQ3twHaCv&pid=Api&P=0&h=180')` }}
                    >
                        <label htmlFor='profile-image' className='edit-icon'>
                            <CameraAltIcon />
                        </label>
                        <input
                            type='file'
                            id='profile-image'
                            accept='image/*'
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                        <h1 className='text-red-500'></h1>
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

                        <div className='member-name'>{user.name}</div>
                    </div>
                </div>
            </div>


            <div className='table-container'>
                <MemberInfoTable title="Basic Information" fields={basicInfoFields} />
                <MemberInfoTable title="Additional Information" fields={additionalInfoFields} />
            </div>
        </div>

    )
}

export default ProfilePage