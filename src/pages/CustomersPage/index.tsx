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
const useQueryData = () => {
  const { loading, error, data, refetch } = useQuery<GetPartners, GetPartnersVariables>(GET_PARTNERS, {
    variables: {
      limit: 50
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
  const onChangeSearch = (e) => {
    const { value } = e.target;
    refetch({ limit: 10, query: value });
  }
  const onSearch = (value) => {
    refetch({ limit: 10, query: value });
  }

  if (error) {
    ToastError({ message: "Có lỗi xảy ra, vui lòng thử lái sau" });
    return <div></div>
  }

  return (
    <div>
      <EntryHeader />
      <div className={styles.border} >
        <HeaderBar
          onSearch={onSearch}
          onChangeSearch={onChangeSearch}
        />
        {loading ? <PageLoading /> : <EditTable onRefreshData={onRefreshData} data={data.getPartners.partners} />}
      </div>
    </div >
  );
}
export default Customers;
