import { ServiceCard } from "@/components/ui/service-card";

// Demo adaptada: imagens locais (o original apontava para thiings.co, CDN de terceiros).
const Demo = () => {
  const services = [
    { title: "Festa infantil", href: "#orcamento", imgSrc: "/img/servico-infantil.png", imgAlt: "Decoração de festa infantil [trocar]", variant: "default" },
    { title: "Casamento", href: "#orcamento", imgSrc: "/img/servico-casamento.png", imgAlt: "Mesa de casamento [trocar]", variant: "gray" },
    { title: "15 anos", href: "#orcamento", imgSrc: "/img/servico-15anos.png", imgAlt: "Festa de 15 anos [trocar]", variant: "default" },
    { title: "Corporativo", href: "#orcamento", imgSrc: "/img/servico-corporativo.png", imgAlt: "Confraternização [trocar]", variant: "gray" },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.title}
            title={service.title}
            href={service.href}
            imgSrc={service.imgSrc}
            imgAlt={service.imgAlt}
            variant={service.variant as "default" | "gray"}
            className="min-h-[180px]"
          />
        ))}
      </div>
    </div>
  );
};

export default Demo;
