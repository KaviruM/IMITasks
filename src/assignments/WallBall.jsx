import React, { useEffect, useRef, useState } from 'react'
import './WallBall.css'

function WallBall() {
    const position = useRef({x:50, y:50})
    const speed = useRef({x:5, y:5})
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        const animation = () => {
            requestAnimationFrame(animation)

            position.current.y += speed.current.y
            position.current.x += speed.current.x

            if (position.current.y >= 250) {
                speed.current.y *= -1
                position.current.y = 250
            }


            if (position.current.x >= 450) {
                speed.current.x *= -1
                position.current.x = 450
            }


            if (position.current.y <= 0) {
                speed.current.y *= -1
                position.current.y = 0
            }


            if (position.current.x <= 0) {
                speed.current.x *= -1
                position.current.x = 0
            }

            setCounter(prev => prev + 1)
        }
        requestAnimationFrame(animation)
    }, [])

    return (
        <>
        <div className="game-wall">
            <div className="ball"
                style={{
                    left: position.current.x,
                    top: position.current.y
                }}
            />
        </div>
        <div>
            hit count {counter}
        </div>
        </>
    )
}

export default WallBall