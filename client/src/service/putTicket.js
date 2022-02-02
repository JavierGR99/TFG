import axios from "axios";


export async function putTicket(props) {

    const userToken = localStorage.getItem('user-token')
    console.log(props.ticketID)
    console.log(props.postData)

    const url = `http://localhost:5000/api/tickets/ticketId/${props.ticketID}`

    return await axios.put(url, props.postData, {
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
