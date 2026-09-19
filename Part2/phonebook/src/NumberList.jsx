export default function NumberList({persons}){

    function displayPersonList(){
        return persons.map((item)=>{
            return <li key={item.name}>{item.name} - {item.number}</li>
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