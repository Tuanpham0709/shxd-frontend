import React from 'react';
import { Form, Input, Select, Row, Col, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styles from './style.module.less';

const { Option } = Select;
interface Props extends FormComponentProps {
  visible: boolean;
  onCancel: () => void;
  onCreate: () => void;
  wrappedComponentRef: (formRef: any) => void;
}

const CollectionCreateForm = Form.create<Props>({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component<any, any> {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Tạo hồ sơ"
          okText="Đồng ý"
          cancelText="Huỷ bỏ"
          onCancel={onCancel}
          onOk={onCreate}
          width={960}
        >
          <Form>
            <Row>
              <Col md={12} className={styles.pr1}>
                <Form.Item label="Tên khách hàng">
                  {getFieldDecorator('user-name', {
                    rules: [
                      {
                        message: 'Nhập tên của bạn',
                        required: true,
                      },
                    ],
                  })(<Input placeholder="Nhập tên của bạn" />)}
                </Form.Item>
              </Col>

              <Col md={12} className={styles.pl1}>
                <Form.Item label="Mã khách hàng">
                  {getFieldDecorator('code-customer', {
                    rules: [
                      {
                        message: 'Nhập mã khách hàng của bạn',
                        required: true,
                      },
                    ],
                  })(<Input placeholder="Nhập mã khách hàng của bạn" />)}
                </Form.Item>
              </Col>

              <Col md={12} className={styles.pr1}>
                <Form.Item label="Tên công trình">
                  {getFieldDecorator('name-project', {
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
                  {getFieldDecorator('code-project', {
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
                  {getFieldDecorator('name-cate-project', {
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
                  {getFieldDecorator('name-agency', {
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
                  {getFieldDecorator('name-investor', {
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
                  {getFieldDecorator('name-instead', {
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
                  {getFieldDecorator('select-multiple', {
                    rules: [
                      {
                        message: 'Chọn loại tài liệu',
                        required: true,
                        type: 'array',
                      },
                    ],
                  })(
                    <Select mode="multiple" placeholder="Chọn loại tài liệu phù hợp với bạn">
                      <Option value="Ho so">Hồ sơ</Option>
                      <Option value="Quyet dinh">Quyết định</Option>
                      <Option value="Thong tu">Thông tư</Option>
                      <Option value="Luat quy dinh">Luật quy định</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>

              <Col md={12} className={styles.pr1}>
                <Form.Item label="Tên người thực hiện" hasFeedback>
                  {getFieldDecorator('select1', {
                    rules: [
                      {
                        message: 'Chọn tên người thực hiện',
                        required: true,
                      },
                    ],
                  })(
                    <Select placeholder="Chọn">
                      <Option value="Nguyen Van A">Nguyen Van A</Option>
                      <Option value="Bui Xuan B">Bui Xuan B</Option>
                      <Option value="Le Thi C">Le Thi C</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>

              <Col md={12} className={styles.pl1}>
                <Form.Item label="Tên người phê duyệt" hasFeedback>
                  {getFieldDecorator('select2', {
                    rules: [
                      {
                        message: 'Chọn tên người phê duyệt',
                        required: true,
                      },
                    ],
                  })(
                    <Select placeholder="Chọn">
                      <Option value="Nguyen Van A">Tran Xuan A</Option>
                      <Option value="Bui Xuan B">Phi Thi Xuan B</Option>
                      <Option value="Le Thi C">Nguyen Thi C</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      );
    }
  },
);
export default CollectionCreateForm;
