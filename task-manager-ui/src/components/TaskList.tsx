import { useTasks } from "../context/TaskContext";
import { Check, Trash2, X, Calendar, User, Timer } from "lucide-react";

export default function TaskList() {
  const { tasks, toggleTask, deleteTask } = useTasks();

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getTimeLeft = (end_date?: string, completed?: boolean) => {
    if (!end_date) return null;
    if (completed) return { text: "Sudah selesai", color: "text-slate-500" };

    const today = new Date();
    const end = new Date(end_date);

    today.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const diffMs = end.getTime() - today.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 0)
      return { text: `Terlambat ${Math.abs(diffDays)} hari`, color: "text-red-600" };
    if (diffDays === 0)
      return { text: "Hari ini tenggat", color: "text-amber-600" };
    if (diffDays === 1)
      return { text: "1 hari tersisa", color: "text-emerald-600" };
    return { text: `${diffDays} hari tersisa`, color: "text-emerald-600" };
  };

  if (tasks.length === 0)
    return (
      <p className="text-slate-500 italic text-center py-8">
        Belum ada tugas. Tambahkan tugas baru di atas.
      </p>
    );

  return (
    <ul className="space-y-4 md:space-y-5">
      {tasks.map((task) => {
        const timeLeft = getTimeLeft(task.end_date, task.completed);

        return (
          <li
            key={task.id}
            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border border-slate-200 rounded-xl p-4 md:p-5 transition-all duration-300 hover:shadow-md ${
              task.completed ? "bg-teal-50" : "bg-white"
            }`}
          >
            <div className="flex-1 min-w-0">
              <h3
                className={`font-semibold text-slate-800 mb-1 break-words ${
                  task.completed ? "line-through text-slate-400" : ""
                }`}
              >
                {task.title}
              </h3>

              {task.pca && (
                <p className="text-sm md:text-base text-slate-600 flex items-center gap-1">
                  <User size={16} /> {task.pca}
                </p>
              )}

              {task.start_date && task.end_date && (
                <p className="text-sm md:text-base text-slate-500 flex items-center gap-1">
                  <Calendar size={16} /> {formatDate(task.start_date)} – {formatDate(task.end_date)}
                </p>
              )}

              {task.end_date && timeLeft && (
                <p className={`text-sm flex items-center gap-1 mt-1 ${timeLeft.color}`}>
                  <Timer size={15} /> {timeLeft.text}
                </p>
              )}

              {task.description && (
                <p className="text-sm md:text-base text-slate-600 break-words whitespace-pre-wrap mt-1">
                  {task.description}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto mt-2 sm:mt-0">
              {!task.completed ? (
                <button
                  onClick={() => toggleTask(task.id)}
                  className="flex-1 sm:flex-none bg-teal-500 hover:bg-teal-600 text-white px-3 md:px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-1 justify-center"
                >
                  <Check size={16} /> Selesai
                </button>
              ) : (
                <button
                  onClick={() => toggleTask(task.id)}
                  className="flex-1 sm:flex-none bg-amber-500 hover:bg-amber-600 text-white px-3 md:px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-1 justify-center"
                >
                  <X size={16} /> Batalkan
                </button>
              )}
              <button
                onClick={() => deleteTask(task.id)}
                className="flex-1 sm:flex-none bg-rose-500 hover:bg-rose-600 text-white px-3 md:px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-1 justify-center"
              >
                <Trash2 size={16} /> Hapus
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
