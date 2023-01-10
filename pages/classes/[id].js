import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setHeader } from '../../store/settings'
import { get_class_by_id } from '../../store/university'

const ClassDetailView = () => {

    const classFetched = useSelector(state=>state.university.class)

    const router = useRouter()

    const { id } = router.query

    const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setHeader("Class"));
	}, []);
    
    useEffect(()=>{
        dispatch(get_class_by_id(id))
    }, [id])

    return (
        <div>{classFetched.name}</div>
    )
}

export default ClassDetailView