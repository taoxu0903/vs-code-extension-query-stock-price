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

## API Key Requirement

This extension uses the Alpha Vantage API to fetch stock price data. To use this extension, you must obtain an API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key) and configure it in a `.env` file.

### Steps to Configure the API Key
1. Sign up at [Alpha Vantage](https://www.alphavantage.co/support/#api-key) to get your free API key.
2. Create a `.env` file in the root directory of the project.
3. Add the following line to the `.env` file:

   ```
   ALPHA_VANTAGE_API_KEY=your_api_key_here
   ```

   Replace `your_api_key_here` with your actual API key.

This API key is required for the extension to authenticate requests to the Alpha Vantage API and retrieve stock price information.

## Usage
1. Open the Stock Tools Sidebar from the Activity Bar.
2. Click on the "Query Stock Price" button.
3. Enter the stock symbol (e.g., AAPL, MSFT) when prompted.
4. View the stock price information in the GitHub Copilot chat window or as a notification.

## Agent Mode Usage

In addition to the sidebar interface, you can use this extension in GitHub Copilot agent mode by following these steps:

1. Open the GitHub Copilot chat window and switch to agent mode
2. Type `#stock-price-query-tool` directly in the chat followed by the stock symbol (e.g., AAPL, TSLA) as part of your query, and click send.
4. The stock price information will be displayed in the chat response.

This approach allows seamless integration with GitHub Copilot for a conversational experience.

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