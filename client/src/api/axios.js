import axios from 'axios';

const baseURL = import.meta.env.VITE_BASEURL?.trim() || 'https://pingup-server-6v04nh008-satviks-projects-f6a94261.vercel.app';

const api = axios.create({
    baseURL
})

export default api