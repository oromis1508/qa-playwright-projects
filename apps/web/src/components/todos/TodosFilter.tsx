export type TodoFilter = "all" | "active" | "completed";

type Props = {
  value: TodoFilter;
  onChange: (v: TodoFilter) => void;
};

export function TodosFilter({ value, onChange }: Props) {
  return (
    <div className="flex gap-2 text-sm">
      {["all", "active", "completed"].map((f) => (
        <button
          key={f}
          onClick={() => onChange(f as TodoFilter)}
          className={
            value === f
              ? "underline text-white"
              : "text-slate-400 hover:text-white"
          }
        >
          {f}
        </button>
      ))}
    </div>
  );
}
