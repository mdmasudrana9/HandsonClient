import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`bg-gray-800 text-white ${
        isOpen ? "w-56" : "w-16"
      } min-h-screen transition-all duration-300 flex flex-col`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-3 py-3 border-b border-gray-700">
        <h2
          className={`text-sm cursor-pointer font-semibold transition-all ${
            !isOpen && "hidden"
          }`}
        >
          <Link to="/">HandsOn</Link>
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs bg-gray-700 p-1 rounded-md hover:bg-gray-600"
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Sidebar Links */}
      <nav className="flex-1 p-2 space-y-2">
        <NavItem
          to="/create-events"
          icon="📅"
          label="Create Events"
          isOpen={isOpen}
        />
        <NavItem to="/all-events" icon="📋" label="Events" isOpen={isOpen} />
        <NavItem
          to="/create-team"
          icon="🛠"
          label="Create Teams"
          isOpen={isOpen}
        />
        <NavItem to="/all-teams" icon="👥" label="Teams" isOpen={isOpen} />
        <NavItem
          to="/create-req"
          icon="🛠"
          label="Create Request"
          isOpen={isOpen}
        />
        <NavItem to="/all-req" icon="🚀" label="Request" isOpen={isOpen} />
      </nav>
    </div>
  );
};

const NavItem = ({
  to,
  icon,
  label,
  isOpen,
}: {
  to: string;
  icon: string;
  label: string;
  isOpen: boolean;
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-2 p-2 rounded-md text-xs hover:bg-gray-700 transition-all ${
        isActive ? "bg-gray-700" : ""
      }`
    }
  >
    <span className="text-sm">{icon}</span>
    {isOpen && <span>{label}</span>}
  </NavLink>
);

export default Sidebar;
