#!/usr/bin/env node
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const endpoint = new URL(process.env.QUASARUI_MCP_URL || "https://www.quasarui.com/mcp");
const accessKey = process.env.QUASARUI_ACCESS_KEY?.trim();
const headers = accessKey ? { Authorization: `Bearer ${accessKey}` } : {};

const remote = new Client({ name: "quasarui-mcp", version: "1.0.0" });
await remote.connect(new StreamableHTTPClientTransport(endpoint, { requestInit: { headers } }));

// Tools are forwarded as the hosted server lists them, so new Components and tools need no release here.
const local = new Server(
	{ name: "quasarui", version: "1.0.0" },
	{ capabilities: { tools: {} }, instructions: remote.getInstructions() },
);
local.setRequestHandler(ListToolsRequestSchema, request => remote.listTools(request.params));
local.setRequestHandler(CallToolRequestSchema, request => remote.callTool(request.params));
local.onclose = () => remote.close();

await local.connect(new StdioServerTransport());
