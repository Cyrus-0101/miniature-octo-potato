import dotenv from "dotenv";
import express from "express";
import loggerMiddleware from "./auth/helpers/Logger";

import CompositionRoot from "./CompositionRoot";

dotenv.config();
CompositionRoot.configure();

// Global Variables.
const app = express();

const PORT = process.env.PORT;

// Application Middleware.
app.use(express.json());

app.use(loggerMiddleware);

app.use(express.urlencoded({ extended: true }));

app.use('/auth', CompositionRoot.authRouter());

app.use('/restaurants', CompositionRoot.restaurantRouter());

app.listen(PORT, () => {
    console.log(`Mbuzi Munch is live, listening on port ${PORT}.`);
});
