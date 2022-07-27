import  {Component } from 'react';
import {FeedbackOptions} from './FeedbackOptions/FeedbackOptions';
import {Section} from './Section/Section';
import {Statistics} from './Statistics/Statistics';
import {Notification} from './Notification/Notification';
import '../index.css'


// import PropTypes from 'prop-types';
// import styles from './Statistics.module.css';

// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         // display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       {/* <Statistics/> */}

// </div>
// );
// };

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };



  onLeaveFeedback = event => {
    const { name } = event.target;

    this.setState(prevState => {
      return { [name]: prevState[name] + 1 };
    });
  };

  countTotalFeedback = () => {
    const sum=Object.values(this.state)
    return sum.reduce((acc, elem)=>acc+elem )
  };

  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    const sum = this.countTotalFeedback()
    const percentage = Math.round((good * 100) / sum);
    return percentage;
  };

 render() {
  const { good, neutral, bad } = this.state;
  const total = this.countTotalFeedback();
  const percentage = this.countPositiveFeedbackPercentage();
  const objKey = Object.keys(this.state)


 return (
  <>

  <Section title="Please leave feedback">
  <FeedbackOptions onLeaveFeedback={this.onLeaveFeedback}  options={objKey}
   />
</Section>

{total === 0 ? (<Notification message="There is no feedback"/>) :


  (<Section title="Statistics">
  <Statistics 
  good={good}
  neutral={neutral}
  bad={bad}
  total={total}
  positivePercentage= {percentage}
   />
</Section>
)}

</>
 )
}
}
