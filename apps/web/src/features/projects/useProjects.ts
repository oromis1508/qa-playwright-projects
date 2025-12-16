import { useEffect, useMemo, useState } from "react";
import { getApiErrorMessage } from "../../shared/api/error";
import {
  type Project,
  getProjects,
  createProject as apiCreateProject,
  renameProject as apiRenameProject,
  deleteProject as apiDeleteProject,
} from "../../shared/api/projects";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  // create
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);

  const canCreate = useMemo(
    () => name.trim().length > 0 && !creating,
    [name, creating]
  );

  // general
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // edit
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  // delete
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function refresh() {
    setError(null);
    setLoading(true);

    try {
      const data = await getProjects();
      setProjects(data);
    } catch (e: unknown) {
      setError(getApiErrorMessage(e, "Failed to load projects"));
    } finally {
      setLoading(false);
    }
  }

  async function create() {
    if (!canCreate) return;

    setCreating(true);
    setError(null);

    try {
      const created = await apiCreateProject(name.trim());
      setProjects((prev) => [created, ...prev]);
      setName("");
    } catch (e: unknown) {
      setError(getApiErrorMessage(e, "Failed to create project"));
    } finally {
      setCreating(false);
    }
  }

  function startEdit(p: Project) {
    setError(null);
    setEditingId(p.id);
    setEditingName(p.name);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingName("");
  }

  async function saveEdit() {
    if (editingId === null) return;

    const newName = editingName.trim();
    if (!newName) return;

    setSavingEdit(true);
    setError(null);

    try {
      const updated = await apiRenameProject(editingId, newName);
      setProjects((prev) =>
        prev.map((p) => (p.id === editingId ? updated : p))
      );
      cancelEdit();
    } catch (e: unknown) {
      setError(getApiErrorMessage(e, "Failed to rename project"));
    } finally {
      setSavingEdit(false);
    }
  }

  async function remove(p: Project) {
    const ok = window.confirm(
      `Delete project "${p.name}"? This can't be undone.`
    );
    if (!ok) return;

    setDeletingId(p.id);
    setError(null);

    try {
      await apiDeleteProject(p.id);
      setProjects((prev) => prev.filter((x) => x.id !== p.id));
      if (editingId === p.id) cancelEdit();
    } catch (e: unknown) {
      setError(getApiErrorMessage(e, "Failed to delete project"));
    } finally {
      setDeletingId(null);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return {
    // data
    projects,
    loading,
    error,

    // create
    name,
    setName,
    creating,
    canCreate,
    create,

    // list actions
    refresh,

    // edit
    editingId,
    editingName,
    setEditingName,
    savingEdit,
    startEdit,
    cancelEdit,
    saveEdit,

    // delete
    deletingId,
    remove,
  };
}
