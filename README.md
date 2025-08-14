# LinguaSchool - Next.js Fullstack Application

Kompletna platforma do nauki języków online zbudowana w Next.js z możliwością wdrożenia na Vercel.

## 🚀 Funkcjonalności

### Frontend
- **Wielojęzyczność**: Pełne wsparcie dla 4 języków (PL, UA, EN, RU)
- **Responsywny design**: Optymalizacja dla wszystkich urządzeń
- **Nowoczesny UI**: Profesjonalny design z animacjami
- **SEO-friendly**: Optymalizacja dla wyszukiwarek

### Backend
- **API Routes**: RESTful API w Next.js
- **Supabase Integration**: Baza danych PostgreSQL z RLS
- **Authentication**: Pełny system uwierzytelniania
- **Admin Panel**: CMS do zarządzania treścią

### Strony
- **Homepage**: Strona główna z hero section i kursami
- **About Us**: Kompletna sekcja o firmie
- **Services**: Szczegółowe usługi z cenami
- **Contact**: Formularz kontaktowy z API
- **FAQ**: Sekcja pytań z wyszukiwaniem
- **Privacy Policy**: Polityka prywatności
- **Terms of Service**: Regulamin

## 🛠️ Technologie

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel
- **Icons**: Lucide React

## 📦 Instalacja

1. **Klonowanie repozytorium**
```bash
git clone <repository-url>
cd linguaschool-nextjs
```

2. **Instalacja zależności**
```bash
npm install
```

3. **Konfiguracja środowiska**
```bash
cp .env.example .env.local
```

Wypełnij zmienne środowiskowe w `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Uruchomienie w trybie deweloperskim**
```bash
npm run dev
```

## 🗄️ Baza danych

### Konfiguracja Supabase

1. Utwórz nowy projekt w [Supabase](https://supabase.com)
2. Uruchom migracje z folderu `supabase/migrations/`
3. Skonfiguruj RLS policies
4. Dodaj Google OAuth (opcjonalnie)

### Tabele
- `courses` - Kursy językowe
- `instructors` - Instruktorzy
- `lessons` - Lekcje
- `materials` - Materiały do lekcji
- `course_instructors` - Relacje kurs-instruktor

## 🚀 Wdrożenie na Vercel

### Automatyczne wdrożenie

1. **Połącz z GitHub**
   - Zaloguj się do [Vercel](https://vercel.com)
   - Importuj repozytorium z GitHub

2. **Konfiguracja zmiennych środowiskowych**
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Deploy**
   - Vercel automatycznie wykryje Next.js
   - Aplikacja zostanie wdrożona na `your-app.vercel.app`

### Ręczne wdrożenie

```bash
# Zainstaluj Vercel CLI
npm i -g vercel

# Zaloguj się
vercel login

# Wdróż
vercel --prod
```

## 📁 Struktura projektu

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── admin/             # Admin panel
│   ├── auth/              # Authentication pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── admin/             # Admin components
│   ├── auth/              # Auth components
│   ├── layout/            # Layout components
│   └── pages/             # Page components
├── contexts/              # React contexts
├── lib/                   # Utilities
└── types/                 # TypeScript types
```

## 🔧 API Endpoints

- `GET /api/courses` - Lista kursów
- `POST /api/courses` - Tworzenie kursu
- `GET /api/instructors` - Lista instruktorów
- `POST /api/instructors` - Tworzenie instruktora
- `POST /api/contact` - Formularz kontaktowy

## 🌐 Wielojęzyczność

### Dodawanie nowych tłumaczeń

1. Edytuj `src/contexts/LanguageContext.tsx`
2. Dodaj nowe klucze w obiekcie `translations`
3. Użyj `t('key')` w komponentach

### Obsługiwane języki
- **English (EN)** - Domyślny
- **Ukrainian (UA)** - Ukraiński
- **Polish (PL)** - Polski
- **Russian (RU)** - Rosyjski

## 🔐 Bezpieczeństwo

- **RLS Policies**: Zabezpieczenie na poziomie bazy danych
- **Authentication**: Supabase Auth z Google OAuth
- **Protected Routes**: Middleware dla tras admin
- **CORS**: Konfiguracja dla API

## 📊 Monitoring i Analytics

- **Vercel Analytics**: Wbudowane w platformę
- **Error Tracking**: Console logging
- **Performance**: Next.js built-in optimization

## 🤝 Wsparcie

Dla wsparcia technicznego lub pytań dotyczących implementacji, skontaktuj się z zespołem deweloperskim.

## 📄 Licencja

Ten projekt jest własnością LinguaSchool. Wszystkie prawa zastrzeżone.