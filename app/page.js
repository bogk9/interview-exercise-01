import Collection from "@/components/Collection/Collection";
import Form from "@/components/Form/Form";
import InfoDialog from "@/components/InfoDialog/InfoDialog";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-evenly h-full min-h-[100vh]">
      <div className="z-50">
        <h1 className="flex items-center h-40 gap-4 mb-4 text-6xl font-bold text-white">
          Planetary API
          <InfoDialog />
        </h1>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center gap-16 sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row sm:gap-16 md:gap-16 lg:gap-0 xl:gap-0 2xl:gap-0">
        <Collection />
        <Form />
      </div>
      <div className="twinkler " />
    </main>
  );
}
