# Garden Minder — Product & Delivery Plan for a Gardener's Companion App

> Name: **Garden Minder**.
> A modern, friendly mobile app that knows your garden — every plant, bed and border —
> and tells you what to do, when to do it, and why, tuned to *your* conditions.

---

## 1. Vision & principles

**Vision:** Every gardener, from first-time balcony grower to seasoned allotment holder,
has a calm, knowledgeable companion in their pocket that turns "what should I be doing
in the garden this week?" into a short, confident to-do list.

**Design principles**

| Principle | What it means in practice |
|---|---|
| **Personal, not generic** | Every task and tip is tuned to the user's location, climate, soil, aspect and plants. No "prune roses in February" if February is still frozen where you live. |
| **Calm, not nagging** | A weekly rhythm with a few well-timed nudges; urgent alerts (frost, heatwave) only when they matter. |
| **Capture in seconds** | Snap a photo or type a name — identification, care profile and tasks happen automatically. |
| **Visual & spatial** | The garden is a map you can see, not a spreadsheet. |
| **Explain the "why"** | Every task has a short reason and a "learn more", so gardeners build skill over time. |
| **Works in the garden** | Offline-first, big touch targets, usable with muddy gloves and in bright sunlight. |

---

## 2. Target users (personas)

1. **New Gardener Nadia** — just moved into a house with an established garden, doesn't
   know what's growing. Needs: photo identification, "what is this and what do I do with it?"
2. **Busy Parent Ben** — enjoys the garden but forgets jobs. Needs: a short weekly list,
   reminders, pet/child-safety warnings.
3. **Experienced Elaine** — large garden, veg patch and greenhouse. Needs: detailed
   records, sowing schedules, succession planting, a journal of what worked.
4. **Allotment Ali** — grows food on a plot away from home. Needs: offline use, crop
   rotation, harvest tracking, weather alerts for a *different* location than home.

---

## 3. Core feature set

### 3.1 Garden profile & personalisation (onboarding)

A friendly, 2–3 minute onboarding that builds a **Garden Profile**. Everything can be
skipped and refined later; sensible defaults are inferred where possible.

| Condition | How it's captured | How it's used |
|---|---|---|
| **Location** | GPS or postcode (stored coarsely, ~1 km) | Climate zone, frost dates, live weather, day length |
| **Climate / hardiness zone** | Auto-derived (RHS H1–H7 for UK, USDA zones elsewhere) | Whether a plant survives winter outdoors; protection tasks |
| **Last spring / first autumn frost** | Auto-derived from historical weather, user-adjustable | Shifts every sowing, planting and protection task |
| **Soil type** | Picker with illustrations (clay, sandy, loam, silt, chalky, peaty) + a guided "squeeze test"; pre-filled from soil maps | Plant suitability, watering frequency, feeding & mulching advice |
| **Soil pH** | Acid / neutral / alkaline / don't know (+ link to a test kit) | Ericaceous plants, lime, hydrangea colour, etc. |
| **Drainage** | Well-drained / average / waterlogged in winter | Rot risk, raised-bed suggestions |
| **Aspect** | Compass in-app ("point your phone out of the back door") | Sun hours per section; plant placement suggestions |
| **Exposure** | Sheltered / moderate / exposed / coastal (salt wind) | Staking, wind-burn, plant choice |
| **Garden type** | Garden, balcony/containers, allotment, greenhouse, community plot (multiple allowed) | Feature emphasis and task types |
| **Microclimates** | Optional per section: frost pocket, rain shadow, south-facing wall, under trees | Section-level adjustments |
| **Water** | Water butt, hosepipe bans in area, irrigation system | Watering advice and drought plans |
| **Gardening style** | Organic / no-dig / wildlife-friendly / low-maintenance / productive | Filters advice (e.g. no chemical treatments for organic users) |
| **Experience level** | Beginner / Intermediate / Expert | Tone and depth of advice, number of tasks |
| **Time available** | e.g. "about 1 hour a week" | Task prioritisation and "must do" vs "nice to do" |
| **Household safety** | Pets (cats, dogs), young children | Toxic-plant warnings, safe pest-control advice |

Users can manage **multiple gardens** (e.g. home + allotment), each with its own profile.

### 3.2 Plant library — record & organise plants, trees and shrubs

**Adding plants (three ways, all < 10 seconds):**

