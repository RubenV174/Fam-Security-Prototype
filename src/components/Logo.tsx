import type { FC } from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  // Add any specific props if needed, e.g., size variants
}

const primaryColor = 'hsl(var(--primary))'; // Blue from theme
// Using destructive for the reddish-orange, adjust if needed
const secondaryColor = 'hsl(var(--destructive))';
const foregroundColor = 'hsl(var(--foreground))'; // Text color from theme

const Logo: FC<LogoProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 170 40" // Adjusted viewBox to better fit the new logo proportions
      width="136" // Adjusted default width
      height="32"  // Default height
      {...props}
    >
      {/* Icon: Abstract family figures */}
      <g transform="translate(2, 2) scale(0.75)">
        {/* Red-Orange Arc & Head */}
        <path
          d="M 10 40 C 10 20 30 5 50 5 C 60 5 68 10 70 18"
          stroke={secondaryColor}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
         <circle cx="70" cy="18" r="8" fill={secondaryColor} />

        {/* Blue Arc & Head */}
        <path
          d="M 90 40 C 90 20 70 5 50 5 C 40 5 32 10 30 18"
          stroke={primaryColor}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
         <circle cx="30" cy="18" r="8" fill={primaryColor} />

         {/* Child Figure */}
         <circle cx="50" cy="30" r="6" fill={primaryColor} />
         <path
            d="M 50 36 Q 50 42 45 45 L 55 45 Q 50 42 50 36 Z"
            fill={primaryColor}
         />
      </g>

      {/* Text: Fam Security */}
      <g transform="translate(75, 0)">
        {/* FAM */}
        <text
          x="5"
          y="18" // Adjusted y for vertical alignment
          fontSize="26" // Increased size
          fontWeight="bold" // Bold
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
          fill={foregroundColor} // Use theme foreground color
          dominantBaseline="middle" // Align vertically
        >
          FAM
        </text>
        {/* security */}
         <text
          x="5" // Align with FAM
          y="34" // Position below FAM
          fontSize="12" // Smaller size
          fontWeight="500" // Medium weight
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
          fill={secondaryColor} // Use secondary (red-orange) color
          dominantBaseline="middle"
        >
          security
        </text>
      </g>
    </svg>
  );
};

export default Logo;
