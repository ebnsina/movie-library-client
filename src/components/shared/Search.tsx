import { Input } from "../ui/input";

export default function Search() {
  return (
    <div className="flex justify-center items-center">
      <Input type="text" placeholder="Search movies..." />
    </div>
  );
}
