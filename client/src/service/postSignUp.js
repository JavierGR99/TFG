import axios from "axios";

export async function postSignUp(props) {

    console.log(props.userID)
    console.log(props.userName)
    console.log(props.apartmentID)
    // const url = `http://localhost:5000/api/signUp/userID/${props.userID}?userName=${props.userName}`
    const url = `http://localhost:5000/api/signUp/userID/${props.userID}?userName=${props.userName}&aptID=${props.apartmentID}`

    return await axios.post(url, {
    }).then(response => {
        return response.data

    }).catch(error => {

        if (error.response.data.error) {
            return error.response.data.error
        }

    })

}