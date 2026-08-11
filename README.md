![Image](./preview.jpg)

# Frontend Mentor - Intro section with dropdown navigation

[![Frontend Mentor](https://img.shields.io/badge/Junior-Intro%20section%20with%20Dropdown%20Navigation-2ec866?style=flat-square&logo=frontendmentor)](https://www.frontendmentor.io/challenges/intro-section-with-dropdown-navigation-ryaPetHE5) ![Semantic HTML](https://img.shields.io/badge/Semantic%20HTML-E34F26?style=flat-square&logo=html5&logoColor=white) ![Accessibility](https://img.shields.io/badge/Accessibility-E34F26?style=flat-square) ![Fluid CSS](https://img.shields.io/badge/Fluid%20CSS-1572B6?style=flat-square&logo=css&logoColor=white) ![BEM](https://img.shields.io/badge/BEM-1572B6?style=flat-square) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) ![Bun](https://img.shields.io/badge/Bun-000000?style=flat-square&logo=bun&logoColor=white)

## Overview

[Frontend Mentor](https://www.frontendmentor.io) is a great platform to keep studying and practicing front-end development, letting you focus on the code itself without worrying about design or UI. It offers a wide variety of projects, from challenges that only require HTML and CSS to full-stack builds, spanning multiple difficulty levels from newbie to advanced.

This makes it easy to test out whatever you're currently studying — whether that's accessibility, Tailwind, TypeScript, or even React and Next.js — and you can make projects as complete and complex as you like, simulating APIs or databases along the way. It's a great playground to sharpen your skills, adaptable to whatever you need at the time.

### Live Demo

- [Live Demo](https://mellow-code-wave.netlify.app)
- [Frontend Mentor Solution](https://www.frontendmentor.io/solutions/intro-section-with-dropdown-navigation-9Lxu6GFZOB)

## Frontend Mentor

[Frontend Mentor](https://www.frontendmentor.io) challenges help you improve your coding skills by building realistic projects.

The challenges are pretty straight forward, you have to replicate the page or element as closely as possible as the initial image or Figma layout - when provided.

### The challenge

Your challenge is to build out this intro section with dropdown navigation and get it looking as close to the design as possible.

You can use any tools you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.

Your users should be able to:

- View the relevant dropdown menus on desktop and mobile when interacting with the navigation links
- View the optimal layout for the content depending on their device's screen size
- See hover states for all interactive elements on the page

## Development Notes

### Splitting State Between TypeScript and CSS

The dropdown needed two independent triggers — click and hover — that could coexist without one interfering with the other (a click-opened dropdown shouldn't close just because the mouse left the area, and vice versa).

Rather than letting CSS `:hover` drive visibility directly, I moved all state decisions into TypeScript, simulating hover with `mouseenter`/`mouseleave` listeners instead of relying on the `:hover` pseudo-class. Each menu item tracks its click and hover state independently via `data-click`/`data-hover` attributes on the element itself — this made the state persistent and readable from any function touching that element, without relying on closures or module-level variables that don't survive being passed around as primitives.

CSS's job was narrowed down to translating those states into appearance: `--open`/`--visible` modifier classes (toggled by TypeScript) paired with `transition` on the base state controlled the actual opening/closing animation, along with `position: absolute` for the desktop dropdown vs `position: fixed` for the full-screen mobile panel.

One deliberate behavior: both "Features" and "Company" dropdowns can be open at once, rather than the more common mutually-exclusive pattern. On mobile, where users are actively navigating a stacked panel, I wanted every link reachable at once without one dropdown collapsing another. On desktop, that same simultaneity is only reachable through deliberate clicks — hover-driven opening still closes automatically the moment the cursor leaves, matching how people normally interact with desktop nav.

### Accessibility Driven by the Same State

`aria-expanded` on each trigger button reflects the same open/closed state that drives the visual classes — updated in the same TypeScript functions that toggle `--open`/`--visible`, so the accessibility state can never drift out of sync with what's visually happening. `aria-controls` ties each trigger to its corresponding submenu by `id`.

### Architecture and Tooling

- **TypeScript**: all dropdown/menu logic centralized here — state stored on the DOM via `dataset`, closing-on-outside-click handled through a single delegated `document` listener using `.contains()`, and `window.matchMedia` used to gate hover behavior to desktop widths only.
- **BEM (Block Element Modifier)**: applied consistently, including modifier classes (`--open`, `--visible`) reserved specifically for JS-driven state.

## Built With

- Markup: HTML5, Semantic Elements
- Styling: CSS3 (Grid, Flexbox, Fluid Spacing using clamp()), BEM Architecture
- Logic & Tooling: TypeScript, Vite, Bun

## Author

[@psudo-dev](https://github.com/psudo-dev)

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details
