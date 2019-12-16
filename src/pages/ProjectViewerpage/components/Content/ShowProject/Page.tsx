import React, { useRef, useEffect } from 'react';
import styles from './style.module.less';
interface IProps {
  pdf: any;
  pageNum: number;
  scaleProp: number;
}

const Page: React.FC<IProps> = ({ pdf, pageNum, scaleProp }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (pdf) {
      fetchPdf();
    }
  }, [pdf, scaleProp]);
  const fetchPdf = async () => {
    const page = await pdf.getPage(pageNum);
    renderPage(page);
  };
  const renderPage = async page => {
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
    await renderTask.promise;
  };
  return <canvas ref={canvasRef} className={styles.pdfPage} />;
};
export default Page;
