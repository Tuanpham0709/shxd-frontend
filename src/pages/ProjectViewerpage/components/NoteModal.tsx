import React from 'react'
import { Modal } from 'antd';
import styles from './styles.module.less';
interface NoteModalProps {
    visible: boolean;
    onDismiss: () => void;
    onSubmit: () => void;
}
const NoteModal: React.FC<NoteModalProps> = ({ visible, onDismiss }) => {
    return (
        <Modal
            onCancel={onDismiss}
            title="Ghi chú" 
            width="60%"
            visible={visible} >
            <div className={styles.inputNoteUpload}>
                <textarea placeholder="Nhập nội dung ghi chú" rows={20} className={styles.noteInput} />
            </div>
        </Modal>
    )
}
export default NoteModal;