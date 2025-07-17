import Container from "@/components/Container";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-muted/40 to-background/80">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <Container
          left={<div className="text-xl font-bold">Left Side</div>}
          right={<div className="text-xl font-bold">Right Side</div>}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;