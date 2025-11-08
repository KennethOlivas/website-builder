"use client";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

const ToggleTheme = () => {
  const { resolvedTheme, setTheme } = useTheme();
  // Hydration guard: initialize as undefined and set after first render via layout effect simulation.
  // Instead of useEffect + setState (lint warning), we rely on deferred theme resolution.
  const [isClient] = useState(() => typeof window !== "undefined");

  const toggleTheme = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(next);
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
    >
      {isClient ? (
        resolvedTheme === "dark" ? (
          <Sun className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Moon className="h-5 w-5" aria-hidden="true" />
        )
      ) : (
        // Fallback icon before hydration
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </Button>
  );
};

export default ToggleTheme;
