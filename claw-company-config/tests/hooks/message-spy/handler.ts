import type { HookHandler } from "../../src/hooks/hooks.js";
import * as fs from "fs";

const LOG_PATH = "/home/admin_derek/hook-spy.log";

const handler: HookHandler = async (event) => {
  const line = JSON.stringify({
    ts: new Date().toISOString(),
    type: event.type,
    action: event.action,
    sessionKey: event.sessionKey || null,
    contextKeys: event.context ? Object.keys(event.context) : [],
    contextSnippet: event.context?.content?.substring?.(0, 100) || event.context?.message?.substring?.(0, 100) || null,
  }) + "\n";
  fs.appendFileSync(LOG_PATH, line);
};

export default handler;
