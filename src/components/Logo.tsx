import type { FC } from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  // Add any specific props if needed, e.g., size variants
}

// Colors from the provided logo image
const logoOrange = '#F26422'; // Orange from image
const logoBlue = '#3F51B5';   // Blue from image (similar to primary)
// const logoWhite = '#FFFFFF'; // White for "FAM" - Replaced with foreground theme color
const logoTextOrange = '#F26422'; // Orange for "security"


const Logo: FC<LogoProps> = (props) => {
  // Adjusted viewBox for better text fitting. Increased width.
  // Increased default width/height slightly for better visibility.
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 60" // Increased width in viewBox
      width="192" // Adjusted default width (80% of 240)
      height="48"  // Kept default height
      {...props}
    >
      {/* Abstract Family Icon */}
      <g transform="translate(5, 5)"> {/* Position the icon */}
        {/* Top Orange Circle */}
        <circle cx="25" cy="15" r="13" fill={logoOrange} />
        {/* Top Blue Circle */}
        <circle cx="50" cy="15" r="13" fill={logoBlue} />

        {/* Connecting Arcs and Inner Figure */}
        {/* Orange Arc */}
        <path
          d="M 12,27 A 30 30 0 0 0 45 48" // Adjusted arc path
          stroke={logoOrange}
          strokeWidth="10" // Adjust thickness as needed
          fill="none"
          strokeLinecap="round"
        />
         {/* Blue Arc */}
        <path
          d="M 63,27 A 30 30 0 0 1 30 48" // Adjusted arc path
          stroke={logoBlue}
          strokeWidth="10" // Adjust thickness
          fill="none"
          strokeLinecap="round"
        />

        {/* Inner Blue Figure (simplified) */}
        <circle cx="37.5" cy="38" r="7" fill={logoBlue} /> {/* Head */}
         {/* Body (approximation) */}
         <path
            d="M 37.5,45 Q 32 50 30 55"
            stroke={logoBlue}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
         />
         <path
            d="M 37.5,45 Q 43 50 45 55"
            stroke={logoBlue}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
         />

      </g>

      {/* Text Part - Using system fonts for iOS look */}
      <g transform="translate(85, 0)"> {/* Adjusted translate X for more space */}
        {/* FAM (Foreground Color, Bold) */}
        <text
          x="0" // Start at the beginning of the group
          y="30" // Vertically centered (half of viewBox height)
          fontSize="28" // Slightly adjusted size
          fontWeight="600" // Semi-bold weight, common in iOS titles
          // System font stack prioritizing Apple fonts
          fontFamily="'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'"
          fill="hsl(var(--foreground))" // Use theme foreground color
          dominantBaseline="central" // Better vertical alignment
          letterSpacing="1" // Adjusted spacing
        >
          FAM
        </text>
        {/* security (Orange, Lighter Weight) */}
         <text
          x="65" // Position relative to FAM (adjust as needed)
          y="30" // Align baseline with FAM vertically
          fontSize="26" // Slightly larger for better balance
          fontWeight="300" // Lighter weight for contrast, typical iOS style
          // System font stack prioritizing Apple fonts
          fontFamily="'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'"
          fill={logoTextOrange} // Use logo orange
          dominantBaseline="central" // Align text vertically with FAM
          letterSpacing="0.5" // Adjusted spacing
        >
          security
        </text>
      </g>
    </svg>
  );
};

export default Logo;
