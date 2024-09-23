const CircularRating = ({ vote_average }: { vote_average: number }) => {
  const percentage = Math.round((vote_average || 0) * 10)
  const radius = 9
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <svg className='h-full w-full' viewBox='0 0 24 24'>
      <circle cx='12' cy='12' r={radius} fill='none' stroke='#333' strokeWidth='2' />
      <circle
        cx='12'
        cy='12'
        r={radius}
        fill='none'
        stroke={percentage > 80 ? '#4ade80' : '#facc15'}
        strokeWidth='2'
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap='round'
        transform='rotate(-90 12 12)'
      />
      <text
        x='12'
        y='12'
        className='text-[0.45em] font-bold'
        textAnchor='middle'
        dominantBaseline='central'
        fill='white'
      >
        {percentage}
      </text>
    </svg>
  )
}

export default CircularRating
