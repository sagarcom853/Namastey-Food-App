import { Link } from "react-router-dom"
import { useAuth } from "../Components/Context/AuthProvider"

const Cards = ({ data, type, handleAddItem,handleDeleteItem}) => {
    let buttonLabels = [{ name: 'move', id: 1 }, { name: 'copy', id: 2 }]
    const { user } = useAuth()
    return (
        <div
            key={data.id}
            className='hover:border-gray-100 cursor-pointer hover:rounded-2xl w-72 h-90 mt-4 hover:shadow-2xl transition-all duration-300 ease-in-out mb-4'
        >
            <div className='h-40 w-60 mb-1 mx-auto relative'>
                <img src='https://tse4.mm.bing.net/th?id=OIP.MeHH1uPILocqcbznizYrggHaHa&pid=Api&P=0&h=180' alt='remove-wishlist-icon' onClick={() => handleDeleteItem(user.email, data, type)} className="image-remove-button" />
                <Link to={type === 'restaurant' ? `/restaurant/${data.id}` : `/restaurant/${data.restaurantData.id}`}>
                    <img
                        alt='Food'
                        loading='lazy'
                        rel="preconnect"
                        className=' h-42 w-64 pt-4 hover:border-black object-contain '
                        src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${type === 'restaurant' ? data.cloudinaryImageId : data.imageId
                            }`}
                    />
                </Link>

            </div>
            <div className='flex flex-col mt-2 flex-wrap items-center w-60 mx-auto'>
                <div className="relative">
                    <div className='text-md mb-1 text-gray-850 font-semibold font-sans text-start h-12'>
                        {data.name}
                    </div>

                </div>
                {
                    type === 'item' ?
                        <div className="flex flex-col font-semibold w-full gap-2 mt-4 flex-wrap mb-4">
                            {buttonLabels.map((button) => {
                                return <button key={button.id} className='uppercase text-white bg-purple-500 px-2 py-1 shadow-md hover:shadow-2xl h-10 hover:bg-purple-300 mx-4 rounded-md'
                                    onClick={(e) => handleAddItem(button.name, user.email, data, type)}
                                >
                                    {button.name}
                                </button>
                            })}
                        </div>
                        : ''
                }

                {type === 'restaurant' ? <>
                    <div className='text-sm text-gray-600'>
                        {data.cuisines?.join(", ")}
                    </div>
                    <div className='mt-4 text-gray-600'>
                        <ul className='flex flex-row flex-wrap gap-2 items-center '>
                            <li className='text-sm text-gray-600'>
                                {data.costForTwo}
                            </li>
                            <li className={` ${Number(data?.avgRating) > 4 ? "text-green-900" : "text-pink-900"}`}>
                            </li>
                        </ul>
                    </div>
                </>
                    : ''}
            </div>

        </div>
    )
}
export default Cards