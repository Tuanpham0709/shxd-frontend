import React, { useRef, useEffect, useContext } from 'react';
import { Button } from 'antd';
import pdfjsLib from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import styles from './style.module.less';
import { AppContext } from '../../../contexts/AppContext';
import _ from 'lodash'; _
// import { AppContext } from '../../../contexts/AppContext'
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
export enum RenderType {
    FIRST_RENDER = "FIRST_RENDER",
    RERENDER = "RERENDER"
}

export enum PdfViewType {
    gridDisplay = "gridDisplay",
    singleDisplay = "singleDisplay"
}

interface IProps {
    widthContainer: number;
    pdf: any;
    arrPages: any[];
    renderStyles: any;
}

var totalPages: number;
var refsCanvas: any[] = [];
var currentScale: number = 1.3;
const maxScale = 2.4;
const minScale = 0.4
var contexts: any[] = [];
let pagesPending: { canvasRef: any, scale: number }[] = []
var visiblePages: { canvasRef: any, page: any, scale: number }[] = [];
var pageOnce: any = null;
const renderPageCanvas = async (page: any, canvasRef): Promise<any> => {

    return new Promise((resolve, reject) => {
        if (!canvasRef || !page) {
            return;
        }
        var viewport = page.getViewport({ scale: currentScale, });
        console.log("scale ", currentScale);
        if (!pageOnce) {
            pageOnce = page;
        }
        const canvas = canvasRef;
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        if (contexts.length <= totalPages) {
            contexts.push(context);
        }
        const renderContext = {
            canvasContext: context,
            viewport: viewport,
        };
        const renderTask = page.render(renderContext);
        renderTask.promise.then(async (value) => {
            resolve()
        }).catch((err) => console.log("eror", err)
        )
    })
    // console.log(" <><><><><><>");

}
const PdfRender: React.FC<IProps> = ({ widthContainer, pdf, arrPages, renderStyles }) => {
    const { mediaUri } = useContext(AppContext)
    totalPages = arrPages.length;
    // const { onUpdateContext } = useContext(AppContext)
    let refContainer = useRef(null);
    const onPushRef = (ref) => {
        if (refsCanvas.length <= totalPages - 1 && ref) {
            refsCanvas.push(ref);
        }
    }


    const onZoomIn = () => {
        let newScale = currentScale;
        newScale = newScale + 0.2;
        if (newScale > maxScale) {
            return;
        }
        currentScale = newScale;
        const viewport = pageOnce.getViewport({ scale: newScale });
        refsCanvas.forEach((ref) => {
            ref.width = viewport.width;
            ref.height = viewport.height;
        })
        onHandleLoadVisiblePage();
    };
    const onZoomOut = () => {
        let newScale = currentScale;
        newScale = newScale - 0.2;
        // const scale = Math.round(newScale + 100) / 100;
        if (newScale < minScale) {
            return
        }
        currentScale = newScale;
        const viewport = pageOnce.getViewport({ scale: newScale });
        refsCanvas.forEach((ref) => {
            ref.width = viewport.width;
            ref.height = viewport.height;
        })
        onHandleLoadVisiblePage();
    }
    // const getPageFromPdf = async (pdf: any, pageNum: number) => {

    // }    
    useEffect(() => {
        onHandleLoadVisiblePage();
        return () => {

            totalPages = 0;

            refsCanvas = [];

            visiblePages = [];
            // currentPosition = LIMIT_PAGES;
            currentScale = 1.3
            // currentScroll = 0;
            contexts.map((context, index) => {
                if (refsCanvas[index]) {
                    context.clearRect(0, 0, refsCanvas[index].width, refsCanvas[index].height);
                }
            })
        }
    }, [mediaUri]);
    const getPagesFromPdf = async (pdf: any, index: number): Promise<any> => {
        // if (index >= totalPages - 1) return;
        return new Promise((resolve, reject) => {
            if (index <= totalPages) {

                pdf.getPage(index).then((page) => {
                    resolve(page);
                }).catch((err) => {
                    reject(err)
                })
            }
        })

    }
    // const onRenderPage = (pdf: any, tempArray: any[]) => {

    //     let pagesLoadedCount = pagesRendering.length;
    //     tempArray.forEach(async (item, i) => {
    //         const index = i + 1
    //         if (index <= LIMIT_PAGES) {
    //             const page = await getPagesFromPdf(pdf, index + currentPages);
    //             pagesRendering.push(page);
    //             if (pagesRendering.length === pagesLoadedCount + LIMIT_PAGES) {
    //                 currentPages = currentPages + LIMIT_PAGES;
    //                 renderPageCanvas(pagesRendering[currentIndex], refsCanvas[currentIndex])
    //                 preIndex = preIndex + LIMIT_PAGES;
    //                 console.log("sameCanvas ", refsCanvas[currentIndex]);
    //             }
    //         }
    //     });


    // }

    const onHandleLoadVisiblePage = async () => {
        // let pagesToLoad: { canvasRef: any, page: any }[] = []
        refsCanvas.forEach(async (ref, i) => {
            // ref.scale(currentScale, currentScale);
            const container = document.getElementById("container")
            let distance = ref.getBoundingClientRect();
            let pageTop = container.scrollTop;
            let pageBottom = pageTop + container.offsetHeight;
            let elementTop = ref.offsetTop;
            let elementBottom = elementTop + distance.height;

            if (((elementTop <= pageBottom) && (elementBottom >= pageTop))) {
                const index = i + 1;
                // const indexExits = visiblePages.findIndex((item) => (ref.id === item.canvasRef.id));
                if (i >= totalPages) {
                    return;
                }
                const indexPending = pagesPending.findIndex((item) => item.canvasRef.id === refsCanvas[i].id);
                if (indexPending !== -1) {
                    return;
                }
                pagesPending.push({ canvasRef: refsCanvas[i], scale: currentScale });

                await onRenderPage(pdf, refsCanvas[i], index);
            }
        });
    }
    const onRenderPage = (pdf: any, ref: any, indexPage: number): Promise<any> => {
        return new Promise((resolve, reject) => {
            getPagesFromPdf(pdf, indexPage).then(async (page) => {
                renderPageCanvas(page, ref).then(() => {

                    const indexLoaded = pagesPending.findIndex((item) => item.canvasRef.id === ref.id)
                    if (indexLoaded !== -1) {
                        pagesPending.splice(indexLoaded, 1);
                    }
                    visiblePages.push({
                        page,
                        canvasRef: ref,
                        scale: currentScale
                    })
                    resolve();
                })
            })
        })

    }

    return (
        <div
            id="container"
            className={styles.viewer}
            ref={refContainer}
            onScroll={_.debounce(onHandleLoadVisiblePage, 50)}
            style={{ visibility: renderStyles.visibility }}
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
                <Button onClick={onZoomOut} icon="zoom-out" className={styles.btn} size="small" />
            </div>
            <div className={styles.pdf_container} id="parent-canvas" >
                {arrPages.map((item, i) => {
                    var index = i;
                    return (
                        <canvas
                            height={1094}
                            width={773}
                            className={styles.canvas} id={`pdf-${index}`} key={index + ''} ref={(ref) => {
                                onPushRef(ref)
                            }} style={{ margin: "auto", marginTop: 20, borderRadius: 10, backgroundColor: "#fff", }} />
                    );
                })}
            </div>
        </div>
    );
}
export default PdfRender;
