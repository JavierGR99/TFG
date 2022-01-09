import axios from "axios";

export async function getApartments(props) {

    const url = `http://localhost:5000/api/apartments`

    return await axios.get(url, {
        headers: {
            Authorization: 'Bearer ' + props.userToken,
        },
    }).then(response => {

        return response.data

    }).catch(error => {

        if (error.response.data.error) {
            return []
        }

    })




}