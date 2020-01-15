import React, { useEffect } from 'react';
import HeaderForm from './HeaderForm';
import MainForm from './components/MainForm';
import { AppContext } from '../../../contexts/AppContext';
const onUpdateContextStaff = (staff, onUpdateContext) => {
  if (staff && onUpdateContext) {
    useEffect(() => {
      onUpdateContext({ staffContext: staff })
    }, [])
  }

}
const onResetContextStaff = (onUpdateContext) => {
  useEffect(() => {
    onUpdateContext({ staffContext: null })
  }, [])
}
const Form: React.FC<any> = ({ location }) => {
  const { onUpdateContext } = React.useContext(AppContext);
  if (location.state) {
    onUpdateContextStaff(location.state.staff, onUpdateContext)
    return (
      <div>
        <HeaderForm title={location.state.staff.name} />
        <MainForm />
      </div>
    );
  }
  onResetContextStaff(onUpdateContext);
  return (
    <div>
      <HeaderForm />
      <MainForm />
    </div>
  );
};
export default Form;
