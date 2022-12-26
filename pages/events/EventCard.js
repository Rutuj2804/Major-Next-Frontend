import { Avatar, IconButton } from '@mui/material'
import React from 'react'
import { ChatBubbleBottomCenterIcon, EllipsisVerticalIcon, HeartIcon, ShareIcon } from "@heroicons/react/24/outline"
import Image from 'next/image'
import face from "../../assets/media/face.jpeg"

const EventCard = () => {
    return (
        <div className='eventCard__Wrapper'>
            <div className='header'>
                <div className='user'>
                    <Avatar />
                    <div className='details'>
                        <h4>Rutuj Jeevan Bokade</h4>
                        <p>a while ago</p>
                    </div>
                </div>
                <IconButton><EllipsisVerticalIcon className='h-6 w-6 text-black'  /></IconButton>
            </div>
            <div className='main'>
                <p>The following example creates a thin (10px wide) scrollbar, which has a grey track/bar color and a dark-grey (#888) handle:</p>
                <Image src={face} alt="post" objectFit="contain" />
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