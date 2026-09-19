import { useState } from "react"

export default function Filter({handleSearch}){

    const [searchString,setSearchString] = useState('');

    function filterList(event){
        const value = event.target.value;
        setSearchString(value)
        handleSearch(value)
    }

    return (
        <div>
           Filter shown with: <input value={searchString} onChange={filterList}/>
        </div>
    )
}