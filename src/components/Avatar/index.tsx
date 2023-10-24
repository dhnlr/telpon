function Avatar({ initial }: { initial: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40">
      <circle fill="#F44336" cx="50%" cy="50%" r="50%"></circle>
      <text
        fill="#FFF"
        textAnchor="middle"
        alignmentBaseline="middle"
        x="50%"
        y="60%"
      >
        {initial}
      </text>
    </svg>
  );
}

export default Avatar;
