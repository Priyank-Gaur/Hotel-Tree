import React, { createContext, useState, useEffect } from 'react';
import { roomsDummyData } from '../assets/assets';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        setRooms(roomsDummyData);
    }, []);

    const addRoom = (newRoom) => {
        setRooms(prev => [...prev, { ...newRoom, _id: `rm_${Date.now()}`, createdAt: new Date().toISOString() }]);
    };

    const value = {
        rooms,
        addRoom
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
