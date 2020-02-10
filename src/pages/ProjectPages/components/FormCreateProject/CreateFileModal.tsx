import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { Form, Input, Select, Row, Col, Modal, AutoComplete } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styles from './style.module.less';
import { useQuery } from '@apollo/react-hooks'
import { SEARCH_PARTNER_NAME } from '../../../../graphql/partner/getPartners'
import { SEARCH_CMS_USERS } from '../../../../graphql/cmsUser/getCMSUser'
import {
  SearchPartnerName,
  SearchPartnerNameVariables,
  SearchCMSUser,
  SearchCMSUserVariables
} from '../../../../graphql/types';
import { CreateDocumentResponse } from '../EntryHeader';

const { Option } = Select;
interface IProps extends FormComponentProps {
  visible: boolean;
  onCancel: () => void;
  onCreate: () => any;
  confirmLoading: boolean;
  onSetReviewerId: (reviewerId: string) => void;
  onSetImplementerId: (implementerId: string) => void;
}
type Ref = FormComponentProps;

// eslint-disable-next-line
const useSearchPartners = (limit: number = 10) => {
  const { data, loading, error, refetch } = useQuery<SearchPartnerName, SearchPartnerNameVariables>(SEARCH_PARTNER_NAME, {
    variables: {
      limit: limit
    }
  })
  return {
    partnerData: data,
    loadingSearchPartner: loading,
    error,
    onSearchPartner: refetch
  }
}
const useSearchCmsUser = (limit: number = 10) => {
  const { data, loading, error, refetch } = useQuery<SearchCMSUser, SearchCMSUserVariables>(SEARCH_CMS_USERS, {
    variables: {
      limit: limit,
      query: ''
    }
  })
  return {
    cmsUserData: data,
    loadingSearchCMSUser: loading,
    onSearchCMSUser: refetch,
    error: error
  }
}

