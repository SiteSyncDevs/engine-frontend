import React, { useState } from 'react';
import TextInput from "../form/TextInput";
import TextArea from "../form/TextArea";
import ApiHandler from "../../api/ApiHandler";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';


export default function DeviceDashboard({ device }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    device
  });

  const handleInputChange = (name, value) => {

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ApiHandler.put("/routers/v1/device", formData).then(response => {
      console.log("Response:", response);
    }).catch(error => {
      console.error("Error:", error);
    });
    setIsEditing(false);
  };

  return (

    <div>
      <button className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-md" onClick={handleToggleEdit}>
        {isEditing ? 'Cancel' : 'Edit'}


        {isEditing ? <CancelIcon className="ml-2" /> : <EditIcon className="ml-2" />}
      </button>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              <TextInput
                label="Name"
                value={device.name}
                onChange={(value) => handleInputChange("name", value)}
                fullWidth={true}
              />
            </label>
          </div>
          <div>
            <label>
              <TextArea
                label="Description"
                value={device.description}
                onChange={(value) => handleInputChange("description", value)}
                fullWidth={true}
              />
            </label>
          </div>
          <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md" type="submit">Save</button>
        </form>
      ) : <div>
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
      </div>}

    </div>
  );
}
