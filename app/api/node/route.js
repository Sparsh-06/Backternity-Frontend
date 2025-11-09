import { CodeSandbox } from "@codesandbox/sdk";

export async function POST(request) {
  try {
    const body = await request.json();
    const { code } = body;
    
    if (!code) {
      return Response.json({ error: "Missing code" }, { status: 400 });
    }

    // Instantiate SDK
    const sdk = new CodeSandbox(process.env.CSB_API_KEY);

    // Step 1: Create the sandbox
    const sandbox = await sdk.sandboxes.create({ template: "node" });

    // Step 2: Connect to the sandbox to get a client/session
    const client = await sandbox.connect();

    // Step 3: Use the client (not sandbox) to write file and run commands
    await client.fs.writeTextFile("server.js", code);

    // Step 4: Run the Node.js server using the client
    const nodeProcess = await client.commands.run("node server.js");

    // Step 5: Get the port and preview URL (from client)
    const port = await nodeProcess.ports.getOpenedPort(3000);
    const previewUrl = port.getPreviewUrl();

    return Response.json({ previewUrl, sandboxId: sandbox.id });
  } catch (err) {
    console.error("CodeSandbox API Error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
