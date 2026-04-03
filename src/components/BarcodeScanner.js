import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import '../styles/BarcodeScanner.css';

function BarcodeScanner({ onScan }) {
    useEffect(() => {
        const scanner = new Html5QrcodeScanner('barcode-scanner', {
            fps: 10,
            qrbox: { width: 250, height: 250 },
        });

        scanner.render(
            (decodedText) => {
                onScan(decodedText); // Pass the scanned barcode to the parent component
            },
            (error) => {
                console.error('QR Code Scan Error:', error);
            }
        );

        return () => {
            scanner.clear();
        };
    }, [onScan]);

    return (
        <div className="barcode-scanner-container">
            <h2>Scan Barcode</h2>
            <div id="barcode-scanner"></div>
        </div>
    );
}

export default BarcodeScanner;
