export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center absolute inset-0 z-10 bg-black bg-opacity-30">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-500 mb-2"></div>
      <p className="text-gray-100">Loading...</p>
    </div>
  )
}