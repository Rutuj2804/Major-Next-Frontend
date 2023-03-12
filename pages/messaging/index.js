import Head from 'next/head'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Inbox from '../../components/messaging/Inbox'
import MessageArea from '../../components/messaging/MessageArea'
import { get_rooms } from '../../store/chat'
import { setHeader } from "../../store/settings"

const Messaging = () => {

    const dispatch = useDispatch()

    const chat_rooms = useSelector(state=>state.chat.rooms)

    useEffect(()=>{
        dispatch(setHeader("Messaging"))
    }, [dispatch])

    useEffect(()=>{
        dispatch(get_rooms())
    }, [])

    return (
        <div>
            <Head>
                <title>Messaging</title>
            </Head>
            <main>
                <div className='grid grid-cols-4 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
                    <div className='inbox col-span-4 md:col-span-1'>
                        <Inbox />
                    </div>
                    <div className='messages col-span-4 md:col-span-2 lg:col-span-3'>
                        <MessageArea />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Messaging