1. **Photo** — take or upload a photo; AI identification returns top 3 matches with
   confidence and example photos. User confirms → full care profile attached.
2. **Text** — type any name (common or Latin, typo-tolerant, e.g. "japanese maple" →
   *Acer palmatum*). Cultivar search supported ("Rosa 'Gertrude Jekyll'").
3. **Seed packet / plant label scan** — OCR on the label to pre-fill name, variety and
   sowing instructions.
4. *(Unknown)* — save as "Mystery plant" with photos; the app re-suggests IDs as it grows
   or flowers.

**Each plant record contains:**

- Name (common, botanical, cultivar), category (tree, shrub, perennial, annual, bulb,
  climber, fruit, vegetable, herb, houseplant, lawn, hedge)
- Photo timeline (auto-dated, great for seeing growth year-on-year)
- Location (garden → section → position on map)
- Date planted / acquired, source (nursery, cutting, seed), quantity
- Size now and expected mature height/spread
- Care profile (sun, water, soil, pH, hardiness, pruning group, feeding, toxicity)
- **Suitability score** for its current spot vs. the garden's conditions
  (e.g. "⚠️ Prefers acid soil — your soil is chalky. Consider a container with ericaceous compost.")
- Health status and history, notes, journal entries
- Linked tasks (upcoming and completed)

**Organising:** search, filters (category, section, needs attention, flowering now,
edible, toxic to pets), sort, tags, collections ("Cut flowers", "Gran's roses"),
and a **"What's flowering / fruiting now"** view.

### 3.3 Garden sections

- Create sections such as *Front border, Veg patch, Lawn, Pond, Greenhouse, Patio pots,
  Shade bed, Orchard*. Templates with icons speed this up.
- Each section has its own **conditions** that inherit from the garden profile but can
  be overridden: sun hours (full sun / part shade / full shade), soil, moisture,
  microclimate, raised bed / container / in-ground / indoors.
- Section view shows its plants, its tasks, its health, and a photo history.
- Veg sections support **crop rotation** groups and **succession** sowing.

### 3.4 Garden map — placing plants in sections

A visual, playful, but accurate plan of the garden.

- **Draw the garden:** start from a blank grid, a template shape, or trace over a
  satellite/aerial image of the property. Set real dimensions by entering one length.
- **Draw sections** as shapes (rectangle, freeform polygon, circle) with colour/texture
  fills (lawn, gravel, bed, paving, water).
- **Place plants** by dragging from the library onto a section. Plants appear as friendly
  illustrated icons/circles sized to their **mature spread**, so overcrowding is visible
  before it happens.
- **Smart guidance:** compass overlay and sun-path shading (morning / midday / evening),
  spacing warnings, "good companion" and "bad neighbour" hints.
- **Layers:** plants, irrigation, lighting, structures (sheds, fences, trees casting
  shade). Toggle layers on/off.
- **Seasonal view:** a time slider showing what's in flower or leaf each month.
- **Tap anything** on the map to open its plant card, tasks and health.
- Accessible alternative: every map action is also possible from a list view.

### 3.5 Task calendar

The heart of the app: an **automatically generated, personalised calendar** of jobs.

**Views**
- **Today / This week** (default home screen): a short, prioritised checklist.
- **Month** calendar and **Year at a glance** (season wheel showing sowing, planting,
  pruning, harvesting windows for all your plants).
- Filter by section, plant, task type.

**Task sources**

| Source | Example |
|---|---|
| **Plant care templates** (seasonal) | "Prune wisteria — summer side-shoots to 5 leaves" |
| **Climate-shifted timing** | Sowing tomatoes 6–8 weeks before *your* last frost date, not a fixed date |
| **Weather triggers** | Frost forecast → "Cover dahlias / bring in pelargoniums tonight" |
| **Condition triggers** | 7 dry, hot days + sandy soil → "Water new shrubs deeply" |
| **Lifecycle triggers** | 3 weeks after sowing → "Prick out seedlings" |
| **Recurring user tasks** | "Mow lawn every 7 days (Apr–Oct)" |
| **One-off user tasks** | "Buy compost" |

**Task anatomy**
- Title, plant(s)/section, *why* it matters, how-to steps (with optional short video/illustration),
  tools needed, estimated time, difficulty, priority (*Must do* / *Should do* / *Nice to do*),
  a time **window** (e.g. "any time in the next 10 days") rather than a hard date.
