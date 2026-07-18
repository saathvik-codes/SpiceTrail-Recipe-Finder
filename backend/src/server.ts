import "dotenv/config";
import { createApp } from "./app";
import { connectDb } from "./config/db";

const PORT = Number(process.env.PORT ?? 4000);
const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://localhost:27017/spicetrail";

async function main() {
  await connectDb(MONGODB_URI);
  const app = createApp();
  app.listen(PORT, () => console.log(`SpiceTrail API listening on port ${PORT}`));
}

main().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
