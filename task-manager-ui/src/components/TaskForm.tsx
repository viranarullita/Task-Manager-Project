import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { Save, CheckCircle2, XCircle, Calendar, User } from "lucide-react";

export default function TaskForm() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pca, setPca] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" | "" }>({
    text: "",
    type: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setMessage({ text: "Judul tugas wajib diisi!", type: "error" });
      return;
    }
    if (!startDate.trim()) {
      setMessage({ text: "Tanggal mulai wajib diisi!", type: "error" });
      return;
    }
    if (!endDate.trim()) {
      setMessage({ text: "Tanggal selesai wajib diisi!", type: "error" });
      return;
    }
    if (!pca.trim()) {
      setMessage({ text: "Nama PCA wajib diisi!", type: "error" });
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      setMessage({ text: "Tanggal selesai tidak boleh sebelum tanggal mulai!", type: "error" });
      return;
    }

    try {
      await addTask(title, description, startDate, endDate, pca);
      setMessage({ text: "Tugas berhasil disimpan!", type: "success" });
      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setPca("");
      setTimeout(() => setMessage({ text: "", type: "" }), 2000);
    } catch {
      setMessage({ text: "Gagal menyimpan tugas.", type: "error" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 bg-gradient-to-b from-white to-slate-50 rounded-xl p-4 sm:p-6 md:p-8 transition-all duration-300"
    >
      {message.text && (
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
            message.type === "error"
              ? "bg-rose-100 text-rose-700 border border-rose-300"
              : "bg-emerald-100 text-emerald-700 border border-emerald-300"
          }`}
        >
          {message.type === "error" ? <XCircle size={18} /> : <CheckCircle2 size={18} />}
          {message.text}
        </div>
      )}

      <div>
        <label className="block font-medium mb-2 text-slate-700 text-sm md:text-base">
          Judul Tugas <span className="text-rose-500">*</span>
        </label>
        <input
          className="w-full border border-slate-300 bg-white p-2.5 md:p-3 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none transition-all duration-200 hover:shadow-sm placeholder:text-slate-400"
          placeholder="Masukkan nama tugas..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium mb-2 text-slate-700 text-sm md:text-base">
          Deskripsi
        </label>
        <textarea
          className="w-full border border-slate-300 p-2.5 md:p-3 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none transition-all duration-200 hover:shadow-sm placeholder:text-slate-400 resize-y min-h-[100px] max-h-[250px]"
          placeholder="Deskripsi (opsional)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-2 text-slate-700 text-sm md:text-base">
            Tanggal Mulai <span className="text-rose-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <input
              type="date"
              className="w-full border border-slate-300 p-2.5 md:p-3 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none transition-all duration-200"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2 text-slate-700 text-sm md:text-base">
            Tanggal Selesai <span className="text-rose-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <input
              type="date"
              className="w-full border border-slate-300 p-2.5 md:p-3 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none transition-all duration-200"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block font-medium mb-2 text-slate-700 text-sm md:text-base">
          PCA <span className="text-rose-500">*</span>
        </label>
        <div className="flex items-center gap-2">
          <User size={16} />
          <input
            type="text"
            className="w-full border border-slate-300 p-2.5 md:p-3 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none transition-all duration-200 hover:shadow-sm placeholder:text-slate-400"
            placeholder="Masukkan nama PCA..."
            value={pca}
            onChange={(e) => setPca(e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-5 md:px-6 py-2.5 rounded-lg font-semibold shadow-sm hover:shadow-md transition-all duration-300 w-full sm:w-auto"
      >
        <Save size={18} />
        Simpan Tugas
      </button>
    </form>
  );
}
