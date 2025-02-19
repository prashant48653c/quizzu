interface CircularProgressionProps {
  value: number
  size?: number
  strokeWidth?: number
  unit?: string
  color?: string
}

export default function CircularProgression({
  value,
  size = 120,
  strokeWidth = 8,
  unit = "",
  color = "#01805C"
}: CircularProgressionProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const progress = (value / 100) * circumference

  return (
    <div className="relative w-[120px] h-[120px] flex items-center justify-center">
      <svg
        className="transform -rotate-90 w-full h-full"
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="#E5E7EB"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          style={{
            transition: "stroke-dashoffset 0.5s ease-in-out",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold">
          {value}
          {unit}
        </span>
      </div>
    </div>
  )
}

