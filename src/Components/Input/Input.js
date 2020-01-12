import React from 'react';

export default class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: ""
    }
  }

  componentDidMount() {
    this.inputNode.focus();
  }

  onInputChange = (event) => {
    this.setState({inputValue: event.target.value})
  };

  onEnter = (e) => {
    if (e.key === "Enter") {
      this.props.onInputClick(this.state.inputValue);
    }
  };

  render() {
    return (
      <div>
        <span>Country name: </span>
        <input type="text"
               onChange={this.onInputChange}
               onKeyDown={e => this.onEnter(e)}
               ref={node => this.inputNode = node}/>
      </div>
    );
  }
}