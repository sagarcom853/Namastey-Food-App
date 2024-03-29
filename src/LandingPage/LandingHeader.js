import { Link } from 'react-router-dom'
const LandingHeader = () => {
    return (
        <div className='landing-header'>
            <div className="">
                <Link to='/home'>
                    <img
                        src='https://tse3.mm.bing.net/th?id=OIP.Oap-2kGS3d-eEpnau9qIKAHaEI&pid=Api&P=0'
                        alt='food logo'
                        className='landing-image' 
                    />
                </Link>

            </div>
            <div className='flex flex-wrap items-center cursor-pointer gap-4 justify-evenly font-bold'>
                <h5 className='px-4 py-2'><Link to='/login'>Login</Link></h5>
                <h5 className='bg-black text-white px-4 py-2'><Link to='signup'>Signup</Link></h5>
            </div>
        </div>

    )
}
export default LandingHeader