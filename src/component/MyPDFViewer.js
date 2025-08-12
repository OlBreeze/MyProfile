import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css' ;
import pdfFile from '../pdf_files/CV_OLGA_GOLOVASH_FULL_STACK.pdf';

// Plugins
import { defaultLayoutPlugin }  from '@react-pdf-viewer/default-layout';

const MyPDFViewer = (props) => {
    // const pdfFile = './CV_OLGA_GOLOVASH_FULL_STACK.pdf'; // if doc is in the public
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <div style={{ flex: '1', overflow: 'hidden', marginBottom: '10px'}}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                {/*<Viewer fileUrl={pdfFile} />*/}
                <Viewer  fileUrl={pdfFile}
                    plugins={[
                        defaultLayoutPluginInstance
                    ]}
                />
            </Worker>
        </div>
    );
};

export default MyPDFViewer;
