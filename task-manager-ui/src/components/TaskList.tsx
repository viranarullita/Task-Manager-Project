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
    <ul className="space-y-4 md:space-y-5">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`flex flex-col border border-slate-200 rounded-xl p-4 md:p-5 transition-all duration-300 hover:shadow-md ${
            task.completed ? "bg-teal-50" : "bg-white"
          }`}
        >
          {/* Bagian teks tugas */}
          <div className="flex-1 min-w-0 mb-3">
            <h3
              className={`font-semibold text-slate-800 mb-1 break-words ${
                task.completed ? "line-through text-slate-400" : ""
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm md:text-base text-slate-600 break-words whitespace-pre-wrap">
                {task.description}
              </p>
            )}
          </div>

          {/* Tombol-tombol di bawah teks */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto mt-2">
            {!task.completed ? (
              <button
                onClick={() => toggleTask(task.id)}
                className="flex-1 bg-teal-500 hover:bg-teal-600 text-white px-3 md:px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-1 justify-center"
              >
                <Check size={16} /> Selesai
              </button>
            ) : (
              <button
                onClick={() => toggleTask(task.id)}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white px-3 md:px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-1 justify-center"
              >
                <X size={16} /> Batalkan
              </button>
            )}
            <button
              onClick={() => deleteTask(task.id)}
              className="flex-1 bg-rose-500 hover:bg-rose-600 text-white px-3 md:px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-1 justify-center"
            >
              <Trash2 size={16} /> Hapus
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
