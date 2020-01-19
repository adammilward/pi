import React from 'react'
import Joke from './Joke'

class Jokes extends React.Component {

  constructor() {
    super();
    this.state = {};
    this.state.jokes =
      [
          {
            question: 'What\'s worse that finding a worm in your apple?',
            answer: 'Being raped.',
          },
          {
            answer: 'Your mum is like a bolling ball, she gets fingered down the ally and comes back form more.'
          }
        ]

  }

  render (props) {
    let string = this.state.jokes.map((joke, key) => {
      return <Joke
        key={key}
        question={joke.question ? joke.question : ''}
        answer={joke.answer ? joke.answer : ''}
      />;
    });

    return (
        string
    )
  }
}

export default Jokes