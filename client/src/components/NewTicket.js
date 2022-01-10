import React from 'react'
import axios from "axios"
import { auth } from '../firebase'
import { useHistory } from 'react-router-dom'
import { useState, useEffect, useRef, createRef } from 'react'
import { getWorkers } from '../service/getWorkers'
import { postTicket } from '../service/postTicket'
import ApartmentsSelect from './ApartmentsSelect'
import TimeChoose from './TimeChoose'
import { getApartments } from '../service/getApartments'

function NewTicket() {

    const timeRef = useRef("")
    const aptRef = createRef("")
    const workerRef = useRef("")
    const typeRef = useRef("")
    const stateRef = useRef("")
    const descriptionRef = useRef(null)
    const [apts, setApts] = useState([])
    const [workers, setWorkers] = useState([])
    const history = useHistory()


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


    async function setup() {
        setApts(await getApartments())
    }

    async function getWorkersLocal({ type }) {

        const workers = await getWorkers({ type: type })

        setWorkers(workers)
    }

    async function handleSubmit(e) {

        e.preventDefault()

        const adminID = auth.currentUser.uid
        const todaysDate = await getTodayDate()

        const postData = {
            apartmentID: aptRef.current.value,
            state: stateRef.current.value,
            type: typeRef.current.value,
            worker: workerRef.current.value || null,
            description: descriptionRef.current.value,
            timeSelected: timeRef.current.value || null,
            createdBy: adminID,
            createdTime: todaysDate

        }

        await postTicket({
            postData: postData,
            adminID: adminID
        })


        history.push("/")



    }

    async function ticketTypeChange(e) {

        typeRef.current.value = e.target.value
        if (stateRef.current.value != "requested") {
            setWorkers(await getWorkers({ type: typeRef.current.value }))
        }
    }

    async function stateTicketChange(e) {

        stateRef.current.value = e.target.value
        setWorkers(await getWorkers({ type: typeRef.current.value }))

    }

    async function getTodayDate() {
        //Slice for getting correct format 
        var today = new Date().toISOString().slice(0, -8);
        return today
    }


    useEffect(() => {
        setup()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stateRef.current.value])





    return (
        <form onSubmit={handleSubmit}>

            <ApartmentsSelect ref={aptRef} apts={apts}></ApartmentsSelect>
            <div>
                <label>
                    Type:
                    <select ref={typeRef} onChange={ticketTypeChange}>
                        {
                            typeOfTickets.map((type) => {
                                return <option key={type.id} value={type.type}>{type.type}</option>
                            })
                        }
                    </select>
                </label>
            </div>

            <div>
                <label>
                    State:
                    <select ref={stateRef} onChange={stateTicketChange} >
                        {
                            typeOfState.map((s) => {
                                return <option key={s.id} value={s.state}>{s.state}</option>
                            })
                        }
                    </select>
                </label>
            </div>

            <div>
                {stateRef.current.value != "requested" &&
                    <label>
                        Workers:
                        <select>
                            {
                                workers.map((w) => {
                                    return <option key={w.id} value={w.id}>{w.name}</option>
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
            <TimeChoose ref={timeRef} ticketState={stateRef.current.value}></TimeChoose>
            <input type="submit" value="Save ticket" />
        </form >
    )
}

export default NewTicket
