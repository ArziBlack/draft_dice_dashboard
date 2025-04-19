import {
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Users2,
  BookOpen,
  List as ListIcon
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const mainNavItems = [
    {
      path: "/",
      icon: <Home className="h-5 w-5" />,
      label: "Dashboard",
      tooltip: "Dashboard"
    },
    {
      path: "/home",
      icon: <ShoppingCart className="h-5 w-5" />,
      label: "Home",
      tooltip: "Home Post"
    },
    {
      path: "/library",
      icon: <BookOpen className="h-5 w-5" />,
      label: "Library",
      tooltip: "Library Posts"
    },
    {
      path: "/subscribers",
      icon: <Users2 className="h-5 w-5" />,
      label: "Subscribers",
      tooltip: "Subscriptions"
    },
    {
      path: "/blogger",
      icon: <LineChart className="h-5 w-5" />,
      label: "Blogger",
      tooltip: "Blogger Posts"
    },
    {
      path: "/list",
      icon: <ListIcon className="h-5 w-5" />,
      label: "List",
      tooltip: "All Lists"
    }
  ];

  const bottomNavItems = [
    {
      path: "/settings",
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      tooltip: "Settings"
    }
  ];

  const NavItem = ({ item }: { item: typeof mainNavItems[0] }) => {
    const isActive = currentPath === item.path;
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={item.path}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8",
              isActive 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
          >
            {item.icon}
            <span className="sr-only">{item.label}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{item.tooltip}</TooltipContent>
      </Tooltip>
    );
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-16 flex-col border-r border-border bg-background shadow-sm sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5 mt-5">
        <Link
          to="/"
          className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground"
        >
          <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
          <span className="sr-only">Milton Black</span>
        </Link>
        
        <div className="w-full h-px bg-border my-2"></div>
        
        {mainNavItems.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}
      </nav>
      
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5 border-t border-border pt-4">
        {bottomNavItems.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
