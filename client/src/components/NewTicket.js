import React from 'react'
import axios from "axios"
import { useState, useEffect } from 'react'

function NewTicket() {

    const [apts, setApts] = useState([])
    const [ticketState, setTicketState] = useState([])
    const [workers, setWorkers] = useState([1])

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

    function handleSubmit() {

    }

    function stateTicketChange(e) {
        if (e.target.value == 2) {
            getWorkers({ type: "cleaning" })
        }
        setTicketState(e.target.value)
    }

    useEffect(() => {
        getApartaments()
        // getWorkers({ type: "cleaning" })
    }, [])

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Select apartament:
                <select>
                    {
                        apts.length === 0 ? (
                            <div> NO APARTAMENTS</div>
                        ) : (
                            apts.map((apt) => {
                                return <option value={apt.id}> {apt.name} {apt.number} </option>
                            })
                        )
                    }
                </select>
            </label>
            <label>
                Type:
                <select >
                    {
                        typeOfTickets.map((type) => {
                            return <option value={type.id}>{type.type}</option>
                        })
                    }
                </select>
            </label>
            <label>
                State:
                <select onChange={stateTicketChange} >
                    {
                        typeOfState.map((s) => {
                            return <option value={s.id}>{s.state}</option>
                        })
                    }
                </select>
            </label>
            {ticketState == 2 &&
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
            <input type="submit" value="Save ticket" />
        </form >
    )
}

export default NewTicket
