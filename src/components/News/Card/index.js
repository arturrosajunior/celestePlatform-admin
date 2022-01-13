import React from "react";

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CardNews = () => {
  return (
    <Card sx={{ mb: 1.5 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 12 }}
          color="text.secondary"
          gutterBottom
        ></Typography>
        <Typography variant="p" component="div">
          S Somanath, the rocket scientist serving as Vikram Sarabhai Space
          Centre Director, will be ISRO's new Chairman. He did B.Tech in
          Mechanical Engineering from TKM College of Engineering...
        </Typography>

        <Stack sx={{ mt: 1.5 }} direction="row" spacing={0.5}>
          <Chip label="Palavra 1" color="info" variant="outlined" />
          <Chip label="Palavra 2" color="info" variant="outlined" />
          <Chip label="Palavra 3" color="info" variant="outlined" />
        </Stack>

      </CardContent>
      <CardActions>
        <Button size="medium">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default CardNews;
