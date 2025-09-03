---
applyTo: '**'
---
package manager: pnpm
ui components: shadcn (always use shadcn components when available, generate the command to run to install it)
language of frontend text: French, (but code in english)

# Folder structure
### The Base Layout
Here’s a folder structure I’ve found works well across most of my Vite projects. It's a good starting point at least, but can be further modified as needed to fit your specific needs.

public/
  favicon.ico
  robots.txt
  sitemap.xml
  apple-touch-icon.png

.vite.config.ts
index.html

src/
  assets/
    logo.svg
    background.jpg
  components/
    button.tsx
    modal.tsx
  features/
    auth/
      auth-form.tsx
      auth-slice.ts
      auth-api.ts
  pages/
    home.tsx
    profile.tsx
  hooks/
    use-auth.ts
    use-debounce.ts
  utils/
    format-date.ts
    generate-id.ts
  lib/
    axios-client.ts
    firebase.ts
  styles/
    globals.css
    theme.css
  router/
    routes.tsx
  App.tsx
  main.tsx
Let’s break these down so you’re not just copy-pasting blindly.

assets/
Anything static goes here. Images, SVGs, fonts, maybe some icons. These assets aren't available publicly, so you will need to import them into your components accordingly.

components/
These are your basic components. Reusable UI pieces that don’t care about where they're used. Think: buttons, modals, cards. Keep these clean and self-contained. If they start doing data fetching, kick them out to features/.

And if you aren't planning on reusing them at all, then maybe they shouldn't be in this folder.

features/
Each subfolder here is a domain-specific feature. If your app has a "Profile" section or a "Dashboard", they live here. These can include their own components, slices, API calls, etc.

The idea is encapsulation. If you deleted this folder, that whole feature should disappear. That's your litmus test.

pages/
Route-level components. These are what your router points to. They compose features and components into something meaningful.

hooks/
Custom hooks. If it starts with use, it probably belongs here. Keep them pure, tested, and named appropriately.

utils/
Tiny, pure functions that do one thing well. Format dates, generate random strings, deep-clone an object. That kind of jazz. If it’s side-effecty, maybe it belongs in lib/.

lib/
This is your integrations zone. Axios clients, Firebase config, analytics setup, etc. Anything that connects you to the outside world can go here.

styles/
Global CSS, Tailwind config extensions, theming variables. Keep your design tokens and CSS resets here. Don’t start a colors.ts file in utils/ – fight that urge.

router/
Where you define your routes and lazy-load your pages. If you’re using something like React Router, this is where it gets orchestrated.

App.tsx and main.tsx
These are the entry points. main.tsx bootstraps the app, while App.tsx is your top-level component with the router, providers, etc. Don’t overcomplicate these. Think of them like your front door.

### What Vite Expects (and Doesn’t Care About)
Vite is pretty chill compared to some frameworks. It doesn’t enforce much, which is great, but also means you need to define your own structure.

public/: Vite serves anything in here as-is. No bundling, no transformations. Use it for static files you reference by absolute path like /logo.png.
src/: Vite expects your code to live here, but again, it doesn’t care what you do inside it. You could put everything in one file, but please don’t.
index.html: This one’s at the root, and Vite uses it as the base HTML file. It’s not a template like in Create React App, it’s the real deal. You can use Vite’s environment variables and directives directly here.
Aliases: Vite supports @/ out of the box (with the right config), so feel free to alias src/ for cleaner imports. Set it up in vite.config.ts with resolve.alias.
That’s it. No magic folders. No pages/ auto-routing (unless you install something for that). You’re the boss.

### Bonus Tips
Use index files in folders to simplify imports, but don’t go overboard. If everything is index.ts, your stack traces will suck. Learn more about when to use index files versus named exports.
If you’re using TypeScript, define interfaces next to the component or in a types.ts within that feature folder.
Once something is reused across two or more features, promote it out to components/ or hooks/.

### Closing Thoughts
A good folder structure doesn’t make your app better by itself, but it stops you from losing your mind as your project grows. And with Vite being so minimal by default, you’re free to architect it however you want. So, do yourself a favor and set it up right early.
