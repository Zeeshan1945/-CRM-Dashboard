# Rapport

### A starter dashboard for your AI agent CRM

Rapport is a polished CRM dashboard foundation for building tools that help sales teams and AI agents understand customers, manage pipeline, and track business performance. It includes a responsive dashboard shell, seven route screens, reusable UI components, sample data, and persistent dark and light themes.

> **Starter template:** the screens currently use local sample data. There is no CRM backend, authentication, or AI agent integration connected yet.

![Rapport overview dashboard](screenshots/dashboard.png)

## What’s inside

- **Overview** — revenue, hot deals, activity, team quota, and pipeline at a glance.
- **Pipeline** — deal stages and opportunity tracking.
- **Customers** — customer records and relationship context.
- **Schedule** — a home for meetings and upcoming work.
- **Finance** — revenue and financial summaries.
- **Growth** — growth metrics and performance views.
- **Projects** — project and delivery tracking.
- **Theme system** — dark and light appearances with the selected theme saved in the browser.
- **Responsive app shell** — shared navigation, headings, cards, and accessible skip-to-content link.

## Screenshots

Screenshots below were captured from the running app with Playwright CLI at full-page size in both persisted theme settings.

| Route | Dark | Light |
| --- | --- | --- |
| [Overview](/) | ![Overview, dark mode](screenshots/overview-dark.png) | ![Overview, light mode](screenshots/overview-light.png) |
| [Pipeline](/pipeline) | ![Pipeline, dark mode](screenshots/pipeline-dark.png) | ![Pipeline, light mode](screenshots/pipeline-light.png) |
| [Customers](/customers) | ![Customers, dark mode](screenshots/customers-dark.png) | ![Customers, light mode](screenshots/customers-light.png) |
| [Schedule](/schedule) | ![Schedule, dark mode](screenshots/schedule-dark.png) | ![Schedule, light mode](screenshots/schedule-light.png) |
| [Finance](/finance) | ![Finance, dark mode](screenshots/finance-dark.png) | ![Finance, light mode](screenshots/finance-light.png) |
| [Growth](/growth) | ![Growth, dark mode](screenshots/growth-dark.png) | ![Growth, light mode](screenshots/growth-light.png) |
| [Projects](/projects) | ![Projects, dark mode](screenshots/projects-dark.png) | ![Projects, light mode](screenshots/projects-light.png) |

## Quick start

### Requirements

- Node.js compatible with the installed Next.js version
- npm

### Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | Check TypeScript types |

## Tech stack

- [Next.js](https://nextjs.org/) App Router
- React and TypeScript
- Tailwind CSS 4
- Lucide icons

## Project structure

```text
src/
├── app/                 # Route pages, layouts, metadata, and global styles
├── components/
│   ├── overview/        # Dashboard overview sections
│   ├── shell/           # Header, navigation, sidebar, and theme toggle
│   └── ui/              # Shared presentation components
└── lib/                  # Sample data, formatting, and chart helpers
screenshots/              # README route and theme captures
```

## Making it yours

1. Replace the sample data in `src/lib/` with your CRM’s data source.
2. Connect route screens to your APIs and add authentication before exposing customer data.
3. Add your AI agent workflows where you need summaries, recommendations, or CRM actions.
4. Adjust the shared design tokens in `src/app/globals.css` to match your brand.

## License

No license has been specified yet. Add one before distributing or reusing this template publicly.
