const User = require("../models/User")

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const fetchUser = async (req, res) => {
    try {
        const { email } = req.query; // Extract email from query parameters
        const user = await User.findOne({ email });

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createUser = async (req, res) => {
    try {
        const { isAdmin, name, email, password, gender, dob, add1, add2, landmark, state, country, pin, imageURL } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required fields.' });
        }
        // Validate if the user already exists based on email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        let c = []
        console.log('isAdmin', isAdmin)

        // Create a new user
        const newUser = new User({
            name,
            email,
            password,
            gender,  // Set default values for optional fields
            dob,
            add1,
            add2,
            landmark,
            state,
            country,
            pin,
            imageURL,
            addresses: c,
            isAdmin
            // Add more fields as needed
        });

        // Save the user to the database
        await newUser.save();
        res.status(201).json({ user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { isAdmin, name, password, gender, dob, add1, add2, landmark, pin, state, country, email, imageURL } = req.body;

        // Validate if the user already exists based on email
        let existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: 'User with this email does not exist' });
        }
        let address = {
            add1,
            add2,
            landmark,
            pin,
            state,
            country
        }
        console.log(address)

        // Modify existing user properties
        existingUser.name = name;
        existingUser.password = password;
        existingUser.gender = gender;
        existingUser.dob = dob;
        existingUser.add1 = add1;
        existingUser.add2 = add2;
        existingUser.landmark = landmark;
        existingUser.pin = pin;
        existingUser.state = state;
        existingUser.country = country;
        existingUser.imageURL = imageURL
        existingUser.addresses.push(address)
        existingUser.isAdmin = isAdmin

        // Save the user to the database
        await existingUser.save();

        res.status(200).json({ user: existingUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUserAddress = async (req, res) => {
    try {
        const { email, formData } = req.body
        const { add1, add2, landmark, pin, state, country } = formData
        // Validate if the user already exists based on email
        let existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: 'User with this email does not exist' });
        }
        let address = {
            add1,
            add2,
            landmark,
            pin,
            state,
            country
        }
        console.log(address)
        existingUser.addresses.push(address)
        // Save the user to the database
        await existingUser.save();
        res.status(200).json({ user: existingUser });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const updateUserImage = async (req, res) => {
    try {
        const { email, imageURL } = req.body
        let existingUser = await User.findOne({ email })
        existingUser.imageURL = imageURL
        await existingUser.save()
        res.status(200).json({ user: existingUser })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createOrder = async (req, res) => {
    try {
        const { email, cart, paymentMode, totalAmount, totalAmountwithCharges } = req.body;
        // Find the existing order for the user
        console.log('inside create order')
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // Append new order details to the existing orders array
            const newOrder = {
                items: cart,
                paymentMode,
                paymentTime: new Date(),
                paymentStatus: 'pending',
                totalAmount: totalAmount,
                totalAmountwithCharges: totalAmountwithCharges
            }
            existingUser.orders.push(newOrder);
            await existingUser.save();
            const newOrderId = existingUser.orders[existingUser.orders.length - 1]._id
            console.log('newOrderId', newOrderId)
            res.status(200).json({
                message: 'Order placed successfully',
                orderId: newOrderId,
                user: existingUser, // Send back the updated user object
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


// const createOrder = async ({ email, cart, paymentMode, totalAmount, totalAmountwithCharges }) => {
//     try {
//         // Find the existing order for the user
//         console.log('inside create order');
//         const existingUser = await User.findOne({ email });
//         console.log(existingUser)
//         if (existingUser) {
//             // Append new order details to the existing orders array
//             const newOrder = {
//                 items: cart,
//                 paymentMode,
//                 paymentTime: new Date(),
//                 paymentStatus: 'pending',
//                 totalAmount,
//                 totalAmountwithCharges,
//             };

//             console.log('newOrder', newOrder);
//             existingUser.orders.push(newOrder);

//             await existingUser.save();
//             const newOrderId = existingUser.orders[existingUser.orders.length - 1]._id;
//             console.log('newOrderId', newOrderId);

//             return {
//                 message: 'Order placed successfully',
//                 orderId: newOrderId,
//                 user: existingUser, // Send back the updated user object
//             };
//         } else {
//             return { message: 'User not found' };
//         }
//     } catch (error) {
//         return { message: 'Internal server error' };
//     }
// };
const deleteAllOrders = async (req, res) => {
    try {
        const { email } = req.body
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            existingUser.orders = []
            await existingUser.save()
            console.log(existingUser.orders)
            res.status(200).json({
                message: 'orders deleted successfully',
                user: existingUser
            })
        } else {
            res.status(404).json({ message: 'User Details not found' })
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await User.findOneAndDelete({ email });

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });

    }
    catch (error) {
        res.status(500).json({ message: 'Cannot delete user' })
    }
}

const addToTemporaryCart = async (req, res) => {
    try {
        const { email, cart } = req.body;
        // Find the existing order for the user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // Append new order details to the existing orders array
            existingUser.tempCart.cartItems.push({
                ...cart
            });

            await existingUser.save();

            res.status(200).json({
                message: 'Items Pending in cart...',
                user: existingUser, // Send back the updated user object
            });
        } else {
            res.status(404).json({ message: 'Is user Logged in? I do not think so...' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const addtoFavourites = async (req, res) => {
    try {
        const { email, item, type } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            if (type === 'restaurant') {
                existingUser.favourites.restaurant.push({
                    ...item
                })
            } else if (type === 'item') {
                existingUser.favourites.items.push({ ...item })
            }

            await existingUser.save();
            let message = type === 'restaurant' ? 'Added to Fav Restaurants' : 'Added to favourite Items'
            res.status(200).json({
                message: message,
                user: existingUser, // Send back the updated user object
            });
        } else {
            res.status(404).json({ message: 'Please login to add to favourites' })
        }

    } catch (error) {
        res.status(500).json({ message: 'Some error occured!' })
    }
}

const removeFromFavourites = async (req, res) => {
    try {
        const { email, itemId, type } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (type === 'restaurant') {
                existingUser.favourites.restaurant = existingUser.favourites.restaurant.filter(
                    (restaurant) => restaurant.id !== itemId
                );
            } else if (type === 'item') {
                existingUser.favourites.items = existingUser.favourites.items.filter(
                    (item) => item.id !== itemId
                );
            }

            await existingUser.save();

            let message =
                type === 'restaurant' ? 'Removed from Fav Restaurants' : 'Removed from favourite Items';

            res.status(200).json({
                message: message,
                user: existingUser, // Send back the updated user object
            });
        } else {
            res.status(404).json({ message: 'Please login to remove from favourites' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Some error occurred!' });
    }
};

const fetchFromFavourites = async (req, res) => {
    try {
        const { email } = req.query;
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(200).json(existingUser.favourites)
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Some error occured!' })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required fields.' });
        }
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({ message: 'User with this email does not exists' });
        }
        const isPasswordValid = await password === existingUser.password
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Email or password is wrong..' });
        }
        res.json({ token: "ANVVJVEVEBEVFEFEGEGEGEGEGEGEG", existingUser })
    }
    catch (error) {
        res.status(500).json({ message: error.message });

    }
}
const getAllOrders = async (req, res) => {
    console.log('inside getallorders')
    try {
      // Fetch all users and their orders
      const users = await User.find({})
      console.log(users)

      // Map over the users array and extract the orders
      const orders = users.reduce((acc, user) => {
        acc = acc.concat(user.orders);
        return acc;
      }, []);
  
      res.status(200).json({ orders });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
module.exports = {
    getAllUsers, createUser, loginUser, fetchFromFavourites,
    addToTemporaryCart, updateUser,
    updateUserImage, createOrder,
    deleteAllOrders, fetchUser, addtoFavourites,
    removeFromFavourites, updateUserAddress, deleteUser,getAllOrders
};