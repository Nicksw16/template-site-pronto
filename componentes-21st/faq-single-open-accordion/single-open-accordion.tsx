"use client";
import * as React from "react";
import { Plus } from "lucide-react"; // TROCAR por Plus do @phosphor-icons/react

export interface SingleOpenAccordionProps {
    items: {
        id: string;
        question: string;
        answer: React.ReactNode;
        category?: string;
    }[];
    title?: string;
    description?: string;
    defaultOpenId?: string;
    openId?: string | null;
    onOpenChange?: (id: string | null) => void;
    className?: string;
}

export default function SingleOpenAccordion({
  items,
  title = "Questions",
  description,
  defaultOpenId,
  openId,
  onOpenChange,
  className = ""
}: SingleOpenAccordionProps) {
  const uid = React.useId();
  const [internal, setInternal] = React.useState<string | null>(defaultOpenId ?? null);
  const active = openId === undefined ? internal : openId;

  const toggle = (id: string) => {
    const next = active === id ? null : id;
    setInternal(next);
    onOpenChange?.(next);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next =
      event.key === "ArrowDown"
        ? (index + 1) % items.length
        : event.key === "ArrowUp"
        ? (index - 1 + items.length) % items.length
        : event.key === "Home"
        ? 0
        : event.key === "End"
        ? items.length - 1
        : -1;
    if (next >= 0) {
      event.preventDefault();
      document.getElementById(`${uid}-q-${next}`)?.focus();
    }
  };

  return (
    <section className={`w-full max-w-2xl mx-auto p-4 sm:p-6 text-foreground font-sans ${className}`}>
      <div className="border border-border rounded-xl p-5 sm:p-6 bg-card text-card-foreground shadow-sm">
        <header className="flex flex-col gap-1.5 mb-6">
          {/* REMOVER este eyebrow "Good to know" (regra de eyebrows do design) */}
          <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
            Good to know
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
            {title}
          </h2>
          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed mt-1">
              {description}
            </p>
          )}
        </header>

        <div className="divide-y divide-border">
          {items.map((item, index) => {
            const isOpen = active === item.id;
            return (
              <article key={item.id} className="py-1">
                <h3>
                  <button
                    type="button"
                    id={`${uid}-q-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`${uid}-a-${index}`}
                    onClick={() => toggle(item.id)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left font-medium text-foreground transition-all hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                  >
                    <span className="text-sm sm:text-base">{item.question}</span>
                    <span
                      className={`shrink-0 transition-transform duration-200 text-muted-foreground ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`${uid}-a-${index}`}
                  role="region"
                  aria-labelledby={`${uid}-q-${index}`}
                  className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 mb-4" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="text-sm text-muted-foreground leading-relaxed pt-1 pr-6 flex flex-col gap-2">
                      {item.category && (
                        <div>
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium border border-border bg-muted text-muted-foreground">
                            {item.category}
                          </span>
                        </div>
                      )}
                      <div>{item.answer}</div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {!items.length && (
          <p className="text-center py-8 text-sm text-muted-foreground">
            No questions available.
          </p>
        )}
      </div>
    </section>
  );
}
