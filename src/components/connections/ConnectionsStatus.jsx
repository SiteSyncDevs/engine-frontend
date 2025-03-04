import React from "react";
import ConnectionStatusCard from "./ConnectionStatusCard";

export default function ConnectionsStatus({ connections }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {connections.map((connection) => (
        <ConnectionStatusCard
          key={connection.id}
          connectionName={connection.name}
          connectionDescription={connection.description}
          connectionProtocol={connection.protocol}
          address={connection.address}
          connected={connection.connected}
          lastUpdated={connection.lastStatusCheck}
        />
      ))}
    </div>
  );
}
