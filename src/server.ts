import app from "./app";
import { env_config } from "./config";

function bootstrap() {
  app.listen(env_config.port, () =>
    console.log("Server Running port -", env_config.port)
  );
}

bootstrap();
