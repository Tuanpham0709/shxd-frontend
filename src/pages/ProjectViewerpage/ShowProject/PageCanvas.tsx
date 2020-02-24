import React, { useRef, useEffect } from 'react';
import styles from './style.module.less';
// import { AppContext } from '../../../contexts/AppContext';
import { RenderType } from './PdfRender'
interface IProps {
  pdf: any;
  pageNum: number;
  scaleProp: number;
  // onLoadSuccess: () => void;
  renderType: RenderType;
  pageSum: number;
  index: number;
  onUpdatePdfContext: (page: any, index: number) => void;
  page: any;
  widthContainer: number
}
const PageCanvas: React.FC<IProps> = ({ pdf, pageNum, scaleProp, pageSum, index, onUpdatePdfContext, renderType, page, widthContainer }) => {
  // const { pdfRendered } = useContext(AppContext);
  const canvasRef = useRef(null);
  useEffect(() => {
    if (renderType === RenderType.FIRST_RENDER) {
      if (pdf) {
        getPageFromPdf();
      }
      return;
    }
    renderPage(page)

  }, [pdf, scaleProp, pageNum]);
  const getPageFromPdf = async () => {
    const page = await pdf.getPage(pageNum);
    renderPage(page);

  };
  const renderPage = async page => {
    if (renderType === RenderType.FIRST_RENDER) {
      onUpdatePdfContext(page, index);
    }
    const viewport = page.getViewport({ scale: scaleProp });
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    const renderTask = page.render(renderContext);
    console.log("visible");
    renderTask.promise.then(async (value) => {
      console.log("value value", value)
    }).catch((err) => console.log("eror", err)
    )
  };
  return (
    <canvas ref={canvasRef} className={styles.pdfPage} />
  );
};
export default PageCanvas;
