import { useState, useEffect } from "react";
import { createContext, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = {
            token: localStorage.getItem("token"),
            isAdmin: localStorage.getItem("isAdmin"),
            username: localStorage.getItem("username"),
            email: localStorage.getItem("email"),
        };
        setUser(storedUser);
    }, []);

    const addUser = (userData) => {
        setUser(userData);
        localStorage.setItem("token", userData.token);
        localStorage.setItem("isAdmin", userData.isAdmin);
        localStorage.setItem("username", userData.username);
        localStorage.setItem("email", userData.email);
    };

    const removeUser = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
    };

    const value = {
        user,
        setUser,
        addUser,
        removeUser
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};

 
