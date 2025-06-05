export const Config = {
    databaseURL: process.env.DATABASE_URL || "file:./dev.db",
    jwtSecret: process.env.JWT_SECRET || "your-secret-key"
}