- Actions: **Done** (optionally add photo/note), **Snooze**, **Skip this year**, **Not relevant**
  (which teaches the engine).
- Grouping: "Prune 4 shrubs in the front border" instead of four separate tasks.

**Balancing workload:** the engine respects the user's stated time budget and spreads
flexible tasks across the week; overdue "must do" tasks bubble up; low-value tasks fade.

**Integrations:** export/subscribe to Google / Apple / Outlook calendars (ICS feed);
share tasks with household members.

### 3.6 Notifications & plant advice

**Notification types (all user-controllable):**

1. **Weekly plan** — e.g. Saturday 8am: "6 jobs this weekend, ~1h 20m. Top priority: sow broad beans."
2. **Weather alerts** — frost, heatwave, high winds, heavy rain, drought, snow load — only
   sent if they affect the user's actual plants.
3. **Timely reminders** — for tasks with a narrow window (e.g. "Last week to plant tulip bulbs").
4. **Seasonal insights** — "Your apple tree is entering blossom; watch for late frosts."
5. **Follow-ups** — "You treated the rose for blackspot 2 weeks ago — how's it looking? 📷"

Smart rules: quiet hours, a daily cap, bundling, and adaptive timing (learns when the
user tends to garden).

**Plant advice & health**
- Care guide per plant, tuned to the garden ("Because your soil is heavy clay, add grit
  when planting lavender").
- **Health check via photo:** detect common pests, diseases and deficiencies
  (aphids, blackspot, powdery mildew, chlorosis, slug damage…) with confidence levels,
  likely causes, and treatment options ranked by the user's style (organic first if chosen).
- **"Ask the gardener" chat:** an AI assistant grounded in the user's garden data and
  trusted horticultural sources ("Why are my tomato leaves curling?"). Always shows sources
  and confidence, and recommends a professional/local expert when unsure.
- **Toxicity & safety warnings** for pets/children.
- **Plant suggestions:** "Plants that would thrive in your shady, clay-soil north border."

### 3.7 Garden journal & insights

- Diary entries with photos, weather auto-attached.
- Harvest log (weights/counts), bloom log, first frost/last frost observations.
- Year-on-year comparisons: "Your sweet peas flowered 9 days earlier than last year."
- Simple stats: tasks done, plants added, harvest totals.

---

## 4. Personalisation engine (how "tuned to you" actually works)

```
          ┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐
          │  Garden profile  │   │   Plant knowledge │   │  Live & historic │
          │ (location, soil, │   │  base (care rules,│   │  weather, soil & │
          │ aspect, sections)│   │  timing, needs)   │   │  climate data    │
          └────────┬─────────┘   └────────┬─────────┘   └────────┬─────────┘
                   └──────────────┬───────┴──────────────────────┘
                                  ▼
                     ┌─────────────────────────┐
                     │  Rules + scheduling      │  deterministic, testable
                     │  engine                  │  (task windows, triggers)
                     └────────────┬────────────┘
                                  ▼
                     ┌─────────────────────────┐
                     │  AI layer (LLM)          │  explanations, Q&A,
                     │  grounded in the above   │  tone by experience level
                     └────────────┬────────────┘
                                  ▼
                 Tasks · Notifications · Advice · Suitability scores
```

**Key mechanisms**

1. **Phenological shift:** care templates are expressed relative to climate events
   ("2 weeks after last frost", "when soil > 10°C", "at end of flowering") rather than
   calendar dates. The engine resolves them using the garden's frost dates, growing degree
   days and live weather — so the same plant gets different dates in Cornwall, Aberdeen,
   Toronto or Melbourne (including Southern Hemisphere season flip).
2. **Condition modifiers:** soil type changes watering frequency (sandy ↑, clay ↓),
   exposure adds staking/wind tasks, frost pockets push tender planting later, containers
   add watering and feeding tasks.
3. **Suitability scoring:** each plant's needs (sun, soil, pH, moisture, hardiness) are
   compared with its section's conditions → 0–100 score plus human-readable reasons.
4. **Feedback learning:** "Done early", "Not relevant" and snoozes adjust future timing
   for that user and, aggregated anonymously, improve regional timing for everyone.
5. **Guardrails:** deterministic rules decide *what and when*; the AI only *explains and
   answers*, and is never allowed to invent chemical dosages or override safety rules.

---

## 5. UX & visual design — "modern and friendly"

### 5.1 Look and feel
- **Palette:** soft sage and leaf greens, warm terracotta accents, cream backgrounds;
  a full **dark mode** (deep moss). High-contrast "bright sunlight" mode for outdoors.
- **Typography:** rounded, highly legible sans-serif (e.g. *Nunito* / *Inter*), large sizes.
- **Illustration:** hand-drawn style plant icons and seasonal headers; gentle micro-animations
  (a seedling sprouts when you complete a task; a season wheel turns).
- **Tone of voice:** warm, encouraging, jargon explained ("Deadhead — snip off faded flowers
  so the plant makes more"). Never shaming about missed tasks.
- **Accessibility:** WCAG 2.2 AA, Dynamic Type, screen-reader labels, colour-blind-safe
  status colours (icons + colour), one-handed reachability, 48px+ touch targets.

### 5.2 Navigation (bottom tab bar)

| Tab | Purpose |
|---|---|
| 🏡 **Home** | This week's jobs, weather strip, alerts, "what's happening in your garden" |
| 🗺️ **Garden** | Map + sections |
| 🌿 **Plants** | Library, search, add (big ➕ / camera button) |
| 📅 **Calendar** | Month/year views, season wheel |
| 💬 **Ask** | AI assistant, plant doctor (photo health check), journal |

A floating **camera button** is always one tap away: identify, health check, or add a
journal photo.

### 5.3 Key screens (MVP)
1. Welcome & onboarding (location → garden type → soil → aspect → style → notifications)
2. Home / This week
3. Add plant (camera / search / label scan) → confirm → choose section
4. Plant detail (care, tasks, health, photo timeline, suitability)
5. Garden map editor & section detail
6. Calendar (week / month / year wheel)
7. Task detail (why, how-to, done/snooze)
8. Plant doctor (photo diagnosis) & Ask chat
9. Settings (garden profile, notifications, household, export)

---

## 6. Data model (simplified)

```
User ─┬─< GardenMembership >─ Garden ─┬─ GardenProfile (location, zone, frost dates,
      │                                │                 soil, pH, aspect, exposure, style…)
      │                                ├─< Section (shape, conditions overrides, type)
      │                                │      └─< PlantInstance (position x/y, planted_on,
      │                                │               qty, status, notes)
      │                                │               ├─< Photo (taken_at, ai_tags)
      │                                │               ├─< HealthEvent (diagnosis, treatment)
      │                                │               └─< JournalEntry
      │                                ├─< Task (type, window_start/end, priority, status,
      │                                │          source: template|weather|user, recurrence)
      │                                └─< WeatherSnapshot
      └─ NotificationPreferences

PlantSpecies (botanical name, cultivar, category, care attributes, toxicity)
   └─< CareTemplate (action, trigger expression e.g. "last_frost + 14d",
                     conditions, how-to, duration, difficulty)
```

---

## 7. Technology architecture

| Layer | Recommendation | Why |
|---|---|---|
| **Mobile app** | **React Native + Expo** (TypeScript) for iOS & Android; later a web companion | One codebase, fast iteration, OTA updates, great camera & notification modules |
| **Offline storage & sync** | SQLite on device (e.g. WatermelonDB / PowerSync / ElectricSQL) syncing to Postgres | Gardens and allotments often have poor signal |
| **Garden map** | `react-native-skia` canvas (vector shapes, pinch/zoom) | Smooth, high-performance drawing |
| **Backend** | **Supabase** (Postgres + Auth + Storage + Edge Functions) or a small Node/TypeScript API on a managed host | Low ops overhead, row-level security per garden |
| **Scheduling & jobs** | Postgres cron / queue workers for nightly task generation and weather checks | Deterministic, testable task engine |
| **Push notifications** | Expo Notifications → APNs / FCM | Cross-platform, scheduled + remote pushes |
| **Plant identification** | Pl@ntNet API and/or Kindwise Plant.id (ID + health assessment) | Proven accuracy, covers diseases |
| **Plant care data** | Curated in-house knowledge base seeded from licensed sources (e.g. Perenual API, RHS-style pruning groups, open datasets), reviewed by a horticulturist | Quality and consistency of advice |
| **Weather & climate** | Open-Meteo (forecast + historical for frost-date calculation); Met Office DataHub for UK alerts | Free/affordable, global, historical data |
| **Soil data** | ISRIC SoilGrids (global) / UK Soil Observatory to pre-fill soil type & pH | Smart defaults in onboarding |
| **AI assistant** | Claude (e.g. Claude Sonnet for chat, Claude Haiku for cheap summarising/notification copy) with retrieval over the knowledge base + user's garden data | Grounded, conversational, explainable advice |
| **OCR** | On-device ML Kit / Apple Vision | Seed-packet & label scanning, offline |
| **Analytics & quality** | PostHog (privacy-friendly), Sentry crash reporting | Product learning, stability |

**Privacy & security:** coarse location only, photos stored privately (EXIF location
stripped on share), GDPR-compliant data export & deletion, no selling of data, clear
AI-usage disclosure, row-level security on all garden data.

---

## 8. Delivery roadmap

### Phase 0 — Discovery & design (4–6 weeks)
- Interview 10–15 gardeners across the personas; competitor review (Planta, Gardenize,
  GrowVeg, RHS Grow Your Own, Garden Tags, PictureThis).
- Define the plant knowledge base schema and seed ~500 most common UK/temperate plants.
- Brand, design system, clickable Figma prototype; usability-test onboarding and "add plant".

### Phase 1 — MVP (10–12 weeks) — *"Know your garden, know this week's jobs"*
- Onboarding & garden profile (location → zone & frost dates; soil; aspect; style)
- Add plants by text and photo ID; plant library & detail
- Sections (list-based) with conditions
- Auto-generated task calendar from care templates + frost dates
- Weekly plan + frost/heat weather push notifications
- Offline-first local storage, account & sync
- **Success metrics:** onboarding completion > 70%, ≥ 5 plants added in first week,
  week-4 retention > 30%, task completion rate > 40%.

### Phase 2 — v1.0 (8–10 weeks) — *"See and care"*
- Visual garden map editor with drag-and-drop plant placement & spacing warnings
- Plant doctor (photo health check) and treatment follow-ups
- AI "Ask" assistant grounded in garden data
- Journal, photo timelines, label/seed-packet scanning
- Calendar export (ICS), household sharing
- Suitability scores & "plants that would thrive here" suggestions

### Phase 3 — v1.5+ (ongoing) — *"Grow together"*
- Veg-garden tools: crop rotation, succession sowing, harvest log, seed inventory
- Sun-path shading simulation on the map; satellite tracing
- Smart-device integrations (soil moisture sensors, smart irrigation, weather stations)
- Home-screen widgets & Apple Watch / Wear OS quick "done" taps
- Community: local tips, plant swaps, regional "what's happening now"
- Multi-language & Southern Hemisphere content polish

---

## 9. Business model

- **Free tier:** 1 garden, up to ~25 plants, core calendar, weekly plan, frost alerts,
  limited photo IDs per month.
- **Premium (≈ £3.99/month or £29.99/year):** unlimited plants & gardens, full map tools,
  unlimited ID & plant doctor, AI assistant, advanced weather alerts, journal insights,
  household sharing.
- Optional later: partnerships with nurseries / seed companies (clearly labelled,
  never mixed into advice), gift subscriptions.

---

## 10. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Wrong ID or diagnosis harms plants or trust | Show confidence and alternatives; ask user to confirm; "get expert help" path; horticulturist-reviewed content |
| AI gives unsafe advice (chemicals, toxic plants) | AI explains only; doses/safety come from vetted rules; safety filters and source citations |
| Notification fatigue → uninstalls | Weekly-digest default, daily cap, relevance filtering, easy controls |
| Generic advice in unusual climates | Relative (phenological) timing; user feedback loop; regional calibration |
| Onboarding feels like hard work | Auto-fill from location; skip-able steps; progressive profiling later |
| Plant data licensing costs | Mix of licensed APIs + curated in-house knowledge base built over time |
| Map editor too fiddly on small screens | List-first fallback; templates; snap-to-grid; tablet-optimised layout |

---

## 11. Immediate next steps

1. Validate the problem with 10–15 gardener interviews; prioritise MVP scope.
2. Build a Figma prototype of onboarding, Home ("This week"), Add plant and Calendar.
3. Spike the riskiest tech: photo ID API accuracy on 100 real garden photos, and the
   frost-date / task-timing engine for 5 contrasting locations.
4. Define the care-template format and seed the first 100 plants.
5. Set up the Expo + Supabase skeleton with offline sync and push notifications.
