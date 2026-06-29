import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const ACCENT = "#f4b84d";
const BG = "#0d1117";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: BG,
        color: ACCENT,
        fontSize: 20,
        fontWeight: 700,
        fontFamily: "monospace",
        letterSpacing: "-1px",
        paddingBottom: 1,
        borderRadius: 11,
      }}
    >
      {">_"}
    </div>,
    {
      ...size,
    },
  );
}
