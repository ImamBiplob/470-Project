import http from "./httpSrvice";

export function getDoctors() {
  return http.get("http://localhost:3900/api/doctors");
}
