import { useState } from "react";
import CustomButton from "../form/CustomButton";
import TextInput from "../form/TextInput";
import Dropdown from "../form/Dropdown";
import ApiHandler from "../../api/ApiHandler";
import PopupAlert from "../utils/PopupAlert/Popup";
import TextArea from "../form/TextArea";

export default function DeviceCreationForm({ device, deviceProfiles, errors, scanData }) {
  const [selectedDeviceProfile, setSelectedDeviceProfile] = useState(null);
  const [name, setName] = useState(device.deviceName);
  const [description, setDescription] = useState();
  const [dev_eui, setDevEUI] = useState(device.devEUI);
  const [join_eui, setJoinEUI] = useState(device.appEui);
  const [app_key, setAppKey] = useState(device.appKey);
  const [device_profile_id, setDeviceProfile] = useState(device.deviceProfile);
  const [alert, setAlert] = useState(null);

  const handleSubmit = async () => {
    try {
      const apiData = {
        device_name: name,
        dev_eui: dev_eui,
        join_eui: join_eui,
        app_key: app_key,
        device_profile_id: device_profile_id,
        description: description,
      };
      const data = await ApiHandler.post("/routes/v1/device", apiData);
      console.log("Device Create Form data rep: ", data);
      setAlert({
        type: "success",
        message: "Device Created Successfully."
      })
    } catch (error) {
      console.error("Error creating device:", error);
      setAlert({
        type: "error",
        message: "Error Creating Device. Please Try again.",
      });
    }
  };

  if (!Array.isArray(deviceProfiles) || deviceProfiles.length === 0) {
    return <p>Loading device profiles...</p>;
  }

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
            error={errors.deviceName}
            helperText="Please enter the device name."
          />
        </div>
        {/* Dev EUI and Join EUI in a Flex Row */}
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-1/3 mb-4">
          <TextInput
            label="Dev EUI"
            value={dev_eui}
            onChange={(e) => setDevEUI(e.target.value)}
            fullWidth={true}
            error={errors.devEUI}
            helperText="Please enter the Dev EUI."
          />
          <TextInput
            label="Join EUI"
            value={join_eui}
            onChange={(e) => setJoinEUI(e.target.value)}
            fullWidth={true}
            error={errors.appEui}
            helperText="Please enter the Join EUI."
          />
        </div>
        <div className="w-full md:w-1/3 mb-6">
          <TextInput
            label="App Key"
            value={app_key}
            onChange={(e) => setAppKey(e.target.value)}
            fullWidth={true}
            error={errors.appKey}
            helperText="Please enter the App Key."
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
              error={errors.deviceProfile}
              helperText="Please select a device profile."
            />
          )}
        </div>

        <TextArea value={scanData} placeholder="Scan data will appear here" />

        <CustomButton handleSubmit={handleSubmit} label="Create Device" />
      </div>
    </>
  );
}