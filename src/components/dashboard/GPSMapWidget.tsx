
import React, { Suspense } from "react";
const EnhancedGPSMap = React.lazy(() => import("./EnhancedGPSMap"));

const GPSMapWidget = () => {
  return (
    <Suspense fallback={null}>
      <EnhancedGPSMap />
    </Suspense>
  );
};

export default GPSMapWidget;
