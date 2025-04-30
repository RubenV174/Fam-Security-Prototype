import type { FC } from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  // Add any specific props if needed, e.g., size variants
}

const primaryColor = 'hsl(var(--primary))'; // Blue from theme
const foregroundColor = 'hsl(var(--foreground))'; // Text color from theme

const Logo: FC<LogoProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 40" // Adjusted viewBox
      width="128" // Default width
      height="32"  // Default height
      {...props}
    >
      {/* Icon: Stylized Shield/House */}
      <g transform="translate(0, 4) scale(0.8)">
        <path
          d="M25 2 C12 2 2 12 2 25 S12 48 25 48 S48 38 48 25 S38 2 25 2 Z M25 6 C35 6 44 14 44 25 C44 30 41 35 37 39 L25 27 L13 39 C9 35 6 30 6 25 C6 14 15 6 25 6 Z M25 30 L35 40 C32 42 28 44 25 44 S18 42 15 40 L25 30 Z"
          fill={primaryColor}
        />
        {/* Simple house shape inside */}
         <path
           d="M25 15 L18 22 V 30 H 32 V 22 L25 15 Z"
           fill="hsl(var(--background))" // Use background color for contrast
         />
      </g>

      {/* Text: Fam Security */}
      <g transform="translate(45, 0)">
        <text
          x="10"
          y="26" // Adjusted y for vertical alignment
          fontSize="24"
          fontWeight="bold"
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
          fill={foregroundColor} // Use theme foreground color
          dominantBaseline="middle"
        >
          Fam
          <tspan
            fontWeight="normal" // Slightly lighter weight for "Security"
            fill={foregroundColor} // Keep same color or use primary
            dx="3" // Space before Security
          >
            Security
          </tspan>
        </text>
      </g>
    </svg>
  );
};

export default Logo;
