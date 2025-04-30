import type { FC } from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  // Add any specific props if needed, e.g., size variants
}

// Approximate colors from the provided image
const logoOrange = '#F26422'; // Approximate orange
const logoBlue = '#3F51B5';   // Approximate lighter blue
const logoDarkBlue = '#303F9F'; // Approximate darker blue for the child figure
const logoWhite = '#FFFFFF'; // White for "FAM"
const logoTextOrange = '#F26422'; // Orange for "security"

// Using theme colors where appropriate for consistency, but logo colors for specific parts
const themePrimary = 'hsl(var(--primary))'; // Will be updated to match logoBlue
const themeForeground = 'hsl(var(--foreground))';


const Logo: FC<LogoProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // Increased viewBox width to accommodate the wider design
      viewBox="0 0 300 60" // Adjusted viewBox: Wider to fit text, slightly taller
      width="240" // Default width (80% of 300)
      height="48"  // Default height (80% of 60)
      {...props}
    >
      {/* Icon Part */}
      <g transform="translate(10, 5) scale(1.1)"> {/* Adjusted position and scale */}
        {/* Orange Circle and Arm */}
        <circle cx="20" cy="15" r="12" fill={logoOrange} />
        <path d="M 20 27 C 5 30, 5 48, 25 48 C 35 48, 40 40, 38 35 Z" fill={logoOrange} />

        {/* Blue Circle and Arm */}
         <circle cx="45" cy="15" r="12" fill={logoBlue} />
         <path d="M 45 27 C 60 30, 60 48, 40 48 C 30 48, 25 40, 27 35 Z" fill={logoBlue} />

        {/* Inner Dark Blue Circle (Child Figure) */}
        <circle cx="32.5" cy="35" r="8" fill={logoDarkBlue} />
         {/* Small path to suggest body/connection for the child figure */}
         <path d="M 32.5 43 C 30 46, 35 46, 32.5 43 Z" fill={logoDarkBlue} />
      </g>

      {/* Text Part */}
      <g transform="translate(95, 0)"> {/* Adjusted X translation to move text right */}
        {/* FAM (White, Bold) */}
        <text
          x="5"
          y="25" // Vertically center relative to its own height
          fontSize="36" // Slightly larger font size
          fontWeight="bold" // Bold
          fontFamily="Arial, Helvetica, sans-serif" // Standard bold font
          fill={logoWhite} // White color
          dominantBaseline="central" // Better vertical alignment
          letterSpacing="1" // Adjust letter spacing if needed
        >
          FAM
        </text>
        {/* security (Orange, Regular/Light) */}
         <text
          x="5" // Align start with FAM
          y="50" // Position below FAM
          fontSize="22" // Smaller font size
          fontWeight="normal" // Regular weight
          fontFamily="Arial, Helvetica, sans-serif" // Standard font
          fill={logoTextOrange} // Orange color
          dominantBaseline="hanging" // Align top of text to y position
          letterSpacing="0.5" // Adjust letter spacing
        >
          security
        </text>
      </g>
    </svg>
  );
};

export default Logo;
