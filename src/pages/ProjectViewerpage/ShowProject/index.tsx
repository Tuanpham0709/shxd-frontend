import React, { useContext, useState, useRef, useEffect } from 'react';
import Toolbar from './Toolbar';
import { Button } from 'antd';
import styles from './style.module.less';
import { AppContext } from '../../../contexts/AppContext';
import PdfRender from './PdfRender';
import RenderPdfGridView from './RenderPdfGridView'
export enum PdfViewType {
  gridDisplay = "gridDisplay",
  singleDisplay = "singleDisplay"
}
interface IProps {
  uriList: string[];
}
const useDisplayPdfType = () => {
  const [displayPdfType, setDisplayPdfType] = useState(PdfViewType.gridDisplay);
  return {
    displayPdfType, setDisplayPdfType
  }
}
const checkWidthContainer = () => {
  const [widthContainer, setWidthContainer] = useState(800);
  return {
    widthContainer, setWidthContainer
  }
}
const ShowProject: React.FC<IProps> = ({ uriList }) => {
  let refPdfContainer = useRef(null);
  const { widthContainer, setWidthContainer } = checkWidthContainer();
  const { nodeInfo } = useContext(AppContext)
  useEffect(() => {
    if (refPdfContainer.current) {
      setWidthContainer(refPdfContainer.current.offsetWidth)
    }
  }, [widthContainer])
  const { displayPdfType, setDisplayPdfType } = useDisplayPdfType();
  const onSetDisplayPdfGrid = () => {
    setDisplayPdfType(PdfViewType.gridDisplay);
  }
  const onSetDisplayPdfSingle = () => {
    setDisplayPdfType(PdfViewType.singleDisplay);
  }
  console.log("node info show project", widthContainer);
  const renderListPdf = () => {

    return uriList.map((uri, index) => {
      return <RenderPdfGridView widthContainer={widthContainer} uri={uri} index={index}></RenderPdfGridView>
    })
  }
  const renderSingleView = () => (<PdfRender widthContainer={widthContainer} uri={nodeInfo && nodeInfo.nodeMedia.uri} />)
  return (
    <div className={styles.showProject}>
      <Toolbar />
      <div>
        <div style={{ position: 'relative' }}>
          <div>
            {displayPdfType === PdfViewType.gridDisplay ? <div ref={refPdfContainer} className={styles.viewer}
              style={{
                display: "flex", flexWrap: "wrap", flexDirection: "row",
                overflow: "scroll", backgroundColor: "#e4e4e4", paddingLeft: 40, paddingRight: 30
              }}> {renderListPdf()}</div> : renderSingleView()}
          </div>
          <div className={styles.pdfBtnContainer}>
            <Button
              onClick={onSetDisplayPdfGrid}
              type="primary"
              style={{ marginTop: 25, marginLeft: 25, padding: 0, opacity: displayPdfType === PdfViewType.singleDisplay ? 1 : 0.5 }}
              size="small"
              className={styles.btn}
            >
              <i className="icon-view-column" style={{ margin: 2 }}></i>
            </Button>
            <br />
            <Button
              onClick={onSetDisplayPdfSingle}
              type="primary"
              style={{ marginTop: 15, marginLeft: 25, padding: 0, opacity: displayPdfType === PdfViewType.singleDisplay ? 0.5 : 1 }}
              size="small"
              className={styles.btn}
            >
              <i className="icon-view-line" style={{ margin: 2 }}></i>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ShowProject;
