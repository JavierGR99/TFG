import axios from "axios";


export async function postTicket(props) {

    const userToken = localStorage.getItem('user-token')

    const url = `http://localhost:5000/api/tickets/adminID/${props.adminID}`

    return await axios.post(url, props.postData, {
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
