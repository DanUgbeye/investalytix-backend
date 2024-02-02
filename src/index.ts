import app from "./app";
import SERVER_CONFIG from "./globals/config/server-config";
import database from "./globals/config/database";

database
  .connect()
  .then(() => {
    console.log(`⚡connected to database⚡`);
    app.listen(SERVER_CONFIG.PORT);
    console.log(`server running on port ${SERVER_CONFIG.PORT} ✅`);
  })
  .catch((err) => {
    console.log("\n ❌❌❌ An Error occured ❗⚠️\n");
    console.log(err);
  });
