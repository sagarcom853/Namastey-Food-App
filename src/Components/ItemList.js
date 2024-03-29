import { useDispatch } from "react-redux";
import { addItem } from "./Redux/cartSlice";
import { ToastContainer, toast } from 'react-toastify';
import { Grid, Card, CardContent, Typography } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuModal from "./Modal/MenuModal"
import { useAuth } from "./Context/AuthProvider";
import axios from 'axios'
import { useHook } from "../useHooks/CustomAPIHook";
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const ItemList = ({ it, vegLabel, restaurantInfo }) => {
    const [showModal, setShowModal] = useState(false)
    const [openSnack, setopenSnack] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'right',
    })
    const [err, setErr] = useState('')
    const [expandedGroup, setExpandedGroup] = useState(null);
    const { handleRemoveItem, hooksErr } = useHook()
    const { vertical, horizontal, open } = openSnack;

    let cloudinaryImageId =
        "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/";
    const dispatch = useDispatch()
    const { user, auth, setAuth } = useAuth()

    const showToastMessage = () => {
        toast.success('Added to cart!', {
            position: toast.POSITION.TOP_RIGHT
        });
        // setopenSnack(true)
        setopenSnack({ ...openSnack, open: true })
    };

    const handleAddItem = (info) => {
        //dispatching actions with actions and actions.payload
        info = { ...info, restaurantData: restaurantInfo }
        dispatch(addItem({ info }))
        showToastMessage()
    };

    const handleRemoveFromFavourites = (data) => {
        console.log(data)
        handleRemoveItem(user.email, data.info, 'item')
    }

    useEffect(() => {
    }, [user])

    const handleAddtoFavourites = async (data) => {
        data.info = { ...data.info, restaurantData: restaurantInfo }

        try {
            const response = await axios.post(
                "http://localhost:8000/user/Addfavourites",
                {
                    email: user.email,
                    item: data.info,
                    type: 'item'
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                setAuth({ ...auth, isAuthenticated: true, user: response.data.user })
                setErr('')
            } else {
                setErr('Unexpected error occurred.');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    setErr("Please login to add items to favourites...")
                } else {
                    setErr(error.response.data.message || 'An error occurred.');
                }
            } else if (error.request) {
                // The request was made but no response was received
                setErr('No response received from the server.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setErr('Error setting up the request.');
            }
        }
    }

    const isItemWishlisted = () => {
        return user?.favourites?.items?.some((item) => item.id === it.card.info.id);
    }

    const renderAddOns = (addons) => {
        const handleAccordionChange = (groupId) => {
            setExpandedGroup(expandedGroup === groupId ? null : groupId);
        };

        return (
            <>
                {addons.map((addon) => (
                    <Accordion
                        key={addon.groupId}
                        expanded={expandedGroup === addon.groupId}
                        onChange={() => handleAccordionChange(addon.groupId)}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography className='text-sm mt-3 font-sans text-gray-600'>{addon.groupName}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="flex flex-wrap justify-start flex-row gap-4">
                                {addon.choices.map((addedItem) => (
                                    <div key={addedItem.id} className="addon-card">
                                        <div className='flex flex-col justify-start p-0'>
                                            <span className='text-sm'>{addedItem.name.slice(0, 20)}</span>
                                            <span className='text-sm'>Price: &#8377;{addedItem.price ? addedItem.price / 100 : it.card.info.price / 100}</span>
                                            <Button
                                                variant="outlined"
                                                className="w-12 button-short flex justify-end"
                                                onClick={() => handleAddItem(addedItem)}
                                            >
                                                Add
                                            </Button>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </>
        );
    };

    useEffect(() => {
        setTimeout(() => {
            setErr('')
        }, 4000)
    }, [err])

    const handleClose = () => {
        setopenSnack({ ...openSnack, open: false });
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (<>
        {/* <ToastContainer /> */}
        <Snackbar
            open={openSnack.open}
            anchorOrigin={{ vertical, horizontal }}
            key={vertical + horizontal}
            autoHideDuration={5000}
            onClose={handleClose}
            message="Item added to cart successfully"
            action={action}
        />
        <Grid container spacing={2}>
            <Grid item xs={8} sm={9} md={10} lg={10}>
                {err ?
                    <div className="p-1 rounded-md flex justify-center bg-red-600 text-white mb-4">{err}</div>
                    : ''
                }
                <div className='flex gap-2'>
                    {it.card.info.isVeg ?
                        <img width="20" height="20" loading='lazy' src="https://img.icons8.com/fluency/48/vegetarian-food-symbol.png" alt="vegetarian-food-symbol" />
                        :
                        <img width="20" height="20" loading='lazy' src="https://img.icons8.com/fluency/48/non-vegetarian-food-symbol.png" alt="non-vegetarian-food-symbol" />
                    }
                    {it.card.info.isBestseller ?
                        <div className='best-seller-tag'>
                            Best Seller
                        </div> : ''


                    }
                </div>

                <div className="flex flex-wrap items-center gap-2 justify-start">
                    <div className='text-md w-[6]'>
                        {it.card.info.name}
                    </div>
                    {isItemWishlisted() ? (
                        <Tooltip title="Remove from favourites" arrow placement="top">
                            <img
                                src='https://cdn-icons-png.flaticon.com/128/7245/7245139.png'
                                alt='remove-wishlist-icon'
                                className='h-4 w-4'
                                onClick={() => handleRemoveFromFavourites(it.card)}
                            />
                        </Tooltip>

                    ) : (
                        <Tooltip title="Add to favourites" arrow placement="top">
                            <img
                                src='https://icon-library.com/images/wishlist-icon/wishlist-icon-16.jpg'
                                alt='wishlist-icon'
                                className='h-4 w-4'
                                onClick={() => handleAddtoFavourites(it.card)}
                            />
                        </Tooltip>

                    )}
                </div>

                <div className='text-sm'>
                    <span> &#8377;{it.card.info.price ? it.card.info.price / 100 : it.card.info.defaultPrice / 100}</span>
                    {/* {it.card.info?.offerTags?.map((item) => {
                        return <span style={{
                            backgroundColor: item.backgroundColor, color: item?.textColor
                        }}>{item?.title | item?.subTitle}</span>
                    })} */}

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
                                loading='lazy'
                                src={
                                    cloudinaryImageId + it.card.info.imageId
                                }
                            />
                            <button
                                className='uppercase text-green-300 absolute z-10 bg-white shadow-md hover:shadow-2xl hover:bg-gray-200 border-green-800 h-8 mx-4 -mt-5 rounded-md w-20'
                                onClick={() => handleAddItem(it.card.info
                                )}
                            >
                                {it.card.info?.addons ? '+' : ''} Add
                            </button>
                        </div>
                    ) : (
                        <div className='relative'>
                            <div className='h-24 w-28 rounded-md bg-gray-200' ></div>
                            <button className='uppercase text-green-300 bg-white shadow-md hover:shadow-2xl h-10 hover:bg-gray-200 border-green-800 mx-4 rounded-md w-20'
                                onClick={() => handleAddItem(it.card.info)}
                            >
                                Add
                            </button>
                        </div>
                    )}
                </div>

            </Grid>
        </Grid>
        {it.card.info.addons && it.card.info.addons.length > 0 &&
            <div>
                <h3 className="text-md mt-4">Add ons</h3>
                {renderAddOns(it.card.info.addons)}
            </div>
        }

        {/* modal  */}
        {/* <MenuModal
            showModal={showModal}
            setShowModal={setShowModal}
            onChange={onHandleChange}
        /> */}
    </>
    )
}
export default ItemList



