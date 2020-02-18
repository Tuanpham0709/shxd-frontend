import React, { useEffect, useState, useRef } from 'react';
import pdfjsLib from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import styles from './style.module.less';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
// import { PdfViewType } from './PdfRender'
interface IProps {
    uri: string,
    index: number,
    widthContainer: number
}
const initPages: any = null
const usePagesState = () => {
    const [pdf, setPdf] = useState(initPages)
    return {
        pdf, setPdf
    }
}
const RenderPdfGridView: React.FC<IProps> = ({ uri, index, widthContainer }) => {
    const { pdf, setPdf } = usePagesState();
    useEffect(() => {
        if (uri) {
            getDocuments(uri);
        }

    }, [uri])
    const getDocuments = async (uri) => {
        pdfjsLib.getDocument(uri)
            .then(async (pdf) => {
                setPdf(pdf);
            })
            .catch(err => console.log('errror ', err));
    }


    return (
        <div key={index + ''} style={{ marginTop: 30, display: "flex", justifyContent: "center", width: "33%" }}><RenderPage widthContainer={widthContainer} pdf={pdf} /></div>
    )
}
const RenderPage = ({ pdf, widthContainer }) => {
    const canvasRef = useRef(null);
    useEffect(() => {
        if (pdf) {
            getPageFromPdf();
        }
    }, [pdf])
    const getPageFromPdf = async () => {
        const page = await pdf.getPage(1);
        renderPage(page)
    }
    const renderPage = async page => {
        const scale = widthContainer <= 940 ? 0.3 : 0.45
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderContext = {
            canvasContext: context,
            viewport: viewport,
        };
        const renderTask = page.render(renderContext);
        renderTask.promise.then(async (value) => {
        }).catch((err) => console.log("eror", err)
        )
    };
    return (
        <canvas ref={canvasRef} className={styles.pdfPageGrid} />
    )
}
export default RenderPdfGridView;
