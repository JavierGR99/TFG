import React from 'react'
import { getWorkers } from '../service/getWorkers'

function StateSelect(props, ref) {

    async function stateOnChange(e) {
        ref.current.value = e.target.value
        props.workersChange(await getWorkers({ type: props.typeRef }))
    }

    return (

        <div>


            <select className="browser-default custom-select" ref={ref} onChange={stateOnChange} >
                {
                    props.typeOfState.map((s) => {
                        return <option key={s.id} value={s.state}>{s.state}</option>
                    })
                }
            </select>

        </div>
    )
}

export default React.forwardRef(StateSelect)
