import React from 'react'
import { AiFillFilePdf } from "react-icons/ai"

const NotesCard = () => {
    return (
        <div className='notesCard__Wrapper'>
            <AiFillFilePdf className='text-red-500' />
            <h4>Chapter 1 - SHA</h4>
        </div>
    )
}

export default NotesCard