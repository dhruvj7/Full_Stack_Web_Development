export default function Buttons({ setGood, setNeutral, setBad }) {
    return (
        <div>
            <button onClick={() => setGood(good =>good + 1)}>good</button>
            <button onClick={() => setNeutral(neutral=> neutral + 1)}>neutral</button>
            <button onClick={() => setBad(bad => bad + 1)}>bad</button>
        </div>
    )
}