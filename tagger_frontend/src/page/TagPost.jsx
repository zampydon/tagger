import { useState } from 'react'
import '../assets/common.css'
export default function TagPost() {
    const [buyers, setBuyers] = useState([])
    const [commodities, setCommodities] = useState([])
    const [commodity, setCommodity] = useState(0)
    const [qualities, setQualities] = useState([])
    const [tags, setTags] = useState([])
    const [issues, setIssues] = useState([])
    const [targetPrice, setTargetPrice] = useState([0.0,0.0])
    const [stock, setStock] = useState([0.0,0.0])
    const [requiremnt, setRequiremnt] = useState([0.0,0.0])

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
        let uri = `http://localhost:8000/app/tag/`
        let data = await fetch(uri)

        let tempTags = await data.json()
        let items = []
        for (let temp of tempTags) {
            items.push(temp)
        }
        setTags([...items])
    }
    const getBuyerIssueList = async () => {
        let uri = 'http://localhost:8000/app/interest-issue/'
        let data = await fetch(uri)

        let tempIssue = await data.json()
        let items = []
        for (let temp of tempIssue) {
            items.push(temp)
        }
        setIssues([...items])
        }
    const calcauteBagRequirement = async () => {
        let min = parseFloat(document.querySelector('input[name="min_bag_number"]').value)
        let max = parseFloat(document.querySelector('input[name="max_bag_number"]').value)
        document.querySelector('input[name="avg_kg"]').value = ((min + max)*30)/2
        console.log(requiremnt)
    }
    const calcauteStockAvg = async () => {
        let min = parseFloat(document.querySelector('input[name="min_stock"]').value)
        let max = parseFloat(document.querySelector('input[name="max_stock"]').value)
        document.querySelector('input[name="avg_kg_stock"]').value = (min * 30 + max * 30)/2
        console.log(requiremnt)
    }
    const calcauteTargetPrice = async () => {
        let min = parseFloat(document.querySelector('input[name="min_target_price"]').value)
        let max = parseFloat(document.querySelector('input[name="max_target_price"]').value)
        document.querySelector('input[name="avg_target_price"]').value = (min + max) /2
        console.log(requiremnt)
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
            let array  = [...form]
            let paylaod = {comment:[], feedback:{feedback_content:"", feedback_type:""}, packaging_requirement_weight:0, customer_type:"", buyer_id:"", quality_id:"",next_action:"", tag_id:[],"buyer_bag_requirement": {
            "min_bag_number": null,
            "max_bag_number": null,
            "avg_kg": null
            },
            "buyer_interest": {
                "buyer_issue": "",
                "interest_issue_id": null
            },
            "target_price": {
                "min_target_price": null,
                "max_target_price": null,
                "avg_target_price": null,
                "include_gst": false
            },
            "follow_up": {
                "follow_up_date": null,
                "follow_up_time": null
            },
            "unhappy_customer": {
                "unhappy_customer_bool": false,
                "unhappy_customer_reason": ""
            },
            "stock": {
                "min_bag_number": null,
                "max_bag_number": null,
                "avg_kg": null
            }}
            for (let arr of array) { 
                switch (arr[0]) {
                    case 'buyer_id':
                        paylaod.buyer_id = arr[1]
                        break;
                    case 'customer_type':
                        paylaod.customer_type = arr[1]
                        break;
                    case 'feedback_content':
                        paylaod.feedback.feedback_content = arr[1]
                        break;
                    case 'feedback_type':
                        paylaod.feedback.feedback_type = arr[1]
                        break;
                    case 'quality_id':
                        paylaod.quality_id = arr[1]
                        break;
                    case 'tag_id':
                        paylaod.tag_id.push(arr[1])
                        break;
                    case 'comment_name':
                        paylaod.comment.push({comment_name:arr[1]})
                    case 'packaging_requirement_weight':
                        paylaod.packaging_requirement_weight = arr[1]
                        break;
                    case 'next_action':
                        paylaod.next_action = arr[1]
                    case 'min_stock':
                        paylaod.stock.min_bag_number = parseInt(arr[1])
                        break;
                    case 'max_stock':
                        paylaod.stock.max_bag_number = parseInt(arr[1])
                        break;
                    case 'avg_kg_stock':
                        paylaod.stock.avg_kg = parseFloat(arr[1])
                        break;
                    case 'min_bag_number':
                        paylaod.buyer_bag_requirement.min_bag_number = parseInt(arr[1])
                        break;
                    case 'max_bag_number':
                        paylaod.buyer_bag_requirement.max_bag_number = parseInt (arr[1])
                        break;
                    case 'avg_kg':
                        paylaod.buyer_bag_requirement.avg_kg = parseFloat(arr[1])
                        break;
                    case 'min_target_price':
                        paylaod.target_price.min_target_price = parseFloat(arr[1])
                        break;
                    case 'max_target_price':
                        paylaod.target_price.max_target_price = parseFloat(arr[1])
                        break;
                    case 'avg_target_price':
                        paylaod.target_price.avg_target_price = parseFloat(arr[1])
                        break;
                    case 'include_gst':
                        paylaod.target_price.include_gst = arr[1]
                        break;
                    case 'interest_issue_id':
                        paylaod.buyer_interest.interest_issue_id = arr[1]
                        break;
                    case 'buyer_issue':
                        paylaod.buyer_interest.buyer_issue = arr[1]
                        break;
                    case 'unhappy_customer_bool':
                        paylaod.unhappy_customer.unhappy_customer_bool = arr[1] === 'on' ? true : false
                        break;
                    case 'unhappy_customer_reason':
                        paylaod.unhappy_customer.unhappy_customer_reason = arr[1]
                        break;
                    case 'follow_up_date':
                        paylaod.follow_up.follow_up_date = arr[1]
                        break;
                    case 'follow_up_time':
                        paylaod.follow_up.follow_up_time = arr[1]
                        break; 
                    default:
                        break;
                }
                
            }
            console.log(JSON.stringify(paylaod))
            let data = await fetch('http://localhost:8000/app/post/' ,{method:"POST", body:JSON.stringify(paylaod), headers:{"Content-Type":"application/json"}})
            
            if (data.ok) {
                let res = await data.json()
                alert(res)
            }
            // console.log(arr[6][1] + arr[7][1])
            // let res = await fetch('http://localhost:8000/app/post/',{method:"POST",
            //     headers:{"Content-Type":"application/json"},
            //     body:JSON.stringify(data)
            // })
            // if (res.ok) {
            //     alert(res.json())
            // }

            document.querySelector('#post-form').reset()
            location.reload()

    }
    return (
        <>  
            <form onSubmit={handleSubmit} id='post-form'>
                <label>Select Buyer</label>
                <select name="buyer_id" onFocus={getBuyer}>
                    {buyers.map((value,index) => {
                        return <option value={value.buyer_code} key={value.buyer_code}>{value.shop_name}</option>
                    })}
                </select>
                <label>Select Customer Type</label>
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
                    <label>Enter Full Feedback</label>
                    <textarea name="feedback_content" style={{width:"75%", height:"150px"}} placeholder="Enter whole feedback"/>
                    <label>Select Feedback Type</label>
                    <select name="feedback_type">
                        <option value={"visit"}>Visit</option>
                        <option value={"call"}>Call</option>
                    </select>
                </div>
                <label>Select Commodity</label>
                <select name='commodity_id' onChange={(e) => setCommodity(e.target.value)} onFocus={getCommodity}>
                    {commodities.map((value, index) => {
                        return <option key={value.commodity_id} value={value.commodity_id}>{value.commodity_name}</option>
                    })}
                </select>
                <label>Select Quality</label>
                <select name='quality_id' onFocus={getQuality}>
                    {qualities.map((value, index) => {
                        return <option key={value.quality_id} value={value.quality_id}>{value.quality_code}</option>
                    })}
                </select>
                <label>Select Mulitple using Shift key</label>
                <select name='tag_id' multiple={true} onFocus={getTags}>
                    {tags.map((value, index) => {
                        return <option key={value.tag_id} value={value.tag_id}>{value.tag_name}</option>
                    })}

                </select>
                <label>Enter Quality Comment</label>
                <input name='comment_name' placeholder='Enter Comment Regarding the Quality'/>
                <label>Select Packaging Requriement</label>
                <select name='packaging_requirement_weight' defaultValue={30}>
                    <option value={50}>50 kg</option>
                    <option value={40}>40 kg</option>
                    <option value={30}>30 kg</option>
                    <option value={.5}>500 gm</option>
                    <option value={.1}>100 gm</option>
                </select>
                <div id='buyer_bag_requirement'>
                    <label>Enter Bag Requirement</label>
                    <input type='number' placeholder='Enter Min Bag Requirement' name="min_bag_number" defaultValue={0} onChange={(e) => setRequiremnt(n=>[0,e.target.value])}/>
                    <input type='number' placeholder='Enter Max Bag Requirement' name="max_bag_number" defaultValue={0} onChange={(e) => setRequiremnt(n=>[e.target.value,requiremnt[1]])} onKeyUp={calcauteBagRequirement}/>
                    <input type='number' placeholder='Avg Bag Requirement' name="avg_kg" disabled/>
                </div> 
                <div id="target_price">
                <label>Enter Target Price</label>
                <input type='number' placeholder='Enter Min Target Price' name="min_target_price" defaultValue={0}/>
                <input type='number' placeholder='Enter Max Target Price' name="max_target_price" defaultValue={0} onKeyUp={calcauteTargetPrice}/>
                <input type='number' placeholder='Avg Target Price(Calculated)' disabled name='avg_target_price'/>
                <input type='checkbox' placeholder='Check this for entering target price including gst' name='include_gst'/>
                </div>
                <div id="stock">
                    <label>Enter Stock Position</label>
                    <input type='number' placeholder='Enter Min Bag in Stock' name='min_stock' defaultValue={0}/>
                    <input type='number' placeholder='Enter Min Bag in Stock' name='max_stock' defaultValue={0} onKeyUp={calcauteStockAvg}/>
                    <input type='number' placeholder='Calculated Avg Stock' name='avg_kg_stock' disabled/>
                </div>
                <div id='issues'>
                    <lable>Select Issue</lable>
                    <select name='interest_issue_id' onFocus={getBuyerIssueList}>
                        {issues.map((value, index) => {
                            return <option key={value.interest_issue_id} value={value.interest_issue_id}>{value.issue_name}</option> 
                        })}
                    </select>
                    <lable>Issue Reason</lable>
                    <input type='text' name='buyer_issue' placeholder='Enter Reason here'/>
                </div>
                <div id="customer_stats">
                    <lable>Provide Customer State</lable>
                    <lable>Customer Unhappy</lable><input type='checkbox' placeholder='Check this if customer is unhappy' name='unhappy_customer_bool' />
                    <lable>If Yes Please state the reason</lable><input type='text' placeholder='Enter reason for customer stat of unhappy' name='unhappy_customer_reason'/>
                </div>
                <div id="follow_up">
                    <lable>Select Follow Up Date and Time</lable>
                    <input type='date' placeholder='Select Follow up date' name='follow_up_date'/>
                    <input type='time' placeholder='Select Time of follow up date' name='follow_up_time'/>
                </div>
                <lable>Please Provide the next action on this post</lable>
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