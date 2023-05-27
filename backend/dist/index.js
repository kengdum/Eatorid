"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const database_seeding_1 = require("./database_seeding");
const path_1 = __importDefault(require("path"));
const http_errors_1 = __importDefault(require("http-errors"));
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
app.use(express_1.default.json());
app.use(routes_1.default);
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "../public", "index.html"));
    });
}
app.use((req, res, next) => {
    next(http_errors_1.default.NotFound());
});
app.use((err, req, res, next) => {
    const error = {
        status: err.status || 500,
        message: err.message,
    };
    res.status(error.status).send(error);
});
mongoose_1.default
    .connect(process.env.DATABASE_URL)
    .then(() => {
    return (0, database_seeding_1.seedDatabase)();
})
    .then(() => {
    app.listen(PORT, () => {
        console.log("Connected to MongoDB");
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch(err => {
    console.log("Could not connect");
    console.log(err);
});
