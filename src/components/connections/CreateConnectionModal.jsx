import React, { useState } from "react";
import Button from "@mui/material/Button";
import {
  TextareaAutosize,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function CreateConnectionModal() {
  const [open, setOpen] = useState(false);
  const [connectionType, setConnectionType] = useState("");
  const [connectionName, setConnectionName] = useState("");
  const [hostname, setHostname] = useState("");
  const [port, setPort] = useState("");
  const [description, setDescription] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const connectionData = {
      connectionType,
      connectionName,
      hostname,
      port,
      description,
    };

    console.log("Connection Data:", connectionData);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>New Connection</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new connection for SiteSync engine to forward data to.
          </DialogContentText>

          <FormControl sx={{ marginTop: 2 }} fullWidth>
            <InputLabel id="connection-type-label">Connection Type</InputLabel>
            <Select
              labelId="connection-type-label"
              id="connection-type"
              value={connectionType}
              label="Connection Type"
              onChange={(event) => setConnectionType(event.target.value)}
            >
              <MenuItem value="Type1">Type 1</MenuItem>
              <MenuItem value="Type2">Type 2</MenuItem>
              <MenuItem value="Type3">Type 3</MenuItem>
            </Select>
          </FormControl>

          <TextField
            autoFocus
            required
            margin="dense"
            id="connection-name"
            name="connectionName"
            label="Connection Name"
            type="text"
            fullWidth
            variant="standard"
            value={connectionName}
            onChange={(event) => setConnectionName(event.target.value)}
          />

          <TextField
            required
            margin="dense"
            id="hostname"
            name="hostname"
            label="Hostname/IP"
            type="text"
            fullWidth
            variant="standard"
            value={hostname}
            onChange={(event) => setHostname(event.target.value)}
          />

          <TextField
            required
            margin="dense"
            id="port"
            name="port"
            label="Port"
            type="text"
            fullWidth
            variant="standard"
            value={port}
            onChange={(event) => setPort(event.target.value)}
          />

          <TextField
            margin="dense"
            id="description"
            name="description"
            label="Connection Description"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
