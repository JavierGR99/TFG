import React from 'react'

function TimeChoose(props, ref) {

    function timeChange(e) {
        ref.current.value = e.target.value
    }

    return (
        <div>
            <label>Choose a time:</label>
            {props.ticketState != "requested" &&
                <input type="datetime-local" id="meeting-time"
                    name="meeting-time" ref={ref}
                    onChange={timeChange} required ></input>
            }
        </div>
    )
}

export default React.forwardRef(TimeChoose)
