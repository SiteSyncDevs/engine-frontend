export default function DeviceDashboard({ device }) {
  return (
    <div>
      <h1>
        <strong>{device.name}</strong>
      </h1>
      <div className=" border-black w-2/3 mt-3 ">
        <div className=" mb-4">
          <div className="flex flex-row gap-3 mb-2">
            <h1>Device EUI:</h1>
            <h1>{device.dev_eui}</h1>
          </div>
          {/* <div className="flex flex-row gap-3 mb-2">
            <h1>Device Profle:</h1>
            <h1>{device.deviceType}</h1>
          </div> */}
          <div className="flex flex-row gap-3 mb-2">
            <h1>Last Seen:</h1>
            <h1>{device.last_seen ? device.last_seen : "Never"}</h1>
          </div>
          <div>
            <h1>Description:</h1>
            <p>{device.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
