"use client";
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function Barcode() {
  const [result, setResult] = useState("No result");
  const router = useRouter(); // Access Next.js router

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 400, height: 200 },
      formatsToSupport: [Html5QrcodeSupportedFormats.UPC_A, Html5QrcodeSupportedFormats.UPC_E],
    });

    // Get the return URL from the query parameters
    const returnUrl = new URLSearchParams(window.location.search).get("return_url") || "/"; // Default to root if no return_url

    scanner.render(
      (decodedText) => {
        setResult(decodedText); // Update the result with scanned barcode
        console.log(decodedText);
        scanner.clear(); // Stop scanning after successful scan

        // Redirect to the return URL with the scanned barcode
        router.push(`${returnUrl}?barcode=${encodeURIComponent(decodedText)}`);
      });

    // Cleanup on unmount
    return () => scanner.clear();
  }, [router]);

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <div id="reader"></div>
      <h2>Scanned Data:</h2>
      <p>{result}</p>
    </div>
  );
}
