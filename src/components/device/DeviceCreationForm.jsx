import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import CustomButton from "../form/CustomButton";
import TextInput from "../form/TextInput";
import Dropdown from "../form/Dropdown";
import ApiHandler from "../../api/ApiHandler";
export default function DeviceCreationForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dev_eui, setDevEUI] = useState("");
  const [join_eui, setJoinEUI] = useState("");
  const [app_key, setAppKey] = useState("");
  const [device_profile_id, setDeviceProfile] = useState("");
  const [deviceProfiles, setDeviceProfiles] = useState([]);
  const [selectedDeviceProfile, setSelectedDeviceProfile] = useState(null);

  useEffect(() => {
    const fetchDeviceProfiles = async () => {
      try {
        const deviceProfilesRes = await ApiHandler.get(
          "/routers/v1/device-profile"
        );
        const transformedProfiles = deviceProfilesRes.map((profile) => ({
          value: profile.id,
          label: profile.name,
        }));

        setDeviceProfiles(transformedProfiles);
        console.log("Device Profiles:", transformedProfiles);
      } catch (error) {
        console.error("Failed to fetch device profiles:", error);
      }
    };

    fetchDeviceProfiles();
  }, []);
  const handleSubmit = async () => {
    try {
      const payload = {
        name,
        description,
        dev_eui,
        join_eui,
        app_key,
        device_profile_id,
      };
      console.log("Submitting device:", payload);
      // Add your device creation logic here
    } catch (error) {
      console.error("Error creating device:", error);
    }
  };

  return (
    <div className="device-creation-form ">
      {/* Device Name */}
      <div className="w-1/3 ">
        <TextInput
          label="Device Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth={true}
        />
      </div>
      {/* Dev EUI and Join EUI in a Flex Row */}
      <div className="flex flex-row gap-4 mt-2  w-1/3  justify-between">
        <TextInput
          label="Dev EUI"
          value={dev_eui}
          onChange={(e) => setDevEUI(e.target.value)}
          //   fullWidth
        />
        <TextInput
          label="Join EUI"
          value={join_eui}
          onChange={(e) => setJoinEUI(e.target.value)}
          //   fullWidth
        />
      </div>
      <div className="w-1/3 mb-6">
        <TextInput
          label="App Key"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
      <CustomButton onClick={handleSubmit} label="Create Device" />
    </div>
  );
}
