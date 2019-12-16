import React from 'react';
import { Button } from 'antd';
import pdfjs from 'pdfjs-dist';
import styles from './style.module.less';
import Page from './Page';
interface IProps {
  url?: string;
  data?: string;
  scale?: string | number;
  showAllPage?: boolean;
  onDocumentComplete?: any;
  getPageNumber?: any;
  pageScroll?: number;
  width?: number;
}
interface IStates {
  pdf: any;
  totalPage: number;
  scale: any;
  url: string;
}
const DEFAUT_SCALE = 1.4;
const MAX_SCALE = 2.4;
const MIN_SCALE = 0.4;
pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.228/pdf.worker.js';
class PdfRender extends React.Component<IProps, IStates> {
  state: IStates = {
    pdf: null,
    totalPage: 0,
    scale: 1.5,
    url: null,
  };
  refContainer = null;
  public constructor(props: IProps) {
    super(props);
  }
  componentWillReceiveProps(nextProps, nexState) {
    if (nextProps.url !== this.state.url) {
      this.getDocument(nextProps.url);
      // window.scrollTo(0, 0);
      this.refContainer.scrollTo(0, 0);
      this.setState({
        scale: DEFAUT_SCALE,
      });
    }
  }
  componentDidMount() {
    this.getDocument(this.props.url);
  }
  getDocument = async url => {
    let obj = {
      url: null,
    };
    obj.url = url;
    // console.log('props url', obj);

    pdfjs
      .getDocument(obj)
      .then(pdf => {
        console.log('pdf', pdf);

        this.setState({
          totalPage: pdf.numPages,
          pdf,
        });
      })
      .catch(err => console.log('errror ', err));
  };

  onZoomIn = () => {
    const { scale } = this.state;
    let newScale = scale + 0.2;
    if (newScale > MAX_SCALE) {
      newScale = MAX_SCALE;
    }
    this.setState({ scale: newScale });
  };
  onZoomOut = () => {
    const { scale } = this.state;
    let newScale = scale - 0.2;
    if (newScale < MIN_SCALE) {
      newScale = MIN_SCALE;
    }
    this.setState({ scale: newScale });
  };
  render() {
    const { totalPage, scale, pdf } = this.state;
    let tempArr = new Array(totalPage);

    tempArr.fill(0);
    return (
      <div
        className={styles.viewer}
        ref={ref => {
          this.refContainer = ref;
        }}
      >
        <div style={{ position: 'absolute', bottom: 40, right: 40 }}>
          <Button
            icon="zoom-in"
            className={styles.btn}
            onClick={this.onZoomIn}
            style={{ marginBottom: 20 }}
            size="small"
          />
          <br />
          <Button icon="zoom-out" className={styles.btn} size="small" onClick={this.onZoomOut} />
        </div>
        <div className={styles.pdf_container}>
          <React.Fragment>
            {tempArr.map((item, i) => {
              var index = i + 1;
              return <Page key={index + ''} pageNum={index} pdf={pdf} scaleProp={scale} />;
            })}
          </React.Fragment>
        </div>
      </div>
    );
  }
}
export default PdfRender;
