const express = require('express')
const router = express.Router()
const userController = require("../controllers/User")

router.get('/users', userController.getAllUsers);
router.get('/fetchUser', userController.fetchUser);
router.post('/create', userController.createUser)
router.post('/login', userController.loginUser)
router.post('/update', userController.updateUser)
router.post('/updateImage', userController.updateUserImage)
router.post('/createOrder', userController.createOrder)
router.post('/Addfavourites', userController.addtoFavourites)
router.get('/fetchFavourites', userController.fetchFromFavourites)
router.post('/deleteFavourite', userController.removeFromFavourites)
router.post('/deleteOrders', userController.deleteAllOrders)
router.post('/deleteOrderById', userController.deleteByOrderId)
router.post('/temporaryCart', userController.addToTemporaryCart)
router.post('/addAddress', userController.updateUserAddress)
router.post('/delete', userController.deleteUser)


module.exports = router 