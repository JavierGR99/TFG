import axios from "axios";


export async function getWorkers(props) {

    const userToken = localStorage.getItem('user-token')

    const url = `http://localhost:5000/api/workers/?type=${props.type}`

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
