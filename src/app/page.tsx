import Header from "@/components/Header";
import Hero from "./_home/Hero";
import Components from "./_home/Components";
import Footer from "@/components/footer";

const Home: React.FC = () => {
  return (
    <main className="bg-background w-full flex flex-col gap-16 md:gap-24">
      <section className="w-full h-screen bg-primary/[.15]">
        <Header />
        <Hero />
      </section>
      <Components />
      <Footer />
    </main>
  );
};

export default Home;
