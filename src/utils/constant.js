// export const RestuarantMenuAPI = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.9319838&lng=86.7465928&restaurantId=${id}&submitAction=ENTER`
export const weather_API = "a2ac8f252952756e57ff657ad656e40d";
export const cloudinaryIdIcon = `https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_18,h_18/`;
export const cloudinaryImageId = `https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/`;
export let API =
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999";
export let API3 = "http://localhost:8000/product/products";
export let API2 =
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";
export let corousalImageId =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/";
export const assets = 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_360/'
export let cartTableLabels = [
  { id: 0, name: "Item" },
  { id: 1, name: "Restaurant" },
  { id: 2, name: "Price" },
  { id: 3, name: "Quantity" },
];

export let SummaryTableLabels = [
  { id: 0, name: "Item" },
  { id: 1, name: "Restaurant" },
  { id: 2, name: "Price" },
  { id: 3, name: "Quantity" },
  { id: 4, name: "Total Price" },
];
export const RestaurantLogo =
  "https://tse3.mm.bing.net/th?id=OIP.Oap-2kGS3d-eEpnau9qIKAHaEI&pid=Api&P=0";

export const FAQ = [
  {
    id: 473,
    title: "Can I edit my order?",
    description:
      "Your order can be edited before it reaches the restaurant. You could contact customer support team via chat or call to do so. Once order is placed and restaurant starts preparing your food, you may not edit its contents",
  },
  {
    id: 474,
    title: "I want to cancel my order",
    description:
      "We will do our best to accommodate your request if the order is not placed to the restaurant (Customer service number:  080-67466729). Please note that we will have a right to charge a cancellation fee up to full order value to compensate our restaurant and delivery partners if your order has been confirmed.",
  },
  {
    id: 475,
    title: "Will Insta Food be accountable for quality/quantity? ",
    description:
      "Quantity and quality of the food is the restaurants' responsibility. However in case of issues with the quality or quantity, kindly submit your feedback and we will pass it on to the restaurant.",
  },
  {
    id: 476,
    title: "Is there a minimum order value?",
    description:
      "We have no minimum order value and you can order for any amount. ",
  },
  {
    id: 477,
    title: "Do you charge for delivery?",
    description:
      "Delivery fee varies from city to city and is applicable if order value is below a certain amount. Additionally, certain restaurants might have fixed delivery fees. Delivery fee (if any) is specified on the 'Review Order' page. ",
  },
  {
    id: 478,
    title: "How long do you take to deliver?",
    description:
      "Standard delivery times vary by the location selected and prevailing conditions. Once you select your location, an estimated delivery time is mentioned for each restaurant.",
  },
  {
    id: 479,
    title: "What are your delivery hours?",
    description:
      "Our delivery hours vary for different locations and depends on availability of supply from restaurant partners.",
  },
  {
    id: 481,
    title: "Is single order from many restaurants possible?",
    description:
      "We currently do not support this functionality. However, you can place orders for individual items from different restaurants.",
  },
];

export const itemNames = [
  { id: 0, link: "Biryani_2.png", name: "Biryani" },
  { id: 1, link: "North_Indian_4.png", name: "North Indian" },
  { id: 2, link: "3D_bau/banners_new/Cakes.png", name: "Cakes" },
  { id: 3, link: "3D_bau/banners_new/Chinese.png", name: "Chinese" },
  { id: 4, link: "3D_bau/banners_new/Burger.png", name: "Burgers" },
  { id: 5, link: "South_Indian_4.png", name: "South Indian" },
  { id: 6, link: "3D_bau/banners_new/Pizza.png", name: "Pizza" },
  { id: 7, link: "3D_bau/banners_new/Paratha.png", name: "Paratha" },
  { id: 8, link: "3D_bau/banners_new/Chole_Bature.png", name: "Chole Bhature" },
  { id: 9, link: "3D_bau/banners_new/Noodles.png", name: "Noodles" },
  { id: 10, link: "3D_bau/banners_new/Coffee.png", name: "Coffee" },
  { id: 11, link: "3D_bau/banners_new/Dosa.png", name: "Dosa" },
  { id: 12, link: "3D_bau/banners_new/Khichdi.png", name: "Khichdi" },
  { id: 13, link: "3D_bau/banners_new/Salad.png", name: "Salad" },
  {
    id: 14,
    link: "3D_bau/banners_new/Poori.png",
    name: "Poori",
    api: "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.5792779&lng=88.4899465&collection=80377&tags=layout_BAU_Contextual%2Cpoori&sortBy=&filters=&type=rcv2&offset=0&page_type=null",
  },
  { id: 15, link: "3D_bau/banners_new/Pure_Veg.png", name: "Pure Veg" },
  { id: 16, link: "3D_bau/banners_new/Idli.png", name: "Idli" },
  { id: 17, link: "3D_bau/banners_new/Kebabs.png", name: "Kebabs" },
  { id: 18, link: "3D_bau/banners_new/Lassi.png", name: "Icecreams" },
];

