"use client";

import React from "react";
import SingleOpenAccordion from "@/components/ui/single-open-accordion";

// Perguntas de exemplo para o nicho (respostas a confirmar com o cliente).
const items = [
  { id: "data", question: "Como reservo uma data?", answer: "Chame no WhatsApp informando data, número de convidados e tipo de festa. Respondemos com orçamento e opções de visita." },
  { id: "visita", question: "Posso visitar o espaço antes?", answer: "Sim, as visitas são com agendamento [horários a confirmar]." },
  { id: "buffet", question: "O buffet está incluso?", answer: "Temos cardápios Clássico, Premium e Coquetel/Finger food. Valores: a partir de [R$ por convidado]." },
  { id: "capacidade", question: "Quantos convidados cabem?", answer: "O salão comporta até [X] convidados [confirmar]." },
];

export default function SingleOpenAccordionDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4 md:p-8 min-h-[500px]">
      <SingleOpenAccordion title="Perguntas frequentes" items={items} defaultOpenId="data" />
    </div>
  );
}
