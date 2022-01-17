import axios from "axios";


export async function removeTicket(props) {

    const userToken = localStorage.getItem('user-token')

    console.log(props.ticketID)
    console.log(props.userID)

    const url = `http://localhost:5000/api/tickets/${props.ticketID}/userID/${props.userID}`

    console.log(url)

    return await axios.delete(url, {
        headers: {
            Authorization: 'Bearer ' + userToken,
        },
    }).then(response => {

        return response.data

    }).catch(error => {
        return error
        console.log(error.data)
        console.log(error.status)
        if (error.response.data.error) {
            return []
        }

    })

}