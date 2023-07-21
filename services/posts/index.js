import { URL_BASE } from "../config";

function getAllPost(query) {
    const URL = `${URL_BASE}posts${query}`
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors'
    }

    return fetch(URL, options)
}

export {
    getAllPost
}