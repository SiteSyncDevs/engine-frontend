import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";

import StarIcon from '@mui/icons-material/Star';
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import Tooltip from "@mui/material/Tooltip";
import { useMediaQuery } from "@mui/material";
import { IconButton } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function ConnectionStatusCard({
  connectionName,
  connectionDescription,
  connectionProtocol,
  address,
  connected,
  lastUpdated,
  isActive,
  publicId,
  onDelete
}) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    onDelete(publicId);
    handleCloseDeleteDialog();
  };

  return (
    <>
      <Card
        variant="outlined"
        className={`border-radius-2 ${isMobile ? "w-full" : "max-w-xs"} p-3`}
      >
        <Box>
          {/* Header with name and status */}
          <Stack direction="row" className="justify-between items-center mb-3">
            <Stack direction="column">
              <Typography variant="h6" component="div">
                {connectionName}
              </Typography>
              {/* <Typography variant="caption" color="text.secondary">
                Last Updated: {new Date(lastUpdated).toLocaleString()}
              </Typography> */}
            </Stack>
          </Stack>

          <Divider className="mb-3" />

          {/* Connection information */}
          <Stack spacing={0}>
            <Stack direction="row" className="mt-1">
              <Typography variant="body2" color="text.secondary">
                Exporter Type:
              </Typography>
              <Typography variant="body2" sx={{ ml: 1 }}>
                {connectionProtocol}
              </Typography>
            </Stack>
            
            <Stack direction="row" className="mt-1">
              <Typography variant="body2" color="text.secondary">
                IP Address:
              </Typography>
              <Typography variant="body2" sx={{ ml: 1 }}>
                {address}
              </Typography>
            </Stack>

            <Stack direction="row" className="mt-1 mb-2">
              <Typography variant="body2" color="text.secondary">
                Active:
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  ml: 1
                }}
              >
                {isActive ? "True" : "False"}
              </Typography>
            </Stack>
            {/* <Divider className="" /> */}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>

            {/* <Tooltip title="Set as Active Exporter" arrow>
                <IconButton
                  aria-label="Set Active"
                  color={isActive ? "primary" : "default"}
                  size="small"
                >
                  <StarIcon fontSize="small" />
                </IconButton>
              </Tooltip> */}
              <Tooltip title="Delete Exporter" arrow>
                <IconButton
                  aria-label="Delete Connection"
                  color="error"
                  size="small"
                  onClick={handleOpenDeleteDialog}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>

            </Box>

                    {/* Connection details */}
        
          </Stack>
        </Box>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete the connection "{connectionName}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            color="error" 
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
