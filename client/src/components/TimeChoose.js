import React from 'react'

function TimeChoose(props, ref) {

    function timeChange(e) {
        ref.current.value = e.target.value
    }

    return (
        <div>

            {props.ticketState !== "requested" &&
                <label>Choose a time:
                    <input type="datetime-local" id="meeting-time"
                        name="meeting-time" ref={ref}
                        onChange={timeChange} required ></input>
                </label>
            }
        </div>
    )
}

export default React.forwardRef(TimeChoose)
