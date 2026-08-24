import dotenv from "dotenv";

dotenv.config({ path: new URL("../../../packages/database/.env", import.meta.url) });

const { createApp } = await import("./app.js");

const port = Number(process.env.API_PORT ?? 4000);

createApp().listen(port, () => {
  console.log(`HTTP API listening on http://localhost:${port}`);
});
