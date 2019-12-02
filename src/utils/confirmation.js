import Modal from 'antd/lib/modal';

const confirm = Modal.confirm;

export default function (formatMessage, callback) {
  confirm({
    title: formatMessage({ id: 'app.global.labels.confirmAction' }),
    okText: formatMessage({ id: 'app.global.labels.ok' }),
    okType: 'danger',
    cancelText: formatMessage({ id: 'app.global.actions.cancel' }),
    onOk() {
      callback();
    },
  });
}
