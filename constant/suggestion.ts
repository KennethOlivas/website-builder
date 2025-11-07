import type { LucideProps } from "lucide-react";
import {
  LayoutDashboard,
  UserPlus,
  UserCircle,
  Image,
  Table,
  Settings,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type Suggestion = {
  label: string;
  prompt: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

export const suggestions: Suggestion[] = [
  {
    label: "Dashboard",
    prompt:
      "Generate a responsive admin dashboard layout with a sidebar, top navigation bar, and main content area. Use cards, charts, and summary widgets to display data clearly.",
    icon: LayoutDashboard,
  },
  {
    label: "Sign Up Form",
    prompt:
      "Create a modern sign-up form with inputs for name, email, password, and password confirmation. Include validation messages and a submit button with loading state.",
    icon: UserPlus,
  },
  {
    label: "Hero Section",
    prompt:
      "Design a landing page hero section with a bold headline, subtext, call-to-action button, and an illustration or product image. Make it centered and visually engaging.",
    icon: Image,
  },
  {
    label: "Profile Page",
    prompt:
      "Build a user profile page with avatar, name, email, bio, and editable fields. Include tabs for activity, settings, and security information.",
    icon: UserCircle,
  },
  {
    label: "Data Table",
    prompt:
      "Generate a clean, sortable, and paginated data table for displaying user or product information. Include a search bar and filter options for usability.",
    icon: Table,
  },
  {
    label: "Settings Page",
    prompt:
      "Design a settings page with grouped form sections for account preferences, notifications, and privacy options. Include toggles, selects, and save buttons.",
    icon: Settings,
  },
];
