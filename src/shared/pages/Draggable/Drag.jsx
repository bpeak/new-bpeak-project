import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';

class App extends React.Component {
  eventLogger = (e, data) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };

  handleDrag = (e, ui) => {
    console.log(e, ui);
    // const { x, y } = this.state.deltaPosition;
    // this.setState({
    //   deltaPosition: {
    //     x: x + ui.deltaX,
    //     y: y + ui.deltaY,
    //   },
    // });
  };

  render() {
    return (
      <div>
        <Draggable onDrag={this.handleDrag}>
          <div className="box">I can be dragged anywhere</div>
        </Draggable>
        <Draggable>
          <div className="box">I can be dragged anywhere</div>
        </Draggable>
      </div>
    );
  }
}

export default App;
