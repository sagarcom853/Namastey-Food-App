import { Grid } from "@mui/material"
import { useDispatch } from "react-redux";
import { addItem } from "./Redux/cartSlice";

const ItemList = ({ it, vegLabel }) => {
    let cloudinaryImageId =
        "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/";
    const dispatch = useDispatch()
    //dispatching actions by clicking add item button 

    const handleAddItem = (info) => {
        // setShowModal(true);

        //dispatching actions with actions and actions.payload
        dispatch(addItem({ info }))
    };

    return (<>
        <Grid container spacing={2}>
            <Grid item xs={8} sm={9} md={10} lg={10}>
                {it.card.info.isVeg ?
                    <img width="20" height="20" src="https://img.icons8.com/fluency/48/vegetarian-food-symbol.png" alt="vegetarian-food-symbol" />
                    :
                    <img width="20" height="20" src="https://img.icons8.com/fluency/48/non-vegetarian-food-symbol.png" alt="non-vegetarian-food-symbol" />
                }
                <div className='text-md w-[6]'>
                    {it.card.info.name}
                </div>
                <div className='text-sm'>
                    &#8377;{it.card.info.price / 100}
                </div>

                <div className='text-sm mt-3 font-sans text-gray-400 w-[10]'>
                    {it.card.info.description}
                </div>
            </Grid>
            <Grid item xs={4} sm={3} md={2} lg={2}>
                <div>
                    {it.card.info.imageId ? (
                        <div className='relative'>
                            <img
                                alt='food'
                                className='h-24 w-28 rounded-md'
                                src={
                                    cloudinaryImageId + it.card.info.imageId
                                }
                            />
                            <button
                                className='uppercase text-green-300 absolute z-10 bg-white shadow-md hover:shadow-2xl hover:bg-gray-200 border-green-800 h-8 mx-4 -mt-5 rounded-md w-20'
                                onClick={() => handleAddItem(it.card.info
                                )}
                            >
                                Add
                            </button>
                        </div>
                    ) : (
                        <button className='uppercase text-green-300 bg-white shadow-md hover:shadow-2xl h-10 hover:bg-gray-200 border-green-800 mx-4 rounded-md w-20'
                            onClick={() => handleAddItem(it.card.info)}
                        >
                            Add
                        </button>
                    )}
                </div>
            
            </Grid>
        </Grid>

    </>
    )
}
export default ItemList



