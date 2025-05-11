export default function Footer() {
  return (
    <footer className="text-center py-10 text-sm text-slate-600 border-t border-slate-200">
      © {new Date().getFullYear()} CineFlix. All rights reserved.
    </footer>
  );
}
