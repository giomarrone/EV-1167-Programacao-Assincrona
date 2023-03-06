import { http } from "./config";

export default {
  get: async () => {
    const response = await http.get("/games/");
    return response;
  },
  delete: async (id) => {
    return http.delete(`/games/${id}`);
  },
  post: async (request) => {
    const response = await http.post("/games/", request);
    return response;
  },
  put: async (request) => {
    const response = await http.put(`/games/${request.id}/`, request);
    return response;
  },
};
