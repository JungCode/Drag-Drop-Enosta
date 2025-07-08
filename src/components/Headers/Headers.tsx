import { Link, useLocation } from "react-router-dom";

const Headers = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-[99999999] bg-white border-b border-neutral-200 px-6 py-4 shadow-sm">
      <nav className="flex items-center gap-6 text-sm font-medium">
        <Link
          to="/"
          className={`hover:text-accent transition-colors ${
            isActive("/") ? "text-primary underline" : "text-neutral-700"
          }`}
        >
          Create
        </Link>
        <Link
          to="/preview"
          className={`hover:text-accent transition-colors ${
            isActive("/preview") ? "text-primary underline" : "text-neutral-700"
          }`}
        >
          Preview
        </Link>
      </nav>
    </header>
  );
};

export default Headers;
