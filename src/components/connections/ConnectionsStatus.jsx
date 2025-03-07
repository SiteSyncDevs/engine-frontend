import React from "react";
import ConnectionStatusCard from "./ConnectionStatusCard";
import ApiHandler from "../../api/ApiHandler";

export default function ConnectionsStatus({ connections, setConnections }) {
  // const handleDelete = (publicId) => {
    // Pass this up to parent or handle deletion logic here
    // console.log("Deleting connection with ID:", publicId);

    const handleDelete = async (publicId) => {
      console.log("Deleting connection with ID:", publicId);
  
      try {
        await ApiHandler.delete(`/api/v1/exporter/delete?public_id=` + publicId);
        // Update local state by filtering out the deleted connection
        setConnections(prevConnections => 
          prevConnections.filter(connection => connection.public_id !== publicId)
        );
      } catch (error) {
        console.error('Error handling connection deletion:', error);
      }
    };

  // };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {connections.map((connection) => (
        <ConnectionStatusCard
          key={connection.id}
          connectionName={connection.name}
          connectionDescription={connection.description}
          connectionProtocol={connection.protocol}
          address={connection.ip_address}
          connected={connection.connected}
          lastUpdated={connection.lastStatusCheck}
          isActive={connection.isActive}
          publicId={connection.public_id}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
