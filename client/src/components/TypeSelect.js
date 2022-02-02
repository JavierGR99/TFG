import React from 'react'
import { getWorkers } from '../service/getWorkers'

function TypeSelect(props, ref) {

    async function typeOnChange(e) {
        console.log(e.target.value)
        ref.current.value = e.target.value
        props.workersChange(await getWorkers({ type: ref.current.value }))
    }

    return (
        <div>

            <select className="browser-default custom-select" defaultValue={props.defaultValue} ref={ref} onChange={typeOnChange}>
                {
                    props.typeOfTickets.map((type) => {
                        return <option key={type.id} value={type.type}>{type.type}</option>
                    })
                }
            </select>

        </div>
    )
}

export default React.forwardRef(TypeSelect)


