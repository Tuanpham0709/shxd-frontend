import React, { useContext } from 'react';
import { Upload, Spin, Icon } from 'antd';
import styles from './styles.module.less';
import { useMutation } from '@apollo/react-hooks';
import { Upload_file, Upload_fileVariables } from '../../../graphql/types';
import { UPLOAD_FILE } from '../../../graphql/media/createMedia';
import { AppContext } from '../../../contexts/AppContext';
const { Dragger } = Upload;

export const useUploadFile = () => {
    const [uploadFile, { loading, error, data }] = useMutation<Upload_file, Upload_fileVariables>(UPLOAD_FILE);
    return { uploadFile, loading, error, data }
}

interface IProps {
    onUploadSuccess: () => void;
}
// const initFileUploaded: FileUploaded[] = [];
// const useFilesUploaded = () => {
//     const [filesUploaded, setFilesUploaded] = useState(initFileUploaded);
//     return { filesUploaded, setFilesUploaded };
// }

const EmptyFiles: React.FC<IProps> = ({ onUploadSuccess }) => {
    const { onUpdateContext, loadingUploadFile, filesUploaded } = useContext(AppContext)
    const { uploadFile } = useUploadFile();
    const customRequest = ({ file, onSuccess, onError }) => {
        uploadFile({
            variables: {
                dimensions: {
                    width: 0, height: 0
                },
                file
            }
        }).then((res) => {
            let files = filesUploaded;
            files.push({
                nodeMediaId: res.data.uploadPhoto._id,
                documentName: file.name,
            })

            onUpdateContext({ filesUploaded: files });
            onSuccess("ok")
        }).catch((err) => {
            onError(err);
        })
    }
    const onChangeInputFiles = ({ fileList, file }) => {
        onUpdateContext({ loadingUploadFile: true })
        const { status } = file
        if (status !== "uploading") {
            console.log("log log log log log log log log ", filesUploaded);
            onUploadSuccess();
        }

    }
    console.log("files state", filesUploaded);
    return (
        <div className={styles.emptyFileContainer} >
            <div className={styles.loadingUpload} style={{ visibility: loadingUploadFile ? "visible" : "hidden" }}>
                <Spin indicator={<Icon type="loading" style={{ fontSize: 50 }} spin />} />
            </div>
            <div style={{ visibility: loadingUploadFile ? "hidden" : "visible" }}>
                <Dragger
                    accept="application/pdf"
                    customRequest={customRequest}
                    onChange={onChangeInputFiles}
                    multiple
                    showUploadList={true}
                >
                    <p className={styles.textUpload}>Thêm file PDF, hình ảnh</p>
                </Dragger>
            </div>
        </div>
    )
}
export default EmptyFiles; 
