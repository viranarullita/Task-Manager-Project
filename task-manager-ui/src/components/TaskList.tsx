import { useTasks } from "../context/TaskContext";
import { Check, Trash2, X } from "lucide-react";

export default function TaskList() {
  const { tasks, toggleTask, deleteTask } = useTasks();

  if (tasks.length === 0)
    return (
      <p className="text-slate-500 italic text-center py-8">
        Belum ada tugas. Tambahkan tugas baru di atas.
      </p>
    );

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-slate-200 rounded-xl p-4 transition-all duration-300 hover:shadow-md ${
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
            {task.description && (
              <p className="text-sm text-slate-600 break-words whitespace-pre-wrap">
                {task.description}
              </p>
            )}
          </div>

          <div className="flex gap-2 shrink-0">
            {!task.completed ? (
              <button
                onClick={() => toggleTask(task.id)}
                className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-1"
              >
                <Check size={16} /> Selesai
              </button>
            ) : (
              <button
                onClick={() => toggleTask(task.id)}
                className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-1"
              >
                <X size={16} /> Batalkan
              </button>
            )}
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-1"
            >
              <Trash2 size={16} /> Hapus
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
