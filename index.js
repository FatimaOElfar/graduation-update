import server from "./src/server.js";
import "dotenv/config";
import Logger from "./src/utils/logger.js";

const port = process.env.PORT || 5000;

server.listen(port, () => Logger.log(`Server is running at port ${port}`));
