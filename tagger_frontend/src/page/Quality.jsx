import '../assets/common.css'
import { useState } from 'react'

export default function Quality() {
    const [commodityList, setCommodityList] = useState([])
    const handleSubmit = (e) => {
        e.preventDefault()
        let quality = {quality_name:e.target.quality_name.value, quality_code:e.target.quality_code.value, internal_quality:e.target.internal_quality.value, commodity_id:e.target.commodity_id.value}
        fetch('http://localhost:8000/app/quality/', {
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(quality)
        })
        e.target.reset()
        
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
        <div>
            <form className='quality' onSubmit={handleSubmit}>
                {/* Will provide previous quality code and information based on selected commodity */ }
                <input name='quality_code' placeholder='Enter Quality Code'/>
                <input name='quality_name' placeholder='Enter Seller Quality Name'/>
                <select name='internal_quality'>
                    <option value={"low"}>Low</option>
                    <option value={"medium"}>Medium</option>
                    <option value={"high"}>High</option>

                </select> 
                <select name='commodity_id' placeholder="Select Commodity" onFocus={loadCommodityList}>
                    { commodityList.map((value, index) => {
                        return <option key={value.commodity_id} value={value.commodity_id}>{value.commodity_name}</option>

                    })}
                </select>
                <input type='submit' value={"Add Quality"} />
            </form>
        </div>
    )
}