export const State = [
  {
    slno: 0,
    abb: "AN",
    name: "Andaman and Nicobar Islands",
    state: "andaman-and-nicobar",
  },
  {
    slno: 1,
    abb: "AP",
    name: "Andhra Pradesh",
    state: "andhra-pradesh",
  },
  {
    slno: 2,
    abb: "AR",
    name: "Arunachal Pradesh",
    state: "arunachal-pradesh",
  },
  {
    slno: 3,
    abb: "AS",
    name: "Assam",
    state: "assam",
  },
  {
    slno: 4,
    abb: "BR",
    name: "Bihar",
    state: "bihar",
  },
  {
    slno: 5,
    abb: "CG",
    name: "Chandigarh",
    state: "chandigarh",
  },
  {
    slno: 6,
    abb: "CH",
    name: "Chhattisgarh",
    state: "chattishgarh",
  },
  {
    slno: 7,
    abb: "DH",
    name: "Dadra and Nagar Haveli",
    state: "dadra-and-nagar",
  },
  {
    slno: 8,
    abb: "DD",
    name: "Daman and Diu",
    state: "daman-and-diu",
  },
  {
    slno: 9,
    abb: "DL",
    name: "Delhi",
    state: "delhi",
  },
  {
    slno: 10,
    abb: "GA",
    name: "Goa",
    state: "goa",
  },
  {
    slno: 11,
    abb: "GJ",
    name: "Gujarat",
    state: "gujrat",
  },
  {
    slno: 12,
    abb: "HR",
    name: "Haryana",
    state: "haryana",
  },
  {
    slno: 13,
    abb: "HP",
    name: "Himachal Pradesh",
    state: "himachal-pradesh",
  },
  {
    slno: 14,
    abb: "JK",
    name: "Jammu and Kashmir",
    state: "jammu-and-kashmir",
  },
  {
    slno: 15,
    abb: "JH",
    name: "Jharkhand",
    state: "jharkhand",
  },
  {
    slno: 16,
    abb: "KA",
    name: "Karnataka",
    state: "karnataka",
  },
  {
    slno: 17,
    abb: "KL",
    name: "Kerala",
    state: "kerala",
  },
  {
    slno: 18,
    abb: "LD",
    name: "Lakshadweep",
    state: "lakshadweep",
  },
  {
    slno: 19,
    abb: "MP",
    name: "Madhya Pradesh",
    state: "madhya-pradesh",
  },
  {
    slno: 20,
    abb: "MH",
    name: "Maharashtra",
    state: "maharashtra",
  },
  {
    slno: 21,
    abb: "MN",
    name: "Manipur",
    state: "manipur",
  },
  {
    slno: 22,
    abb: "ML",
    name: "Meghalaya",
    state: "meghalaya",
  },
  {
    slno: 23,
    abb: "MZ",
    name: "Mizoram",
    state: "mizoram",
  },
  {
    slno: 24,
    abb: "NL",
    name: "Nagaland",
    state: "nagaland",
  },
  {
    slno: 25,
    abb: "OR",
    name: "Odisha",
    state: "odhisha",
  },
  {
    slno: 26,
    abb: "PY",
    name: "Puducherry",
    state: "puducherry",
  },
  {
    slno: 27,
    abb: "PB",
    name: "Punjab",
    state: "punjab",
  },
  {
    slno: 28,
    abb: "RJ",
    name: "Rajasthan",
    state: "rajasthan",
  },
  {
    slno: 29,
    abb: "SK",
    name: "Sikkim",
    state: "sikkim",
  },
  {
    slno: 30,
    abb: "TN",
    name: "Tamil Nadu",
    state: "tamil-nadu",
  },
  {
    slno: 31,
    abb: "TS",
    name: "Telangana",
    state: "telangana",
  },
  {
    slno: 32,
    abb: "TR",
    name: "Tripura",
    state: "tripura",
  },
  {
    slno: 33,
    abb: "UK",
    name: "Uttar Pradesh",
    state: "uttar-pradesh",
  },
  {
    slno: 34,
    abb: "UP",
    name: "Uttarakhand",
    state: "uttarakhand",
  },
  {
    slno: 35,
    abb: "WB",
    name: "West Bengal",
    state: "west-bengal",
  },
];
