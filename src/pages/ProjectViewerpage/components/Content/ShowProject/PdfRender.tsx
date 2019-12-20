import React from 'react';
import { Button, Spin } from 'antd';
import pdfjs from 'pdfjs-dist';
import styles from './style.module.less';
import PageCanvas from './PageCanvas';
interface IProps {
  pages: number[];
  onRenderSucess: () => void;
}
interface IStates {
  pdf: any;
  scale: any;
  url: string;
  pages: number[];
  loading: boolean;
}
const DEFAUT_SCALE = 1.4;
const MAX_SCALE = 2.4;
const MIN_SCALE = 0.4;
pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.228/pdf.worker.js';
class PdfRender extends React.Component<IProps, IStates> {
  state: IStates = {
    pdf: null,
    scale: 1.5,
    url: '/01._hs_d______n.pdf',
    pages: [1],
    loading: false,
  };
  refContainer = null;
  public constructor(props: IProps) {
    super(props);
  }
  componentWillReceiveProps(nextProps, nexState) {
    if (nextProps.pages !== this.state.pages) {
      this.getDocument(this.state.url);
      this.refContainer.scrollTo(0, 0);
      this.setState({
        scale: DEFAUT_SCALE,
      });
    }
  }
  componentDidMount() {
    this.getDocument(this.state.url);
  }
  getDocument = async url => {
    let obj = {
      url: null,
    };
    obj.url = url;
    this.setState({
      loading: true,
    });
    await pdfjs
      .getDocument(obj)
      .then(pdf => {
        console.log('pdf', pdf);
        this.setState({
          pages: this.props.pages,
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
  onLoadSuccess = () => {
    this.setState(
      {
        loading: false,
      },
      () => this.props.onRenderSucess(),
    );
  };
  render() {
    const { pages, scale, pdf, loading } = this.state;
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
          <Spin
            className={styles.spin}
            size="large"
            style={{
              visibility: loading ? 'visible' : 'hidden',
              marginTop: loading ? 200 : 0,
              marginLeft: 500,
              position: 'absolute',
            }}
          />
          <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
            {pages.map((item, i) => {
              var index = i + 1;
              return (
                <PageCanvas
                  pageSum={pages.length}
                  index={i}
                  onLoadSuccess={this.onLoadSuccess}
                  key={index + ''}
                  pageNum={item}
                  pdf={pdf}
                  scaleProp={scale}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default PdfRender;
