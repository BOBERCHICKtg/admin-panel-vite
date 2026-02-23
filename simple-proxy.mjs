import express from "express";
import cors from "cors";
import axios from "axios";
import FormData from "form-data";
import https from "https";

const app = express();
const PORT = 3001;

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/auth/token-generate", async (req, res) => {
  try {
    console.log("📨 Received login request");

    const formData = new FormData();
    formData.append("email", "test@test.ru");
    formData.append("password", "khro2ij3n2730");

    const response = await axios.post(
      "https://rest-test.machineheads.ru/auth/token-generate",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Accept: "application/json",
        },
        httpsAgent,
        maxRedirects: 5,
        timeout: 10000,
      },
    );

    console.log("✅ API Response:", response.status);
    console.log("📦 Data:", response.data);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("❌ Proxy error:", error.message);

    if (error.response) {
      console.log(
        "Error response:",
        error.response.status,
        error.response.data,
      );
      res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      console.log("No response from API");
      res.status(503).json({ error: "API недоступен" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

app.post("/auth/token-refresh", async (req, res) => {
  try {
    console.log("📨 Received token refresh request");

    let refresh_token;
    if (req.headers["content-type"]?.includes("multipart/form-data")) {
      refresh_token = req.body.refresh_token;
    } else {
      refresh_token = req.body.refresh_token;
    }

    if (!refresh_token) {
      return res.status(400).json({ error: "refresh_token required" });
    }

    const formData = new FormData();
    formData.append("refresh_token", refresh_token);

    const response = await axios.post(
      "https://rest-test.machineheads.ru/auth/token-refresh",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Accept: "application/json",
        },
        httpsAgent,
        maxRedirects: 5,
        timeout: 10000,
      },
    );

    console.log("✅ Refresh Response:", response.status);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("❌ Refresh error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/manage/posts", async (req, res) => {
  try {
    console.log("📨 Received posts request, page:", req.query.page);

    const token = req.headers.authorization;

    const response = await axios.get(
      "https://rest-test.machineheads.ru/manage/posts",
      {
        params: { page: req.query.page || 1 },
        headers: {
          Authorization: token,
          Accept: "application/json",
        },
        httpsAgent,
        maxRedirects: 5,
        timeout: 10000,
      },
    );

    if (response.headers["x-pagination-current-page"]) {
      res.setHeader(
        "x-pagination-current-page",
        response.headers["x-pagination-current-page"],
      );
      res.setHeader(
        "x-pagination-page-count",
        response.headers["x-pagination-page-count"],
      );
      res.setHeader(
        "x-pagination-per-page",
        response.headers["x-pagination-per-page"],
      );
      res.setHeader(
        "x-pagination-total-count",
        response.headers["x-pagination-total-count"],
      );
    }

    console.log("✅ Posts Response:", response.status);
    console.log("📊 Pagination:", {
      current: response.headers["x-pagination-current-page"],
      count: response.headers["x-pagination-page-count"],
      total: response.headers["x-pagination-total-count"],
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("❌ Posts error:", error.message);
    if (error.response?.status === 401) {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    proxy: "running",
    api: "https://rest-test.machineheads.ru",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API URL: https://rest-test.machineheads.ru`);
});
