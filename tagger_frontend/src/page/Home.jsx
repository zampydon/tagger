import Buyer from './Buyer.jsx'
import Market from './Market.jsx'
import Tag from './Tag.jsx'
import Commodity from './Commodity.jsx'
import Quality from './Quality.jsx'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <Link to="/tagpost">Tag a Post</Link>
            <Buyer/>
            <Market/>
            <Tag/>
            <Commodity/>
            <Quality/>
        </div>
    )
}