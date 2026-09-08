import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @countrystatecity/countries finds its database relative to __dirname.
  // Bundled into the server build that path points inside .next, the reads
  // miss, and every lookup comes back empty instead of failing loudly. Keeping
  // it external leaves it a real node_modules require.
  serverExternalPackages: ["@countrystatecity/countries"],
  devIndicators: false,
  reactCompiler: true,
};

export default nextConfig;
