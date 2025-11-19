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
- **Painel Admin**: CRUD completo com persistência real em MongoDB
- **Persistência de Dados**: MongoDB com Mongoose para armazenamento
- **API REST**: Endpoints completos para gerenciamento de dados
- **Ícones**: Lucide React para interface limpa sem emojis

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

- **Next.js 15**: Framework React com App Router e Server Components
- **React 19**: Biblioteca para interfaces
- **TypeScript**: Tipagem estática forte
- **TailwindCSS**: Estilização utilitária
- **MongoDB**: Banco de dados NoSQL
- **Mongoose**: ODM para MongoDB com schemas e validação
- **Lucide React**: Biblioteca de ícones moderna e limpa

## 📁 Estrutura do Projeto

```
amigo-4-patas/
├── app/
│   ├── api/                # API Routes
│   │   ├── dogs/           # CRUD de cães
│   │   └── happy-stories/  # Histórias felizes
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
│   ├── DogGrid.tsx         # Grid com filtros client-side
│   └── Header.tsx          # Cabeçalho
├── data/
│   └── dogs.json           # Dados para seed inicial
├── lib/
│   ├── dogs.ts             # Funções auxiliares (legado)
│   └── mongodb/
│       └── connection.ts   # Conexão MongoDB
├── models/
│   ├── Dog.ts              # Schema Mongoose do Dog
│   └── HappyStory.ts       # Schema Mongoose do HappyStory
├── scripts/
│   └── seed.ts             # Script para popular banco
├── types/
│   └── dog.ts              # Tipos TypeScript
├── .env.example            # Exemplo de variáveis de ambiente
├── next.config.ts          # Configuração Next.js
├── tailwind.config.ts      # Configuração Tailwind
├── tsconfig.json           # Configuração TypeScript
└── package.json            # Dependências
```

## 🛠️ Instalação e Uso

### Pré-requisitos
- Node.js 18+ instalado
- MongoDB instalado localmente OU MongoDB Atlas (cloud)
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

3. **Configure as variáveis de ambiente**
```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Edite .env.local e configure a URL do MongoDB:
# Para MongoDB local:
MONGODB_URI=mongodb://localhost:27017/amigo-4-patas

# Para MongoDB Atlas (cloud):
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/amigo-4-patas
```

4. **Popular o banco de dados (primeira vez)**
```bash
npm run seed
```

Este comando irá:
- Conectar ao MongoDB
- Limpar dados existentes
- Inserir 8 cães de exemplo
- Inserir 3 histórias felizes

5. **Execute o projeto em modo desenvolvimento**
```bash
npm run dev
```

6. **Acesse no navegador**
```
http://localhost:3000
```

### Scripts disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Cria build de produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa linter
npm run seed     # Popular banco de dados com dados iniciais
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
- Lista todos os cães cadastrados (com persistência MongoDB)
- Adicionar novo cão
- Editar informações
- Excluir cão permanentemente
- Alternar status (disponível/adotado)
- Loading states e feedback visual
- Todas as alterações persistem no banco de dados

## 🔌 API REST

A aplicação possui uma API REST completa para gerenciamento de dados:

### Cães (Dogs)

**GET /api/dogs**
- Lista todos os cães
- Query params: `size`, `age`, `city`, `search`, `adopted`
- Exemplo: `/api/dogs?size=Grande&city=São Paulo`

**GET /api/dogs/[id]**
- Busca um cão específico por ID

**POST /api/dogs**
- Cria um novo cão
- Body: objeto Dog completo
- Validação automática via Mongoose

**PUT /api/dogs/[id]**
- Atualiza um cão existente
- Body: campos a serem atualizados

**DELETE /api/dogs/[id]**
- Deleta um cão permanentemente

### Histórias Felizes

**GET /api/happy-stories**
- Lista todas as histórias felizes
- Ordenadas por data (mais recentes primeiro)

**POST /api/happy-stories**
- Cria uma nova história feliz
- Body: objeto HappyStory completo

## 🗂️ Banco de Dados

### Schemas Mongoose

**Dog (Cão)**
```typescript
{
  name: String (required, 2-50 chars)
  age: 'Filhote' | 'Adulto' | 'Idoso' (required)
  size: 'Pequeno' | 'Médio' | 'Grande' (required)
  personality: String (required, enum de 8 opções)
  city: String (required)
  description: String (required, 10-500 chars)
  story: String (required, 20-2000 chars)
  image: String (required, URL válida)
  adopted: Boolean (default: false)
  timestamps: true (createdAt, updatedAt)
}
```

**HappyStory (História Feliz)**
```typescript
{
  dogName: String (required)
  adopterName: String (required)
  story: String (required, 20-2000 chars)
  beforeImage: String (required, URL válida)
  afterImage: String (required, URL válida)
  date: String (required)
  timestamps: true
}
```

### Dados de Seed

Os dados iniciais estão em `data/dogs.json`:
- 8 cães de exemplo
- 3 histórias felizes
- Use `npm run seed` para popular o banco

## 🎯 Melhorias Futuras

Próximos passos para levar o projeto a produção:

1. **Autenticação**
   - Proteger painel Admin com autenticação
   - NextAuth.js ou Clerk
   - Diferentes níveis de permissão

2. **Upload de imagens**
   - Integrar com Cloudinary, AWS S3 ou similar
   - Upload direto pelo Admin (sem precisar de URLs)
   - Redimensionamento automático

3. **E-mails**
   - Enviar e-mail de confirmação após adoção
   - Notificar administradores sobre novos interessados
   - Templates personalizados

4. **Melhorias de UX**
   - Toast notifications
   - Confirmações modais mais bonitas
   - Skeleton loading
   - Paginação na lista de cães

5. **SEO e Performance**
   - Meta tags dinâmicas por página
   - Otimização de imagens (next/image já ajuda)
   - Sitemap dinâmico
   - Cache avançado

6. **Deploy**
   - Vercel (Next.js)
   - MongoDB Atlas (banco de dados)
   - Configurar domínio customizado

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.

## 💙 Contato

Projeto desenvolvido com amor para ajudar cães a encontrarem um lar.

---

**Feito com ❤️ para os amigos de 4 patas**
