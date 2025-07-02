### Blockly Highlighter

**Blockly Highlighter** – Use **Ctrl + Shift + F** to search and **Ctrl + Shift + L** to clear highlights

[![Extension Icon](icon128.png)](icon128.png)
📺 **Demo**: [https://youtu.be/9JejveXwCaY](https://youtu.be/9JejveXwCaY)

---

### What It Is

A lightweight browser extension for Chrome, Firefox, and Opera that highlights all Blockly blocks (MIT App Inventor, Kodular Creator, etc.) whose text contains your search term. It also shows a count of matched blocks.

### Features

* 🔍 **Keyboard Search**: Press **Ctrl + Shift + F** (or ⌘ + Shift + F on macOS) to open a prompt and enter your search phrase.
* ✨ **Neon Highlight**: All matching blocks get a yellow glow.
* 🔄 **Clear Highlights**: Press **Ctrl + Shift + L** to remove all highlights.
* 🔢 **Match Counter**: A badge in the top‑right corner shows how many blocks were highlighted.

### Installation (Chrome)

1. Clone the repo:

   ```bash
   git clone https://github.com/iagolirapasssos/Blockly-Highlighter.git
   ```
2. In Chrome, go to `chrome://extensions/`.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the extension folder.
5. (Optional) Pin the extension icon for quick access.

### Installation (Firefox)

1. Open `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on…**.
3. Select the `manifest.json` file from the folder.
4. Pin the **Blockly Highlighter** icon in the toolbar.

### Installation (Opera)

**Method 1: Manual**

1. Go to `opera://extensions/` in Opera.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select your extension folder.

**Method 2: Chrome Web Store**

* Install the [Install Chrome Extensions](https://addons.opera.com/en/extensions/details/install-chrome-extensions/) addon from Opera Addons (only needed once).
* Go to the Chrome Web Store and install the extension as if you were on Chrome.

### Usage

1. Open a Blockly workspace (MIT App Inventor, Kodular Creator, etc.).
2. **Ctrl + Shift + F** (⌘ + Shift + F on macOS): enter your search term in the prompt.
3. Matching blocks will glow yellow and the match count will appear.
4. **Ctrl + Shift + L**: clear all highlights and hide the counter.

### Permissions

* `activeTab`: grants the extension temporary access to inject scripts into the current page when you invoke the search or clear shortcuts.
* Host permissions in `manifest.json`:

  * `https://creator.kodular.io/*`
  * `https://ai2.appinventor.mit.edu/*`

### Development

1. Edit `manifest.json` or `content_script.js`.
2. Bump the version in `manifest.json`.
3. Reload the extension in **chrome://extensions**, **about\:debugging**, or **opera://extensions**.
4. Test in a Blockly workspace.

### Contributing

Contributions welcome! Please open an issue or submit a PR:

* Follow the existing code style.
* Update the version and changelog.
* Provide clear descriptions of features or fixes.

### License

MIT License. See [LICENSE](LICENSE) for details.

---
