import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Handle the error, log it, and set the state to indicate an error.
    this.setState({ hasError: true });
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      // Render a fallback UI when an error occurs.
      return <div>Something went wrong.</div>;
    }
    return this.props.children; 
  }
}

export default ErrorBoundary;
