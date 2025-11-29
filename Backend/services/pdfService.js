const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");


function generateFishPDF(data) {
  return new Promise((resolve, reject) => {
    const fileName = `fish_report_${Date.now()}.pdf`;
    const filePath = path.join("static/reports", fileName);

    fs.mkdirSync("static/reports", { recursive: true });

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    doc.fontSize(22).text("Fish Identification Report", { underline: true });
    doc.moveDown();

    doc.fontSize(16).text(`Common Name: ${data.commonName}`);
    doc.text(`Scientific Name: ${data.species}`);
    doc.text(`Family: ${data.family}`);
    doc.text(`Confidence: ${data.confidence}%`);
    doc.moveDown();

    doc.fontSize(18).text("Measurements");
    doc.fontSize(14).text(`Length: ${data.measurements.estimatedLength}`);
    doc.text(`Weight: ${data.measurements.estimatedWeight}`);
    doc.text(`Body Depth: ${data.measurements.bodyDepth}`);
    doc.moveDown();

    doc.fontSize(18).text("Habitat");
    doc.fontSize(14).text(data.habitat);
    doc.moveDown();

    doc.fontSize(18).text("Characteristics");
    data.characteristics.forEach((c) => {
      doc.fontSize(14).text(`• ${c}`);
    });
    doc.moveDown();

    doc.fontSize(18).text("Distribution");
    doc.fontSize(14).text(data.distribution);
    doc.moveDown();

    doc.fontSize(18).text("Conservation Status");
    doc.fontSize(14).text(data.conservationStatus);
    doc.moveDown();

    doc.fontSize(18).text("Commercial Value");
    doc.fontSize(14).text(data.commercialValue);
    doc.moveDown();

    doc.fontSize(18).text("Similar Species");
    data.similarSpecies.forEach((s) => {
      doc.fontSize(14).text(`• ${s.name} (${s.confidence}%)`);
    });

    doc.end();

    stream.on("finish", () => resolve(`/static/reports/${fileName}`));
    stream.on("error", reject);
  });
}

module.exports={generateFishPDF};