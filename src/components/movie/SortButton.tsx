import { Button } from "../ui/button";

export default function SortButton({
  field,
  currentSortField,
  currentSortOrder,
  onSort,
}: any) {
  return (
    <Button
      variant={currentSortField === field ? "default" : "secondary"}
      size="sm"
      onClick={() => onSort(field)}
      className="text-xs"
    >
      {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
      {currentSortField === field && (currentSortOrder === "asc" ? "↑" : "↓")}
    </Button>
  );
}
