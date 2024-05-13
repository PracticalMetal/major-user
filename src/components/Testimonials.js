import React, { useEffect, useState } from "react";
import { database } from "../firebase-config";
import { ref as databaseRef, onValue, off } from "firebase/database";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ArchiveIcon from "@mui/icons-material/Archive";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { deepOrange, deepPurple } from "@mui/material/colors";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/system";
import Link from "@mui/material/Link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const userTestimonials = [
  {
    avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
    name: "Remy Sharp",
    occupation: "Senior Engineer",
    testimonial:
      '<a href="https://firebasestorage.googleapis.com/v0/b/major-notice-board-294fc.appspot.com/o/images%2F1.jpg?alt=media&token=98b092fb-9b0c-46ba-bc71-54e0e716bfd2">Sports Meet</a> <a href="https://firebasestorage.googleapis.com/v0/b/major-notice-board-294fc.appspot.com/o/images%2F2.jpg?alt=media&token=f43b37fa-c13e-41b2-8c5f-7fe74f31a3f2">Annual Cultural Fest Announcement</a>',
  },
  {
    avatar: <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />,
    name: "Travis Howard",
    occupation: "Lead Product Designer",
    testimonial:
      "One of the standout features of this product is the exceptional customer support. In my experience, the team behind this product has been quick to respond and incredibly helpful. It's reassuring to know that they stand firmly behind their product.",
  },
  {
    avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />,
    name: "Cindy Baker",
    occupation: "CTO",
    testimonial:
      "The level of simplicity and user-friendliness in this product has significantly simplified my life. I appreciate the creators for delivering a solution that not only meets but exceeds user expectations.",
  },
];

const whiteLogos = [
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628e8573c43893fe0ace_Sydney-white.svg",
  // Add more logos...
];

const darkLogos = [
  "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg",
  // Add more logos...
];

const logoStyle = {
  width: "64px",
  opacity: 0.3,
};

export default function Testimonials() {
  const theme = useTheme();
  const logos = theme.palette.mode === "light" ? darkLogos : whiteLogos;

  // Filter testimonials for the current month and previous two months

  // Function to format the month name
  const getMonthName = (month) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[month];
  };

  const [documents, setDocuments] = useState([]);
  const [curMonth, setCurMonth] = useState();
  const [preMonth, setPrevMonth] = useState();
  const [prePreMonth, setPrePreMonth] = useState();
  const [userData, setUserDate] = useState([]);

  useEffect(() => {
    const date = new Date();
    const month = date.getMonth();

    setCurMonth(month);
    setPrevMonth(month - 1);
    setPrePreMonth(month - 2);

    const fetchDocuments = async () => {
      try {
        const documentsRef = databaseRef(
          database,
          `organizations/Maharaja Surajmal Institute of Technology/${curMonth}`
        );
        const listener = onValue(documentsRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const arr = [];
            Object.entries(data).forEach(([key, value]) => {
              const tempCurData = {
                heading: value.title,
                imageURL: value.imageURL,
              };

              arr.push(tempCurData);
            });

            const monthCur = getMonthName(curMonth);
            const tempCurDate = {
              avatar: (
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              ),
              name: monthCur,
              testimonial: arr,
            };

            setUserDate([tempCurDate]);

            // Extract the headings from the fetched documents
            const headings = Object.values(data).map(
              (document) => document.title
            );
            setDocuments(headings);
          } else {
            // If no documents found for the current month, set an empty array
            console.log("No documents found for the current month.");
            setDocuments([]);
          }
        });

        // Cleanup function to remove the listener when component unmounts
        return () => {
          off(listener);
        };
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      // prev month
      try {
        const documentsRef = databaseRef(
          database,
          `organizations/Maharaja Surajmal Institute of Technology/${preMonth}`
        );
        const listener = onValue(documentsRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            // Extract the headings from the fetched documents
            const arr = [];
            Object.entries(data).forEach(([key, value]) => {
              const tempCurData = {
                heading: value.title,
                imageURL: value.imageURL,
              };

              arr.push(tempCurData);
            });

            const monthCur = getMonthName(curMonth - 1);
            const tempCurDate = {
              avatar: (
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              ),
              name: monthCur,
              testimonial: arr,
            };

            setUserDate([tempCurDate]);

            const headings = Object.values(data).map(
              (document) => document.title
            );
            setDocuments(headings);
          } else {
            // If no documents found for the current month, set an empty array
            console.log("No documents found for the previous month.");
            setDocuments([]);
          }
        });

        // Cleanup function to remove the listener when component unmounts
        return () => {
          off(listener);
        };
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      // prev to prev
      try {
        const documentsRef = databaseRef(
          database,
          `organizations/Maharaja Surajmal Institute of Technology/${prePreMonth}`
        );
        const listener = onValue(documentsRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            // Extract the headings from the fetched documents
            const headings = Object.values(data).map(
              (document) => document.title
            );
            console.log("Extracted headings:", headings);
            setDocuments(headings);
          } else {
            // If no documents found for the current month, set an empty array
            console.log(
              "No documents found for the Previous to Previous month."
            );
            setDocuments([]);
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

    fetchDocuments();
  }, [curMonth, preMonth, prePreMonth]);

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 4 },
        pb: { xs: 8, sm: 8 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          textAlign: { sm: "left", md: "center" },
          pt: { xs: 4, sm: 2 },
          width: "100%",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Archives
          
          <ArchiveIcon sx={{ padding: "1px" }} />
        </Typography><Link href="/doc-history" color="primary">
          View Complete History
        </Link>
        <Typography variant="body1" color="text.secondary">
          Explore the comprehensive archive containing all previously uploaded
          documents for your reference and review.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {userData.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: "flex" }}>
            <Box
              sx={{
                overflowY: "auto",
                maxHeight: 400,
                borderRadius: "8px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                bgcolor: "#f8f9fa",
                padding: "16px",
              }}
            >
              <List sx={{ width: "100%" }}>
                <ListItem>
                  <Avatar
                    sx={{ bgcolor: deepOrange[500], margin: "4px", width: 40, height: 40 }}
                  >
                    {testimonial.name.slice(0, 1)}
                  </Avatar>
                  <ListItemText
                    primary={testimonial.name}
                    secondary={testimonial.occupation}
                    primaryTypographyProps={{ variant: "h5" }}
                    secondaryTypographyProps={{ variant: "subtitle1" }}
                  />
                </ListItem>
                {testimonial.testimonial.map((heading, ind) => (
                  <ListItem
                    key={ind}
                    button
                    component="a"
                    href={heading.imageURL}
                    sx={{
                      borderRadius: "4px",
                      bgcolor: "#ffffff",
                      "&:hover": {
                        bgcolor: "#f0f0f0",
                      },
                      mb: "8px",
                      borderBottom: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <ListItemText
                      primary={`${ind + 1}. ${heading.heading}`}
                      primaryTypographyProps={{ variant: "body1" }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
