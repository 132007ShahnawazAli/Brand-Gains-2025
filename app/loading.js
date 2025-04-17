export default function Loading() {
  return (
    <div className="min-h-screen bg-[#021814] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 border-4 border-[#bafc50] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-6 text-white font-normal text-xl">Loading...</p>
      </div>
    </div>
  )
}
