import React, { useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom'
import { putTicket } from '../service/putTicket';
import { removeTicket } from '../service/removeTicket';



function TicketDetails() {
    let location = useLocation()
    const { ticket } = location.state || [];
    const { userID } = location.state || [];
    const { role } = location.state || "tenant";
    const history = useHistory()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function handleRemoveTicket() {

        removeTicket({
            ticketID: ticket.ticketID,
            userID: userID
        }).then(
            history.goBack()
        ).catch(error => {
            window.alert(error)
        })
    }

    async function handleAcceptTicket() {
        var postData = {
            apartmentID: ticket.apartmentID,
            createdBy: ticket.createdBy,
            createdTime: ticket.createdTime,
            description: ticket.description,
            state: "accepted",
            tenantID: ticket.tenantID,
            type: ticket.type,
            worker: userID
        }
        putTicket({
            ticketID: ticket.ticketID,
            postData: postData
        }).then(
            history.goBack()
        ).catch(error => {
            window.alert(error)
        })

    }

    async function handleRealizeTicket() {
        var postData = {
            apartmentID: ticket.apartmentID,
            createdBy: ticket.createdBy,
            createdTime: ticket.createdTime,
            description: ticket.description,
            state: "done",
            tenantID: ticket.tenantID,
            type: ticket.type,
            worker: userID
        }
        putTicket({
            ticketID: ticket.ticketID,
            postData: postData
        }).then(
            history.goBack()
        ).catch(error => {
            window.alert(error)
        })

    }



    return (
        <div>
            <Card>
                <Card.Body>
                    <div className="mb-3 d-flex align-items-center">

                        {/* <h2 className="text-center">Restablecer Contraseña</h2> */}
                        <button type="button" variant="link" onClick={() => history.goBack()} className="mr-auto btn btn-secondary">
                            <i className="bi bi-arrow-return-left"></i>
                        </button>
                        <h1 className="mr-auto">Detalles Tique</h1>
                    </div>

                    <Card.Subtitle>Apartamento:</Card.Subtitle>
                    <Card.Text>
                        {ticket.aptName} {ticket.aptNumber}
                    </Card.Text>
                    <Card.Subtitle>Estado:</Card.Subtitle>
                    <Card.Text>
                        {ticket.state}
                    </Card.Text>
                    <Card.Subtitle>Tipo:</Card.Subtitle>
                    <Card.Text>
                        {ticket.type}
                    </Card.Text>
                    <Card.Subtitle>Descripción:</Card.Subtitle>
                    <Card.Text>
                        {ticket.description}
                    </Card.Text>
                    <Card.Subtitle>Fecha Creación:</Card.Subtitle>
                    <Card.Text>
                        {ticket.createdTime}
                    </Card.Text>
                    <Card.Subtitle>Creado por:</Card.Subtitle>
                    <Card.Text>
                        {ticket.createdByName}
                    </Card.Text>
                    {/* {
                        ticket.tenantName ? (
                            <>
                                <Card.Subtitle>Tenant:</Card.Subtitle>
                                <Card.Text>
                                    {ticket.tenantName}
                                </Card.Text>
                            </>
                        ) : (
                            <>
                                <Card.Subtitle>Tenant:</Card.Subtitle>
                                <Card.Text>
                                    No tenant was active
                                </Card.Text>
                            </>
                        )
                    } */}
                    {
                        ticket.worker &&
                        <>
                            <Card.Subtitle>Trabajador:</Card.Subtitle>
                            <Card.Text>
                                {ticket.workerName}
                            </Card.Text>
                        </>
                    }

                    {
                        (role !== "tenant" || (role === "tenant" && ticket.state === "requested")) &&
                        <div className="pt-2 d-flex justify-content-between">
                            <Button type="button" className="btn btn-danger btn-lg mx-auto " onClick={handleShow}>
                                Borrar Tique
                            </Button>
                            <Link className="btn btn-primary btn-lg mx-auto" to={{
                                pathname: `/editTicket`,
                                state: {
                                    ticket: ticket,
                                    userRole: role
                                }
                            }}>Editar Tique</Link>
                        </div>
                    }
                    <br></br>
                    <div>
                        {
                            role === "worker" && ticket.state === "requested" && (
                                <div className="d-flex justify-content-center">
                                    <button type="button" className="mx-2 btn btn-success btn-lg w-75" onClick={() => handleAcceptTicket()}> Aceptar Tique</button>
                                </div>
                            )

                        }
                        {

                            role === "worker" && ticket.state === "accepted" && (
                                <div className="d-flex justify-content-center">
                                    <button type="button" className="mx-2 btn btn-success btn-lg w-75" onClick={() => handleRealizeTicket()}> Realizar Tique</button>
                                </div>
                            )

                        }
                    </div>
                </Card.Body>
            </Card>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>¿Seguro que quieres borrar el tique?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={() => handleRemoveTicket()}>
                        Sí, Borrar Tique
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >


    )
}

export default TicketDetails
