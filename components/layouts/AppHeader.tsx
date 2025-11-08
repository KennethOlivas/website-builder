import ToggleTheme from "../ToggleTheme";
import { SidebarTrigger } from "../ui/sidebar";
import { UserButton } from "@clerk/nextjs";

const AppHeader = () => {
  return (
    <div className="flex justify-between items-center p-4 shadow bg-secondary">
      <SidebarTrigger />
      <div className="flex justify-center items-center gap-2">
        <ToggleTheme />
        <UserButton />
      </div>
    </div>
  );
};

export default AppHeader;
