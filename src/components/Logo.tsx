import type { FC } from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  // Add any specific props if needed, e.g., size variants
}

const primaryColor = 'hsl(var(--primary))'; // Blue from theme
// Using accent for a softer, supportive feel (was destructive/red-orange)
const accentColor = 'hsl(var(--accent-foreground))'; // Using accent foreground for visibility
const foregroundColor = 'hsl(var(--foreground))'; // Text color from theme
const backgroundColor = 'hsl(var(--background))'; // Background for contrast if needed

const Logo: FC<LogoProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 50" // Adjusted viewBox for potentially wider logo
      width="176" // Adjusted default width (80% of 220)
      height="40"  // Adjusted default height (80% of 50)
      {...props}
    >
      {/* Icon: Abstract representation of family within a protective shape */}
      <g transform="translate(5, 2.5) scale(0.9)">
        {/* Protective Outline Shape (Primary Blue) - softer, more like hands/shelter */}
        <path
          d="M 25 5 Q 5 5, 5 25 Q 5 45, 25 48 Q 45 45, 45 25 Q 45 5, 25 5 Z M 25 8 Q 42 8, 42 25 Q 42 42, 25 45 Q 8 42, 8 25 Q 8 8, 25 8 Z"
          fill={primaryColor}
          stroke="none"
        />
        {/* Inner Family/Heart Element (Accent Color) - more abstract, less sharp heart */}
        <path
           d="M 25 16 C 21 16, 19 20, 19 23 C 19 29, 25 36, 25 36 C 25 36, 31 29, 31 23 C 31 20, 29 16, 25 16 Z"
           fill={backgroundColor} // Use background for inner shape
           stroke={accentColor} // Use accent for the outline of the inner shape
           strokeWidth="1.5"
        />
         {/* Optional subtle 'sparkle' for mental clarity/positivity */}
        <circle cx="33" cy="15" r="1.5" fill={accentColor + 'A0'} />

      </g>

      {/* Text: Fam Security */}
      <g transform="translate(60, 0)">
        {/* Fam */}
        <text
          x="5"
          y="25" // Vertically centered
          fontSize="28"
          fontWeight="600" // Semi-bold
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
          fill={foregroundColor} // Use theme foreground color
          dominantBaseline="middle" // Align vertically
          letterSpacing="-0.5"
        >
          Fam
        </text>
        {/* Security */}
         <text
          x="60" // Adjusted position after "Fam"
          y="25" // Align baseline with "Fam"
          fontSize="28"
          fontWeight="300" // Lighter weight
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
          fill={foregroundColor} // Use theme foreground color
          dominantBaseline="middle"
          letterSpacing="0"
        >
          Security
        </text>
      </g>
    </svg>
  );
};

export default Logo;
