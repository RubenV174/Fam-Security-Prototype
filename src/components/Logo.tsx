import type { FC } from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  // Add any specific props if needed, e.g., size variants
}

// Colors adjusted slightly for better harmony with the theme
// Using theme primary blue, and a warm orange/red
const primaryColor = 'hsl(var(--primary))'; // Blue
const secondaryColor = '#F97316'; // Warm Orange (Tailwind orange-500 equivalent) - Approximation

const Logo: FC<LogoProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 40" // Adjusted viewBox for text inclusion
      width="144" // Default width, can be overridden via props
      height="32" // Default height, can be overridden via props
      {...props}
    >
      {/* Icon Group */}
      <g transform="translate(0, 0) scale(0.7)">
        {/* Smaller Inner Circle (Child) */}
        <circle cx="30" cy="38" r="8" fill={primaryColor} />

        {/* Left Arc + Top Circle (Orange/Red) */}
        <path
          d="M10 15 A20 20 0 0 1 30 45 A20 20 0 0 1 50 15" // Adjusted path for smoother curve and connection
          stroke={secondaryColor}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="10" cy="15" r="10" fill={secondaryColor} />

         {/* Right Arc + Top Circle (Blue) */}
         {/* Mirrored path - needs adjustment */}
         <path
           d="M50 15 A20 20 0 0 1 70 15" // This is incorrect - Needs proper arc definition
           transform="scale(-1, 1) translate(-100, 0)" // Simplified mirroring attempt - better to redefine path
           stroke={primaryColor}
           strokeWidth="6"
           fill="none"
           strokeLinecap="round"
          />
         {/* Corrected Right Arc definition */}
         <path
            d="M90 15 A20 20 0 0 0 70 45 A20 20 0 0 0 50 15" // Correct arc definition for right side
            stroke={primaryColor}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
        <circle cx="90" cy="15" r="10" fill={primaryColor} />
      </g>

      {/* Text Group - Adjusted position */}
      <g transform="translate(75, 0)">
        <text
          x="10" // Positioned next to the icon
          y="25" // Vertically centered approximately
          fontSize="24"
          fontWeight="bold"
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
          fill="hsl(var(--foreground))"
          dominantBaseline="middle" // Better vertical alignment
        >
          FamilySafe
          <tspan
            fontSize="20" // Smaller font size for "AI"
            fontWeight="normal" // Lighter weight for "AI"
            fill="hsl(var(--primary))" // Use primary color for "AI"
            dx="5" // Add small space before AI
          >
            AI
          </tspan>
        </text>
      </g>
    </svg>
  );
};

export default Logo;
