import React from "react";
import type { Task } from "../context/TaskContext";
import { useTasks } from "../context/TaskContext";
import { CheckCircle, Clock, ListTodo, Calendar, Timer } from "lucide-react";

export default function DashboardPage(): React.ReactElement {
  const { tasks } = useTasks();

  const total = tasks.length;
  const selesai = tasks.filter((t) => t.completed).length;
  const belum = total - selesai;

  const getTimeLeft = (task: Task | undefined) => {
    if (!task) return null;
    if (task.completed || !task.end_date) return null;

    const today = new Date();
    const end = new Date(task.end_date);

    today.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const diffMs = end.getTime() - today.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { text: `Lewat ${Math.abs(diffDays)} hari dari tenggat`, color: "text-red-600" };
    if (diffDays === 0) return { text: "Batas waktu hari ini", color: "text-amber-600" };
    if (diffDays === 1) return { text: "Tersisa 1 hari lagi", color: "text-emerald-600" };
    return { text: `Tersisa ${diffDays} hari lagi`, color: "text-emerald-600" };
  };

  const getDurationDays = (start_date?: string, end_date?: string): number | null => {
    if (!start_date || !end_date) return null;
    const start = new Date(start_date);
    const end = new Date(end_date);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    const diffMs = end.getTime() - start.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return Math.max(Math.round(diffDays + 1), 1);
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Ringkasan Produktivitas</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[
          { icon: <ListTodo size={28} className="text-teal-500 mb-2" />, label: "Total Tugas", value: total },
          { icon: <CheckCircle size={28} className="text-green-500 mb-2" />, label: "Selesai", value: selesai },
          { icon: <Clock size={28} className="text-amber-500 mb-2" />, label: "Belum Selesai", value: belum },
        ].map((card, i) => (
          <div key={i} className="p-5 bg-white rounded-xl shadow-md border border-slate-100 text-center sm:text-left">
            {card.icon}
            <p className="text-slate-500 text-sm">{card.label}</p>
            <h2 className="text-2xl font-semibold">{card.value}</h2>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6">
        <h2 className="text-xl font-semibold text-slate-700 mb-4">3 Tugas Terbaru</h2>

        {tasks.length === 0 ? (
          <p className="text-slate-500 italic">Belum ada tugas yang dibuat.</p>
        ) : (
          tasks.slice(-3).map((t: Task) => {
            const duration = getDurationDays(t.start_date, t.end_date);
            const timeLeft = getTimeLeft(t);

            return (
              <div
                key={t.id}
                className={`p-4 mb-3 rounded-lg transition border ${
                  t.completed
                    ? "bg-green-50 border-green-100"
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200"
                }`}
              >
                <p
                  className={`font-semibold text-lg ${
                    t.completed ? "text-slate-500 line-through" : "text-slate-800"
                  }`}
                >
                  {t.title}
                </p>

                {t.start_date && t.end_date && duration !== null && (
                  <div className="flex items-center gap-2 mt-1 text-sm text-sky-600">
                    <Timer size={15} />
                    <span>Durasi pengerjaan:</span>
                    <span className="font-medium text-slate-700">{duration} hari</span>
                  </div>
                )}

                {!t.completed && t.end_date && timeLeft && (
                  <div className={`flex items-start sm:items-center gap-2 mt-1.5 text-sm ${timeLeft.color}`}>
                    <Calendar size={15} className="mt-[2px]" />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1">
                      <span className="font-medium text-slate-700">Deadline:</span>
                      <span>{formatDate(t.end_date)}</span>
                      <span className="text-xs sm:text-sm opacity-90">({timeLeft.text})</span>
                    </div>
                  </div>
                )}

                {t.completed && t.end_date && (
                  <div className="flex items-start sm:items-center gap-2 mt-1.5 text-sm text-emerald-600">
                    <Calendar size={15} className="mt-[2px]" />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1">
                      <span className="font-medium text-slate-700">Selesai pada:</span>
                      <span>{formatDate(t.end_date)}</span>
                    </div>
                  </div>
                )}

                {t.description && (
                  <p className="text-slate-500 text-sm mt-2 line-clamp-2">{t.description}</p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
