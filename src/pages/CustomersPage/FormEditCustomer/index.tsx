import React, { useContext, useEffect } from 'react';
import HeaderForm from './HeaderForm';
import MainForm from './components/MainForm';
import { AppContext } from '../../../contexts/AppContext'
import { PartnerInterface } from '../../../contexts/type'
const onUpdatePartnerContext = (partner: PartnerInterface, onUpdateContext) => {
  if (partner && onUpdateContext) useEffect(() => {
    onUpdateContext({ partnerContext: partner })
  }, []);
}
const onResetPartnerContext = (onUpdateContext) => {
  if (onUpdateContext) {
    useEffect(() => {
      onUpdateContext({ partnerContext: null })
    }, [])
  }
}
const FormEditCustom: React.FC<any> = ({ location }) => {
  const { onUpdateContext } = useContext(AppContext)
  console.log("location", location);
  if (location.state) {
    onUpdatePartnerContext(location.state.partner, onUpdateContext);
    return (
      <div>
        <HeaderForm title={location.state.partner.name} />
        <MainForm />
      </div>
    );
  }
  onResetPartnerContext(onUpdateContext)
  return (
    <div>
      <HeaderForm />
      <MainForm />
    </div>
  );
};
export default FormEditCustom;
