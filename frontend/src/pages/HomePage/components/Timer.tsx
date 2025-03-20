import {useEffect, useState} from "react";


const Timer = () => {
    const [time, setTime] = useState<String>()
    const [seconds, setSeconds] = useState<number>()
    useEffect(() => {

        setInterval(() => {

            const dateObject = new Date()

            const hour = dateObject.getHours()
            const minute = dateObject.getMinutes()

            const currentTime = (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute)

            setSeconds(dateObject.getSeconds())
            setTime(currentTime)
        }, 1000)

    }, [])

    var date = new Date();

    return (
        <div className="inline-div timer-div">
            <p className="date-text time">{date.getDate()} марта, понедельник, сейчас {time}</p>
            <p className="date-text seconds">:{seconds != null && seconds < 10 ? '0' + seconds : seconds}</p>
        </div>
    )
}

export default Timer;

