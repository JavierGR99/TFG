import React from 'react'

function Tickets({ tickets, state }) {
    return (
        <div>
            <span>TICKETS {state}</span>
            {console.log(tickets)}
            {
                tickets.length === 0 ? (
                    <div> No tickets available </div>
                ) : (
                    tickets.map((t) => {
                        return (

                            <ul key={t.ticketID}>
                                <span>Type: {t.type}</span>
                                <br />
                                <span>ApartmentID : {t.apartmentID}</span>
                                <br />
                                <span>Description : {t.description}</span>
                                <br />
                            </ul>

                        )
                    })
                )
            }
            <br></br>
        </div >

    )
}

export default Tickets
