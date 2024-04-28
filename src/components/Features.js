import React, { useEffect } from "react";
import { database } from "../firebase-config.js";
import { ref as databaseRef, onValue, off } from "firebase/database";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";
import EdgesensorHighRoundedIcon from "@mui/icons-material/EdgesensorHighRounded";
import ViewQuiltRoundedIcon from "@mui/icons-material/ViewQuiltRounded";

const items = [
  {
    icon: <ViewQuiltRoundedIcon />,
    title: "Dashboard",
    description:
      "This item could provide a snapshot of the most important metrics or data points related to the product.",
    imageLight:
      'url("/static/images/templates/templates-images/dash-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/dash-dark.png")',
  },
  {
    icon: <EdgesensorHighRoundedIcon />,
    title: "Mobile integration",
    description:
      "This item could provide information about the mobile app version of the product.",
    imageLight:
      'url("/static/images/templates/templates-images/mobile-light.png")',
    imageDark:
      'url("/static/images/templates/templates-images/mobile-dark.png")',
  },
  {
    icon: <DevicesRoundedIcon />,
    title: "Available on all platforms",
    description:
      "This item could let users know the product is available on all platforms, such as web, mobile, and desktop.",
    imageLight:
      'url("/static/images/templates/templates-images/devices-light.png")',
    imageDark:
      'url("/static/images/templates/templates-images/devices-dark.png")',
  },
];

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [sideImage, setSideImage] = React.useState([]);

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const imagesRef = databaseRef(
          database,
          "organizations/Maharaja Surajmal Institute of Technology/images"
        );
        const listener = onValue(imagesRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            // Find the imageURL where priority is true
            const imageURL = Object.values(data).find(
              (image) => image.priority === true
            )?.imageURL;

            let temp = [];
            const entries = Object.values(data);

            for (let i = 0; i < entries.length; i++) {
              const entry = entries[i];
              if (entry.priority === false) {
                const val = {
                  icon: <ViewQuiltRoundedIcon />,
                  title: entry.title,
                  description: entry.info + "...",
                  imageLight:
                    'url("/static/images/templates/templates-images/dash-light.png")',
                  imageDark:
                    'url("/static/images/templates/templates-images/dash-dark.png")',
                  imageURL: entry.imageURL,
                };
                temp.push(val);
              }

              if (temp.length >= 3) {
                break; // Exit the loop if temp length is greater than or equal to 3
              }
            }

            if (temp.length < 3) {
              const remaining = 3 - temp.length;
              for (let i = 0; i < remaining; i++) {
                const defaultVal = {
                  icon: <ViewQuiltRoundedIcon />,
                  title: "No Info....",
                  description: "...",
                  imageLight:
                    'url("/static/images/templates/templates-images/default-light.png")',
                  imageDark:
                    'url("/static/images/templates/templates-images/default-dark.png")',
                    imageURL: "",
                };
                temp.push(defaultVal);
              }
            }

            setSideImage(temp);
            console.log(sideImage)
            setImageUrl(imageURL);
          }
        });

        // Cleanup function to remove the listener when component unmounts
        return () => {
          off(listener);
        };
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchImageUrl();
  }, []);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = sideImage[selectedItemIndex];

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <div>
            <Typography component="h2" variant="h4" color="text.primary">
              Important Announcements
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: { xs: 2, sm: 4 } }}
            >
              Here you can provide with all the important information and dates
              with regards to various activities and events happening in our
              organization.
            </Typography>
          </div>
          <Grid
            container
            item
            gap={1}
            sx={{ display: { xs: "auto", sm: "none" } }}
          >
            {sideImage.map(({ title }, index) => (
              <Chip
                key={index}
                label={title}
                onClick={() => handleItemClick(index)}
                sx={{
                  borderColor: (theme) => {
                    if (theme.palette.mode === "light") {
                      return selectedItemIndex === index ? "primary.light" : "";
                    }
                    return selectedItemIndex === index ? "primary.light" : "";
                  },
                  background: (theme) => {
                    if (theme.palette.mode === "light") {
                      return selectedItemIndex === index ? "none" : "";
                    }
                    return selectedItemIndex === index ? "none" : "";
                  },
                  backgroundColor:
                    selectedItemIndex === index ? "primary.main" : "",
                  "& .MuiChip-label": {
                    color: selectedItemIndex === index ? "#fff" : "",
                  },
                }}
              />
            ))}
          </Grid>
          <Box
            component={Card}
            variant="outlined"
            sx={{
              display: { xs: "auto", sm: "none" },
              mt: 4,
            }}
          >
            <Box
              sx={{
                backgroundImage: (theme) =>
                  theme.palette.mode === "light"
                    ? sideImage[selectedItemIndex]?.imageLight
                    : sideImage[selectedItemIndex]?.imageDark,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: 280,
              }}
            />
            <Box sx={{ px: 2, pb: 2 }}>
              <Typography
                color="text.primary"
                variant="body2"
                fontWeight="bold"
              >
                {selectedFeature?.title || ""}
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
                sx={{ my: 0.5 }}
              >
                {selectedFeature?.description || ""}
              </Typography>
              <Link
  color="primary"
  variant="body2"
  fontWeight="bold"
  href={selectedFeature?.imageURL || ""}
  target="_blank"
  rel="noopener noreferrer"
  sx={{
    display: "inline-flex",
    alignItems: "center",
    "& > svg": { transition: "0.2s" },
    "&:hover > svg": { transform: "translateX(2px)" },
  }}
