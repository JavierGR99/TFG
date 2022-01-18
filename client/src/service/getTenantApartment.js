import axios from "axios";

export async function getTenantApartment(props) {

    const userToken = localStorage.getItem('user-token')
    console.log(props.userID)

    const url = `http://localhost:5000/api/apartments/tenantID/${props.userID}`

    return await axios.get(url, {
        headers: {
            Authorization: 'Bearer ' + userToken,
        },
    }).then(response => {
        console.log(response.data)
        return response.data

    }).catch(error => {
        return []
    })




}
