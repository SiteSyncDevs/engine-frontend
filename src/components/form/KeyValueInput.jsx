import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ApiHandler from "../../api/ApiHandler";
import { useEffect } from "react";
import Dropdown from "../form/Dropdown";
export default function KeyValueInput({device}) {
  const [tags, setTags] = useState([{ decoded_attribute: "", destination_path: "", dev_eui: device.dev_eui }]);
  const [attributes, setAttributes] = useState([]);
 
 

  useEffect(() => {
    if (device.mappings) {
      setTags(device.mappings);
    }
  }, [device.mappings]);

  useEffect(() => {
    const fetchAttributes = async () => {
      const data = await ApiHandler.get(`/api/v1/device-profile/${device.device_profile_id}/variables`);
      setAttributes(data);
    }
    fetchAttributes();
  }, []);


  const handleAddTag = () => {
    setTags([...tags, { decoded_attribute: "", destination_path: "", dev_eui: device.dev_eui }]);
  };

  const handleRemoveTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };

  const handleInputChange = (index, field, value) => {
    const updatedTags = tags.map((tag, i) =>
      i === index ? { ...tag, [field]: value } : tag
    );
    setTags(updatedTags);
  };

  const handleSubmit = () => {
    console.log("Tags:", tags);
    ApiHandler.post("/api/v1/device/mappings/" + device.dev_eui, tags).then(response => {
      console.log("Response:", response);
    }).catch(error => {
      console.error("Error:", error);
    });

  };

  const handleDownloadCSV = () => {
    const headers = "Source,Destination\n";
    const rows = tags.map((tag) => `${tag.decoded_attribute},${tag.destination_path}`).join("\n");
    const csvContent = headers + rows;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${device.dev_eui}-mappings.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUploadCSV = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target.result;
      const rows = csv.split("\n").filter((row) => row.trim() !== ""); // Split by rows and remove empty lines
      const parsedTags = rows.slice(1).map((row) => {
        const [key, value] = row.split(","); // Split by comma
        return { key: key?.trim(), value: value?.trim() };
      });
      setTags(parsedTags);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      {tags.map((tag, index) => (
        <div
          key={index}
          className="flex flex-row gap-3 mb-2 w-1/2 items-center"
        >
           <Dropdown
          options={attributes}
          topLabel=""
          value={tag.decoded_attribute}
          onChange={(value) => handleInputChange(index, "decoded_attribute", value)}
          maxWidth={525}
        />

          {/* <input
            type="text"
            className="border border-gray-300 rounded-md w-1/2 p-2"
            placeholder="Key"
            value={tag.decoded_attribute}
            {(value) => setSelectedDeviceProfile(value)}
            onChange={(e) => handleInputChange(index, "decoded_attribute", e.target.value)}
          /> */}
          <input
            style={{
              width: "300px"}}
            type="text"
            className="border border-gray-300 rounded-md w-1/2 p-2"
            placeholder="Value"
            value={tag.destination_path}
            onChange={(e) => handleInputChange(index, "destination_path", e.target.value)}
          />
          <DeleteIcon
            onClick={() => handleRemoveTag(index)}
            style={{ cursor: "pointer", color: "red" }}
          />
        </div>
      ))}
      <div className="flex flex-row gap-3">
        <button
          onClick={handleAddTag}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2"
        >
          <AddIcon />
          Add
        </button>
        <button
          onClick={handleSubmit}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Submit
        </button>
        <button
          onClick={handleDownloadCSV}
          className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          Download CSV
        </button>
        <label
          className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-md cursor-pointer"
        >
          Upload CSV
          <input
            type="file"
            accept=".csv"
            style={{ display: "none" }}
            onChange={handleUploadCSV}
          />
        </label>
      </div>
    </div>
  );
}
