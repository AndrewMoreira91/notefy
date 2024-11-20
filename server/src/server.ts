import express from "express";
import router from "./routes";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

import swaggerDocs from "./swagger.json";
import errorHandler from "./error/handleError";

const app = express();

app.use(express.json());

app.use(cors({
	origin: "*",
}));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
	explorer: true,
	customSiteTitle: "API Notefy - Documentação",
}));

router(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Api rodando na porta ${PORT}`);
});
