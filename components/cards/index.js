import React from 'react'
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs"

const Cards = ({ count, name, percentage, isDown, icon }) => {
    return (
        <div className='cards__Dashboard'>
            <div className='left'>
                <h4>{count}</h4>
                <h6>{name}</h6>
                <p>{isDown ? <span className='text-red-500'><BsCaretDownFill /> {isDown ? "-": "+"}{percentage}%</span> :<span className='text-green-500'><BsCaretUpFill /> {isDown ? "-": "+"}{percentage}%</span>} from past month</p>
            </div>
            <div className='right'>
                {icon}
            </div>
        </div>
    )
}

export default Cards