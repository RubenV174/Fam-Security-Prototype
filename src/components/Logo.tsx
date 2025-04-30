import type { FC } from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  // Add any specific props if needed, e.g., size variants
}

// Colors from the provided logo image
const logoOrange = '#F26422'; // Orange from image
const logoBlue = '#3F51B5';   // Blue from image (similar to primary)
const logoWhite = '#FFFFFF'; // White for "FAM"
const logoTextOrange = '#F26422'; // Orange for "security"


const Logo: FC<LogoProps> = (props) => {
  // Adjusted viewBox for the new logo design which is wider.
  // Icon is roughly circular, Text adds width. Approximate total width ~180-200, Height ~60.
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 60" // Adjusted viewBox for wider logo
      width="160" // Default width (80% of 200)
      height="48"  // Default height (80% of 60)
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

      {/* Text Part */}
      <g transform="translate(80, 5)"> {/* Increased translate X for more space */}
        {/* FAM (White, Bold) */}
        <text
          x="5"
          y="20" // Centered vertically more or less
          fontSize="30" // Adjust size as needed
          fontWeight="bold"
          fontFamily="Arial, Helvetica, sans-serif" // Common sans-serif
          // Use a fill color that contrasts with the background.
          // If the background is dark, use white. If light, use a dark color from the theme.
          // Using white as a safe default, but ideally adapt to theme.
          fill="hsl(var(--foreground))" // Change fill to foreground for better contrast
          dominantBaseline="central" // Align text vertically
          letterSpacing="1.5" // Add some spacing
        >
          FAM
        </text>
        {/* security (Orange, Regular) */}
         <text
          x="5"
          y="45" // Position below FAM
          fontSize="18" // Smaller size
          fontWeight="normal" // Regular weight
          fontFamily="Arial, Helvetica, sans-serif"
          fill={logoTextOrange} // Use logo orange
          dominantBaseline="hanging" // Align top of text to y
          letterSpacing="0.8" // Add some spacing
        >
          security
        </text>
      </g>
    </svg>
  );
};

export default Logo;
