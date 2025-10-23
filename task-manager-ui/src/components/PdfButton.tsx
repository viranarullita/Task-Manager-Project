import { jsPDF } from "jspdf";
import { useTasks } from "../context/TaskContext";
import { Download } from "lucide-react";

export default function PdfButton() {
  const { tasks } = useTasks();

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Task Manager Report", 10, 10);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 10, 20);

    let y = 40;
    tasks.forEach((t, i) => {
      doc.text(`${i + 1}. ${t.title} (${t.completed ? "Selesai" : "Belum"})`, 10, y);

      if (t.start_date) {
        doc.text(`   Start: ${t.start_date}`, 10, y + 10);
        y += 10;
      }
      if (t.end_date) {
        doc.text(`   End: ${t.end_date}`, 10, y + 10);
        y += 10;
      }
      if (t.pca) {
        doc.text(`   PCA: ${t.pca}`, 10, y + 10);
        y += 10;
      }
      if (t.description) {
        doc.text(`   - ${t.description}`, 10, y + 10);
        y += 20;
      } else {
        y += 10;
      }
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("task_report.pdf");
  };

  return (
    <button
      onClick={generatePDF}
      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-lg font-medium shadow-sm transition-transform duration-300 hover:scale-105"
    >
      <Download size={18} />
      Download Report
    </button>
  );
}
