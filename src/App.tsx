import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 min-h-0">
        <Container />
      </div>
      <Footer />
    </div>
  );
}

export default App;