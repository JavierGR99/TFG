import axios from "axios";

export async function postSignUp(props) {



    const url = `http://localhost:5000/api/signUp/userID/${props.userID}?userName=${props.userName}`

    return await axios.post(url, {
    }).then(response => {
        console.log(response)
        return response.data

    }).catch(error => {

        if (error.response.data.error) {
            return error.response.data.error
        }

    })

}