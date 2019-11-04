import React from 'react'
import './Context.css'

const ThemeContext = React.createContext('light');

class Context extends React.Component {
  render() {
    return (
      <div>
        <ThemeContext.Provider value="light">
          <Toolbar />
        </ThemeContext.Provider>
      </div>
    )
  }
}

function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  )
}

class ThemedButton extends React.Component {
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />
  }
}

function Button(props) {
  return (
    <button type="button" className={props.theme}>Button</button>
  )
}

export default Context