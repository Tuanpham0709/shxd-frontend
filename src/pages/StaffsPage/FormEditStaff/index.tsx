import React, { Component } from 'react';
import HeaderForm from './HeaderForm';
import MainForm from './components/MainForm';
interface UserInfo {
  key: string;
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  username: string;
  password: string;
  userType: string;
}
interface IProps {
  userInfo?: UserInfo;
  location?: any;
}
class Files extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  render() {
    return (
      <div>
        <HeaderForm title={this.props.location.state.item[0].name} />
        <MainForm userInfo={this.props.location.state.item[0]} />
      </div>
    );
  }
}
export default Files;
