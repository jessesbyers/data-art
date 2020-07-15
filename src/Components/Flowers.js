import React, { useEffect } from 'react';
import { drawFlowers } from '../d3/DrawFlowers'

export default function Flowers(props) {

    useEffect( () => {
        drawFlowers(props.data)
    }, [])

    return (
        <div>
            <h1>{props.data.timezone}</h1>

            <div className="viz">
            </div>
        </div>
    )
}