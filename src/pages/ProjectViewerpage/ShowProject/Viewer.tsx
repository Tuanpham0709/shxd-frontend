import React from 'react';
import { PDFJS as PDFJSViewer } from 'pdfjs-dist/web/pdf_viewer.js';
import ReactDOM from 'react-dom'
import 'pdfjs-dist/web/pdf_viewer.css';
import './style.module.less';
interface IProps {
    doc: any
}
interface IState {
    doc: any
}
export default class Viewer extends React.Component<IProps, IState> {
    _evenBus: any;
    _pdfViewer: any;
    constructor(props) {
        super(props);
        this.initEventBus();
        this._evenBus = null;
        this.state = {
            doc: this.props.doc
        }
    }
    initEventBus = () => {
        let eventBus = new PDFJSViewer.EventBus();
        eventBus.on('pagesinit', (e) => {
            console.log("errer", e);
        });
        this._evenBus = eventBus;
    }
    componentDidMount() {
        let viewerContainer = ReactDOM.findDOMNode(this);
        this._pdfViewer = new PDFJSViewer.PDFViewer({
            container: viewerContainer,
            eventBus: this._evenBus,
        });
        this._pdfViewer.setDocument(this.props.doc);
        console.log("propsi", this.props.doc);

        this._pdfViewer.currentScale = 2;
        console.log("this pdf", this._pdfViewer);
    }
    render() {
        return (
            <div className="Viewer">
                <div className="pdfViewer" style={{ width: "100%", height: "100%" }}></div>
            </div>
        )
    }
}