export default function Loader() {
  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-white/70 backdrop-blur-md">
      <div className="flex flex-col items-center gap-6">
        
        {/* 🔥 Logo */}
        <img
          src="public/WhatsApp Image 2026-03-27 at 7.41.22 PM.jpeg"
          alt="Route Logo"
          className="w-32 rounded rounded-6 animate-pulse drop-shadow-[0_0_25px_rgba(10,102,194,0.5)]"
        />

        {/* 💫 dots animation */}
        <div className="flex gap-2">
          <span className="w-2 h-2 bg-[#0a66c2] rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-[#0a66c2] rounded-full animate-bounce delay-150"></span>
          <span className="w-2 h-2 bg-[#0a66c2] rounded-full animate-bounce delay-300"></span>
        </div>
      </div>
    </div>
  );
}
