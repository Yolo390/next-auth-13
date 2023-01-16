import "@/styles/globals.css";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head />
      <body className="h-screen bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
