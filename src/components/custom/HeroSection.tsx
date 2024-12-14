import Link from "next/link"

const HeroSection = ({ data }: { readonly data: any }) => {
    console.dir(data, { depth: null })

  return (
    <header className="relative h-[600px] overflow-hidden">
        <img 
            src="http://localhost:1337/uploads/pexels_mikael_blomkvist_6476587_3c4d09397e.jpg" 
            alt="Background"
            className="absolute inset-0 object-cover w-full h-full"
            width={1920}
            height={1080}
            style={{
                aspectRatio: "1920/1080",
                objectFit: "cover",
            }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-20">
            <h1 className="text-4xl">
                Summarize Your Videos
            </h1>
            <p className="mt-4 text-lg md:text-xl lg:text-2xl">
                Save time and get the key points from your videos
            </p>
            <Link className="mt-8 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-black bg-white rounded-md shadow hover:bg-gray-100"
                href="/login"
            >
                Login
            </Link>
        </div>
    </header>
  )
}

export default HeroSection