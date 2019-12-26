import React from 'react';
import HeaderForm from './HeaderForm';
import MainForm from './components/MainForm';
// interface UserInfo {
//   key: string;
//   id: string;
//   name: string;
//   phone: string;
//   email: string;
//   address: string;
//   username: string;
//   password: string;
//   userType: string;
// }
// interface IProps {
//   userInfo?: UserInfo;
//   location?: any;
// }
const Form: React.FC<any> = ({ location }) => {
  console.log('loca', location);
  if (location.state) {
    return (
      <div>
        <HeaderForm title={location.state.item[0].name} />
        <MainForm userInfo={location.state.item[0]} />
      </div>
    );
  }
  return (
    <div>
      <HeaderForm />
      <MainForm />
    </div>
  );
};
export default Form;
