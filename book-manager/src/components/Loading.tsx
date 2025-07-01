export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh]">
      <div className="relative mb-4">
        <div className="w-16 h-16 rounded-full border-4 border-t-4 border-blue-400 border-t-purple-500 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="block w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full shadow-lg" />
        </div>
      </div>
      <div className="text-lg font-semibold text-blue-700 animate-pulse drop-shadow">
        AI Suggestion is Loading...
      </div>
    </div>
  );
};
