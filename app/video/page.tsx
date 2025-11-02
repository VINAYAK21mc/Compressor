import CompressVideo from "@/components/video/compress-video-wrapper";

export default function page() {
  return (
   <div className="flex min-h-screen items-center justify-center font-sans">
         <main className="flex min-h-screen w-full max-w-[54rem] pt-24 pb-6">
            <div className="lg:grid lg:grid-cols-8 gap-8 lg:min-h-full flex flex-col w-full">
              <CompressVideo />
            </div>
         </main>
       </div>
  )
}
