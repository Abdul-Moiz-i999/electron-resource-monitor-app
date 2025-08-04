# Resource Monitor App - Electron

## Description

This is a real time responsive resource monitor app built with React + Electron. It is written in TypeScript and is completely typesafe from both React and Electron side. The user can click on any of the CPU, RAM and Storage resource and can see it's updates in real time.

## Screenshots of the App

<img width="597" height="446" alt="image" src="https://github.com/user-attachments/assets/a3839db7-663c-4bc7-8759-869e3d401f41" />

### Responsive View when App is Shrinked to the Minimum By Dragging
<img width="433" height="446" alt="image" src="https://github.com/user-attachments/assets/e1799ccf-f5a8-4308-997c-caae9e180224" />

# Technology Stack

## Frontend:
- React – UI library for building the interface
- Recharts – Data visualization (charts for CPU, RAM, Storage.)
- Vite – Fast build tool and development server

## Backend (Electron main process)
- Electron
- Node.js
- os-utils

## Tooling / Development
- TypeScript
- ESLint
- electron-builder
- npm

# Instructions To Setup

**Development**
> `npm run dev` - run React (Vite) and Electron together  
> `npm run dev:react` - run only React (Vite)  
> `npm run dev:electron` - run only Electron  

**Build**
> `npm run dist:win` - build for Windows  
> `npm run dist:linux` - build for Linux  
> `npm run dist:mac` - build for macOS  

**Testing**
> `npm run test:e2e` - run end-to-end tests  
> `npm run test:unit` - run Electron unit tests


# Extra Information
- Other commands are available in **package.json**  
- The **types** file in the root defines global types for React (adds to `window` object)  
- React code is located in **src/UI**  
- Electron code is located in **src/electron**  
- Build configuration is in **electron-builder.json**
