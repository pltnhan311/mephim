const Loading = () => {
  return (
    <div className='flex h-screen items-center justify-center bg-gray-900'>
      <div className='relative h-12 w-12'>
        <div className='absolute inset-0 animate-ping rounded-full bg-slate-600 opacity-75'></div>
        <div className='absolute inset-0 animate-pulse rounded-full bg-slate-500'></div>
        <div className='absolute inset-2 animate-spin rounded-full border-4 border-slate-800 border-t-slate-400'></div>
      </div>
    </div>
  )
}

export default Loading
