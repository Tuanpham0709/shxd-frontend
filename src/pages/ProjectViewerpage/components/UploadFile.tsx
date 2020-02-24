import React, { useState, useContext, useEffect } from 'react';
import { Modal } from 'antd';
import styles from './styles.module.less';
import './styles.module.less';
import ImageCard from './imageCard';
import { useUploadFile } from './EmptyFiles'
import { AppContext } from '../../../contexts/AppContext';



// interface IState {
//     uriList?: any[],
//     note?: any[],
//     // previewVisible?: boolean,
//     // previewImage?: string
// }

interface FilesPosition {
    filesNote?: (string | null)[] | null;
    filesPositionMediaId?: (string | null)[] | null;
    filesPositionMedia?: {
        _id: string;
        uri: string;
    }
}
interface IProps {
    onDismiss: () => void;
    onSubmit: (mediaIds: string[]) => void;
    visible: boolean;
    filesPosition: FilesPosition[];
    onUpload: () => void;
}
const initFilesRender: any[] = [];
// interface FilePosition {
//     filesPositionMediaId: string[];
//     filesNote: string[];
// }
const UploadFile: React.FC<IProps> = ({ visible, onDismiss, onSubmit, filesPosition, onUpload }) => {
    const { onUpdateContext, filesLocation } = useContext(AppContext)
    let refScroll = null;
    const [uriList, setUriList] = useState(initFilesRender);
    const { uploadFile } = useUploadFile();
    useEffect(() => {
        if (filesPosition) {
            setUriList(filesPosition.map((item) => (item.filesPositionMedia.uri)));
        }

    }, [visible])
    const onImageChange = (e) => {
        e.preventDefault();
        let { files } = e.target;
        if (!files) {
            return
        }
        let fileList = [...files];
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
                let filesL = filesLocation ? filesLocation : [];
                filesL.push({ mediaId: response.data.uploadPhoto._id });
                onUpdateContext({ filesLocation: filesL });
            })
        })
        let newFilesHandled = uriList;
        fileList.forEach(async file => {
            let reader = new FileReader();
            reader.onloadend = () => {
                newFilesHandled.push(reader.result);
            }
            await reader.readAsDataURL(file)
        });
        setUriList(newFilesHandled);
    }
    useEffect(() => {
        if (!visible) {
            setUriList([]);
        }
    }, [visible])
    return (
        <Modal
            onCancel={onDismiss} onOk={onUpload}
            visible={visible} style={{ flexWrap: "nowrap" }}>
            <div ref={(ref) => {
                refScroll = ref
            }} className={styles.modalContainer}>
                {uriList.length < 1 ? <div>
                    <form className={styles.inputInitUpload}>
                        <input accept="image/x-png,image/gif,image/jpeg" onChange={onImageChange} className={styles.inputUpload} type="file" multiple={true} />
                        <p className={styles.addText}>Thêm hình ảnh</p>
                    </form>
                </div> : <ul ref={refScroll} className={styles.ul} >
                        {uriList.length > 0 && uriList.map((item, index) => {
                            return <li key={index + ""} className={styles.item}> <ImageCard key={index + ""} index={index} src={item} /></li>
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