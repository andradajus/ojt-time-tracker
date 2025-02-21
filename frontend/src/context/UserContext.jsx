import { createContext, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { handleLogout } from '../utils/utils';
import { API } from '../api/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const getUser = async () => {
        try {
            const response = await API.getCurrentUserDetails();
            setRole(response.data.user_type);
            setUser(response.data);
            setStatus(response.status);

            console.log("response", response);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                handleLogout('/');
            } else {
                console.log("error", error);
                handleLogout('/');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!role) {
            getUser();
        }
    }, []);
  
    return (
        <UserContext.Provider value={{ user, role, loading, setUser, status, setRole }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: propTypes.node.isRequired
};
