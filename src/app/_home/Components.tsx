import { name, components } from "@/assets/data/home/Components";

const Components: React.FC = () => {
  return (
    <section className="container-body py-24">
      <main className="flex flex-col items-center gap-12 md:gap-20">
        <h1 className="heading-primary">{name}</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 justify-center gap-y-12 gap-x-10">
          {components.map((component, index) => (
            <div
              key={index}
              className="w-full flex flex-col"
            >
              <div className="h-12 md:h-16 w-12 md:w-16 bg-primary-tints-200 rounded-full flex justify-center items-center mb-5 md:mb-8">
                <component.icon className="h-6 md:h-8 w-6 md:w-8" />
              </div>
              <div>
                <h2 className="heading-tertiary mb-2 md:mb-4">{component.title}</h2>
                <p className="text-large leading-6 md:leading-8">{component.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </section>
  );
};

export default Components;
