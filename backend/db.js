const mongoose = require('mongoose')
var mongoURL = `mongodb+srv://sagarcom853:4uFJBxok7c5RAhXS@cluster0.p1cysgz.mongodb.net/namaste-food`
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
var db = mongoose.connection

db.on('connected', () => {
    console.log('mongoDb connection successfull')
})

db.on('error', () => {
    console.log('mongodb connection failed')
})

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to application termination');
    process.exit(0);
});

module.exports = mongoose

// const mongoose = require('mongoose');

// const mongoURL = 'mongodb+srv://sagarcom853:4uFJBxok7c5RAhXS@cluster0.p1cysgz.mongodb.net/namaste-food';

// const connectToMongoDB = async () => {
//     return new Promise((resolve, reject) => {
//         const db = mongoose.connection;

//         // Event listeners for additional logging
//         db.on('connected', () => {
//             console.log('MongoDB connection established');
//             resolve();
//         });

//         db.on('error', (err) => {
//             console.error('MongoDB connection error:', err.message);
//             reject(err);
//         });

//         db.on('disconnected', () => {
//             console.log('MongoDB disconnected');
//         });

//         // Listen for Node process termination and close the MongoDB connection
//         process.on('SIGINT', async () => {
//             await mongoose.connection.close();
//             console.log('MongoDB connection closed due to application termination');
//             process.exit(0);
//         });

//         // Establish MongoDB connection
//         mongoose.connect(mongoURL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//     });
// };

// // Establish MongoDB connection
// connectToMongoDB()
//     .then(() => {
//         console.log('Connected to MongoDB');
//     })
//     .catch((error) => {
//         console.error('Error connecting to MongoDB:', error.message);
//     });

// module.exports = mongoose;
