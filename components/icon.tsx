import type { CSSProperties } from "react";

export function Icon({
  name,
  size = 22,
  className,
  style,
}: {
  name: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const paths: Record<string, React.ReactNode> = {
    arrow: (
      <>
        <path d="M4 12h15M13 5l7 7-7 7" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    bag: (
      <>
        <path d="M5 8h14l1 13H4L5 8Z" />
        <path d="M8 8V6a4 4 0 0 1 8 0v2" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 1v2m0 18v2M1 12h2m18 0h2M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    lock: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V6a4 4 0 0 1 8 0v4m-4 4v3" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 3S3 1 3 13a8 8 0 0 0 8 8C23 21 20 3 20 3Z" />
        <path d="m4 20 12-12" />
      </>
    ),
    paw: (
      <>
        <ellipse
          cx="7"
          cy="6.5"
          rx="2.2"
          ry="3"
          transform="rotate(-20 7 6.5)"
          fill="currentColor"
          stroke="none"
        />
        <ellipse
          cx="16"
          cy="6"
          rx="2.2"
          ry="3"
          transform="rotate(20 16 6)"
          fill="currentColor"
          stroke="none"
        />
        <ellipse
          cx="3"
          cy="12"
          rx="2"
          ry="2.7"
          transform="rotate(-30 3 12)"
          fill="currentColor"
          stroke="none"
        />
        <ellipse
          cx="21"
          cy="11.5"
          rx="2"
          ry="2.7"
          transform="rotate(30 21 11.5)"
          fill="currentColor"
          stroke="none"
        />
        <path
          d="M6 18c0-3 3.4-7 6-7s6 4 6 7c0 4-4 2-6 2s-6 2-6-2Z"
          fill="currentColor"
          stroke="none"
        />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {paths[name] || paths.paw}
    </svg>
  );
}
