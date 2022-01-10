import React from 'react'
import { auth } from '../firebase'
import { useHistory } from 'react-router-dom'
import { useState, useEffect, useRef, createRef } from 'react'
import { postTicket } from '../service/postTicket'
import { getApartments } from '../service/getApartments'
import StateSelect from '../components/StateSelect'
import TypeSelect from '../components/TypeSelect'
import WorkersSelect from '../components/WorkersSelect'
import TimeChoose from '../components/TimeChoose'
import ApartmentsSelect from '../components/ApartmentsSelect'


function NewTicket() {

    const timeRef = useRef(null)
    const aptRef = createRef("")
    const workerRef = useRef(null)
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

    async function handleSubmit(e) {

        e.preventDefault()

        const adminID = auth.currentUser.uid
        const todaysDate = await getTodayDate()

        var postData = {
            apartmentID: aptRef.current.value,
            state: stateRef.current.value,
            type: typeRef.current.value,
            description: descriptionRef.current.value,
            createdBy: adminID,
            createdTime: todaysDate
        }


        if (stateRef.current.value !== "requested") {
            var postData = {
                ...postData,
                worker: workerRef.current.value,
                timeSelected: timeRef.current.value,
            }
        }



        await postTicket({
            postData: postData,
            adminID: adminID
        })

        history.push("/")
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



    // if (workers.length == 0 && apts.length === 0) {
    //     return <div>Loading</div>
    // }
    return (
        <form onSubmit={handleSubmit}>

            <ApartmentsSelect ref={aptRef} apts={apts}></ApartmentsSelect>

            <StateSelect typeRef={typeRef.current.value} typeOfState={typeOfState} ref={stateRef} workersChange={workers => setWorkers(workers)}></StateSelect>

            <TypeSelect workersChange={workers => setWorkers(workers)} ref={typeRef} typeOfTickets={typeOfTickets}></TypeSelect>

            <WorkersSelect ref={workerRef} workers={workers} ticketState={stateRef.current.value} ></WorkersSelect>

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
