import type { FC } from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  // Add any specific props if needed, e.g., size variants
}

// Approximate colors from the provided image
const logoOrange = '#F26422'; // Orange from image
const logoBlue = '#3F51B5';   // Blue from image
const logoWhite = '#FFFFFF'; // White for "FAM"
const logoTextOrange = '#F26422'; // Orange for "security"


const Logo: FC<LogoProps> = (props) => {
  // Adjusted viewBox for a potentially wider logo due to text placement
  // viewBox="0 0 width height"
  // Icon: approx 40x40, Text: approx 100 wide? Total maybe 150 wide. Height driven by text ~50-60.
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 60" // Adjusted viewBox: Wider to accommodate text better
      width="144" // Default width (80% of 180)
      height="48"  // Default height (80% of 60)
      {...props}
    >
      {/* Icon Part - 4 Circles */}
      <g transform="translate(10, 10)"> {/* Position the icon group */}
        {/* Adjusted radius and positions for slight overlap/closeness */}
        <circle cx="12" cy="12" r="11" fill={logoOrange} /> {/* Top-left */}
        <circle cx="32" cy="12" r="11" fill={logoBlue} />   {/* Top-right */}
        {/* Offset bottom circles slightly for visual connection */}
        <circle cx="12" cy="32" r="11" fill={logoOrange} /> {/* Bottom-left */}
        <circle cx="32" cy="32" r="11" fill={logoBlue} />   {/* Bottom-right */}
      </g>

      {/* Text Part */}
      {/* Increased translate X to give more space between icon and text */}
      <g transform="translate(65, 5)">
        {/* FAM (White, Bold) */}
        <text
          x="5" // Start text slightly to the right
          y="20" // Adjust vertical position
          fontSize="32" // Slightly smaller than before, adjust as needed
          fontWeight="bold"
          fontFamily="Arial, Helvetica, sans-serif" // Using common sans-serif fonts
          fill={logoWhite}
          dominantBaseline="central"
          letterSpacing="1"
        >
          FAM
        </text>
        {/* security (Orange, Regular/Light) */}
         <text
          x="5" // Align with FAM
          y="45" // Position below FAM
          fontSize="18" // Smaller font size
          fontWeight="normal" // Regular weight
          fontFamily="Arial, Helvetica, sans-serif" // Using common sans-serif fonts
          fill={logoTextOrange}
          dominantBaseline="hanging" // Align top of text to y position
          letterSpacing="0.5"
        >
          security
        </text>
      </g>
    </svg>
  );
};

export default Logo;
