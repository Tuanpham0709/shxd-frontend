import React, { Component } from 'react';
import CustomerHeader from './components/CustomerHeader';
import CustomerContent from './components/Content/index';

class Files extends Component {
  render() {
    return (
      <div>
        <CustomerHeader />
        <CustomerContent />
      </div>
    );
  }
}
export default Files;
