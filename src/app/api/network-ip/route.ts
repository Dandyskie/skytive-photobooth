import { NextResponse } from "next/server";
import os from "os";

export const dynamic = "force-dynamic";

export async function GET() {
  const interfaces = os.networkInterfaces();
  let lanIp: string | null = null;

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      // Find IPv4 non-internal address (Wi-Fi or Ethernet)
      if (iface.family === "IPv4" && !iface.internal) {
        lanIp = iface.address;
        break;
      }
    }
    if (lanIp) break;
  }

  return NextResponse.json({ lanIp });
}
