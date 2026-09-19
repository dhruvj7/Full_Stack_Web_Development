import { useState } from "react"

export default function PersonForm({addPerson}){
    const [person,setPerson] = useState({
        name: '',
        number: ''
    });

    function addName(event){
        setPerson(
            {
                ...person,
                name:event.target.value,
            }
        )
    }

    const addNumber = (event)=>{
        setPerson(
            {
                ...person,
                number:event.target.value
            }
        )
    }

    function handleAdd(event){
        event.preventDefault();
        addPerson(person);
        setPerson({
            name: '',
            number: ''
        })
    }

    return(
        <div>
            <h2>Add a new contact </h2>

            <form>
                <div>
                    name: <input value={person.name} onChange={addName}/>
                </div> 
                <br></br>
                <div>
                    phone number: <input type='number' value={person.number} onChange={addNumber}/>
                </div>
                <br></br>
                <div>
                    <button onClick={handleAdd}>add</button>
                </div>
            </form>
      </div>
    )
}