import React, { useState, useEffect } from 'react'
import { Modal } from 'antd';
import styles from './styles.module.less';
interface NoteModalProps {
    visible: boolean;
    onDismiss: () => void;
    onSubmit: (note: string) => void;
    initValue: string;
}
const useChangeText = () => {
    const [note, setNote] = useState('');
    return {
        note, setNote
    }
}
const NoteModal: React.FC<NoteModalProps> = ({ visible, onDismiss, initValue, onSubmit }) => {
    console.log("initValue ", initValue)
    const { note, setNote } = useChangeText();
    useEffect(() => {
        if (!initValue) {
            setNote('')
        } else {
            setNote(initValue);
        }

        return () => {
            setNote('');
        }
    }, [initValue]);
    const onChange = (event) => {
        setNote(event.target.value);
    }
    return (
        <Modal
            onCancel={onDismiss}
            title="Ghi chú"
            width="60%"
            onOk={() => {
                onSubmit(note);
            }}
            visible={visible} >
            <div className={styles.inputNoteUpload}>
                <textarea
                    onChange={onChange}
                    value={note}
                    placeholder="Nhập nội dung ghi chú" rows={20} className={styles.noteInput} />
            </div>
        </Modal>
    )
}
export default NoteModal;