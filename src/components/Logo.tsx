import type { FC } from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  // Add any specific props if needed, e.g., size variants
}

const primaryColor = 'hsl(var(--primary))'; // Blue from theme
// Using destructive for the reddish-orange/accent color
const secondaryColor = 'hsl(var(--destructive))';
const foregroundColor = 'hsl(var(--foreground))'; // Text color from theme

const Logo: FC<LogoProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50" // Adjusted viewBox for potentially wider logo
      width="160" // Adjusted default width
      height="40"  // Adjusted default height
      {...props}
    >
      {/* Icon: Abstract Shield + Heart/Family */}
      <g transform="translate(5, 2.5) scale(0.9)">
        {/* Outer Shield Shape (Blue) */}
        <path
          d="M 25 5 C 15 5 5 15 5 25 S 15 45 25 45 C 35 45 45 35 45 25 S 35 5 25 5 Z M 25 8 A 17 17 0 1 1 25 42 A 17 17 0 0 1 25 8 Z"
          fill={primaryColor}
          stroke="none"
        />
         {/* Inner Abstract Heart/Family Shape (Red-Orange) */}
         <path
            d="M 25 15 C 20 15 18 20 18 22 C 18 28 25 35 25 35 C 25 35 32 28 32 22 C 32 20 30 15 25 15 Z"
            fill={secondaryColor}
            stroke="none"
         />
          {/* Small accent dots (optional, using foreground) */}
          <circle cx="15" cy="18" r="1.5" fill={foregroundColor + '80'} />
          <circle cx="35" cy="18" r="1.5" fill={foregroundColor + '80'} />
      </g>

      {/* Text: Fam Security */}
      <g transform="translate(60, 0)">
        {/* Fam */}
        <text
          x="5"
          y="25" // Vertically centered
          fontSize="28" // Slightly larger
          fontWeight="600" // Semi-bold
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
          fill={foregroundColor} // Use theme foreground color
          dominantBaseline="middle" // Align vertically
          letterSpacing="-0.5" // Slightly tighter spacing
        >
          Fam
        </text>
        {/* Security */}
         <text
          x="55" // Positioned after "Fam"
          y="25" // Align baseline with "Fam"
          fontSize="28" // Same size
          fontWeight="300" // Lighter weight
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
          fill={foregroundColor} // Use theme foreground color
          dominantBaseline="middle"
          letterSpacing="0" // Normal spacing
        >
          Security
        </text>
      </g>
    </svg>
  );
};

export default Logo;
