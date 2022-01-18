import React, { useState } from 'react'
import { Button, Card, Modal, Row } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom'
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
        }).then(response => {
            history.goBack()
        }).catch(error => {
            window.alert(error)
        })
    }
    return (
        <div>
            <Card>
                <Card.Body>
                    <h1 className="text-center mb-4">Ticket Details</h1>
                    <Card.Subtitle>Apartament:</Card.Subtitle>
                    <Card.Text>
                        {ticket.aptName} {ticket.aptNumber}
                    </Card.Text>
                    <Card.Subtitle>Type:</Card.Subtitle>
                    <Card.Text>
                        {ticket.type}
                    </Card.Text>
                    <Card.Subtitle>State:</Card.Subtitle>
                    <Card.Text>
                        {ticket.state}
                    </Card.Text>
                    <Card.Subtitle>Description:</Card.Subtitle>
                    <Card.Text>
                        {ticket.description}
                    </Card.Text>
                    <Card.Subtitle>Created Time:</Card.Subtitle>
                    <Card.Text>
                        {ticket.createdTime}
                    </Card.Text>
                    <Card.Subtitle>Created By:</Card.Subtitle>
                    <Card.Text>
                        {ticket.createdByName}
                    </Card.Text>
                    {
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
                    }
                    {
                        ticket.workerName &&
                        <>
                            <Card.Subtitle>Worker:</Card.Subtitle>
                            <Card.Text>
                                {ticket.workerName}
                            </Card.Text>
                        </>
                    }

                    {
                        (role !== "tenant" || (role === "tenant" && ticket.state === "requested")) &&
                        <div className="pt-2 d-flex justify-content-between">
                            <Button type="button" className="btn btn-danger btn-lg mx-auto " onClick={handleShow}>
                                Remove ticket
                            </Button>
                            <Link className="btn btn-secondary btn-lg mx-auto" to={{
                                pathname: `/editTicket`,
                                state: {
                                    ticket: ticket
                                }
                            }}>Edit ticket</Link>
                        </div>
                    }
                    <br></br>
                    <div>
                        {
                            role === "worker" && ticket.state === "requested" && (
                                <div className="d-flex justify-content-center">
                                    <button type="button" className="mx-2 btn btn-success btn-lg w-75"> Accept ticket</button>
                                </div>
                            )
                        }
                    </div>
                </Card.Body>
            </Card>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Do you really want to remove ticket?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleRemoveTicket()}>
                        Yes, Remove ticket
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >


    )
}

export default TicketDetails
