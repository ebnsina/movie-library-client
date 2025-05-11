import { useFieldContext } from "@/hooks/form";
import { useStore } from "@tanstack/react-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import FieldInfo from "./FieldInfo";

export default function TextField({
  label,
  type = "text",
}: {
  label: string;
  type?: string;
}) {
  const field = useFieldContext<string>();
  const errors = useStore(field.store, (state) => state.meta.errors);

  return (
    <>
      <div>
        <Label className="mb-2 text-slate-600" htmlFor={field.name}>
          {label}
        </Label>
        <Input
          type={type}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
        />
      </div>

      <FieldInfo field={field} />
    </>
  );
}
