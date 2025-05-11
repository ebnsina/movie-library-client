import type { AnyFieldApi } from "@tanstack/react-form";

export default function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <p className="text-xs text-red-600 mt-2">
          {field.state.meta.errors.map((err) => err.message).join(",")}
        </p>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}
