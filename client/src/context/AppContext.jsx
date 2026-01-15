import axios from "axios";
import {createContext, useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import {useUser, useAuth} from "@clerk/clerk-react";
import {toast} from "react-hot-toast";


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();



export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY || "$";
    const navigate = useNavigate();
    const [userDataLoaded, setUserDataLoaded] = useState(false);
    const {user, isLoaded} = useUser();
    const {getToken} = useAuth();

    const [isOwner, setIsOwner] = useState(false);
    const [showHotelReg, setShowHotelReg] = useState(false);
    const [searchedCities, setSearchedCities] = useState([]);



    const fetchUser = async () => {
        try {
            const {data} =  await axios.get("/api/user",
                {headers:{Authorization: `Bearer ${await getToken()}`}});
            if(data.success){
                setIsOwner(data.role === "hotelOwner");
                setSearchedCities(data.recentSearchedCities);
            }
            else{
                
                setTimeout(() => {
                    fetchUser();
                }, 5000);
            }
        } catch (error) {
            
            if (error.response?.status !== 401) {
                toast.error(error.message);
            }
        } finally {
            setUserDataLoaded(true);
        }
    }
    useEffect(() => {
        if (!isLoaded) return;

        if (user) {
            fetchUser();
        } else {
            
            setUserDataLoaded(true); 
        }
    }, [user, isLoaded]);


    const value = {   
        currency,
        navigate,
        user,
        getToken,
        isOwner,
        setIsOwner,
        axios,
        showHotelReg,
        setShowHotelReg,
        searchedCities,
        setSearchedCities,
        userDataLoaded
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
}