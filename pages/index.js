import Head from "next/head";
import Search from "../components/search";

export default function Home() {
  return (
    <>
      <Head>
        <title>Veil</title>
        <meta name="description" content="Quick stats overview for dota 2" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-full grid grid-cols-4 gap-4">
        <section className="w-full space-y-8">
          <span className="font-bold text-fuchsia-800">
            Get overviews of your gameplay
          </span>
          <p className="text-6xl font-bold tracking-tighter leading-tight">
            An interactive stats overview
          </p>

          <p className="pt-8 text-xl font-medium text-gray-800 leading-relaxed">
            Search now
          </p>
          <div>
            <Search />
          </div>
        </section>
        <section className="col-span-3 relative">
          <div className="absolute top-8 left-32  h-[712px] w-5/6 rounded-[60px] bg-black overflow-hidden shadow-xl shadow-fuchsia-200 border-[14px] border-black z-10 origin-bottom -rotate-6 ">
            <video
              autoPlay="true"
              preload="auto"
              loop="true"
              playsInline
              className=" absolute inset-0 h-full w-full object-cover"
            >
              <source
                type="video/webm"
                src="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/homepage/dota_montage_webm.webm"
              />
              <source
                type="video/mp4"
                src="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/homepage/dota_montage_02.mp4"
              />
            </video>
            {/* <div className=" absolute inset-0 h-full w-full object-cover"></div> */}
          </div>
        </section>
      </div>
    </>
  );
}
