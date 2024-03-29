import { ImageResponse } from "next/og";

import Logo from "@components/Logo";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

const Icon = () => {
  return new ImageResponse(
    (
      <div
        style={{
          background: "transparent",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 5,
        }}
      >
        <Logo style={size} />
      </div>
    ),
    {
      ...size,
    },
  );
};

export default Icon;
