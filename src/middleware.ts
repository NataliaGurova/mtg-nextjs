export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/profile", "/orders"],
};

// все пути, которые нужно защитить с помощью аутентификации, можно добавить в массив matcher выше