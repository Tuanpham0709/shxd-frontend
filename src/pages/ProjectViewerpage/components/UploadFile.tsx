import React, { useState } from 'react';
import { Modal } from 'antd';
import styles from './styles.module.less'
import ImageCard from './imageCard'
interface IState {
    fileList?: any[],
    fileHandled?: any[],
    // previewVisible?: boolean,
    // previewImage?: string
}
interface Iprops {
    onDismiss: () => void;
    onSubmit: () => void;
    visible: boolean;
}
const initialState: IState = {
    fileList: [],
    fileHandled: [],
    // previewVisible: false,
    // previewImage: '',
}
const UploadFile: React.FC<Iprops> = ({ visible, onDismiss, onSubmit }) => {
    const [state, setState] = useState(initialState)
    const onImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (!file) {
            return
        }
        console.log("file see", file);
        const newFiles = state.fileList;
        newFiles.push(file);
        let reader = new FileReader();
        reader.onloadend = () => {
            const newFilesHandled = state.fileHandled;
            newFilesHandled.push(reader.result);
            console.log("reader.result ", newFilesHandled);
            setState({
                fileList: newFiles,
                fileHandled: newFilesHandled
            })
        }
        reader.readAsDataURL(file)
    }
    console.log(console.log()
    );
    return (
        <Modal
            onCancel={onDismiss} onOk={onSubmit}
            visible={visible} style={{ flexWrap: "nowrap" }}>
            <div className={styles.modalContainer}>
                <ul >
                    {state.fileHandled.length > 0 && state.fileHandled.map((item, index) => {
                        return <li key={index + ""} className={styles.item}> <ImageCard key={index + ""} src={item} /></li>
                    })}
                    <div >
                        <form className={styles.inputUploadContainer}>
                            <input onChange={onImageChange} className={styles.inputUpload} type="file" multiple={true} />
                            <p className={styles.addText}>Thêm hình ảnh</p>
                        </form>
                    </div>
                </ul>
            </div>
        </Modal >
    )
}
export default UploadFile;