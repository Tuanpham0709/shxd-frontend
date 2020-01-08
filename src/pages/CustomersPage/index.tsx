import React from 'react';
import EntryHeader from './EditTable/EntryHeader';
import HeaderBar from './EditTable/components/HeaderBar';
import EditTable from './EditTable/components/EditableTable'
import { useQuery } from '@apollo/react-hooks'
import { GetPartners, GetPartnersVariables } from '../../graphql/types'
import { GET_PARTNERS } from '../../graphql/partner/getPartners'
import PageLoading from '../../components/PageLoading'
import styles from './style.module.less'
const Customers = () => {
  const { loading, error, data } = useQuery<GetPartners, GetPartnersVariables>(GET_PARTNERS, {
    variables: {
      limit: 10
    }
  });
  if (loading) {
    return <PageLoading />
  }
  console.log("ererer", error);
  console.log("dataa", data);

  return (
    <div>
      <EntryHeader />
      <div className={styles.border} >
        <HeaderBar />
        <EditTable />
      </div>
    </div >
  );
}
export default Customers;
