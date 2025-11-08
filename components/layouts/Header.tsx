import { MenuOptions } from "@/constant/menu";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import GetStarted from "../GetStarted";

/**
 * Renders the global site header with site branding, primary navigation, and a "Get Started" call-to-action.
 *
 * @remarks
 * Accessibility:
 * - Uses a semantic header element with role="banner".
 * - Primary navigation is provided via a nav with aria-label="Primary".
 * - Home link includes an accessible label; the arrow icon is marked aria-hidden.
 *
 * Data/Dependencies:
 * - Expects MenuOptions: Array<{ name: string; link: string }>.
 * - Uses shared UI primitives: Link, Button, Image, and ArrowRight.
 *
 * Styling:
 * - Tailwind utility classes handle layout, spacing, and elevation.
 *
 * @returns
 * A header element containing site logo/title, navigation links derived from MenuOptions, and a call-to-action button.
 *
 * @see MenuOptions
 * @see Link
 * @see Button
 * @see Image
 * @see ArrowRight
 * @public
 */
const Header = () => {
  return (
    <header
      className="flex items-center justify-between p-4 shadow bg-background"
      role="banner"
    >
      {/* Site branding */}
      <Link href="/" className="flex items-center gap-2" aria-label="Home">
        <Image
          src="/logo.svg"
          alt="Website Generator logo"
          width={35}
          height={35}
        />
        <span className="text-xl font-bold">Website Generator</span>
      </Link>

      {/* Primary navigation */}
      <nav aria-label="Primary">
        <ul className="m-0 flex list-none gap-3 p-0">
          {MenuOptions.map((option, index) => (
            <li key={index}>
              <Button variant="ghost" asChild>
                <Link href={option.link}>{option.name}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      <GetStarted />
    </header>
  );
};

export default Header;
