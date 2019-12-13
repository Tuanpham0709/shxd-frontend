import React, { Component } from 'react';
import HeaderForm from './HeaderForm';
import MainForm from './components/MainForm';

class Files extends Component {
  render() {
    return (
      <div>
        <HeaderForm />
        <MainForm />
      </div>
    );
  }
}
export default Files;
