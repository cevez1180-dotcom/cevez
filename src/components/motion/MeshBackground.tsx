export const MeshBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-20">
      {/* Blob 1: Soft Electric Purple drifting top-left to center */}
      <div 
        className="absolute top-[-10%] left-[-5%] w-[650px] h-[650px] sm:w-[850px] sm:h-[850px] rounded-full bg-[#9333EA]/12 blur-[140px] animate-blob-1 will-change-transform" 
      />

      {/* Blob 2: Deep Indigo/Navy drifting right-center */}
      <div 
        className="absolute top-[35%] right-[-10%] w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full bg-[#4F46E5]/10 blur-[150px] animate-blob-2 will-change-transform" 
      />

      {/* Blob 3: Subtle Violet drifting bottom-left */}
      <div 
        className="absolute bottom-[-10%] left-[20%] w-[550px] h-[550px] sm:w-[750px] sm:h-[750px] rounded-full bg-[#7C3AED]/08 blur-[160px] animate-blob-3 will-change-transform" 
      />

      {/* Very faint tech dot mesh overlay */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(#a855f7 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />
    </div>
  );
};
