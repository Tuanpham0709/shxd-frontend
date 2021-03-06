import React, { useState, useEffect } from 'react';
import EntryHeader from './components/EntryHeader';
import EntryContent from './components/EntryContent/index';
import EmptyPage from './components/EmptyPage';
import { useQuery, } from '@apollo/react-hooks'
import PageLoading from '../../components/PageLoading/index'
import { GET_DOCUMENTS } from '../../graphql/document/getDocuments';
// import { REMOVE_DOCUMENT } from '../../graphql/document/remove';

import { GetDocuments, GetDocumentsVariables } from '../../graphql/types';
import { ToastError } from '../../components/Toast';
const useQueryDocument = (limit: number, skip?: number) => {
  const { data, loading, error, refetch } = useQuery<GetDocuments, GetDocumentsVariables>(GET_DOCUMENTS, {
    variables: {
      limit: 50,
    }
  });
  return { data, loading, error, refetch }
}
const ProjectPages = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const { data, error, loading, refetch } = useQueryDocument(10);
  // const [remove] = useMutation<DeleteDocument, DeleteDocumentVariables>(REMOVE_DOCUMENT);
  useEffect(() => {
    refetch();
  }, [])
  console.log("data documennt", data);
  // useEffect(() => {
  //   if (data && data.getDocuments.documents.length > 0) {
  //     data.getDocuments.documents.forEach(async item => {
  //       remove({
  //         variables: {
  //           id: item._id
  //         }
  //       })
  //     })
  //   }
  // }, [data])
  if (error) {
    ToastError({ message: "Có lỗi xảy ra, vui lòng thử lại sau !" })
    console.log("errorr", error)
    return <div />
  }
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
