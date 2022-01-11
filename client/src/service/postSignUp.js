import axios from "axios";

export async function postSignUp(props) {

    console.log(props.userID)


    const url = `http://localhost:5000/api/signUp/userID/${props.userID}`

    return await axios.post(url, {
    }).then(response => {

        console.log(response.data)
        return response.data

    }).catch(error => {

        if (error.response.data.error) {
            return error.response.data.error
        }

    })

}