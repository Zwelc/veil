import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Veil</title>
        <meta name="description" content="Quick stats overview for dota 2" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-full justify-between">
        <section className="">
          {/* <span className="font-medium text-fuchsia-800">
            Lorem ipsum dolor
          </span> */}
          <p className="text-6xl font-bold tracking-tighter leading-tight">
            An interactive stats overview
          </p>
          <p className="pt-8 text-lg font-normal text-gray-800">
            Get detailed overviews of your gameplay
          </p>
        </section>
        <section className="w-full ">
          <div className="relative top-8 left-6 h-[658px] w-full rounded-[60px] bg-black overflow-hidden shadow-xl shadow-fuchsia-200 border-[14px] border-black z-10 origin-bottom -rotate-12 translate-y-6 translate-x-6">
            <video
              autoPlay
              preload="auto"
              loop
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
