import React, { Component } from 'react';

const componentSplitting = getComponent => {
  return class AsyncComponent extends Component {
    static Component = null;

    constructor() {
      super();
      this.state = { Component: AsyncComponent.Component };
    }

    componentDidMount() {
      if (!this.state.Component) {
        getComponent().then(({ default: Component }) => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }

    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  };
};

export default componentSplitting;
