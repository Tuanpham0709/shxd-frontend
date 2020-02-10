import React, { useState } from 'react';
import EntryHeader from './components/EntryHeader';
import EntryContent from './components/EntryContent/index';
import EmptyPage from './components/EmptyPage';
import { useQuery } from '@apollo/react-hooks'
import PageLoading from '../../components/PageLoading/index'
import { GET_DOCUMENTS } from '../../graphql/document/getDocuments';
import { GetDocuments, GetDocumentsVariables } from '../../graphql/types';
const useQueryDocument = (limit: number, skip?: number) => {
  const { data, loading, error, refetch } = useQuery<GetDocuments, GetDocumentsVariables>(GET_DOCUMENTS, {
    variables: {
      limit: 10,
    }
  });
  return { data, loading, error, refetch }
}
const ProjectPages = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const { data, error, loading, refetch } = useQueryDocument(10);
  console.log("data documennt", data);
  console.log("er", error);
  const onPressOpenModal = () => {
    setVisibleModal(!visibleModal);
  }
  if (loading) {
    return <PageLoading />
  }
  return (
    <div>
      <EntryHeader visibleModal={visibleModal} onHideModal={onPressOpenModal} onRefreshQuery={refetch} />

      {data && data.getDocuments.documents.length === 0 ? <EmptyPage onPresOpenModal={onPressOpenModal} /> : <EntryContent data={data.getDocuments.documents} />}
    </div>
  );
};
export default ProjectPages;
