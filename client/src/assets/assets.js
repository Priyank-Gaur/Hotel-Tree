import logo from './logo.svg'
import searchIcon from './searchIcon.svg'
import userIcon from './userIcon.svg'
import calenderIcon from './calenderIcon.svg'
import locationIcon from './locationIcon.svg'
import starIconFilled from './starIconFilled.svg'
import arrowIcon from './arrowIcon.svg'
import starIconOutlined from './starIconOutlined.svg'
import instagramIcon from './instagramIcon.svg'
import facebookIcon from './facebookIcon.svg'
import twitterIcon from './twitterIcon.svg'
import linkendinIcon from './linkendinIcon.svg'
import freeWifiIcon from './freeWifiIcon.svg'
import freeBreakfastIcon from './freeBreakfastIcon.svg'
import roomServiceIcon from './roomServiceIcon.svg'
import mountainIcon from './mountainIcon.svg'
import poolIcon from './poolIcon.svg'
import homeIcon from './homeIcon.svg'
import closeIcon from './closeIcon.svg'
import locationFilledIcon from './locationFilledIcon.svg'
import heartIcon from './heartIcon.svg'
import badgeIcon from './badgeIcon.svg'
import menuIcon from './menuIcon.svg'
import closeMenu from './closeMenu.svg'
import guestsIcon from './guestsIcon.svg'
import roomImg1 from './roomImg1.png'
import roomImg2 from './roomImg2.png'
import roomImg3 from './roomImg3.png'
import roomImg4 from './roomImg4.png'
import regImage from './regImage.png'
import exclusiveOfferCardImg1 from "./exclusiveOfferCardImg1.png";
import exclusiveOfferCardImg2 from "./exclusiveOfferCardImg2.png";
import exclusiveOfferCardImg3 from "./exclusiveOfferCardImg3.png";
import addIcon from "./addIcon.svg";
import dashboardIcon from "./dashboardIcon.svg";
import listIcon from "./listIcon.svg";
import uploadArea from "./uploadArea.svg";
import totalBookingIcon from "./totalBookingIcon.svg";
import totalRevenueIcon from "./totalRevenueIcon.svg";

export const assets={
    logo,
    searchIcon,
    userIcon,
    calenderIcon,
    locationIcon,
    starIconFilled,
    arrowIcon,
    starIconOutlined,
    instagramIcon,
    facebookIcon,
    twitterIcon,
    linkendinIcon,
    freeWifiIcon,
    freeBreakfastIcon,
    roomServiceIcon,
    mountainIcon,
    poolIcon,
    closeIcon,
    homeIcon,
    locationFilledIcon,
    heartIcon,
    badgeIcon,
    menuIcon,
    closeMenu,
    guestsIcon,
    regImage,
    addIcon,
    dashboardIcon,
    listIcon,
    uploadArea,
    totalBookingIcon,
    totalRevenueIcon,
}

export const cities=[
    "Paris",
    "Tokyo",
    "Berlin",
    "Sydney",
]

// Exclusive Offers
export const exclusiveOffers=[
    {_id:11,title:"Winter Special",description:"Stay 3 nights & pay for 2 with complimentary dinner",priceOff:35,expiryDate:"Dec 15",image:exclusiveOfferCardImg1},
    {_id:12,title:"Business Saver",description:"Special rates for business travelers with workspace",priceOff:15,expiryDate:"Nov 30",image:exclusiveOfferCardImg2},
    {_id:13,title:"Family Fiesta",description:"Kids stay free with access to family activities",priceOff:25,expiryDate:"Jan 10",image:exclusiveOfferCardImg3},
]

// Testimonials
import profile_noah from './profile_noah.png'
import profile_ava from './profile_ava.png'
import profile_rohan from './profile_rohan.png'

// ... (existing imports)

// Testimonials
export const testimonials=[
    {id:1,name:"Noah Williams",address:"Toronto, Canada",image:profile_noah,rating:5,review:"Smooth experience from booking to checkout. Highly reliable platform."},
    {id:2,name:"Ava Müller",address:"Berlin, Germany",image:profile_ava,rating:4,review:"The hotel suggestions matched my style perfectly. Loved it!"},
    {id:3,name:"Rohan Mehta",address:"Mumbai, India",image:profile_rohan,rating:5,review:"Affordable luxury stays with excellent support. Will use again."},
]

// Facility Icons
export const facilityIcons={
    "Free WiFi":assets.freeWifiIcon,
    "Free Breakfast":assets.freeBreakfastIcon,
    "Room Service":assets.roomServiceIcon,
    "Mountain View":assets.mountainIcon,
    "Pool Access":assets.poolIcon,
}

// Room Info Highlights
export const roomCommonData=[
    {icon:assets.homeIcon,title:"Verified Property",description:"This property has been quality checked."},
    {icon:assets.badgeIcon,title:"Top Rated Host",description:"Consistently rated above 4.8 stars."},
    {icon:assets.locationFilledIcon,title:"Prime Area",description:"Located near popular attractions."},
    {icon:assets.heartIcon,title:"Guest Favorite",description:"Frequently booked by returning guests."},
]

