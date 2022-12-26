import React from 'react'

const Paper = ({ children, className }) => {
    return (
        <div className={`${className} paper`}>{ children }</div>
    )
}

export default Paper