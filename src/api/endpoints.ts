import axiosInstance from "./axios-instance";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Post {
  id: number;
  title: string;
  code: string;
  authorName: string;
  tagNames: string[];
  createdAt: string;
}

export const authAPI = {
  login: async (credentials: LoginCredentials) => {
    try {
      const formData = new FormData();
      formData.append("email", credentials.email);
      formData.append("password", credentials.password);

      console.log("Sending login request...");
      const response = await axiosInstance.post(
        "/auth/token-generate",
        formData,
      );
      console.log("Login response:", response.data);
      return response.data;
    } catch (error: any) {
      console.log("Login error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
  },
};

export const postsAPI = {
  getPosts: async (page: number = 1) => {
    try {
      console.log("Fetching posts page:", page);
      const response = await axiosInstance.get("/manage/posts", {
        params: { page },
      });

      console.log("Posts response headers:", response.headers);

      return {
        data: response.data || [],
        pagination: {
          currentPage: parseInt(
            response.headers["x-pagination-current-page"] || "1",
          ),
          pageCount: parseInt(
            response.headers["x-pagination-page-count"] || "1",
          ),
          totalCount: parseInt(
            response.headers["x-pagination-total-count"] || "0",
          ),
        },
      };
    } catch (error: any) {
      console.log("Posts error:", error.response?.data || error.message);
      throw error;
    }
  },
};
