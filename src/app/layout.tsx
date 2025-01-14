import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { AuthenticationProvider } from "./provider/AuthenticationProvider";

const roboto = Roboto({
  variable: "--roboto",
  subsets: ['latin'],
  weight: '400'
});

export const metadata: Metadata = {
  title: "Tasks",
  description: "Tasks Web interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const oAuthConfig = {
    authorizeUri: "http://localhost:9000/oauth2/authorize",
    tokenUri: "http://localhost:9000/oauth2/token",
    clientId: "tasks-web",
    redirectUri: "http://localhost:3000/login",
    scopes: ["openid"]
  }

  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <AuthenticationProvider oAuthConfig={ oAuthConfig }>
          {children}
          </AuthenticationProvider>
      </body>
    </html>
  );
}
