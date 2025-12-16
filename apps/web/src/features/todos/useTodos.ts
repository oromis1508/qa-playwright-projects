import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  redirectIfProjectMissing,
  getApiErrorMessage,
} from "../../shared/api/error";
import { getProject } from "../../shared/api/projects";
import {
  createTodo,
  deleteTodo,
  getTodos,
  toggleTodo,
  updateTodo,
  type Todo,
} from "../../shared/api/todos";
import type { TodoFilter } from "../../components/todos/TodosFilter";

export function useTodos(projectIdParam: string | undefined) {
  const navigate = useNavigate();
  const projectId = useMemo(() => Number(projectIdParam), [projectIdParam]);

  const [projectName, setProjectName] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>("all");
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((t) => !t.completed);
      case "completed":
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  // create
  const [newTodo, setNewTodo] = useState("");
  const [savingNew, setSavingNew] = useState(false);

  // general
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // toggle
  const [togglingId, setTogglingId] = useState<number | null>(null);

  // edit
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  // delete
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    if (!Number.isFinite(projectId) || projectId <= 0) {
      navigate("/", { replace: true });
      return;
    }

    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const project = await getProject(projectId);
        const list = await getTodos(projectId);

        if (cancelled) return;
        setProjectName(project.name);
        setTodos(list);
      } catch (e: unknown) {
        if (redirectIfProjectMissing(e, navigate)) return;
        if (!cancelled) setError(getApiErrorMessage(e, "Failed to load todos"));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [projectId, navigate]);

  async function addTodo() {
    const title = newTodo.trim();
    if (!title || savingNew) return;

    setSavingNew(true);
    setError(null);

    try {
      const created = await createTodo(projectId, title);
      setTodos((prev) => [...prev, created]);
      setNewTodo("");
    } catch (e: unknown) {
      setError(getApiErrorMessage(e, "Failed to create todo"));
    } finally {
      setSavingNew(false);
    }
  }

  async function toggle(todo: Todo) {
    const next = !todo.completed;

    setTogglingId(todo.id);
    setTodos((prev) =>
      prev.map((t) => (t.id === todo.id ? { ...t, completed: next } : t))
    );

    try {
      const updated = await toggleTodo(projectId, todo.id, next);
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
    } catch (e: unknown) {
      setTodos((prev) =>
        prev.map((t) =>
          t.id === todo.id ? { ...t, completed: todo.completed } : t
        )
      );
      setError(getApiErrorMessage(e, "Failed to update todo"));
    } finally {
      setTogglingId(null);
    }
  }

  function startEdit(todo: Todo) {
    setError(null);
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingTitle("");
  }

  async function saveEdit() {
    if (editingId === null) return;
    const title = editingTitle.trim();
    if (!title) return;

    setSavingEdit(true);
    setError(null);

    try {
      const updated = await updateTodo(projectId, editingId, { title });
      setTodos((prev) => prev.map((t) => (t.id === editingId ? updated : t)));
      cancelEdit();
    } catch (e: unknown) {
      setError(getApiErrorMessage(e, "Failed to rename todo"));
    } finally {
      setSavingEdit(false);
    }
  }

  async function remove(todo: Todo) {
    const ok = window.confirm(`Delete todo "${todo.title}"?`);
    if (!ok) return;

    setDeletingId(todo.id);
    setError(null);

    try {
      await deleteTodo(projectId, todo.id);
      setTodos((prev) => prev.filter((t) => t.id !== todo.id));
      if (editingId === todo.id) cancelEdit();
    } catch (e: unknown) {
      setError(getApiErrorMessage(e, "Failed to delete todo"));
    } finally {
      setDeletingId(null);
    }
  }

  return {
    projectId,
    projectName,

    todos: filteredTodos,
    loading,
    error,

    // filter
    filter,
    setFilter,

    // create
    newTodo,
    setNewTodo,
    savingNew,
    addTodo,

    // toggle
    togglingId,
    toggle,

    // edit
    editingId,
    editingTitle,
    setEditingTitle,
    savingEdit,
    startEdit,
    cancelEdit,
    saveEdit,

    // delete
    deletingId,
    remove,
  };
}
