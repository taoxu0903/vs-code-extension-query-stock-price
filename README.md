# Stock Price Query VS Code Extension

## Overview
The Stock Price Query extension integrates with GitHub Copilot agent mode to provide real-time stock price information. It allows users to query stock prices directly from the VS Code interface and interact with GitHub Copilot for enhanced functionality.

## Features
- Query real-time stock prices using stock symbols (e.g., AAPL, MSFT).
- Integration with GitHub Copilot agent mode for advanced interactions.
- Sidebar button for quick access to stock price queries.

## Installation
1. Download the `.vsix` file from the release page.
2. Open VS Code and go to the Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X` on macOS).
3. Click on the `...` menu in the top-right corner and select `Install from VSIX...`.
4. Select the downloaded `.vsix` file to install the extension.

## Usage
1. Open the Stock Tools Sidebar from the Activity Bar.
2. Click on the "Query Stock Price" button.
3. Enter the stock symbol (e.g., AAPL, MSFT) when prompted.
4. View the stock price information in the GitHub Copilot chat window or as a notification.

## Development
### Prerequisites
- Node.js (v16 or later)
- npm (v7 or later)

### Setup
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Use `npm run watch` to build the extension in watch mode.

### Debugging
1. Press `F5` in VS Code to start a new Extension Development Host.
2. Use the "Query Stock Price" button in the sidebar to test the extension.

## License
This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.