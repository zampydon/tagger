import { useState } from 'react'
import '../assets/common.css'
import '../assets/tag.css'


export default function Tag() {
    const [tagList, setTagList] = useState([])
    const handleSubmit = (e) => {
        e.preventDefault()
        let tag_name = e.target.tag_name.value
        fetch('http://localhost:8000/app/tag/', {
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({"tag_name":tag_name})
        })
        }
    const loadTagList = async () => {
        let data = await fetch('http://localhost:8000/app/tag/')
        let tags = await data.json()
        console.log(tags)
        let items = []
        for (let i=0;i<tags.length;i++){
            items.push(tags[i])
            
        }
        setTagList([...items])
    }
    
    return (
        <div className='tag'>
            <form onSubmit={handleSubmit} onFocus={loadTagList}>
                <input name="tag_name" placeholder='Enter Tag Name'/>
                <input type='submit' value={"Add Tag"} />
            </form>
            <div>
                <ul>
                    {tagList.map((value, index) => {
                        return <li key={value.tag_id}>{value.tag_name}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}