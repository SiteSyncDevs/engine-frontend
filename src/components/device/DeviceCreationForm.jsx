import { useState, useEffect } from "react";
import CustomButton from "../form/CustomButton";
import TextInput from "../form/TextInput";
import Dropdown from "../form/Dropdown";
import ApiHandler from "../../api/ApiHandler";

export default function CreateDeviceForm({ device, deviceProfiles }) {
  const [selectedDeviceProfile, setSelectedDeviceProfile] = useState(
    device.deviceProfile || ""
  );
  const [name, setName] = useState(device.deviceName || "");
  const [description, setDescription] = useState(device.description || "");
  const [devEui, setDevEUI] = useState(device.devEUI || "");
  const [joinEui, setJoinEUI] = useState(device.appEui || "");
  const [appKey, setAppKey] = useState(device.appKey || "");

  // Sync state with device prop when it changes
  useEffect(() => {
    setName(device.deviceName || "");
    setDescription(device.description || "");
    setDevEUI(device.devEUI || "");
    setJoinEUI(device.appEui || "");
    setAppKey(device.appKey || "");
    setSelectedDeviceProfile(device.deviceProfile || "");
  }, [device]);

  const handleSubmit = async () => {
    try {
      console.log("clicked");
      const apiData = {
        device_name: name,
        dev_eui: devEui,
        join_eui: joinEui,
        app_key: appKey,
        device_profile_id: selectedDeviceProfile,
        // description: description,
      };
      await ApiHandler.post("/routers/v1/device", apiData);
      console.log("Device created successfully:", apiData);
    } catch (error) {
      console.error("Error creating device:", error);
    }
  };

  if (!Array.isArray(deviceProfiles) || deviceProfiles.length === 0) {
    return <p>Loading device profiles...</p>;
  }

  return (
    <div className="device-creation-form">
      <div className="w-1/3">
        <TextInput
          label="Device Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth={true}
        />
      </div>
      <div className="flex flex-row gap-4 mt-2 w-1/3 justify-between">
        <TextInput
          label="Dev EUI"
          value={devEui}
          onChange={(e) => setDevEUI(e.target.value)}
        />
        <TextInput
          label="Join EUI"
          value={joinEui}
          onChange={(e) => setJoinEUI(e.target.value)}
        />
      </div>
      <div className="w-1/3 mb-6">
        <TextInput
          label="App Key"
          value={appKey}
          onChange={(e) => setAppKey(e.target.value)}
          fullWidth={true}
        />
        <div className="mt-4" />
        <Dropdown
          options={deviceProfiles}
          topLabel="Device Profile"
          value={selectedDeviceProfile}
          onChange={(value) => setSelectedDeviceProfile(value)}
          maxWidth={525}
        />
      </div>
      <CustomButton handleSubmit={handleSubmit} label="Create Device" />
    </div>
  );
}
