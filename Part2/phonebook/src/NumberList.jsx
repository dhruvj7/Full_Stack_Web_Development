export default function NumberList({persons, deletePerson}){

    function displayPersonList(){
        return persons.map((item)=>{
            return <li key={item.name}>{item.name} - {item.number} <button onClick={() => {deletePerson(item.id)}}>delete</button></li>
        });
    }

    return(
        <div>
            <h2>Name and Numbers</h2>
            <ul>
                {displayPersonList()}
            </ul>
        </div>
    )
}