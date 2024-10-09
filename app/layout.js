import "../styles/globals.css";
import "../styles/custom.css";
export const metadata = {
  title: "Pokemon Search",
  description: "Search for your favorite Pokemon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
