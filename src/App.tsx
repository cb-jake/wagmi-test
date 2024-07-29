import { useMemo } from "react";
import "./App.css";
import { createConfig, WagmiProvider } from "wagmi";
import { base, mainnet, polygon } from "viem/chains";
import { bundlerActions } from "permissionless";
import { ErrorBoundary } from "react-error-boundary";

import { createClient, http } from "viem";
import { WagmiTestComponent } from "./WagmiTestComponent";

const DEFAULT_CONNECTION_STATE = {
  connections: new Map(),
  current: "",
  status: "disconnected" as const,
};

function App() {
  // config is defined in the render because the supported chains can change based on kill switches
  const config = useMemo(
    () =>
      createConfig({
        chains: [base, mainnet, polygon],
        multiInjectedProviderDiscovery: false,
        client({ chain }) {
          return createClient({
            chain,
            transport: http(),
          }).extend(bundlerActions);
        },
      }),
    []
  );

  const initialState = useMemo(
    () => ({
      ...DEFAULT_CONNECTION_STATE,
      chainId: base.id,
    }),
    []
  );

  return (
    <ErrorBoundary
      fallbackRender={() => <div>Something went wrong</div>}
    >
      <WagmiProvider config={config} initialState={initialState}>
        <h1>Wagmi</h1>
        <WagmiTestComponent />
      </WagmiProvider>
    </ErrorBoundary>
  );
}

export default App;
