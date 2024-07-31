import '../assets/common.css'
import '../assets/market.css'
import { useState } from 'react'

export default function Market() {
    
    
    const handleSubmit = (e) => {
        e.preventDefault()
        let market_name = e.target.market_name.value
        fetch('http://localhost:8000/app/market/', {
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({"market_name":market_name})
        })
        }
    
    return (
        <div className='market'>
            <form onSubmit={handleSubmit}>
                <input name="market_name" placeholder='Enter Market Name'/>
                <input type='submit' value={"Add Market"} />
            </form>
        </div>
    )
}
