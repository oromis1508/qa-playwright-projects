import { Link, useParams } from "react-router-dom";

import { Layout } from "../components/Layout";
import { Card } from "../components/Card";

import { TodosList } from "../components/todos/TodosList";
import { TodoCreateForm } from "../components/todos/TodoCreateForm";

import { useTodos } from "../features/todos/useTodos";
import { TodosFilter } from "../components/todos/TodosFilter";

export default function TodosPage() {
  const { projectId } = useParams();

  const {
    projectName,
    todos,
    loading,
    error,

    filter,
    setFilter,

    newTodo,
    setNewTodo,
    savingNew,
    addTodo,

    togglingId,
    toggle,

    editingId,
    editingTitle,
    setEditingTitle,
    savingEdit,
    startEdit,
    cancelEdit,
    saveEdit,

    deletingId,
    remove,
  } = useTodos(projectId);

  if (loading) {
    return (
      <Layout title="Todos">
        <Card>
          <div className="text-sm text-slate-400">Loading...</div>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout title="Todos">
      <div className="grid gap-6">
        {/* nav */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-sm text-slate-300 hover:text-white underline"
            data-testid="back-to-projects"
          >
            ← Back to projects
          </Link>

          <div className="text-sm text-slate-400">
            Projects / <span className="text-slate-200">{projectName}</span>
          </div>
        </div>

        {/* create */}
        <TodoCreateForm
          value={newTodo}
          onChange={setNewTodo}
          onSubmit={addTodo}
          isLoading={savingNew}
          error={error}
        />

        {/* list */}
        <Card>
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Todos</div>

            <TodosFilter value={filter} onChange={setFilter} />
          </div>

          <div className="mt-4">
            <TodosList
              todos={todos}
              togglingId={togglingId}
              onToggle={toggle}
              editingId={editingId}
              editingTitle={editingTitle}
              savingEdit={savingEdit}
              onStartEdit={startEdit}
              onCancelEdit={cancelEdit}
              onChangeEditTitle={setEditingTitle}
              onSaveEdit={saveEdit}
              deletingId={deletingId}
              onDelete={remove}
            />
          </div>
        </Card>
      </div>
    </Layout>
  );
}
