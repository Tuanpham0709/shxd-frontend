import React, { useEffect } from 'react';
import EntryHeader from './components/EntryHeader';
import EditableTable from './components/EntryContent/EditableTable';
import HeaderBar from './components/EntryContent/HeaderBar';
import styles from './style.module.less';
import { useQuery } from '@apollo/react-hooks'
import { GET_CMS_USER } from '../../graphql/cmsUser/getCMSUser'
import { GetCMSUser, GetCMSUserVariables } from '../../graphql/types'
import { ToastError } from '../../components/Toast';
import PageLoading from '../../components/PageLoading'
const useQueryData = () => {
  const { loading, error, data, refetch } = useQuery<GetCMSUser, GetCMSUserVariables>(GET_CMS_USER, {
    variables: {
      limit: 20,
      query: ''
    }
  });
  return { loading, error, data, refetch }

}
const Staffs = () => {
  const { loading, error, data, refetch } = useQueryData();
  useEffect(() => {
    onRefreshData();
  }, [data])
  const onRefreshData = () => {
    refetch();
  }
  const onChangeSearch = (e) => {
    console.log("return ", e.target.value)
    refetch({ query: e.target.value, limit: 10 }).then((data) => console.log(data.data.cmsGetUsers.users))
  }
  if (error) {
    ToastError({ message: "Có lỗi xảy ra, vui lòng thử lại sau !" });
  }
  const onSearch = (value) => {
    console.log("value ", value)
    refetch({ query: value, limit: 10 })
  }
  return (
    <div style={{ flex: 1 }}>
      <EntryHeader />
      <div className={styles.border}>
        <HeaderBar onChangeSearch={onChangeSearch} onSearch={onSearch} />
        {loading ? <PageLoading /> : <EditableTable data={data.cmsGetUsers.users} onRefreshData={onRefreshData} />}</div>
    </div>
  );
};
export default Staffs;
