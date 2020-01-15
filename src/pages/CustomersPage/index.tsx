import React, { useEffect } from 'react';
import EntryHeader from './EditTable/EntryHeader';
import HeaderBar from './EditTable/components/HeaderBar';
import EditTable from './EditTable/components/EditableTable'
import { useQuery } from '@apollo/react-hooks'
import { GetPartners, GetPartnersVariables } from '../../graphql/types'
import { GET_PARTNERS } from '../../graphql/partner/getPartners'
import PageLoading from '../../components/PageLoading'
import styles from './style.module.less'
import { ToastError } from '../../components/Toast/index'
import { PartnerInterface } from '../../contexts/type';
const useQueryData = () => {
  const { loading, error, data, refetch } = useQuery<GetPartners, GetPartnersVariables>(GET_PARTNERS, {
    variables: {
      limit: 20
    }
  });
  return { loading, error, data, refetch }
};

const Customers = () => {
  const { loading, error, data, refetch } = useQueryData();
  useEffect(() => {
    onRefreshData();
  }, [data])
  const onRefreshData = () => {
    refetch();
  }
  if (loading) return <PageLoading />;
  if (error) {
    ToastError({ message: "Có lỗi xảy ra, vui lòng thử lái sau" });
    return <div></div>
  }
  const { partners } = data.getPartners
  const partnersProp: PartnerInterface[] = partners.map((partner, index) => (
    {
      id: partner._id,
      code: partner.partnerCode,
      name: partner.name,
      phone: partner.phone,
      email: partner.email,
      address: partner.address,
      room: partner.departmentName,
      manager: partner.ceoName,
      chairman: partner.chairmanName,
      accountant: partner.accountantName,
      projectName: partner.projectName,
      projectCode: partner.projectCode,
    })
  )
  return (
    <div>
      <EntryHeader />
      <div className={styles.border} >
        <HeaderBar />
        <EditTable onRefreshData={onRefreshData} data={partnersProp} />
      </div>
    </div >
  );
}
export default Customers;
