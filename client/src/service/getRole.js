import axios from "axios";


export async function getRole(props) {

    const userToken = localStorage.getItem('user-token')

    const url = `http://localhost:5000/api/rol/userID/${props.userID}`

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