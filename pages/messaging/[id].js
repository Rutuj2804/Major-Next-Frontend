import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Inbox from "../../components/messaging/Inbox";
import MessageArea from "../../components/messaging/MessageArea";
import { get_room, get_rooms } from "../../store/chat";
import { setHeader } from "../../store/settings";

const Rooms = () => {
    const dispatch = useDispatch();

    const router = useRouter();

    const id = router.query.id;

    const room = useSelector((state) => state.chat.room);
    const user = useSelector((state) => state.auth.id);

    useEffect(() => {
        dispatch(setHeader("Messaging"));
    }, [dispatch]);

    useEffect(() => {
        dispatch(get_rooms());
    }, []);

    useEffect(() => {
        if(id){
            dispatch(get_room(id))
        }
    }, [id]);

    const seperate = (v) => {
        const x = v?.users?.filter((t) => t._id !== user);
        if(x?.length > 0) {
            return x[0].firstname + " " + x[0].lastname
        } else {
            return v?.admin?.firstname + " " + v?.admin?.lastname
        }
    };

    return (
        <div>
            <Head>
                <title>Messaging</title>
            </Head>
            <main>
                <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    <div className="inbox col-span-4 md:col-span-1">
                        <Inbox />
                    </div>
                    <div className="messages col-span-4 md:col-span-2 lg:col-span-3">
                        <MessageArea
                            id={room?._id}
                            me={user}
                            messages={room?.messages}
                            title={room?.name ? room?.name : seperate(room)}
                            users={room?.users}
                            updatedAt={room?.updatedAt}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Rooms;
