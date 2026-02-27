## Repo Overview

This is a Laravel 12 PHP web application scaffold (PHP 8.2). Back-end code lives under `app/` (models, providers, controllers), routes under `routes/`, front-end assets managed with Vite/Tailwind in `resources/`, and tests in `tests/`.

**Key files**
- `composer.json`: dependency and script definitions (see `scripts.setup`, `scripts.dev`, `scripts.test`).
- `package.json`: Vite/Tailwind tooling and `npm` scripts (`dev`, `build`).
- `routes/web.php`: entry HTTP routes (currently returns `welcome` view).
- `app/Models/User.php`: canonical Eloquent model patterns (fillable, hidden, typed `casts()`).
- `app/Providers/AppServiceProvider.php`: DI/service bindings location.
- `phpunit.xml`: test runtime environment (uses in-memory SQLite, `QUEUE_CONNECTION=sync`, `SESSION_DRIVER=array`).

## Big-picture architecture notes for agents

- The app is a typical Laravel MVC app. Controllers extend `App\Http\Controllers\Controller`; models use Eloquent and factories (`HasFactory`).
- Front-end uses Vite + `laravel-vite-plugin` and Tailwind; look in `resources/js` and `resources/css` for implementation patterns.
- Background jobs/queues are wired but tests and CI run with `QUEUE_CONNECTION=sync` (see `phpunit.xml`). When making changes that touch queues, prefer writing synchronous tests or mock queue behavior.
- The project uses Laravel tooling such as `pail` (logging/monitoring) invoked in the `composer` `dev` script via `concurrently`.

## Developer workflows & useful commands

- Local setup (manual equivalent of `composer.json` `setup` script):
  - `composer install`
  - copy `.env.example` to `.env` and run `php artisan key:generate`
  - `php artisan migrate` (project expects a DB; composer post-create touches `database/database.sqlite` in some project flows)
  - `npm install` and `npm run build`
- Dev mode (mirror of `composer.json` `dev` script):
  - `npx concurrently "php artisan serve" "php artisan queue:listen --tries=1 --timeout=0" "php artisan pail --timeout=0" "npm run dev"`
  - or run pieces individually: `php artisan serve`, `npm run dev`.
- Tests: `composer run test` (clears config and runs `php artisan test`). Tests run with an in-memory SQLite DB as configured in `phpunit.xml`.

## Project-specific patterns and conventions

- Eloquent models use typed `casts()` methods and `HasFactory` (see `app/Models/User.php`). Prefer factory-based test data.
- Service bindings and application bootstrapping happen in `app/Providers/*`. Small helpers or app-wide binding changes should go here.
- Minimal controller scaffolding currently; add routes to `routes/web.php` and route-to-controller in `app/Http/Controllers` following Laravel conventions.
- Keep front-end asset changes under `resources/` and adjust `vite.config.js` / `package.json` for builds.

## Integration points & external dependencies

- PHP 8.2 and Laravel 12 (check `composer.json` for exact requirements).
- Node.js tooling: Vite, Tailwind, `laravel-vite-plugin`.
- Background systems referenced: Laravel queue system and `pail` (project logging). When modifying queue code, tests default to synchronous execution.

## Examples to copy/paste

- Run tests quickly:

  `composer run test`

- Start the dev server and Vite (manual):

  `php artisan serve`
  `npm run dev`

## When to ask the human

- Any change that requires database seed/state beyond simple migrations (ask which DB to use locally).
- Adding external services (mail, broadcast, third-party APIs) — request credentials and expected behavior before implementing.

---

If you'd like, I can expand this with explicit file links, or add example PR-checklist items (lint/test/build). Any sections unclear or missing? 
