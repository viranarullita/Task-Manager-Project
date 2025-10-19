import { useTasks } from "../context/TaskContext";
import { CheckCircle, Clock, ListTodo } from "lucide-react";

export default function DashboardPage() {
  const { tasks } = useTasks();

  const total = tasks.length;
  const selesai = tasks.filter((t) => t.completed).length;
  const belum = total - selesai;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-800">
        Ringkasan Produktivitas
      </h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-5 bg-white rounded-xl shadow-md border border-slate-100">
          <ListTodo size={28} className="text-teal-500 mb-2" />
          <p className="text-slate-500 text-sm">Total Tugas</p>
          <h2 className="text-2xl font-semibold">{total}</h2>
        </div>
        <div className="p-5 bg-white rounded-xl shadow-md border border-slate-100">
          <CheckCircle size={28} className="text-green-500 mb-2" />
          <p className="text-slate-500 text-sm">Selesai</p>
          <h2 className="text-2xl font-semibold">{selesai}</h2>
        </div>
        <div className="p-5 bg-white rounded-xl shadow-md border border-slate-100">
          <Clock size={28} className="text-amber-500 mb-2" />
          <p className="text-slate-500 text-sm">Belum Selesai</p>
          <h2 className="text-2xl font-semibold">{belum}</h2>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">
          3 Tugas Terbaru
        </h2>
        {tasks.slice(-3).map((t) => (
          <div key={t.id} className="border-b border-slate-100 py-2">
            <p className="font-medium text-slate-800">{t.title}</p>
            <p className="text-slate-500 text-sm">{t.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
