import React from 'react'
import { Link, useLocation } from 'react-router-dom';


function EditTicket() {
    let location = useLocation()
    const { ticket } = location.state || [];
    console.log(location)

    return (
        <div>
            <h1>EDIT TICKET</h1>

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
                        ticket.worker &&
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
                                <p>Tenant: </p>
                                <input type="text" value={ticket.tenantName}></input>
                            </div>
                        ) : (
                            <div>
                                <p>Tenant: No tenant was active</p>
                            </div>
                        )
                    }

                    <div>
                        <button type="button" className="btn btn-danger mr-5" >Remove ticket</button>
                    </div>
                </div>
            }







        </div>

    )
}

export default EditTicket
