import React from 'react'
import { useSelector } from 'react-redux'

const ClassDetailView = () => {

    const classFetched = useSelector(state=>state.university.class)

    return (
        <div>{classFetched.name}</div>
    )
}

export default ClassDetailView