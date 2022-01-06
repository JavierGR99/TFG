import React from 'react'
import axios from "axios"
import { auth } from '../firebase'
import { useHistory } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

function NewTicket() {

    const timeRef = useRef("")
    const aptRef = useRef(null)
    const descriptionRef = useRef(null)
    const [apts, setApts] = useState([])
    const [ticketState, setTicketState] = useState("requested")
    const [ticketType, setTicketType] = useState("cleaning")
    const [workers, setWorkers] = useState([])
    const history = useHistory()

    const userToken = localStorage.getItem('user-token')

    const typeOfTickets = [
        { id: 1, type: "cleaning" },
        { id: 2, type: "runner" },
        { id: 3, type: "maintenance" }
    ]

    const typeOfState = [
        { id: 1, state: "requested" },
        { id: 2, state: "accepted" },
        { id: 3, state: "done" }
    ]


    async function getApartaments() {
        const data = await (await axios.get("http://localhost:5000/api/apartments", {
            headers: {
                Authorization: 'Bearer ' + userToken,
            },
        })).data

        setApts(data)
    }

    async function getWorkers({ type }) {

        const data = await (await axios.get('http://localhost:5000/api/workers/?type=' + type, {
            headers: {
                Authorization: 'Bearer ' + userToken,
            },
        })).data

        setWorkers(data)
    }

    async function handleSubmit(e) {

        e.preventDefault()

        const adminID = auth.currentUser.uid
        const todaysDate = await getTodayDate()

        const postData = {
            apartmentID: aptRef.current.value,
            state: ticketState,
            type: ticketType,
            description: descriptionRef.current.value,
            timeSelected: timeRef.current.value,
            createdBy: adminID,
            createdTime: todaysDate
        }

        console.log("antes del post")
        try {
            const data = await axios.post('http://localhost:5000/api/tickets/adminID/${adminID}', postData, {
                headers: {
                    Authorization: 'Bearer ' + userToken,
                },
            })
        } catch (error) {

        }

        console.log("despues del post")

        history.push("/")



    }

    function ticketTypeChange(e) {
        if (e.target.value == 2) {
            setTicketType("runner")
            if (ticketState == "accepted") {
                getWorkers({ type: "runner" })
            }
        } else if (e.target.value == 3) {
            setTicketType("maintenance")
            if (ticketState == "accepted") {
                getWorkers({ type: "maintenance" })
            }
        } else {
            setTicketType("cleaning")
            if (ticketState == "accepted") {
                getWorkers({ type: "cleaning" })
            }
        }


    }

    function stateTicketChange(e) {
        if (e.target.value == 1) {
            setTicketState("requested")
        }
        if (e.target.value == 2) {
            getWorkers({ type: ticketType })
            setTicketState("accepted")
        }
        if (e.target.value == 3) {
            setTicketState("done")
        }

    }

    async function getTodayDate() {
        //Slice for getting correct format 
        var today = new Date().toISOString().slice(0, -8);

        return today
    }

    // function getTodayDate() {
    //     var today = new Date().toISOString();

    //     // var date = today.getFullYear() + '-' + "0" + (today.getMonth() + 1) + '-' + "0" + today.getDate();
    //     // var time = today.getHours() + ":" + today.getMinutes()
    //     // var dateTime = date + "T" + time;
    //     return today
    // }

    function timeChange(e) {
        timeRef.current.value = e.target.value


    }

    function aptChange(e) {
        aptRef.current.value = e.target.value
    }


    useEffect(() => {
        getApartaments()
    }, [])




    return (
        <form onSubmit={handleSubmit}>

            <div>
                <label>
                    Select apartament:
                </label>

                {
                    apts.length === 0 ? (
                        <label> NO APARTAMENTS</label>
                    ) : (
                        <select ref={aptRef} onChange={aptChange}> {

                            apts.map((apt) => {
                                return <option key={apt.id} value={apt.id}> {apt.name} {apt.number} </option>
                            })
                        }
                        </select>
                    )
                }


            </div>

            <div>
                <label>
                    Type:
                    <select onChange={ticketTypeChange}>
                        {
                            typeOfTickets.map((type) => {
                                return <option key={type.id} value={type.id}>{type.type}</option>
                            })
                        }
                    </select>
                </label>
            </div>

            <div>
                <label>
                    State:
                    <select onChange={stateTicketChange} >
                        {
                            typeOfState.map((s) => {
                                return <option key={s.id} value={s.id}>{s.state}</option>
                            })
                        }
                    </select>
                </label>
            </div>

            <div>
                {ticketState == "accepted" &&
                    <label>
                        Workers:
                        <select>
                            {
                                workers.map((w) => {
                                    return <option value={w.id}>{w.name}</option>
                                })
                            }
                        </select>
                    </label>
                }
            </div>

            <div>
                <label>
                    Description:
                </label> <br />

                <textarea ref={descriptionRef} placeholder='Write here'>

                </textarea>
            </div>

            <div>
                <label>Choose a time:</label>
                {ticketState == "accepted" &&
                    <input type="datetime-local" id="meeting-time"
                        name="meeting-time" ref={timeRef}
                        onChange={timeChange} required ></input>
                }

            </div>

            <input type="submit" value="Save ticket" />
        </form >
    )
}

export default NewTicket
