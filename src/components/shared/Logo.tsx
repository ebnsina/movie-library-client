import { VideoCameraAiIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";

export default function Logo() {
  return (
    <Link to="/">
      <HugeiconsIcon
        icon={VideoCameraAiIcon}
        size={30}
        strokeWidth={1.5}
        className="text-green-500 hover:scale-105 transform transition-all"
      />
    </Link>
  );
}
