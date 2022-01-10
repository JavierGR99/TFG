import axios from "axios";

export async function getApartments() {

    const userToken = localStorage.getItem('user-token')

    const url = `http://localhost:5000/api/apartments`

    return await axios.get(url, {
        headers: {
            Authorization: 'Bearer ' + userToken,
        },
    }).then(response => {

        return response.data

    }).catch(error => {

        if (error.response.data.error) {
            return []
        }

    })




}