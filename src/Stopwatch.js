import React, { useState, useEffect } from 'react'
import { interval } from 'rxjs'
import { startWith } from 'rxjs/operators'

const observable$ = interval(1000).pipe(
    startWith(0)
)

const Stopwatch = () => {
    const [timer, setTimer] = useState()
    const [onTimer, setOnTimer] = useState(false)
    

    useEffect(() => {
        const sub = observable$.subscribe(setTimer)

        return () => sub.unsubscribe()


        //let timerInterval
    //     if(onTimer){
    //         timerInterval = setInterval(() => {
    //             setTimer(prevTimer => prevTimer + 10)
    //         }, 10)
    //     } else {
    //         clearInterval(timerInterval)
    //     }

    //    return () => clearInterval(timerInterval)
    }, [])  // onTimer

    const waitTimer = () => {
        setOnTimer(false)
    }

    const getHumanTime = (time) => {      
        let hours = Math.floor(time / (1000 * 60 * 60))
        let minutes = Math.floor(time / (1000 * 60)) % 60
        let seconds = Math.floor(time / 1000) % 60
     
        return `${hours < 10 ? '0' + hours : hours}:
                ${minutes < 10 ? '0' + minutes : minutes}:
                ${seconds < 10 ? '0' + seconds : seconds}`
    }

    return (
        <div>
            <h2>Stopwatch</h2>
            <div>{  getHumanTime(timer) }</div>
            <button onClick={() => setOnTimer(!onTimer)}>Start/Stop</button>
            <button onClick={waitTimer}>Wait</button>
            <button onClick={() => setTimer(0)}>Reset</button>
            
        </div>
    )
}

export default Stopwatch
