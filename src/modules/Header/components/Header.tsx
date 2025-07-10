import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-[99999999] bg-white border-b border-neutral-200 px-3 py-2 shadow-sm">
      <nav className="flex items-center justify-center gap-2 text-sm font-medium">
        <Link
          to="/"
          className={`hover:text-accent  transition-colors p-2 rounded-md ${
            isActive("/") ? "text-primary bg-gray-300  " : "text-neutral-700"
          }`}
        >
          Create
        </Link>
        <Link
          to="/preview"
          className={`hover:text-accent transition-colors p-2 rounded-md ${
            isActive("/preview")
              ? "text-primary bg-gray-300"
              : "text-neutral-700"
          }`}
        >
          Preview
        </Link>
      </nav>
    </header>
  );
};

export default Header;
