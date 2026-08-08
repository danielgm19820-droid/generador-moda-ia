import "./globals.css";

export const metadata = {
  title: "Generador IA de Moda",
  description: "Crea fotos de producto con un flujo guiado."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
