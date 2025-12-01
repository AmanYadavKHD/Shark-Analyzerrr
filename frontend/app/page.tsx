import UploadZone from "@/components/UploadZone";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black" />

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16 sm:px-12 lg:pt-32">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
              Master Your Pitch. <br />
              <span className="text-blue-500">Impress the Sharks.</span>
            </h1>

            <p className="max-w-2xl mx-auto text-xl text-gray-400">
              The world's first multimodal AI pitch coach. Get instant feedback on your vocal delivery,
              business logic, and emotional impact from our virtual investor panel.
            </p>

            <div className="pt-8">
              <UploadZone />
            </div>

            <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800">
                <div className="text-blue-500 text-xl font-bold mb-2">01. Vocal Analysis</div>
                <p className="text-gray-400">Real-time tracking of pitch, pace, and confidence metrics.</p>
              </div>
              <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800">
                <div className="text-purple-500 text-xl font-bold mb-2">02. Business Logic</div>
                <p className="text-gray-400">Deep semantic analysis of your problem, solution, and market fit.</p>
              </div>
              <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800">
                <div className="text-green-500 text-xl font-bold mb-2">03. Shark Feedback</div>
                <p className="text-gray-400">Get grilled by AI personas modeled after top investors.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
