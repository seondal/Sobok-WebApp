import Footer from "./Footer";

export default function Layout({ children }: any) {
  return (
    <div className="container">
      {children}
      <hr />
      <Footer />
    </div>
  );
}
