import html2pdf from "html2pdf.js";

export async function DownloadPDF() {
  const contentRef = document.getElementById("pdf-content");
  if (contentRef) {
    const content = contentRef;
    const options = {
      filename: "styled-document.pdf",
      margin: 10,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "legal", orientation: "portrait" },
    };

    html2pdf().set(options).from(content).save();
  } else {
    console.log("No content found");
  }
}

export async function ViewPDF() {
  const contentRef = document.getElementById("pdf-content");
  if (contentRef) {
    const content = contentRef;
    const options = {
      filename: "styled-document.pdf",
      margin: 10,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "legal", orientation: "portrait" },
    };

    const pdfBlob = await html2pdf()
      .set(options)
      .from(content)
      .toPdf()
      .output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
  } else {
    console.log("No content found");
  }
}