// User Dummy Data
export const userDummyData={
    "_id":"user_x92kd9LmPz",
    "username":"TravelGeek",
    "email":"travel.geek@example.com",
    "image":"https://images.unsplash.com/photo-1603415526960-f7e0328b6fc7?q=80&w=200",
    "role":"hotelOwner",
    "createdAt":"2025-02-12T08:12:44.367Z",
    "updatedAt":"2025-04-02T11:20:18.719Z",
    "__v":0,
    "recentSearchedCities":["Tokyo","Paris"]
}

// Hotel Dummy Data
// Hotel Dummy Data
export const hotelDummyData={
    "_id":"ht_8492kd92",
    "name":"Skyline Residency",
    "address":"78 Sunset Avenue, Central District",
    "contact":"+44 9876543210",
    "owner":userDummyData,
    "city":"Paris",
    "createdAt":"2025-03-01T07:15:11.663Z",
    "updatedAt":"2025-03-01T07:15:11.663Z",
    "__v":0
}

const hotelDummyData2 = {
    "_id":"ht_8492kd93",
    "name":"The Grand Oliver",
    "address":"123 Cherry Blossom Lane, Shinjuku",
    "contact":"+81 90 1234 5678",
    "owner":userDummyData,
    "city":"Tokyo",
    "createdAt":"2025-03-02T07:15:11.663Z",
    "updatedAt":"2025-03-02T07:15:11.663Z",
    "__v":0
}

const hotelDummyData3 = {
    "_id":"ht_8492kd94",
    "name":"Royal Palace Berlin",
    "address":"45 Historic Center, Mitte",
    "contact":"+49 30 1234 5678",
    "owner":userDummyData,
    "city":"Berlin",
    "createdAt":"2025-03-03T07:15:11.663Z",
    "updatedAt":"2025-03-03T07:15:11.663Z",
    "__v":0
}

const hotelDummyData4 = {
    "_id":"ht_8492kd95",
    "name":"Seaside Resort",
    "address":"88 Bondi Beach, Coastal Road",
    "contact":"+61 2 1234 5678",
    "owner":userDummyData,
    "city":"Sydney",
    "createdAt":"2025-03-04T07:15:11.663Z",
    "updatedAt":"2025-03-04T07:15:11.663Z",
    "__v":0
}

// Rooms Dummy Data
export const roomsDummyData=[
    {_id:"rm_101",hotel:hotelDummyData,roomType:"Luxury Suite",pricePerNight:499,amenities:["Free WiFi","Pool Access","Room Service"],images:[roomImg1,roomImg2,roomImg3,roomImg4],isAvailable:true,createdAt:"2025-03-05T10:21:04Z",updatedAt:"2025-03-05T10:21:04Z",__v:0},
    {_id:"rm_102",hotel:hotelDummyData2,roomType:"Deluxe Room",pricePerNight:349,amenities:["Free Breakfast","Free WiFi"],images:[roomImg2,roomImg3,roomImg4,roomImg1],isAvailable:true,createdAt:"2025-03-06T10:21:04Z",updatedAt:"2025-03-06T10:21:04Z",__v:0},
    {_id:"rm_103",hotel:hotelDummyData3,roomType:"Standard Room",pricePerNight:249,amenities:["Free WiFi","Room Service"],images:[roomImg3,roomImg4,roomImg1,roomImg2],isAvailable:true,createdAt:"2025-03-07T10:21:04Z",updatedAt:"2025-03-07T10:21:04Z",__v:0},
    {_id:"rm_104",hotel:hotelDummyData4,roomType:"Single Room",pricePerNight:179,amenities:["Free WiFi"],images:[roomImg4,roomImg1,roomImg2,roomImg3],isAvailable:true,createdAt:"2025-03-08T10:21:04Z",updatedAt:"2025-03-08T10:21:04Z",__v:0},
]

// User Bookings Dummy Data
export const userBookingsDummyData=[
    {_id:"bk_301",user:userDummyData,room:roomsDummyData[0],hotel:hotelDummyData,checkInDate:"2025-06-10T00:00:00Z",checkOutDate:"2025-06-12T00:00:00Z",totalPrice:998,guests:2,status:"confirmed",paymentMethod:"Stripe",isPaid:true,createdAt:"2025-04-01T06:42:01Z",updatedAt:"2025-04-01T06:43:54Z",__v:0},
    {_id:"bk_302",user:userDummyData,room:roomsDummyData[2],hotel:hotelDummyData3,checkInDate:"2025-05-15T00:00:00Z",checkOutDate:"2025-05-16T00:00:00Z",totalPrice:249,guests:1,status:"pending",paymentMethod:"Pay At Hotel",isPaid:false,createdAt:"2025-04-02T06:41:45Z",updatedAt:"2025-04-02T06:41:45Z",__v:0},
]

// Dashboard Dummy Data
export const dashboardDummyData={
    "totalBookings":2,
    "totalRevenue":1247,
    "bookings":userBookingsDummyData
}
