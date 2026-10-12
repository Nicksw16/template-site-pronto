// Se algum componente quebrar no navegador do visitante, mostra uma versão simples em vez da tela vazia.
import { Component, type ReactNode } from 'react'
import { waGeral } from '@/lib/site'

export class ErroSeguro extends Component<{ children: ReactNode }, { erro: boolean }> {
  state = { erro: false }
  static getDerivedStateFromError() {
    return { erro: true }
  }
  render() {
    if (!this.state.erro) return this.props.children
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
        <p className="font-serif text-4xl">Villa Aurora</p>
        <p className="text-muted-foreground">Espaço e buffet</p>
        <a href={waGeral} target="_blank" rel="noopener noreferrer" className="bg-primary text-primary-foreground rounded-xl px-6 py-3 font-semibold">
          Pedir orçamento pelo WhatsApp
        </a>
      </main>
    )
  }
}