>
  <span>Learn more</span>
  <ChevronRightRoundedIcon fontSize="small" sx={{ mt: "1px", ml: "2px" }} />
</Link>
            </Box>
          </Box>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            useFlexGap
            sx={{ width: "100%", display: { xs: "none", sm: "flex" } }}
          >
            {sideImage.map(({ icon, title, description }, index) => (
              <Card
                key={index}
                variant="outlined"
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={{
                  p: 3,
                  height: "fit-content",
                  width: "100%",
                  background: "none",
                  backgroundColor:
                    selectedItemIndex === index ? "action.selected" : undefined,
                  borderColor: (theme) => {
                    if (theme.palette.mode === "light") {
                      return selectedItemIndex === index
                        ? "primary.light"
                        : "grey.200";
                    }
                    return selectedItemIndex === index
                      ? "primary.dark"
                      : "grey.800";
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    textAlign: "left",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: { md: "center" },
                    gap: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      color: (theme) => {
                        if (theme.palette.mode === "light") {
                          return selectedItemIndex === index
                            ? "primary.main"
                            : "grey.300";
                        }
                        return selectedItemIndex === index
                          ? "primary.main"
                          : "grey.700";
                      },
                    }}
                  >
                    {icon}
                  </Box>
                  <Box sx={{ textTransform: "none" }}>
                    <Typography
                      color="text.primary"
                      variant="body2"
                      fontWeight="bold"
                    >
                      {title}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                      sx={{ my: 0.5 }}
                    >
                      {description}
                    </Typography>
                    <Link
                      color="primary"
                      variant="body2"
                      fontWeight="bold"
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        "& > svg": { transition: "0.2s" },
                        "&:hover > svg": { transform: "translateX(2px)" },
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      <span>Learn more</span>
                      <ChevronRightRoundedIcon
                        fontSize="small"
                        sx={{ mt: "1px", ml: "2px" }}
                      />
                    </Link>
                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { xs: "none", sm: "flex" }, width: "100%" }}
        >
          <Card
            variant="outlined"
            sx={{
              height: "100%",
              width: "100%",
              display: { xs: "none", sm: "flex" },
              pointerEvents: "none",
            }}
          >
            <img
              src={imageUrl}
              alt="MSIT"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}