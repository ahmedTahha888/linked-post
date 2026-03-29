import { Skeleton } from "@mui/material";

export default function LoadingFollowers() {
  return (
    <div className="bg-white p-3 rounded-lg shadow">
      
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        
        {/* Left */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          
          {/* Avatar */}
          <Skeleton variant="circular" width={40} height={40} />

          {/* Name + followers */}
          <div>
            <Skeleton width={100} height={10} style={{ marginBottom: 6 }} />
            <Skeleton width={70} height={10} />
          </div>

        </div>

        {/* Follow Button */}
        <Skeleton variant="rounded" width={70} height={30} />

      </div>

    </div>
  );
}