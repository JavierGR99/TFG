import React from 'react'
import { getWorkers } from '../service/getWorkers'

function TypeSelect(props, ref) {

    async function typeOnChange(e) {
        ref.current.value = e.target.value
        props.workersChange(await getWorkers({ type: ref.current.value }))
    }

    return (
        <div>
            <label>
                Type:
                <select ref={ref} onChange={typeOnChange}>
                    {
                        props.typeOfTickets.map((type) => {
                            return <option key={type.id} value={type.type}>{type.type}</option>
                        })
                    }
                </select>
            </label>
        </div>
    )
}

export default React.forwardRef(TypeSelect)


