import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import styles from './styles.module.less';
import './styles.module.less';
import ImageCard from './imageCard';
import { useUploadFile } from './EmptyFiles'
import { Spin, Icon } from 'antd';

const antIcon = <Icon type="loading" style={{ fontSize: 30 }} spin />;

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
interface Iprops {
    onDismiss: () => void;
    onSubmit: (mediaIds: string[]) => void;
    visible: boolean;
    filesPosition: FilesPosition[];
}
interface IState {
    mediaId?: string;
    note?: string;
    uri?: string;
}
const initState: IState[] = [];
// interface FilePosition {
//     filesPositionMediaId: string[];
//     filesNote: string[];
// }

const UploadFile: React.FC<Iprops> = ({ visible, onDismiss, onSubmit, filesPosition }) => {
    let refScroll = null;
    let mediaIdList: string[] = [];

    const [loading, setLoading] = useState(false);
    const [state, setState] = useState(initState);
    const { uploadFile } = useUploadFile();
    const onImageChange = (e) => {
        setLoading(true);
        e.preventDefault();
        let { files } = e.target;
        console.log("- - - - -d - - - -  -", files)
        if (!files) {
            return
        }
        let fileList = [...files];
        fileList.forEach((file, index) => {
            setLoading(true)
            uploadFile({
                variables: {
                    dimensions: {
                        width: 0,
                        height: 0
                    },
                    file: file
                }
            }).then((response) => {
                mediaIdList.push(response.data.uploadPhoto._id);
                const filesPosition = state;
                filesPosition.push({
                    uri: response.data.uploadPhoto.uri,
                    mediaId: response.data.uploadPhoto._id
                })

                setState(filesPosition);
                setLoading(false);
                console.log("response ", response.data.uploadPhoto)
            }).catch((error) => {

            })
        })

    }
    useEffect(() => {
        return () => {
            mediaIdList = []
        }
    })
    const onOK = () => {
        onSubmit(mediaIdList);
    }
    console.log("files positoon ", state);
    return (
        <Modal
            onCancel={onDismiss} onOk={onOK}
            visible={visible} style={{ flexWrap: "nowrap" }}>
            <div ref={(ref) => {
                refScroll = ref
            }} className={styles.modalContainer}>
                {state.length < 1 ? <div>
                    {loading ? <Spin indicator={antIcon} /> : <form className={styles.inputInitUpload}>
                        <input accept="image/x-png,image/gif,image/jpeg" onChange={onImageChange} className={styles.inputUpload} type="file" multiple={true} />
                        <p className={styles.addText}>Thêm hình ảnh</p>
                    </form>}
                </div> : <ul ref={refScroll} className={styles.ul} >
                        {state.length > 0 && state.map((item, index) => {
                            return <li key={index + ""} className={styles.item}> <ImageCard key={index + ""} index={index} src={item.uri} /></li>
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