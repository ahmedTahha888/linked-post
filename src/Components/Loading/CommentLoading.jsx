const CommentLoading = ({ count = 3 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-start gap-3 animate-pulse"
        >
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-gray-300"></div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-gray-300 h-3 w-1/4 rounded mb-2"></div>
            <div className="bg-gray-300 h-3 w-2/3 rounded mb-1"></div>
            <div className="bg-gray-300 h-3 w-1/2 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentLoading;