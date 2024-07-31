import '../assets/common.css'
import '../assets/commodity.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
export default function Commodity() {
    const [commodityList, setCommodityList] = useState([])
    const handleSubmit = (e) => {
        e.preventDefault()
        let commodity_name = e.target.commodity_name.value
        fetch('http://localhost:8000/app/commodity/', {
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({"commodity_name":commodity_name})
        })
        }
    const loadCommodityList = async () => {
        let data = await fetch('http://localhost:8000/app/commodity/')
        let commodities = await data.json()
        console.log(commodities)
        let items = []
        for (let i=0;i<commodities.length;i++){
            items.push(commodities[i])
            
        }
        setCommodityList([...items])
    }
    
    return (
        <>
        
            <div className='commodity'>
                <form onSubmit={handleSubmit} onFocus={loadCommodityList}>
                    <input name="commodity_name" placeholder='Enter Commodity Name'/>
                    <input type='submit' value={"Add Commodity"} />
                </form>
                <div>
                    <ul>
                        {commodityList.map((value, index) => {
                            return <li key={value.commodity_id}>{value.commodity_name}</li>
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}