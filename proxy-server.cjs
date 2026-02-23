import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
);

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' http://rest-test.machineheads.ru http://localhost:3001; img-src 'self' data:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
  );
  next();
});

app.use(
  "/auth",
  createProxyMiddleware({
    target: "http://rest-test.machineheads.ru",
    changeOrigin: true,
    pathRewrite: {
      "^/auth": "/auth",
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log("Proxying auth request:", req.method, req.url);
    },
    onError: (err, req, res) => {
      console.log("Proxy error:", err);
      res.status(500).send("Proxy error");
    },
  }),
);

app.use(
  "/manage",
  createProxyMiddleware({
    target: "http://rest-test.machineheads.ru",
    changeOrigin: true,
    pathRewrite: {
      "^/manage": "/manage",
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log("Proxying manage request:", req.method, req.url);
    },
    onError: (err, req, res) => {
      console.log("Proxy error:", err);
      res.status(500).send("Proxy error");
    },
  }),
);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(3001, () => {
  console.log("Proxy server running on http://localhost:3001");
  console.log("Test health endpoint: http://localhost:3001/health");
});
