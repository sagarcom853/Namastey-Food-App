Food ordering App - Restaurant Food Ordering App

WFoods is a web-based application that allows users to browse and order food from our restaurant. With a wide variety of delicious dishes and seamless ordering process, we aim to provide a delightful dining experience.

Technologies Used
Frontend: React.js, Redux for state management, Tailwind CSS for styling.

For backend create an config.env inside config folder and paste the following:
PORT = 8000

Getting Started
Prerequisites
Node.js and npm should be installed on your machine.
Installation

once the repo is cloned. There are two components to this.

1. The frontend which can be directly run by : npm run start. which will run at port 3000
2. The backend in which you can cd into and then run npx nodemon App.js which will run at port 8080/8000

To run the local set up without APIs

1. Install json web-webserver
2. run products json file with : npx json-server --watch productsData.json --port 3001
3. run restaurants json file with : npx json-server --watch prestaurantsData.json--port 3002.
4. Note they will run at different ports.

If mongo db doesn't connect, then drop the database and start by creating again.

Features
User Authentication: Create an account or log in to get access to personalized features like order history and saved addresses.
Browse Menu: Explore our extensive menu categorized by cuisine, dietary preferences, and more.
Customizable Orders: Modify dishes to suit your taste preferences, with options for extras, sides, and special requests.
Secure Payments: Make hassle-free payments through multiple payment options, including credit/debit cards and digital wallets.
Order Tracking: Keep an eye on the status of your order in real-time, from preparation to delivery.
Save Addresses: Store multiple delivery addresses for convenient ordering.
Rating and Reviews: Share your feedback and read reviews from other customers to make informed choices.
