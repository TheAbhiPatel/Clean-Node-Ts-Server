import "dotenv/config";

export const PORT = process.env.PORT;

// export const MONGO_URL = process.env.MONGO_URL!;
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

export const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@typescriptstart.m22r0gj.mongodb.net/optProject`;

export const HOST_NAME = process.env.HOST_NAME;

export const JWT_SECRET = process.env.JWT_SECRET!;
