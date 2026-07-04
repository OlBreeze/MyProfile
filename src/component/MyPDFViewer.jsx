import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css' ;
import pdfFile from '../pdf_files/CV_OLGA_GOLOVASH_FULL_STACK.pdf';

// Plugins
import { defaultLayoutPlugin }  from '@react-pdf-viewer/default-layout';

const MyPDFViewer = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <div style={{ flex: '1', overflow: 'hidden', marginBottom: '10px'}}>
            {/* Версия worker должна совпадать с версией pdfjs-dist в package.json */}
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
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
