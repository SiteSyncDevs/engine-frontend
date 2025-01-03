import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import CustomButton from "../form/CustomButton";
import TextInput from "../form/TextInput";
import Dropdown from "../form/Dropdown";
import ApiHandler from "../../api/ApiHandler";
import PopupAlert from "../utils/PopupAlert/Popup";

export default function DeviceCreationForm({ device, deviceProfiles }) {
  const [selectedDeviceProfile, setSelectedDeviceProfile] = useState(null);
  const [name, setName] = useState(device.name);
  const [description, setDescription] = useState();
  const [dev_eui, setDevEUI] = useState(device.devEUI);
  const [join_eui, setJoinEUI] = useState(device.appEui);
  const [app_key, setAppKey] = useState(device.appKey);
  const [device_profile_id, setDeviceProfile] = useState(device.deviceProfile);
  const [alert, setAlert] = useState(null);

  const handleSubmit = () => {
    try {
      const apiData = {
        device_name: name,
        dev_eui: dev_eui,
        join_eui: join_eui,
        app_key: app_key,
        device_profile_id: device_profile_id,
        description: description,
      };
      ApiHandler.post("/routers/v1/device", apiData).then((data) => {
        console.log("Data:", data);

        // show success message
        setAlert({
          type: "success",
          message: "Device Created Successfully.",
        });
      });
    } catch (error) {
      console.error("Error creating device:", error);
      setAlert({
        type: "error",
        message: "Error Creating Device. Please Try again.",
      });
    }
  };

  return (
    <>
      {alert && (
        <PopupAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="device-creation-form p-4">
        {/* Device Name */}
        <div className="w-full md:w-1/3 mb-4">
          <TextInput
            label="Device Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth={true}
          />
        </div>
        {/* Dev EUI and Join EUI in a Flex Row */}
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-1/3 mb-4">
          <TextInput
            label="Dev EUI"
            value={dev_eui}
            onChange={(e) => setDevEUI(e.target.value)}
            fullWidth={true}
          />
          <TextInput
            label="Join EUI"
            value={join_eui}
            onChange={(e) => setJoinEUI(e.target.value)}
            fullWidth={true}
          />
        </div>
        <div className="w-full md:w-1/3 mb-6">
          <TextInput
            label="App Key"
            value={app_key}
            onChange={(e) => setAppKey(e.target.value)}
            fullWidth={true}
          />
          <div className="mt-4" />

          {deviceProfiles.length === undefined ? (
            <div className="text-red-500">No device profiles available</div>
          ) : (
            <Dropdown
              options={deviceProfiles}
              topLabel="Device Profile"
              value={selectedDeviceProfile}
              onChange={(value) => setSelectedDeviceProfile(value)}
              maxWidth={525}
            />
          )}
        </div>
        <CustomButton handleSubmit={handleSubmit} label="Create Device" />
      </div>
    </>
  );
}