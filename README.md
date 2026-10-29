# QuasarUI MCP Server

Let your AI assistant find [QuasarUI](https://www.quasarui.com) Components for [Quasar Framework](https://quasar.dev) (Vue) and paste their source into your project.

Ask for "a pricing table with a monthly and yearly toggle" and your assistant searches the catalogue, picks a matching Component and pastes its code.

- **Without a key:** every Free Component. No account needed.
- **With an Access Key:** every Paid Component too, if your account holds All Access or Blocks Pro. [Create a key](https://www.quasarui.com/dashboard).

The server is hosted at `https://www.quasarui.com/mcp`. New Components appear there as soon as they are published; nothing here needs updating.

## Connect your client

Replace `YOUR_ACCESS_KEY` with your key, or leave the key out for Free Components only.

### Claude Code

```sh
claude mcp add --transport http quasarui https://www.quasarui.com/mcp --header "Authorization: Bearer YOUR_ACCESS_KEY"
```

### Cursor

Add to `~/.cursor/mcp.json`, or `.cursor/mcp.json` in a project:

```json
{
  "mcpServers": {
    "quasarui": {
      "url": "https://www.quasarui.com/mcp",
      "headers": { "Authorization": "Bearer YOUR_ACCESS_KEY" }
    }
  }
}
```

### Claude Desktop and other stdio clients

Clients that only start local servers can use this package, which forwards to the hosted server:

```json
{
  "mcpServers": {
    "quasarui": {
      "command": "npx",
      "args": ["-y", "quasarui-mcp"],
      "env": { "QUASARUI_ACCESS_KEY": "YOUR_ACCESS_KEY" }
    }
  }
}
```

### Docker

```sh
docker build -t quasarui-mcp .
docker run -i --rm -e QUASARUI_ACCESS_KEY=YOUR_ACCESS_KEY quasarui-mcp
```

## Tools

| Tool | What it does |
| --- | --- |
| `list_blocks` | Lists every Block with its Component counts |
| `list_components` | Lists the Components in a Block, each marked free or paid |
| `search_components` | Finds Components by what they are, such as "login form" or "sidebar" |
| `get_component` | Returns a Component's source |
| `get_setup_guide` | Explains how to set up a project and paste a Component |

Without access, asking for a Paid Component returns its preview link and how to unlock it, never its code.

## Limits and errors

- Each IP address can make 60 requests a minute, and so can each Access Key. Past that the server answers 429 for a short while.
- A wrong, revoked or malformed key gets **401**. The server never falls back to Free Components for a bad key.

## License

The code in this repository is MIT. Components returned by the server are covered by the [QuasarUI license](https://www.quasarui.com/documentation/licensing).
