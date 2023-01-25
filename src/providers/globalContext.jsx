import { createContext } from "react";
import { useState } from "react";
export const GlobalContext = createContext({});
import instance from "../services/instance";

export function GlobalProvider({ children }) {
    const token = localStorage.getItem('token')
    const [deleteInfos, setDeleteInfos] = useState({
        id: '',
        show: false
    })

    const [editInfos, setEditInfos] = useState([])

    const [userInfos, setUserInfos] = useState({ show: false })

    async function handleGetUser() {
        try {
            const { data } = await instance.get('/user', {
                headers: { Authorization: `Bearer ${token}` },
            })
            setUserInfos({ ...data, show: false })
        } catch (error) {
            return console.log(error)
        }
    }

    return (
        <GlobalContext.Provider
            value={{
                deleteInfos, setDeleteInfos,
                editInfos, setEditInfos,
                userInfos, setUserInfos,
                handleGetUser,
                token
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}