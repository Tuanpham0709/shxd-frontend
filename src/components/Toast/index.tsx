import { notification } from 'antd';

interface IProps {
  message: string,
  description?: string,
}

export const ToastSuccess = (props: IProps) => {
  notification.open({
    placement: 'topRight',
    type: 'success',
    message: props.message,
    description: props.description
  });
};

export const ToastError = (props: IProps) => {
  notification.open({
    placement: 'topRight',
    type: 'error',
    message: props.message,
    description: props.description,
  });
};
