import axios from 'axios'

export const endpoint = axios.create({
    baseURL: "https://candidate.neversitup.com/todo"
})