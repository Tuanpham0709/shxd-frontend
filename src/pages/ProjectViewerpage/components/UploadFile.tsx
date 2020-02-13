import React, { useState } from 'react';
import { Modal } from 'antd';
import styles from './styles.module.less';
import './styles.module.less';
import ImageCard from './imageCard';
import { ToastError } from '../../../components/Toast/index';
import { useUploadFile } from './EmptyFiles'
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
}
const IMAGE_TYPES = [
    "image/x-png",
    "image/gif",
    "image/jpeg"
]
const UploadFile: React.FC<Iprops> = ({ visible, onDismiss, onSubmit }) => {
    let refScroll = null
    const [state, setState] = useState(initialState);
    let fileCount = 0;
    const { uploadFile } = useUploadFile();
    const onImageChange = (e) => {
        e.preventDefault();
        let { files } = e.target;
        console.log("- - - - -d - - - -  -", files)
        if (!files) {
            return
        }
        let fileList = [...files]
        fileList.forEach((file, index) => {
            const indexFile = IMAGE_TYPES.findIndex((type) => type === file.type);
            if (fileList.length === 1 && indexFile === -1) {
                ToastError({ message: "Không đúng định dang ảnh!" })
                return;
            } else if (indexFile == -1) {
                fileList.splice(index, 1);
            }
        });
        fileList.forEach((file, index) => {
            uploadFile({
                variables: {
                    dimensions: {
                        width: 0,
                        height: 0
                    },
                    file: file
                }
            }).then((response) => {
                fileCount++;
                console.log("response ", response)
            }).catch((error) => {
                fileCount++;
            })
        })
        console.log("file _ + +", fileCount);
        const newFiles = state.fileList;
        newFiles.push(files);
        fileList.forEach(file => {
            console.log("filefile ", file)
            let reader = new FileReader();
            reader.onloadend = () => {
                const newFilesHandled = state.fileHandled;
                newFilesHandled.push(reader.result);
                setState({
                    fileList: newFiles,
                    fileHandled: newFilesHandled
                })
            }
            reader.readAsDataURL(file)
        });

    }
    return (
        <Modal
            onCancel={onDismiss} onOk={onSubmit}
            visible={visible} style={{ flexWrap: "nowrap" }}>
            <div ref={(ref) => {
                refScroll = ref
            }} className={styles.modalContainer}>
                {state.fileList.length < 1 ? <div>
                    <form className={styles.inputInitUpload}>
                        <input onChange={onImageChange} className={styles.inputUpload} type="file" multiple={true} />
                        <p className={styles.addText}>Thêm hình ảnh</p>
                    </form>
                </div> : <ul ref={refScroll} className={styles.ul} >
                        {state.fileHandled.length > 0 && state.fileHandled.map((item, index) => {
                            return <li key={index + ""} className={styles.item}> <ImageCard key={index + ""} src={item} /></li>
                        })}
                        <div>
                            <form className={styles.inputUploadContainer}>
                                <input accept="image/x-png,image/gif,image/jpeg" onChange={onImageChange} className={styles.inputUpload} type="file" multiple={true} />
                                <p className={styles.addText}>Thêm hình ảnh</p>
                            </form>
                        </div>
                    </ul>}

            </div>
        </Modal >
    )
}
export default UploadFile;