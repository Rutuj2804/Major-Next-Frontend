import { Avatar, IconButton } from '@mui/material'
import React from 'react'
import { ChatBubbleBottomCenterIcon, EllipsisVerticalIcon, HeartIcon, ShareIcon } from "@heroicons/react/24/outline"
import Image from 'next/image'
import face from "../../assets/media/face.jpeg"
import { useDispatch } from 'react-redux'
import { delete_events } from '../../store/events'

const EventCard = ({ title, description, user, time, id, files }) => {

    const dispatch = useDispatch()

    return (
        <div className='eventCard__Wrapper'>
            <div className='header'>
                <div className='user'>
                    <Avatar />
                    <div className='details'>
                        <h4>{user}</h4>
                        <p>{time}</p>
                    </div>
                </div>
                <IconButton onClick={()=>dispatch(delete_events({ id }))}><EllipsisVerticalIcon className='h-6 w-6 text-black'  /></IconButton>
            </div>
            <div className='main'>
                <h4>{title}</h4>
                <p>{description}</p>
                {
                    files?.map((f, i)=><Image key={i} src={`${process.env.NEXT_PUBLIC_API_URL + '/' + f}`} alt="post" width={300} height={400} />)
                }
                
            </div>
            <hr />
            <div className='footer'>
                <div className='left'>
                    <HeartIcon className='h-6 w-6 text-black' />
                    <ChatBubbleBottomCenterIcon className='h-6 w-6 text-black' />
                </div>
                <div className='right'>
                    <ShareIcon className='h-6 w-6 text-black' />
                </div>
            </div>
        </div>
    )
}

export default EventCard