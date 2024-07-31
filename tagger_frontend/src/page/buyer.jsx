import { useEffect, useState } from "react";
import '../assets/buyer.css'
import '../assets/common.css'
export default function Buyer() {
    const [options, setOptions] = useState([])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        e.target.reset()
    }
    const loadOptions = async () => {
        let data = await fetch('http://localhost:8000/app/market/')
        let mkt = await data.json()
        console.log(mkt)
        let items = []
        for (let i=0;i<mkt.length;i++){
            items.push(mkt[i])
            
        }
        setOptions([...items])

    }
    return (
            <div className="buyer-form">
                <form onSubmit={handleSubmit}>
                    <input name="buyer_code" placeholder="Buyer Code (Must be unique)" />
                    <input name="buyer_name" placeholder="Buyer Name" />
                    <input name="buyer_owner" placeholder="Owner" />
                    <input type="number" name="buyer_number" placeholder="Buyer Number" />
                    <select name="buyer_market" placeholder="Select buyer market" onFocus={loadOptions}>
                        {
                            options.map((value,index) => {
                                return <option key={value.market_id} value={value.market_id}>{value.market_name}</option>
                            })
                        }
                    </select>
                    <input type="submit" value={"Add"} />
                </form>
            </div>
        )
}