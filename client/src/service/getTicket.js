import axios from "axios";


export async function getTicket(props) {

    const userToken = localStorage.getItem('user-token')
    let url = ""

    console.log("Role: " + props.role)
    console.log("UserID: " + props.userID)
    console.log("State: " + props.state)

    if (props.role === "admin") {
        url = `http://localhost:5000/api/tickets/adminID/${props.userID}?state=${props.state}`
    } else if (props.role === "tenant") {
        url = `http://localhost:5000/api/tickets/tenantID/${props.userID}?state=${props.state}`
    } else if (props.role === "worker") {
        url = `http://localhost:5000/api/tickets/workerID/${props.userID}?state=${props.state}`
    }





    return await axios.get(url, {
        headers: {
            Authorization: 'Bearer ' + userToken,
        },
    }).then(response => {
        console.log(response.data)
        return response.data

    }).catch(error => {

        if (error.response.data.error) {
            return []
        }

    })

}
