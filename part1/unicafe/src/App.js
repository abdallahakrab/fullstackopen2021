import { useState } from "react";

const Header = ({ text }) => (
  <div>
    <h1>{text}</h1>
  </div>
);

const Button = ({ text, clickHandler }) => (
  <div>
    <button onClick={clickHandler}>{text}</button>
  </div>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = good - bad;
  const positivePercent = (good / all) * 100;
  if (!all) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={all} />
        <Statistic text="average" value={average} />
        <Statistic text="positive" value={`${positivePercent} %`} />
      </tbody>
    </table>
  );
};

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value} </td>
  </tr>
);

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodClickHandler = () => setGood(good + 1);
  const neutralClickHandler = () => setNeutral(neutral + 1);
  const badClickHandler = () => setBad(bad + 1);

  return (
    <div className="App">
      <Header text="give feedback" />
      <Button text="good" clickHandler={goodClickHandler} />
      <Button text="neutral" clickHandler={neutralClickHandler} />
      <Button text="bad" clickHandler={badClickHandler} />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
