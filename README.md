# Codezart — Code Like Mozart 🎶

**Codezart** is a fun VSCode extension that plays random musical notes in a selected key when you type certain trigger keys (like Enter). It’s like playing along with your coding playlist!

---

## Features

- Plays random notes in your chosen musical scale (default: C major)  
- Supports major, minor, or custom scales  
- Configurable trigger keys (e.g., Enter, space, etc.)  
- Easy toggle on/off command  
- Runs automatically on VSCode startup  
- Webview-based synth using Tone.js for beautiful sounds  

---

## Installation

1. Clone or download the repo  
2. Open in VSCode  
3. Run `vsce package` to create the `.vsix` file  
4. Install the `.vsix` in VSCode:  
   - Open Command Palette (Ctrl+Shift+P)  
   - Type `Extensions: Install from VSIX...`  
   - Select your `.vsix` file  
5. Reload VSCode and enjoy!

Or, once published to the Marketplace, simply install from there.

---

## Usage

- By default, Codezart is enabled on VSCode startup.  
- Type your trigger keys (default: Enter) to hear a note play.  
- Use the Command Palette to:  
  - `Codezart: Toggle Sound` — Enable or disable sounds  
  - `Codezart: Select Scale` — Choose your musical scale  

---

## Configuration

Add these settings to your VSCode `settings.json` to customize:

```json
{
  "codezart.enabled": true,
  "codezart.scale": "C_major",
  "codezart.triggerKeys": ["\n"],
  "codezart.customScales": {
    "C_major": ["C4", "D4", "E4", "F4", "G4", "A4", "B4"],
    "A_minor": ["A4", "B4", "C5", "D5", "E5", "F5", "G5"]
  }
}
```

enabled: Start with sound on or off

scale: Select scale by name

triggerKeys: Array of strings that trigger sound (e.g., Enter is "\n")

customScales: Define your own scales with note arrays

---

## Development
Main code is in src/extension.ts

Sound generated in webview using Tone.js

Run npm install to install dependencies

Run vsce package to build the .vsix file for testing

---

## License
This project is licensed under the MIT License.

---

## Credits
Created by Elton Relander — making coding a musical experience! 🎹

---

Feel free to contribute, open issues, or suggest features!