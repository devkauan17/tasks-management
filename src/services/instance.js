import axios from "axios";

const instance = axios.create({
    baseURL: 'https://tasks-management-back-end.cyclic.app/',
    // baseURL: 'http://localhost:3000',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
})

export default instance;