import { Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-3">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1">
          <Skeleton width="40%" height={10} />
          <Skeleton width="25%" height={10} />
        </div>
      </div>

      {/* Content */}
      <Skeleton width="90%" height={10} />
      <Skeleton width="80%" height={10} />

      {/* Image */}
      <Skeleton variant="rectangular" width="100%" height={200} />

      {/* Actions */}
      <div className="flex justify-between pt-2">
        <Skeleton width={60} height={20} />
        <Skeleton width={60} height={20} />
        <Skeleton width={60} height={20} />
      </div>

    </div>
  );
}