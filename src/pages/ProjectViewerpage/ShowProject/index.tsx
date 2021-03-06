import React, { useState, useRef, useEffect, useContext } from 'react';
import Toolbar from './Toolbar';
import { Button, Spin, Icon } from 'antd';
import styles from './style.module.less';
import { AppContext } from '../../../contexts/AppContext';
import PdfRender from './PdfRender';
import pdfjsLib from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
// import PdfRenderGridView from './PdfRenderGridView'
export enum PdfViewType {
  gridDisplay = "gridDisplay",
  singleDisplay = "singleDisplay"
}
interface NodeShortened {
  key: string;
  uri: string;
}
interface IProps {
  nodesShortened: NodeShortened[];
}
interface RenderStyles {
  styles: any,
  singleRender: boolean;
}
const initRenderStyles: RenderStyles = {
  styles: {
    visibility: "visible"
  },
  singleRender: true
}
const useDisplayPdfType = () => {
  const [stylesRender, setStyles] = useState(initRenderStyles)
  return {
    stylesRender,
    setStyles
  }
}
const checkWidthContainer = () => {
  const [widthContainer, setWidthContainer] = useState(800);
  return {
    widthContainer, setWidthContainer
  }
}
interface ResolveType {
  pdf: any;
  arrPages: any[]
};
const initPdfState: ResolveType = {
  pdf: null,
  arrPages: []
};
const usePdf = () => {
  const [pdfState, setPdfState] = useState(initPdfState);
  return {
    pdfState, setPdfState
  }
}
const getDocument = (url: string): Promise<ResolveType> => {
  return new Promise((resolve, reject) => {
    pdfjsLib
      .getDocument(url).promise
      .then(async pdf => {
        const arrPages = Array.from(Array(pdf.numPages).keys());
        const res: ResolveType = {
          pdf,
          arrPages
        }
        resolve(res)
      })
      .catch(err => reject(err));
  })

};

const ShowProject: React.FC<IProps> = ({ nodesShortened }) => {
  let refPdfContainer = useRef(null);
  const { widthContainer, setWidthContainer } = checkWidthContainer();
  const { mediaUri, onUpdateContext } = useContext(AppContext);
  const { pdfState, setPdfState } = usePdf();
  useEffect(() => {
    if (refPdfContainer.current) {
      setWidthContainer(refPdfContainer.current.offsetWidth)
    }
  }, [widthContainer]);
  useEffect(() => {
    if (mediaUri) {
      getPdfFromUri();
    }
    return () => {
      onUpdateContext({ mediaUri: null });
      setPdfState({
        pdf: null,
        arrPages: [],
      });

    }

  }, [mediaUri]);


  const getPdfFromUri = async () => {
    if (mediaUri) {
      const pdfResolve = await getDocument(mediaUri);
      setPdfState(pdfResolve)
    }

  }


  const { stylesRender, setStyles } = useDisplayPdfType();

  const onSetDisplayPdfGrid = () => {
    setStyles({
      styles: {
        overflow: "hidden",
        visibility: "hidden"
      },
      singleRender: false
    })
  }

  const onSetDisplayPdfSingle = () => {
    setStyles({
      styles: {
        overflow: "auto",
        visibility: "visible"
      },
      singleRender: true
    })
  }
  // const uriSingleRender = (nodeInfo && nodeInfo.nodeMedia) ? nodeInfo.nodeMedia.uri : null;
  // const renderSingleView = (nodeInfo: any, widthContainer: number) => {

  //   return <div />


  // }
  // const renderListPdf = () => {

  //   return nodesShortened.map((item, index) => {
  //     if (!item.uri) {
  //       return null;
  //     }
  //     return <div></div>
  //     // return <PdfRenderGridView key={index + ''} widthContainer={widthContainer} uri={item.uri} index={index} />
  //   })
  // }
  return (
    <div className={styles.showProject}>
      <div style={{ maxHeight: 140 }}>
        <Toolbar />
      </div>
      <div style={{ position: 'relative' }}>
        <div
          // className={styles.viewer}
          style={{ visibility: stylesRender.singleRender ? "hidden" : "visible" }}>
        </div>

        <div
          style={{
            display: "flex", flexWrap: "wrap", flexDirection: "column",
            height: 665,
            backgroundColor: "#e4e4e4",
            visibility: stylesRender.styles.visibility,
            justifyContent: "center"
          }}>
          {pdfState.pdf && <PdfRender renderStyles={stylesRender} pdf={pdfState.pdf} widthContainer={widthContainer} arrPages={pdfState.arrPages} />}
          {!pdfState.pdf && stylesRender.singleRender && <Spin style={{ alignSelf: "center" }} indicator={<Icon type="loading" style={{ fontSize: 50, color: "#007BD7" }} spin />} />}
        </div>

        <div className={styles.pdfBtnContainer}>
          <Button
            onClick={onSetDisplayPdfGrid}
            type="primary"
            style={{ marginTop: 25, marginLeft: 25, padding: 0, opacity: stylesRender.singleRender ? 1 : 0.5 }}
            size="small"
            className={styles.btn}
          >
            <i className="icon-view-column" style={{ margin: 2 }}></i>
          </Button>
          <br />
          <Button
            onClick={onSetDisplayPdfSingle}
            type="primary"
            style={{ marginTop: 25, marginLeft: 25, padding: 0, opacity: stylesRender.singleRender ? 0.5 : 1 }}
            size="small"
            className={styles.btn}
          >
            <i className="icon-view-line" style={{ margin: 2 }}></i>
          </Button>
        </div>
      </div>
    </div>

  )
}
export default ShowProject;
