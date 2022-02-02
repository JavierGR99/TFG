import React, { createRef, useEffect, useRef, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import ApartmentsSelect from '../components/ApartmentsSelect';
import StateSelect from '../components/StateSelect';
import TypeSelect from '../components/TypeSelect';
import WorkersSelect from '../components/WorkersSelect';
import { useAuth } from '../contexts/AuthContext';
import { getApartments } from '../service/getApartments';
import { getRole } from '../service/getRole';
import { getTenantApartment } from '../service/getTenantApartment';
import { getWorkers } from '../service/getWorkers';
import { putTicket } from '../service/putTicket';


function EditTicket() {
    let location = useLocation()
    const { ticket, userRole } = location.state;

    const aptRef = createRef(ticket.apartmentID)
    const workerRef = useRef(ticket.worker)
    const typeRef = useRef("")
    const stateRef = useRef("")
    const descriptionRef = useRef("")
    const [workers, setWorkers] = useState([])
    const history = useHistory()
    const { currentUser } = useAuth()
    const [typeOfState, setTypeOfState] = useState([])
    const [apts, setApts] = useState([])

    const userID = currentUser.uid

    const typeOfTickets = [
        { id: 1, type: "cleaning" },
        { id: 2, type: "runner" },
        { id: 3, type: "maintenance" }
    ]

    async function handleEditTicket() {
        var postData = {
            apartmentID: ticket.apartmentID,
            createdBy: ticket.createdBy,
            createdTime: ticket.createdTime,
            description: descriptionRef.current.value,
            state: ticket.state,
            tenantID: ticket.tenantID,
            type: ticket.type,
            worker: workerRef.current.value
        }
        putTicket({
            ticketID: ticket.ticketID,
            postData: postData
        }).then(
            history.push("/")
        ).catch(error => {
            window.alert(error)
        })

    }

    async function setup() {
        //Comprobar si el rol es tenant coger el apartamento que tiene asignado y no un select
        if (userRole === "tenant") {
            setApts([await getTenantApartment({
                userID: userID
            })])
            setTypeOfState([
                { id: 1, state: "requested" }
            ])
        } else {
            setApts(await getApartments())
            setTypeOfState([
                { id: 1, state: "requested" },
                { id: 2, state: "accepted" },
                { id: 3, state: "done" }
            ])
        }

        setWorkers(await getWorkers({ type: ticket.type }))
    }

    useEffect(() => {
        setup()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (

        <>

            <Card>
                <Card.Body>
                    <div className="mb-3 d-flex align-items-center">
                        <button type="button" variant="link" onClick={() => history.goBack()} className="mr-auto btn btn-secondary">
                            <i className="bi bi-arrow-return-left"></i>
                        </button>
                        <h1 className="mr-auto">Editar Tique</h1>
                    </div>
                    <Form onSubmit={handleEditTicket}>
                        <fieldset disabled>
                            <Form.Group id="apartmentSelect">
                                <Form.Label>Apartamento:</Form.Label>
                                <ApartmentsSelect ref={aptRef} defaultValue={ticket.apartmentID} apts={apts}></ApartmentsSelect>
                            </Form.Group>
                            <Form.Group id="stateSelect">
                                <Form.Label>Estado:</Form.Label>
                                <StateSelect typeRef={typeRef.current.value} defaultValue={ticket.state} typeOfState={typeOfState} ref={stateRef} workersChange={workers => setWorkers(workers)}></StateSelect>
                            </Form.Group>

                            <Form.Group id="typeSelect">
                                <Form.Label>Tipo:</Form.Label>
                                <TypeSelect workersChange={workers => setWorkers(workers)} defaultValue={ticket.type} ref={typeRef} typeOfTickets={typeOfTickets}></TypeSelect>
                            </Form.Group>
                        </fieldset>
                        <Form.Group id="workerSelect">
                            {ticket.worker &&
                                <>
                                    <Form.Label>Trabajador:</Form.Label>
                                    <WorkersSelect ref={workerRef} workers={workers} defaultValue={ticket.worker} typeOfState={typeOfState} ></WorkersSelect>
                                </>
                            }
                        </Form.Group>
                        <Form.Group id="description">
                            <Form.Label>Descripción:</Form.Label>
                            <Form.Control as="textarea" rows={3} defaultValue={ticket.description} ref={descriptionRef} required ></Form.Control>
                        </Form.Group>
                        <Button className="w-100" type="submit">
                            Editar Tique
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>

    )
}

export default EditTicket
