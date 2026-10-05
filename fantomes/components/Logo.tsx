export default function Logo() {
  return (
    <svg
      viewBox="0 0 420 110"
      className="h-8 w-auto mx-auto mb-10"
      role="img"
      aria-label="Fantômes"
    >
      <path
        d="M15,45
           A35,35 0 0 1 85,45
           L85,95
           A8.75,8.75 0 0 1 67.5,95
           A8.75,8.75 0 0 1 50,95
           A8.75,8.75 0 0 1 32.5,95
           A8.75,8.75 0 0 1 15,95
           Z"
        fill="#1B2430"
      />
      <ellipse cx="38" cy="58" rx="5" ry="6.5" fill="#FAF6EF" />
      <ellipse cx="62" cy="58" rx="5" ry="6.5" fill="#FAF6EF" />
      <path
        d="M82,18 L84,23 L89,25 L84,27 L82,32 L80,27 L75,25 L80,23 Z"
        fill="#C68A2E"
      />
      <text
        x="115"
        y="68"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontStyle="italic"
        fontWeight="600"
        fontSize="40"
        fill="#1B2430"
      >
        Fantômes
      </text>
    </svg>
  );
}
