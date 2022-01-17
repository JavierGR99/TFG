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
import { useAuth } from '../contexts/AuthContext'
import { getRole } from '../service/getRole'
import { Form, Button, Card, Alert, Modal } from "react-bootstrap"



function NewTicket() {

    // const timeRef = useRef(null)
    const aptRef = createRef("")
    const workerRef = useRef(null)
    const typeRef = useRef("")
    const stateRef = useRef("")
    const descriptionRef = useRef("")
    const [apts, setApts] = useState([])
    const [workers, setWorkers] = useState([])
    const history = useHistory()
    const { currentUser } = useAuth()



    const userID = currentUser.uid

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
        //Comprobar si el rol es tenant coger el apartamento que tiene asignado y no un select
        const role = await getRole({
            userID: userID
        })
        if (role === "tenant") {

        }
        setApts(await getApartments())
    }

    async function handleSubmit(e) {

        e.preventDefault()

        const adminID = auth.currentUser.uid
        const todaysDate = await getTodayDate()

        let postData = {
            apartmentID: aptRef.current.value,
            state: stateRef.current.value,
            type: typeRef.current.value,
            description: descriptionRef.current.value,
            createdBy: adminID,
            createdTime: todaysDate
        }


        if (stateRef.current.value !== "requested") {
            postData.worker = workerRef.current.value
            // postData.timeSelected = timeRef.current.value
        }

        console.log(postData)

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

        // <form onSubmit={handleSubmit}>

        //     <h1>Create Ticket</h1>

        //     <ApartmentsSelect ref={aptRef} apts={apts}></ApartmentsSelect>

        //     <StateSelect typeRef={typeRef.current.value} typeOfState={typeOfState} ref={stateRef} workersChange={workers => setWorkers(workers)}></StateSelect>

        //     <TypeSelect workersChange={workers => setWorkers(workers)} ref={typeRef} typeOfTickets={typeOfTickets}></TypeSelect>

        //     <WorkersSelect ref={workerRef} workers={workers} ticketState={stateRef.current.value} ></WorkersSelect>

        //     <label>
        //         Description:
        //     </label>
        //     <textarea class="form-control" ref={descriptionRef} placeholder='Write here'> </textarea>

        //     {/* <TimeChoose ref={timeRef} ticketState={stateRef.current.value}></TimeChoose> */}
        //     <div></div><button type="submit" class="btn btn-primary">Save ticket</button>
        // </form >
        <>


            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Create ticket</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="apartmentSelect">
                            <Form.Label>Apartment</Form.Label>
                            <ApartmentsSelect ref={aptRef} apts={apts}></ApartmentsSelect>
                        </Form.Group>
                        <Form.Group id="stateSelect">
                            <Form.Label>State:</Form.Label>
                            <StateSelect typeRef={typeRef.current.value} typeOfState={typeOfState} ref={stateRef} workersChange={workers => setWorkers(workers)}></StateSelect>
                        </Form.Group>
                        <Form.Group id="typeSelect">
                            <Form.Label>Type:</Form.Label>
                            <TypeSelect workersChange={workers => setWorkers(workers)} ref={typeRef} typeOfTickets={typeOfTickets}></TypeSelect>
                        </Form.Group>
                        <Form.Group id="workerSelect">
                            {stateRef.current.value !== "requested" && <Form.Label>Worker:</Form.Label>}
                            <WorkersSelect ref={workerRef} workers={workers} ticketState={stateRef.current.value} ></WorkersSelect>
                        </Form.Group>
                        <Form.Group id="description">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control as="textarea" rows={3} ref={descriptionRef} required ></Form.Control>
                        </Form.Group>
                        <Button className="w-100" type="submit">
                            Save ticket
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

        </>
    )
}

export default NewTicket
