import { useState } from "react";


export default function Buyer() {
    const [options, setOptions] = useState([])
    const loadOptions = async () => {
        let buyers = await fetch('http://localhost:3000/app/market')
        console.log(buyers)
        let items = []
        for (let buyer of buyers){
            items[items.length] = buyer
        }
        setOptions(n=>[...items])

    }
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <>  
            <form onSubmit={handleSubmit}>
                <input name="buyer_code" placeholder="Buyer Code (Must be unique)" />
                <input name="buyer_name" placeholder="Buyer Name" />
                <input name="buyer_owner" placeholder="Owner" />
                <input type="number" placeholder="Buyer Number" />
                <select name="buyer_market" placeholder="Select buyer market" onClick={loadOptions}>
                    {
                        options.map((value, index) => {
                            return `<option key=${index} value=${value.market_id}>${value.market_name}</option>`
                    })
                    }
                </select>
                <input type="submit">Add</input>
            </form>
        </>
    )
}