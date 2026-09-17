import StatisticLine from './StatisticLine.jsx';

export default function Statistics({ good, neutral, bad }) {
  const total = good + neutral + bad;
  const average = total === 0 ? 0 : (good - bad) / total;
  const positivePercentage = total === 0 ? 0 : (good / total) * 100;

  return (
    <>
    {total > 0 ? 
        (
            <div>
            <h2>Statistics</h2>
            <table>
                <tbody>
                    <StatisticLine text="Good" value={good} />
                    <StatisticLine text="Neutral" value={neutral} />
                    <StatisticLine text="Bad" value={bad} />
                    <StatisticLine text="All" value={total} />
                    <StatisticLine text="Average" value={average} />
                    <StatisticLine text="Positive" value={`${positivePercentage}%`} />
              </tbody>
            </table>
            </div>
        ) 
        : 
        (<p>No feedback given</p>)
    }
    </>
);
}