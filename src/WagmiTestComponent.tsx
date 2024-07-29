import { useClient } from "wagmi";

export function WagmiTestComponent() {
  const client = useClient();

  if (!client) {
    throw new Error("Client not found");
  }

  return <div>Chain ID: {client.chain.id}</div>;
}

