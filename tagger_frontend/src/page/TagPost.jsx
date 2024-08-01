import { useState } from 'react'
import '../assets/common.css'
export default function TagPost() {
    const [buyers, setBuyers] = useState([])
    const [commodities, setCommodities] = useState([])
    const [commodity, setCommodity] = useState(0)
    const [qualities, setQualities] = useState([])
    const [tags, setTags] = useState([])

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
        let uri = `http://localhost:8000/app/quality?commodity_id=${commodity}`
        let data = await fetch(uri) 
            
        let tempQuality = await data.json()
        let items = []
        for (let temp of tempQuality) {
            items.push(temp)
        }
        setQualities([...items]) 
    }
    const getTags = async () => {
        let uri = `http://localhost:8000/app/tag`
        let data = await fetch(uri)

        let tempTags = await data.json()
        let items = []
        for (let temp of tempTags) {
            items.push(temp)
        }
        setTags([...items])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // let formObject = e.target
        let form = new FormData(e.target)
        // let data = {"comment":[{"comment_name":formObject.comment_name.value}],
        //             "feedback":{
        //                 "feedback_content":formObject.feedback_content.value,
        //                 "feedback_type":formObject.feedback_type.value
        //             },
        //             "packaging_requirement_weight":formObject.packaging_requirement_weight.value,
        //             "customer_type":formObject.customer_type.value,
        //             "buyer_id":formObject.buyer_id.value,
        //             "quality_id":formObject.quality_id.value,
        //             "next_action":formObject.next_action.value,
        //             "tag_id":[formObject.tag_id.value]
        //         }
        
            // console.log(data)
            let arr = [...form]
            console.log(arr[6][1] + arr[7][1])
            // let res = await fetch('http://localhost:8000/app/post/',{method:"POST",
            //     headers:{"Content-Type":"application/json"},
            //     body:JSON.stringify(data)
            // })
            // if (res.ok) {
            //     alert(res.json())
            // }

            document.querySelector('#post-form').reset()

    }
    return (
        <>  
            <form onSubmit={handleSubmit} id='post-form'>
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
                    {qualities.map((value, index) => {
                        return <option key={value.quality_id} value={value.quality_id}>{value.quality_code}</option>
                    })}
                </select>
                <select name='tag_id' multiple={true} onFocus={getTags}>
                    {tags.map((value, index) => {
                        return <option key={value.tag_id} value={value.tag_id}>{value.tag_name}</option>
                    })}

                </select>
                <input name='comment_name' placeholder='Enter Comment Regarding the Quality'/>
                <select name='packaging_requirement_weight' defaultValue={30}>
                    <option value={50}>50</option>
                    <option value={40}>40</option>
                    <option value={30}>30</option>
                    <option value={.5}>.5</option>
                    <option value={.1}>.1</option>
                </select>
                <input name='next_action' placeholder='Enter next action' />
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