// interface DataState {
//   partners: (GetBothCMSUserPartner_getPartners_partners | null)[] | null,
//   cmsUsers: (GetBothCMSUserPartner_cmsGetUsers_users | null)[] | null
// }
// const initialData: DataState = {
//   partners: null,
//   cmsUsers: null
// }
// interface Total {
//   cmsUsersTotal: number,
//   partnerTotal: number
// }
// const initialTotal: Total = {
//   cmsUsersTotal: 0,
//   partnerTotal: 0
// }
const initData: string[] = [];
const initPartnerCode: string = "";
const useStateData = () => {
  const [dataPartnerSearch, setDataPartnerSearch] = useState(initData);
  const [partnerCode, setPartnerCode] = useState(initPartnerCode);
  const [dataCmsUserSearch, setDataCmsUserSearch] = useState(initData);
  return {
    dataPartnerSearch,
    setDataPartnerSearch,
    partnerCode, setPartnerCode,
    dataCmsUserSearch,
    setDataCmsUserSearch
  }
}
const CreateFileInput = forwardRef<Ref, IProps>(({ form, onCreate, onCancel, visible, confirmLoading, onSetImplementerId, onSetReviewerId }: IProps, ref) => {
  useImperativeHandle(ref, () => ({ form }));
  const { dataPartnerSearch,
    setDataPartnerSearch,
    partnerCode, setPartnerCode,
    dataCmsUserSearch, setDataCmsUserSearch
  } = useStateData();
  const { partnerData, onSearchPartner } = useSearchPartners(10);
  const { cmsUserData, onSearchCMSUser } = useSearchCmsUser(10);
  // console.log("data state", dataCmsUserSearch);
  useEffect(() => {
    configDataAutoComplete();
  }, [partnerData, cmsUserData]);
  const configDataAutoComplete = () => {
    if (partnerData) {
      const dataInputSearch = partnerData.getPartners.partners.map((item, index) => item.name)
      setDataPartnerSearch(dataInputSearch);
    }
    if (cmsUserData) {
      const dataInputSearch = cmsUserData.cmsGetUsers.users.map((item) => item.fullName);
      setDataCmsUserSearch(dataInputSearch);
    }
  }
  const { getFieldDecorator } = form;
  const onInputPartnerChange = (value) => {
    onSearchPartner({ limit: 10, query: value })
  }
  const onInputCMSUserChange = (value) => {
    onSearchCMSUser({ limit: 10, query: value });
  }
  const onSelectPartnerSearch = (value) => {
    const partnerCode = partnerData.getPartners.partners.filter((item, index) => value === item.name)[0].partnerCode;
    setPartnerCode(partnerCode)
  }
  const onFindImplementerId = (value) => {
    const implementerId = cmsUserData.cmsGetUsers.users.filter((item) => value === item.fullName)[0]._id;
    onSetImplementerId(implementerId);
  }
  const onFindReviewerId = (value) => {
    const reviewerId = cmsUserData.cmsGetUsers.users.filter((item) => value === item.fullName)[0]._id;
    onSetReviewerId(reviewerId)
  }
  const onCreateDocument = async () => {
    const response = await onCreate();
    if (response === CreateDocumentResponse.success) {
      setPartnerCode("");
      return;
    }
  }
  return (
    <Modal
      visible={visible}
      title="Tạo hồ sơ"
      okText="Đồng ý"
      cancelText="Huỷ bỏ"
      onCancel={onCancel}
      onOk={onCreateDocument}
      width={960}
      confirmLoading={confirmLoading}
    >
      <Form>
        <Row style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Col md={12} className={styles.pr1}>
            <Form.Item label="Tên khách hàng">
              {getFieldDecorator('partnerName', {
                rules: [
                  {
                    message: 'Nhập tên khách hàng',
                    required: true,
                  },
                ],
              })(<AutoComplete
                onSelect={onSelectPartnerSearch}
                onSearch={onInputPartnerChange}
                dataSource={dataPartnerSearch}
                placeholder="Nhập tên khách hàng"></AutoComplete>)}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pl1}>
            <Form.Item label="Mã khách hàng">
              {getFieldDecorator('partnerCode', {
                initialValue: partnerCode && partnerCode,
                rules: [
                  {
                    message: 'Nhập mã khách hàng của bạn',
                    required: true,
                  },
                ],
              })(<AutoComplete placeholder="Nhập mã khách hàng của bạn" />)}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pr1}>
            <Form.Item label="Tên công trình">
              {getFieldDecorator('projectName', {
                rules: [
                  {
                    message: 'Nhập tên công trình',
                    required: true,
                  },
                ],
              })(<Input placeholder="Nhập tên công trình" />)}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pl1}>
            <Form.Item label="Mã công trình">
              {getFieldDecorator('projectCode', {
                rules: [
                  {
                    message: 'Nhập mã công trình',
                    required: true,
                  },
                ],
              })(<Input placeholder="Nhập mã công trình" />)}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pr1}>
            <Form.Item label="Tên hạng mục công trình (nếu có)">
              {getFieldDecorator('projectCategory', {
                rules: [
                  {
                    message: 'Nhập tên hạng mục công trình',
                    required: true,
                  },
                ],
              })(<Input placeholder="Nhập tên hạng mục công trình" />)}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pl1}>
            <Form.Item label="Tên cơ quan quyết định đầu tư">
              {getFieldDecorator('investDecideDepartment', {
                rules: [
                  {
                    message: 'Nhập tên cơ quan quyết định đầu tư',
                    required: true,
                  },
                ],
              })(<Input placeholder="Nhập tên cơ quan quyết định đầu tư" />)}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pr1}>
            <Form.Item label="Tên chủ đầu tư">
              {getFieldDecorator('investor', {
                rules: [
                  {
                    message: 'Nhập tên chủ đầu tư',
                    required: true,
                  },
                ],
              })(<Input placeholder="Nhập tên chủ đầu tư" />)}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pl1}>
            <Form.Item label="Tên đại diện chủ đầu tư">
              {getFieldDecorator('investorRepresent', {
                rules: [
                  {
                    message: 'Nhập tên đại diện chủ đầu tư',
                    required: true,
                  },
                ],
              })(<Input placeholder="Nhập tên đại diện chủ đầu tư" />)}
            </Form.Item>
          </Col>

          <Col md={24}>
            <Form.Item label="Loại tài liệu">
              {getFieldDecorator('documentType', {
                rules: [
                  {
                    message: 'Chọn loại tài liệu',
                    required: true,
                    type: 'array',
                  },
                ],
              })(
                <Select mode="multiple" placeholder="Chọn loại tài liệu phù hợp với bạn">
                  <Option value="Document">Hồ sơ</Option>
                  <Option value="Decision">Quyết định</Option>
                  <Option value="Circular">Thông tư</Option>
                  <Option value="LawPrinciple">Luật quy định</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pr1}>
            <Form.Item label="Tên người thực hiện" hasFeedback>
              {getFieldDecorator('implementer', {
                rules: [
                  {
                    message: 'Chọn tên người thực hiện',
                    required: true,
                  },
                ],
              })(
                <AutoComplete
                  onSelect={onFindImplementerId}
                  dataSource={dataCmsUserSearch}
                  onSearch={onInputCMSUserChange}
                />,
              )}
            </Form.Item>
          </Col>

          <Col md={12} className={styles.pl1}>
            <Form.Item label="Tên người phê duyệt" hasFeedback>
              {getFieldDecorator('approver', {
                rules: [
                  {
                    message: 'Chọn tên người phê duyệt',
                    required: true,
                  },
                ],
              })(
                <AutoComplete
                  onSelect={onFindReviewerId}
                  dataSource={dataCmsUserSearch}
                  onSearch={onInputCMSUserChange}
                />,
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

)
const CreateFileModal = Form.create<IProps>({})(CreateFileInput);
export default CreateFileModal;
