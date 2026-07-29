# Inkluvy

Inkluvy is an accessibility-first city navigation prototype. It helps people with disabilities identify safer routes, understand real-world accessibility conditions, request assistance when needed, and contribute updates that make the map more useful for everyone.

The current product experience is centred on Malang and demonstrates how route information, community verification, and emergency assistance can work together in one interface.

## User journey for people with disabilities

1. **Start with a destination** — From the accessible map, enter a starting point and destination to explore a route.
2. **Understand accessibility before travelling** — Review route conditions, verified reporters, ramps, lift availability, transit priority access, and the `Accessible & Safe` or `Caution / Vulnerable` status.
3. **Make a confident route choice** — Use the map details and condition photos to avoid obstacles and choose a more suitable alternative when necessary.
4. **Get assistance when conditions change** — Report an obstacle on the map or use SOS to request help from nearby volunteers.
5. **Stay informed and supported** — Use Help & Support for guidance, feedback, or a support request.

## Community journey

1. **Browse live reports** — Search reports by location, status, or keyword in the Community Hub.
2. **Review trusted local context** — Open a report to see its details, verified location, discussions, comments, and the contributor profile.
3. **Publish an update** — Create a community report with a title, location, category, photo evidence, and a description of the accessibility condition.
4. **Build shared route knowledge** — Report conditions such as damaged pavement, a blocked route, a ramp, or lift availability so other people can plan ahead.
5. **Join local activities** — Discover accessibility walks and community events that help verify and improve route information.

## Key product areas

- **Home** — Explains Inkluvy's purpose, core features, impact, map preview, and community stories.
- **Accessible Map** — Plans a journey, shows route conditions, supports obstacle reporting, and provides SOS assistance.
- **Community** — Hosts reports, contributor profiles, discussion, and accessibility events.
- **Help & Support** — Provides FAQs and a support-request form.
- **Profile and notifications** — Shows contribution activity and emergency SOS dispatch updates.

## Technology stack

| Area | Technology |
| --- | --- |
| Application | React, React DOM, React Router |
| Build tooling | Vite |
| Styling | Tailwind CSS, PostCSS, Autoprefixer |
| Motion | Framer Motion |
| Maps | MapLibre GL |
| Charts | Recharts |
| Icons | Lucide React, React Icons |
| Utility styling | clsx, tailwind-merge |

## Getting started

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Project structure

```text
src/
  components/       Reusable layout, map, landing, profile, and UI components
  data/             Community, contributor, and event demo data
  hooks/            Shared React hooks
  lib/              Shared navigation, accessibility labels, and utilities
  pages/            Route-level application pages
public/
  images/           Local visual assets required by the interface
  fonts/            Local font files
```

## Image asset policy

`public/images/` is intentionally excluded from Git because it contains large visual assets. Keep the supplied image files locally in that folder when running the project. The tracked `.gitkeep` file preserves the folder structure in a fresh clone.

