import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hotel from './models/Hotel.js';
import Room from './models/Room.js';
import User from './models/User.js';

dotenv.config();

const cities = [
    // Major International Cities
    "Bangkok", "Paris", "London", "Dubai", "Singapore", "Kuala Lumpur", "New York", "Istanbul", "Tokyo", "Antalya",
    "Seoul", "Osaka", "Makkah", "Phuket", "Pattaya", "Milan", "Barcelona", "Palma de Mallorca", "Bali", "Hong Kong",
    "Frankfurt", "Dublin", "Taipei", "Miami", "Los Angeles", "Las Vegas", "Rome", "Prague", "Amsterdam", "Vienna",
    "Madrid", "Berlin", "Ho Chi Minh City", "Johannesburg", "Riyadh", "Doha", "Beijing", "Sydney", "Cairo", "Florence",
    "Lisbon", "Moscow", "Athens", "Venice", "Orlando", "Shanghai", "Toronto", "Vancouver", "San Francisco", "Chicago",
    "Munich", "Budapest", "St. Petersburg", "Warsaw", "Cancun", 

    // Major Indian Cities
    "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Pune", "Jaipur",
    "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara",
    "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli", "Vasai-Virar", "Varanasi",
    "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", "Ranchi", "Howrah", "Coimbatore", "Jabalpur",
    "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota", "Guwahati", "Chandigarh", "Solapur", "Hubballi-Dharwad",
    "Bareilly", "Moradabad", "Mysore", "Gurgaon", "Aligarh", "Jalandhar", "Tiruchirappalli", "Bhubaneswar", "Salem", "Mira-Bhayandar",
    "Warangal", "Thiruvananthapuram", "Bhiwandi", "Saharanpur", "Guntur", "Amravati", "Bikaner", "Noida", "Jamshedpur", "Bhilai",
    "Cuttack", "Firozabad", "Kochi", "Nellore", "Bhavnagar", "Dehradun", "Durgapur", "Asansol", "Rourkela", "Nanded",
    "Kolhapur", "Ajmer", "Akola", "Gulbarga", "Jamnagar", "Ujjain", "Loni", "Siliguri", "Jhansi", "Ulhasnagar",
    "Jammu", "Sangli-Miraj & Kupwad", "Mangalore", "Erode", "Belgaum", "Ambattur", "Tirunelveli", "Malegaon", "Gaya", "Jalgaon",
    "Udaipur", "Maheshtala", "Davanagere", "Kozhikode", "Akbarpur", "Kurnool", "Rajpur Sonarpur", "Rajahmundry", "Bokaro", "South Dumdum",
    "Bellary", "Patiala", "Gopalpur", "Agartala", "Bhagalpur", "Muzaffarnagar", "Bhatpara", "Panihati", "Latur", "Dhule",
    "Tirupati", "Rohtak", "Korba", "Bhilwara", "Berhampur", "Muzaffarpur", "Ahmednagar", "Mathura", "Kollam", "Avadi",
    "Kadapa", "Kamarhati", "Sambalpur", "Bilaspur", "Shahjahanpur", "Satara", "Bijapur", "Rampur", "Shivamogga", "Chandrapur",
    "Junagadh", "Thrissur", "Alwar", "Bardhaman", "Kulti", "Nizamabad", "Parbhani", "Tumkur", "Khammam", "Ozhukarai",
    "Bihar Sharif", "Panipat", "Darbhanga", "Bally", "Aizawl", "Dewas", "Ichalkaranji", "Karnal", "Bathinda", "Jalna",
    "Eluru", "Barasat", "Kirari Suleman Nagar", "Purnia", "Satna", "Mau", "Sonipat", "Farrukhabad", "Sagar", "Rourkela",
    "Durg", "Imphal", "Ratlam", "Hapur", "Arrah", "Anantapur", "Karimnagar", "Etawah", "Ambernath", "North Dumdum",
    "Bharatpur", "Begusarai", "New Delhi", "Gandhidham", "Baranagar", "Tiruvottiyur", "Puducherry", "Sikar", "Thoothukudi", "Rewa",
    "Mirzapur", "Raichur", "Pali", "Ramagundam", "Haridwar", "Vijayanagaram", "Katihar", "Nagercoil", "Sri Ganganagar", "Karawal Nagar",
    "Mango", "Thanjavur", "Bulandshahr", "Uluberia", "Murwara", "Sambhal", "Singrauli", "Nadiad", "Secunderabad", "Naihati",
    "Yamunanagar", "Bidhan Nagar", "Pallavaram", "Bidar", "Munger", "Panchkula", "Burhanpur", "Raurkela Industrial Township", "Kharagpur", "Dindigul",
    "Gandhinagar", "Hospet", "Nangloi Jat", "Malda", "Ongole", "Deoghar", "Chapra", "Haldia", "Khandwa", "Nandyal",
    "Morena", "Amroha", "Anand", "Bhind", "Bhalswa Jahangir Pur", "Madhyamgram", "Bhiwani", "Navi Mumbai Panvel Raigad", "Bahraich", "Shivpuri",
    "Jaunpur", "Saha", "Rae Bareli", "Fatehpur", "Bhuj", "Monghyr", "Orai", "Bahadurgarh", "Vellore", "Maunath Bhanjan",
    "Unnao", "Surendranagar", "Raiganj", "Sirsa", "Danapur", "Ambikapur", "Sitapur", "Haldwani-cum-Kathgodam", "Serampore", "Vidisha",
    "Phagwara", "Hassan", "Machilipatnam", "Lalitpur", "Deesa", "Hamirpur", "Azamgarh", "Guntakal", "Palanpur", "Udgir",
    "Moga", "Gonda", "Kanchipuram", "Kumbakonam", "Budaun", "Pilibhit", "Hazaaribagh", "Yavatmal", "Himgiri", "Hindaun",
    "Chittoor", "Veraval", "Lakhimpur", "Sitapur", "Hindupur", "Santipur", "Balurghat", "Ganj Basoda", "Medininagar", "Hoshangabad",
    "Kishanganj", "Gangtok", "Shimla", "Manali", "Darjeeling", "Mussoorie", "Nainital", "Dalhousie", "Pahalgam", "Mount Abu"
];

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/hotel_booking`);
        console.log("Connected to DB");
    } catch (error) {
        console.error("Connection error", error);
        process.exit(1);
    }
};

const seed = async () => {
    await connectDB();

    let owner = await User.findOne({role: 'hotelOwner'});
    if (!owner) {
        owner = await User.findOne({});
        if (!owner) {
            console.log("No users found. Creating dummy owner...");
            owner = await User.create({
                _id: 'dummy_owner_' + Date.now().toString(),
                name: 'System Owner',
                email: 'system.owner@hotel.com',
                image: 'https://placehold.co/100',
                role: 'hotelOwner',
                recentSearchedCities: []
            });
        }
    }
    console.log(`Using owner: ${owner.name} (${owner._id})`);

    let createdCount = 0;
    for (const city of cities) {
        const hotelConfigs = [
            { nameSuffix: "Grand Hotel", addressSuffix: "Central Street" },
            { nameSuffix: "Royal Residency", addressSuffix: "Park Avenue" }
        ];

        for (const config of hotelConfigs) {
            const hotelName = `${config.nameSuffix} ${city}`;
            
            let hotel = await Hotel.findOne({ city: city, name: hotelName });
            if (!hotel) {
                try {
                    hotel = await Hotel.create({
                        name: hotelName,
                        address: `123 ${config.addressSuffix}, ${city}`,
                        contact: "+91 9876543210",
                        owner: owner._id,
                        city: city
                    });
                } catch (err) {
                    console.error(`Error creating hotel ${hotelName}:`, err.message);
                    continue;
                }
            }
    
            const roomImages = [
                "/roomImg1.png", 
                "/roomImg2.png", 
                "/roomImg3.png", 
                "/roomImg4.png"
            ];
    
            const roomsData = [
                { type: "Deluxe Suite", price: 299, amenities: ["Free WiFi", "Pool Access", "Breakfast", "Kingsize Bed"] },
                { type: "Standard Room", price: 149, amenities: ["Free WiFi", "TV", "AC"] },
                { type: "Family Suite", price: 399, amenities: ["Free WiFi", "Kitchenette", "2 Kingsize Beds", "Balcony"] }
            ];
    
            for (const r of roomsData) {
                const existingRoom = await Room.findOne({ hotel: hotel._id, roomType: r.type });
                if (!existingRoom) {
                    try {
                        await Room.create({
                            hotel: hotel._id,
                            roomType: r.type,
                            pricePerNight: r.price,
                            amenities: r.amenities,
                            images: roomImages,
                            isAvailable: true
                        });
                    } catch (err) {
                        console.error(`Error creating room ${r.type}:`, err.message);
                    }
                }
            }
        }
        createdCount++;
        if (createdCount % 10 === 0) {
            console.log(`Processed hotels for ${createdCount} cities...`);
        }
    }
    
    console.log(`Seeding complete. Added hotels for ${createdCount} cities.`);
    process.exit(0);
};

seed();
