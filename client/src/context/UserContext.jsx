import React, { createContext, useContext, useState } from 'react'

const UserDataContext = createContext()


export const UserContext = ({ children }) => {

    const [ user, setUser ] = useState({
        email: '',
        fullName: {
            firstName: '',
            lastName: ''
        }
    })

    return (
        <div>
            <UserDataContext.Provider value={{ user, setUser }}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}
 export const useUser = ()=> useContext(UserDataContext);