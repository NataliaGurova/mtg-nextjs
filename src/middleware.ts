export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/account/:path*"],
};

// все пути, которые нужно защитить с помощью аутентификации, можно добавить в массив matcher выше