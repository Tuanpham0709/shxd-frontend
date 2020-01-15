import React from 'react';
import Toolbar from './Toolbar';
import { Button } from 'antd';
import styles from './style.module.less';
import PdfRender from './PdfRender';
import { AppContext } from '../../../contexts/AppContext';
const ShowProject = () => {
  return (
    <AppContext.Consumer>
      {({ pages, onUpdateContext }) => (
        <div className={styles.showProject}>
          <Toolbar />
          <div>
            <div style={{ position: 'relative' }}>
              <div>
                {/* <PDFReader showAllPage={true} width={500} url="compressed.tracemonkey-pldi-09.pdf"></PDFReader> */}
                <PdfRender
                  onRenderSucess={() => {
                    onUpdateContext({ loading: false });
                  }}
                  pages={pages}
                ></PdfRender>
              </div>
              <div className={styles.pdfBtnContainer}>
                <Button
                  type="primary"
                  style={{ marginTop: 25, marginLeft: 25, padding: 0 }}
                  size="small"
                  className={styles.btn}
                >
                  <i className="icon-view-column" style={{ margin: 2 }}></i>
                </Button>
                <br />
                <Button
                  type="primary"
                  style={{ marginTop: 15, marginLeft: 25, padding: 0 }}
                  size="small"
                  className={styles.btn}
                >
                  <i className="icon-view-line" style={{ margin: 2 }}></i>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppContext.Consumer>
  );
}
export default ShowProject;
