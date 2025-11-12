# 🐾 Amigo de 4 Patas

Uma plataforma minimalista e acolhedora para adoção de cães abandonados, construída com **Next.js 15** e **TailwindCSS**.

## 📋 Sobre o Projeto

**Amigo de 4 Patas** é uma aplicação web focada em conectar cães abandonados com famílias que querem adotar. O design é limpo, empático e direto ao ponto, usando apenas preto, branco e tons de cinza para criar uma experiência visual serena e focada no que realmente importa: os cães.

## ✨ Funcionalidades

- **Home Page**: Grid responsivo com cards de cães disponíveis para adoção
- **Filtros avançados**: Busque por nome, porte, idade e cidade
- **Página individual do cão**: Detalhes completos com foto, história e personalidade
- **Formulário de adoção**: Processo simples e amigável para manifestar interesse
- **Histórias Felizes**: Galeria inspiradora de adoções bem-sucedidas (antes e depois)
- **Painel Admin**: CRUD completo para gerenciar os cães cadastrados

## 🎨 Design

### Paleta de Cores
- **Preto**: `#000000`
- **Branco**: `#ffffff`
- **Cinzas**: `#f4f4f4`, `#e0e0e0`, `#777777`

### Tipografia
- Fonte principal: **Inter** (Google Fonts)

### Princípios de Design
- Layout limpo e centrado
- Espaçamento generoso
- Hover sutil (leve sombra ou inversão)
- Botões com cantos arredondados (6-8px)
- Sem degradês, sem brilhos, sem efeitos artificiais

## 🚀 Tecnologias

- **Next.js 15**: Framework React com App Router
- **React 19**: Biblioteca para interfaces
- **TypeScript**: Tipagem estática
- **TailwindCSS**: Estilização utilitária
- **JSON**: Mock de dados (fácil migração para banco real)

## 📁 Estrutura do Projeto

```
amigo-4-patas/
├── app/
│   ├── admin/              # Painel administrativo
│   ├── adotar/[id]/        # Formulário de adoção
│   ├── dog/[id]/           # Página individual do cão
│   ├── historias/          # Histórias felizes
│   ├── globals.css         # Estilos globais
│   ├── layout.tsx          # Layout raiz
│   ├── not-found.tsx       # Página 404
│   └── page.tsx            # Home page
├── components/
│   ├── DogCard.tsx         # Card de cão
│   ├── DogFilters.tsx      # Filtros de busca
│   └── Header.tsx          # Cabeçalho
├── data/
│   └── dogs.json           # Dados mock dos cães
├── lib/
│   └── dogs.ts             # Funções auxiliares
├── types/
│   └── dog.ts              # Tipos TypeScript
├── public/                 # Arquivos estáticos
├── next.config.ts          # Configuração Next.js
├── tailwind.config.ts      # Configuração Tailwind
├── tsconfig.json           # Configuração TypeScript
└── package.json            # Dependências
```

## 🛠️ Instalação e Uso

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Passo a passo

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd Projeto-Unipampa-Cidad-
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o projeto em modo desenvolvimento**
```bash
npm run dev
```

4. **Acesse no navegador**
```
http://localhost:3000
```

### Scripts disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Cria build de produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa linter
```

## 📱 Páginas

### 1. Home (`/`)
- Grid responsivo de cães disponíveis
- Filtros por porte, idade, cidade e busca textual
- Cards com foto, nome, idade, porte e personalidade
- Hover animado sutil

### 2. Página do Cão (`/dog/[id]`)
- Foto grande do cão
- Informações detalhadas (nome, idade, porte, cidade, personalidade)
- História completa
- Botão "Quero Adotar"

### 3. Formulário de Adoção (`/adotar/[id]`)
- Dados pessoais (nome, e-mail, telefone, endereço)
- Perguntas sobre a casa (quintal, outros pets)
- Experiência com animais
- Motivação para adoção
- Tela de confirmação amigável após envio

### 4. Histórias Felizes (`/historias`)
- Galeria de adoções realizadas
- Fotos antes e depois
- Relatos dos adotantes
- CTA para ver cães disponíveis

### 5. Painel Admin (`/admin`)
- Lista todos os cães cadastrados
- Adicionar novo cão
- Editar informações
- Excluir cão
- Alternar status (disponível/adotado)

**Nota**: As alterações no Admin são apenas em memória (não persistem após recarregar a página). Para persistência real, integre com um banco de dados.

## 🗂️ Dados Mock

Os dados dos cães estão em `data/dogs.json`. A estrutura é:

```json
{
  "dogs": [
    {
      "id": "1",
      "name": "Nome do Cão",
      "age": "Adulto",
      "size": "Grande",
      "personality": "Carinhoso",
      "city": "Cidade",
      "description": "Descrição curta",
      "story": "História completa",
      "image": "URL da imagem",
      "adopted": false
    }
  ],
  "happyStories": [...]
}
```

## 🎯 Próximos Passos

Para tornar este projeto completo em produção:

1. **Backend real**
   - Integrar com Supabase, Firebase ou outro backend
   - API Routes do Next.js para operações CRUD
   - Autenticação no painel Admin

2. **Upload de imagens**
   - Integrar com Cloudinary, AWS S3 ou similar
   - Upload direto pelo Admin

3. **E-mails**
   - Enviar e-mail de confirmação após adoção
   - Notificar administradores sobre novos interessados

4. **Melhorias de UX**
   - Animações mais elaboradas
   - Loading states
   - Toast notifications

5. **SEO e Performance**
   - Meta tags dinâmicas
   - Otimização de imagens
   - Sitemap e robots.txt

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.

## 💙 Contato

Projeto desenvolvido com amor para ajudar cães a encontrarem um lar.

---

**Feito com ❤️ para os amigos de 4 patas**
