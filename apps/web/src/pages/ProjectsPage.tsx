import { Layout } from "../components/Layout";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { ProjectsList } from "../components/projects/ProjectsList";

import { useProjects } from "../features/projects/useProjects";

export default function ProjectsPage() {
  const {
    projects,
    loading,
    error,

    name,
    setName,
    creating,
    canCreate,
    create,

    refresh,

    editingId,
    editingName,
    setEditingName,
    savingEdit,
    startEdit,
    cancelEdit,
    saveEdit,

    deletingId,
    remove,
  } = useProjects();

  return (
    <Layout title="Projects">
      <div className="grid gap-6">
        <Card>
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Input
                label="New project name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. QA Learning"
                data-testid="project-name"
              />
            </div>

            <Button
              onClick={create}
              isLoading={creating}
              disabled={!canCreate}
              data-testid="project-create"
            >
              Create
            </Button>
          </div>

          {error && <div className="mt-3 text-sm text-red-400">{error}</div>}
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Your projects</div>
            <Button onClick={refresh} disabled={loading}>
              Refresh
            </Button>
          </div>

          <div className="mt-4">
            <ProjectsList
              projects={projects}
              loading={loading}
              editingId={editingId}
              editingName={editingName}
              savingEdit={savingEdit}
              deletingId={deletingId}
              onStartEdit={startEdit}
              onCancelEdit={cancelEdit}
              onChangeEditName={setEditingName}
              onSaveEdit={saveEdit}
              onDelete={remove}
            />
          </div>
        </Card>
      </div>
    </Layout>
  );
}
