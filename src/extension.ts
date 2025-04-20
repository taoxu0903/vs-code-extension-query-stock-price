// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../.env' });
console.log('Loaded API Key:', process.env.ALPHA_VANTAGE_API_KEY);

// Cache setup
interface StockCache {
  [symbol: string]: {
    data: StockResponse;
    timestamp: number;
  };
}
const stockCache: StockCache = {};
const CACHE_DURATION = 60 * 1000; // Cache duration in milliseconds

// Stock response interface
interface StockResponse {
  symbol: string;
  currentPrice: number;
  currency: string;
  timestamp: string;
  companyName?: string;
  volume?: number;
  isCached: boolean;
}

async function fetchStockPrice(symbol: string): Promise<StockResponse> {
  // Check cache first
  if (stockCache[symbol] && Date.now() - stockCache[symbol].timestamp < CACHE_DURATION) {
    const cachedData = stockCache[symbol].data;
    cachedData.isCached = true;
    return cachedData;
  }

  // Fetch stock data from Alpha Vantage
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  if (!apiKey) {
    throw new Error('API key not configured.');
  }

  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
  const response = await axios.get(url);

  if (response.status !== 200 || !response.data['Global Quote']) {
    throw new Error('No data found for symbol.');
  }

  const quote = response.data['Global Quote'];
  const stockData: StockResponse = {
    symbol,
    currentPrice: parseFloat(quote['05. price'] || '0'),
    currency: 'USD',
    timestamp: new Date().toISOString(),
    companyName: undefined, // Add company name if needed
    volume: parseInt(quote['06. volume'] || '0', 10),
    isCached: false,
  };

  // Cache the data
  stockCache[symbol] = { data: stockData, timestamp: Date.now() };

  return stockData;
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log('Activating extension and registering tools...');

  // Register the extension as a tool for GitHub Copilot agent mode
  const copilotToolRegistration = vscode.lm.registerTool('stock-price-query-tool', {
    invoke: async (options: { input: { symbol: string } }, token) => {
        console.log('Invoking stock-price-query-tool with input:', options.input);
        const symbol = options.input.symbol || await vscode.window.showInputBox({
            prompt: 'Enter the stock symbol (e.g., AAPL, MSFT)',
        });

        if (!symbol) {
            throw new Error('Stock symbol is required.');
        }

        const stockData = await fetchStockPrice(symbol.toUpperCase());

        return new vscode.LanguageModelToolResult([
            new vscode.LanguageModelTextPart(
                `Symbol: ${stockData.symbol}\nPrice: ${stockData.currentPrice} ${stockData.currency}\nVolume: ${stockData.volume}\nTimestamp: ${stockData.timestamp}\nCached: ${stockData.isCached}`
            )
        ]);
    },
});

  context.subscriptions.push(copilotToolRegistration);
  console.log('Tool stock-price-query-tool registered successfully.');

  const command = 'extension.fetchStockPrice';

  const commandHandler = async () => {
    const symbol = await vscode.window.showInputBox({
      prompt: 'Enter the stock symbol (e.g., AAPL, MSFT)',
    });

    if (!symbol) {
      vscode.window.showErrorMessage('Stock symbol is required.');
      return;
    }

    try {
      const stockData = await fetchStockPrice(symbol.toUpperCase());
      vscode.window.showInformationMessage(
        `Symbol: ${stockData.symbol}\nPrice: ${stockData.currentPrice} ${stockData.currency}\nVolume: ${stockData.volume}\nTimestamp: ${stockData.timestamp}\nCached: ${stockData.isCached}`
      );
    } catch (error: any) {
      vscode.window.showErrorMessage(`Error fetching stock price: ${error.message}`);
    }
  };

  context.subscriptions.push(vscode.commands.registerCommand(command, commandHandler));

  // Add a new view container and view for the sidebar
  const viewContainer = vscode.window.createTreeView('stockToolsSidebar', {
    treeDataProvider: new StockToolsTreeDataProvider(),
  });

  context.subscriptions.push(viewContainer);

}

// Define the TreeDataProvider for the sidebar
class StockToolsTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | void> = new vscode.EventEmitter<vscode.TreeItem | undefined | void>();
  readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | void> = this._onDidChangeTreeData.event;

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: vscode.TreeItem): Thenable<vscode.TreeItem[]> {
    if (!element) {
      // Root level items
      return Promise.resolve([this.createQueryStockPriceButton()]);
    }
    return Promise.resolve([]);
  }

  private createQueryStockPriceButton(): vscode.TreeItem {
    const button = new vscode.TreeItem('Query Stock Price', vscode.TreeItemCollapsibleState.None);
    // button.command = {
    //   command: 'languageModelTools.runTool',
    //   title: 'Query Stock Price',
    //   arguments: ['stock-price-query-tool'], // Specify the tool to invoke
    // };
    // button.tooltip = 'Click to query stock price using language model tools';

    // implementation using extension command:
    button.command = {
        command: 'extension.fetchStockPrice',
        title: 'Query Stock Price',
    };

    return button;
  }
}

// This method is called when your extension is deactivated
export function deactivate() {}
