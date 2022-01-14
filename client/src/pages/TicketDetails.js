import React from 'react'
import { useLocation } from 'react-router-dom'

function TicketDetails() {
    let location = useLocation()
    const { ticket } = location.state


    return (



        < div >
            {console.log(ticket)}

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
                ticket.worker &&
                <div>
                    <p>Worker: {ticket.worker}</p>
                </div>
            }

            <div>
                <p>Created Time: {ticket.createdTime}</p>
            </div>

            <div>
                <p>Created Time: {ticket.createdTime}</p>
            </div>

        </div >

    )
}

export default TicketDetails
