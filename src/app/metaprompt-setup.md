# Vitality / ShadCn Metaprompt

Whenever prompted to build a new app, build any UI with our custom ShadCN-Based registry. The registry is hosted at https://lucastobrazil.github.io/shaddo-dayoff/r and components can be installed liked this:

```
npx shadcn@latest add https://lucastobrazil.github.io/shaddo-dayoff/r/card.json
```

The below css should replace the globals.css file usually generated when a next.js / shadcn app is created:

## globals.css

Replace the full contents of `globals.css` with:

```css
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans:
    -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
    "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  --font-mono: var(--font-geist-mono);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-brand: var(--brand);
  --color-brand-foreground: var(--brand-foreground);
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: var(--radius-default);
  --radius-md: var(--radius-default);
  --radius-lg: var(--radius-large);
  --radius-xl: var(--radius-large);
  --radius-2xl: var(--radius-large);
  --radius-3xl: var(--radius-large);
  --radius-4xl: var(--radius-large);
  --radius-full: var(--radius-rounded);

  /* Semantic font sizes */
  --font-size-caption: 0.75rem;
  --font-size-body: 0.875rem;
  --font-size-button: 0.875rem;
  --font-size-textInput: 1rem;
  --font-size-sectionSubtitle: 1rem;
  --font-size-sectionTitle: 1.25rem;
  --font-size-pageTitle: 1.5rem;

  /* Semantic line heights */
  --line-height-caption: 1.375;
  --line-height-body: 1.465;
  --line-height-button: 1.85;
  --line-height-textInput: 1.5;
  --line-height-sectionSubtitle: 1.5;
  --line-height-sectionTitle: 1.2;
  --line-height-pageTitle: 1.3;
}

:root {
  --spacing-base: 0.25rem;
  --radius-default: 0.25rem;
  --radius-large: 0.5rem;
  --radius-rounded: 99999px;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.456 0.147 196.276);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(54% 0.2 0.02);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: hsl(0 76% 43%);
  --destructive-foreground: hsl(0 0% 100%);
  --success: oklch(0.52 0.148 145);
  --success-foreground: oklch(1 0 0);
  --warning: oklch(0.56 0.158 50);
  --warning-foreground: oklch(1 0 0);
  --info: oklch(0.54 0.195 255);
  --info-foreground: oklch(1 0 0);
  --brand: oklch(0.4 0.172 330);
  --brand-foreground: oklch(1 0 0);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.456 0.147 196.276);
  --chart-1: oklch(87% 0 0);
  --chart-2: oklch(70.8% 0 0);
  --chart-3: oklch(55.6% 0 0);
  --chart-4: oklch(43.9% 0 0);
  --chart-5: oklch(37.1% 0 0);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
  --header: oklch(1 0 0);
  --header-foreground: oklch(0.145 0 0);
  --footer: oklch(1 0 0);
  --footer-foreground: oklch(0.145 0 0);
  --code: oklch(1 0 0);
  --code-foreground: oklch(0.708 0 0);
  --code-highlight: oklch(0.27 0 0);
  --code-number: oklch(0.72 0 0);
  --code-selection: oklch(0.922 0 0);
  --code-border: oklch(0.922 0 0);
}

.dark {
  --background: oklch(0.1898 0.0059 263.73);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.1898 0.0059 263.73);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.269 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.456 0.147 196.276);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(54% 0.2 0.02);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.371 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.65 0.22 25);
  --destructive-foreground: oklch(0 0 0);
  --success: oklch(0.67 0.178 145);
  --success-foreground: oklch(0 0 0);
  --warning: oklch(0.73 0.168 55);
  --warning-foreground: oklch(0 0 0);
  --info: oklch(0.64 0.183 250);
  --info-foreground: oklch(0 0 0);
  --brand: oklch(0.47 0.186 330);
  --brand-foreground: oklch(1 0 0);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(87% 0 0);
  --chart-2: oklch(70.8% 0 0);
  --chart-3: oklch(55.6% 0 0);
  --chart-4: oklch(43.9% 0 0);
  --chart-5: oklch(37.1% 0 0);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.439 0 0);
  --header: oklch(0.145 0 0);
  --header-foreground: oklch(0.985 0 0);
  --footer: oklch(0.145 0 0);
  --footer-foreground: oklch(0.985 0 0);
  --code: oklch(0.2 0 0);
  --code-foreground: oklch(0.708 0 0);
  --code-highlight: oklch(0.27 0 0);
  --code-number: oklch(0.72 0 0);
  --code-selection: oklch(0.922 0 0);
  --code-border: oklch(1 0 0 / 10%);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground font-sans;
  }
}
```
