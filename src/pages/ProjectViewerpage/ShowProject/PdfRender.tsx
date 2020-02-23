import React, { useEffect, useState, useContext, useRef } from 'react';
import { Button } from 'antd';
import pdfjsLib from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import styles from './style.module.less';
import PageCanvas from './PageCanvas';
// import PageLoading from '../../../components/PageLoading/index';
import { AppContext } from '../../../contexts/AppContext'

const DEFAULT_SCALE = 1.4;
const MAX_SCALE = 2.4;
const MIN_SCALE = 0.2;
const URL = '/dummy.pdf';
export enum RenderType {
  FIRST_RENDER = "FIRST_RENDER",
  RERENDER = "RERENDER"
}
interface IRenderingState {
  pages: any[];
  scale?: number;
  renderType: RenderType;
  pdf: any;
}
interface IProps {
  uri: string
  widthContainer: number;
}
const initRendering: IRenderingState = {
  pages: [],
  scale: DEFAULT_SCALE,
  renderType: null,
  pdf: null,
}

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
const PdfRender: React.FC<IProps> = ({ uri, widthContainer }) => {
  let pagesRendered: any[] = [];
  let refContainer = useRef(null);
  const { onUpdateContext, pdfRenderedContext } = useContext(AppContext);
  const [pagesRendering, setPagesRendering] = useState(initRendering);
  const onPushPageRendered = (page: any, index: number) => {
    if (pagesRendered.length < index + 1) {
      pagesRendered.push(page);
    }
    // console.log("pagesRendered", pagesRendered)
    if (index === pagesRendering.pages.length - 1) {
      onUpdateContext({ pdfRenderedContext: pagesRendered });
    }
  }
  const getDocument = async (url: string = URL) => {
    await pdfjsLib
      .getDocument(uri).promise
      .then(pdf => {
        const pagesArr = Array.from(Array(pdf.numPages).keys())
        setPagesRendering({ ...pagesRendering, pages: pagesArr, renderType: RenderType.FIRST_RENDER, pdf });
      })
      .catch(err => console.log('errror ', err));
  };
  // const initRender = () => {
  //   let pagesTemp: any[] = [];
  //   for (let i = 0; i < 3; i++) {
  //     pagesTemp.push(_pages[i]);
  //   }
  //   if(pagesT)
  //   setPagesRendering({
  //     ...pagesRendering,
  //     pages: 
  //   })
  // }
  useEffect(() => {
    console.log("uri uri ", uri)
    if (uri != null) {
      getDocument();
      return;
    }
    setPagesRendering({
      ...pagesRendering,
      pages: pdfRenderedContext,
      renderType: RenderType.RERENDER
    })

  }, [uri]);
  useEffect(() => {
    return () => {
      pagesRendered = [];
    }
  }, [])
  const onZoomIn = () => {
    const { scale } = pagesRendering;
    let newScale = scale + 0.2;
    if (newScale > MAX_SCALE) {
      newScale = MAX_SCALE;
    }
    setPagesRendering({
      ...pagesRendering,
      pages: pdfRenderedContext,
      renderType: RenderType.RERENDER, scale: newScale
    });
  };
  // const handlePdfLoadMore = (event) => {
  //   const offsetHeight = refContainer.current.offsetHeight;
  //   const scrollTop = refContainer.current.scrollTop;
  //   if (scrollTop >= currentScroll) {
  //     console.log("scoll down");
  //     currentScroll = scrollTop
  //   }
  //   if (currentScroll >= preRender + 200) {

  //   }
  //   console.log("offsetHeight", offsetHeight);
  //   // console.log("scrollTop", scrollTop);
  //   console.log("scrollTop", scrollTop);
  //   pageNum++;
  //   console.log("page Num", pageNum)
  //   if (pageNum < pagesRendering.pages.length) {
  //     pageNum++;
  //   }
  // }
  const onZoomOut = () => {
    const { scale } = pagesRendering;
    let newScale = scale - 0.2;
    if (newScale < MIN_SCALE) {
      newScale = MIN_SCALE;
    }
    setPagesRendering({
      ...pagesRendering,
      pages: pdfRenderedContext,
      renderType: RenderType.RERENDER, scale: newScale
    });
  };
  const setDefaultScale = () => {
    const defaultScale = widthContainer <= 1000 ? 0.9 : 1.3;
    setPagesRendering({
      ...pagesRendering,
      scale: defaultScale
    })
  }
  useEffect(() => {
    setDefaultScale();
  }, [widthContainer])
  // const onLoadSuccess = () => {
  // setState(
  //     {
  //       loading: false,
  //     },
  //     () => this.props.onRenderSucess(),
  //   );
  // };
  const { scale, pages, renderType, pdf } = pagesRendering;
  // console.log("state rendering", pagesRendering)
  return (
    <div
      // className={styles.viewer}
      ref={refContainer}
    // onScroll={handlePdfLoadMore}
    >
      <div style={{ position: 'absolute', bottom: 40, right: 40 }}>
        <Button
          icon="zoom-in"
          className={styles.btn}
          onClick={onZoomIn}
          style={{ marginBottom: 20 }}
          size="small"
        />
        <br />
        <Button icon="zoom-out" className={styles.btn} size="small" onClick={onZoomOut} />
      </div>
      <div className={styles.pdf_container}>
        {/* <div style={{ visibility: loading ? 'visible' : 'hidden' }}>
          <PageLoading />
        </div> */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {pages.map((item, i) => {
            var index = i + 1;
            return (
              <PageCanvas
                widthContainer={widthContainer}
                page={item}
                pageSum={pages.length}
                index={i}
                onUpdatePdfContext={onPushPageRendered}
                key={index + ''}
                pageNum={index}
                pdf={pdf}
                scaleProp={scale}
                renderType={renderType}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default PdfRender;
