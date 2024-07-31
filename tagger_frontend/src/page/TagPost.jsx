import { useState } from 'react'
import '../assets/common.css'
export default function TagPost() {
    const [buyers, setBuyers] = useState([])
    const [commodities, setCommodities] = useState([])
    const [commodity, setCommodity] = useState(0)
    const [qualities, setQualities] = useState([])
    
    const getBuyer = async () => {
        let data = await fetch('http://localhost:8000/app/buyer/')
        let tempBuyer = await data.json()
        let items = []
        for (let temp of tempBuyer) {
            items.push(temp)
        }
        setBuyers([...tempBuyer])
    }

    const getCommodity = async () => {
        let data = await fetch('http://localhost:8000/app/commodity/')
        let tempCommodity = await data.json()
        let items = []
        for (let temp of tempCommodity) {
            items.push(temp)
        }
        setCommodities([...items])
    }

    const getQuality = async () => {
        let data = await fetch('http://localhost:8000/app/ajax-quality/' + commodity) 
            
        let tempQuality = await data.json()
        let items = []
        for (let temp of tempQuality) {
            items.push(temp)
        }
        setQualities([...items]) 
    }

    const handleSubmit = async (e) => {
        console.log(e.target)
    }
    return (
        <>  
            <form onSubmit={handleSubmit}>
                <select name="buyer_id" onFocus={getBuyer}>
                    {buyers.map((value,index) => {
                        return <option value={value.buyer_code} key={value.buyer_code}>{value.shop_name}</option>
                    })}
                </select>
                <select name="customer_type" defaultValue={"Wholesaler/Trader"}>
                    <option value="Wholesaler/Trader" >Wholesaler/Trader</option>
                        <option value="Retail">Retail</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Hotel">Hotel</option>
                        <option value="Caterer">Caterer</option>
                        <option value="Exporter">Exporter</option>
                        <option value="Manufacturer">Manufacturer</option>
                        <option value="Broker">Broker</option>
                        <option value="Stockist">Stockist</option>
                </select>
                <div>
                    <input name="feedback_content" type='textbox' placeholder="Enter whole feedback"/>
                    <select name="feedback_type">
                        <option value={"visit"}>Visit</option>
                        <option value={"call"}>Call</option>
                    </select>
                </div>
                <select name='commodity_id' onChange={(e) => setCommodity(e.target.value)} onFocus={getCommodity}>
                    {commodities.map((value, index) => {
                        return <option key={value.commodity_id} value={value.commodity_id}>{value.commodity_name}</option>
                    })}
                </select>
                <select name='quality_id' onFocus={getQuality}>
                    {/* Dyanmic Generate */}
                </select>
                <select name='tag_id' multiple>
                    {/* Dyanmic Genreate */}

                </select>
                <input name='comment_name' placeholder='Enter Comment Regarding the Quality'/>
                <input name='packaging_requirement_weight' placeholder='Packaging Requirement Weight'/>
                <input type='submit' value={"Submit"} />
            </form>
        </>
    )
}

// {
//     "comment": [],
//     "feedback": {
//         "feedback_content": "",
//         "feedback_type": null
//     },
//     "packaging_requirement_weight": null,
//     "customer_type": null,
//     "next_action": "",
//     "buyer_id": null,
//     "quality_id": null,
//     "tag_id": []
// }