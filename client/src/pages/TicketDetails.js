import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
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
            <h1>TICKET DETAILS</h1>
            {
                ticket &&
                <div>
                    <div>
                        <p>Apartment: {ticket.aptName} {ticket.aptNumber} </p>
                    </div>

                    <div>
                        <p>Type: {ticket.type}</p>
                    </div>

                    <div>
                        <p>State: {ticket.state} </p>
                    </div>

                    <div>
                        <p>Description: {ticket.description}</p>
                    </div>

                    {
                        ticket.workerName &&
                        <div>
                            <p>Worker: {ticket.workerName}</p>
                        </div>
                    }

                    <div>
                        <p>Created Time: {ticket.createdTime}</p>
                    </div>

                    <div>
                        <p>Created By: {ticket.createdByName}</p>
                    </div>

                    {

                        ticket.tenantName ? (
                            <div>
                                <p>Tenant: {ticket.tenantName}</p>
                            </div>
                        ) : (
                            <div>
                                <p>Tenant: No tenant was active</p>
                            </div>
                        )
                    }


                    <div>
                        {
                            (role !== "tenant" || (role === "tenant" && ticket.state === "requested")) &&
                            <>
                                <Button type="button" className="btn btn-danger mr-5" variant="primary" onClick={handleShow}>
                                    Remove ticket
                                </Button>

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
                                <Link to={{
                                    pathname: `/editTicket`,
                                    state: {
                                        ticket: ticket
                                    }
                                }}>Edit ticket</Link>
                            </>
                        }
                    </div>
                    <br></br>
                    <div>
                        {
                            role === "worker" && ticket.state === "requested" && (

                                <button type="button" className="btn btn-success mr-5" > Accept ticket</button>
                            )
                        }
                    </div>
                </div>
            }


        </div >

    )
}

export default TicketDetails
