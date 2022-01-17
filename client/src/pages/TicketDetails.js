import React from 'react'
import { Link, useLocation } from 'react-router-dom'



function TicketDetails() {
    let location = useLocation()
    const { ticket } = location.state || [];
    const { role } = location.state || "tenant";




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
                        <button type="button" className="btn btn-danger mr-5" >Remove ticket</button>
                        {
                            role === "worker" &&
                            <button type="button" className="btn btn-danger mr-5" > Accept ticket</button>
                        }
                        <Link to={{
                            pathname: `/editTicket`,
                            state: {
                                ticket: ticket
                            }
                        }}>Edit ticket</Link>

                    </div>
                </div>
            }







        </div>

    )
}

export default TicketDetails
