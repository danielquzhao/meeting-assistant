# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is an Electron-based meeting assistant application that creates a translucent, always-on-top overlay window. The overlay is designed to be visible during video calls while being hidden from screen capture (Google Meet, etc.).

## Key Architecture

### Application Structure
- **main.js**: Electron main process - handles window creation, configuration, and global shortcuts
- **index.html**: Renderer process UI - displays the overlay content
- Single-window architecture with transparent frameless window

### Window Configuration
The overlay window uses specific Electron BrowserWindow options:
- `transparent: true` + `frame: false` for frameless transparency
- `alwaysOnTop: true` with `'floating'` level to stay above all windows
- `setVisibleOnAllWorkspaces(true)` to persist across macOS Spaces/virtual desktops
- `setIgnoreMouseEvents(true)` to make window click-through
- `setContentProtection(true)` to hide from screen capture

### Global Shortcuts
- `Cmd/Ctrl+Right`: Move window 50px right
- `Cmd/Ctrl+Left`: Move window 50px left
- Shortcuts are registered in `app.whenReady()` and cleaned up in `app.on('window-all-closed')`

## Commands

### Development
```bash
npm start              # Launch Electron application
```

### Dependencies
```bash
npm install            # Install dependencies (Electron)
```

## Development Notes

- The application uses `nodeIntegration: true` and `contextIsolation: false` in webPreferences - be cautious about security if loading remote content
- Window dragging is enabled via `-webkit-app-region: drag` CSS property in the body
- The overlay styling uses `rgba()` with low opacity for translucent effect
