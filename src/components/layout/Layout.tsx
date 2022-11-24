import Footer from "./Footer";

export default function Layout({ children }: any) {
  return (
    <div className="container">
      {children}
      <Footer />
    </div>
  );
}
