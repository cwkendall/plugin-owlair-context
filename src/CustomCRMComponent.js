import React from "react";

import _ from "lodash";

import * as Flex from "@twilio/flex-ui";

import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import PersonIcon from "@material-ui/icons/Person";
// import FlightIcon from "@material-ui/icons/Flight";
// import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
// import LocalHospitalIcon from "@material-ui/icons/LocalHospital";

import BrandHero from "./brand/BrandHero";

function CustomCRMComponent(props) {
  let brand = props.brandName || "Owl";
  let customerData = null;
  if (props.attributes) {
    customerData = {
      name: props.attributes.name,
      data: {
        PhoneNumber: props.attributes.identity,
        EmailAddress: props.attributes.email,
        MemberId: props.attributes.member_id,
        Segment: props.attributes.segment,
        Tier: props.attributes.tier,
        Points: props.attributes.points,
        JoinDate: props.attributes.join_date,
        Delegate: props.attributes.delegate,
        DelegatePhone: props.attributes.delegate_phone
      }
    };
  }

  let events = [
    {
      type: "damagedbag",
      headline: "Damaged Bag",
      description: "Photo submitted via OwlAir App",
      image: {
        url: "https://s3-ap-southeast-2.amazonaws.com/tallen-twilio/bustedbag.jpg",
        caption: "Damaged Bag"
      },
      actions: {
        Claim: "#submit_claim",
        Dismiss: "#dismiss_claim"
      }
    },
    {
      type: "disruption",
      headline: "Major Disruption",
      description:
        "Smoke cloud over Sydney Airport.\nDelays ~90mins, scheduled to clear at 1pm AEST",
      image: {
        url: "https://www.abc.net.au/news/image/10807258-3x4-340x453.jpg",
        caption: "Satellite view"
      },
      actions: {
        Reschedule: "#reschedule",
        Reimburse: "#reimburse"
      }
    },
    {
      headline: "Active Itinerary",
      description: "Departure: 28-05-2019 0645 PDT\nFlight: SYD-SFO\nTicket: YJK7NF\nFare: F",
      image: {
        url:
          "https://www.sftravel.com/sites/sftraveldev.prod.acquia-sites.com/files/SanFrancisco_0.jpg",
        caption: "Destination: San Francisco"
      },
      actions: {
        Message: "#send_sms",
        ShowTicket: "#show_ticket"
      }
    }
  ];

  let products = [
    {
      type: "travel",
      name: `${brand} Airlines`,
      data: {
        Product: "International Travel",
        CurrentReservation: "YJK7NF",
        NextFlight: "SYD - SFO",
        Departure: "28 May 2019 0645"
      },
      actions: {
        Change: "#change_flight",
        Upgrade: "#upgrade"
      }
    },
    {
      type: "banking",
      name: `${brand} Money`,
      data: {
        Product: `${brand} Premier Platinum Credit Card`,
        OutstandingBalance: "$5,245.25",
        MinimumRepaymentAmount: "$23.50",
        PaymentDueDate: "3rd June 2019"
      }
    },
    {
      type: "insurance",
      name: `${brand} Health Insurance`,
      data: {
        Product: "Health Insurance",
        PolicyLocation: "1 Fleet Street, Alexandria",
        PolicyStart: "6th October 2018",
        PremiumAmount: "$187.23",
        PremiumSchedule: "Montly",
        PremiumDue: "30th June 2019"
      },
      actions: {
        Renew: "#renew",
        Modify: "#modify"
      }
    }
    // {
    //   type: "insurance",
    //   name: `${brand} Home Insurance`,
    //   data: {
    //     Product: "Home & Contents Insurance",
    //     PolicyLocation: "1 Fleet Street, Alexandria",
    //     PolicyStart: "1st May 2018",
    //     PremiumAmount: "$345.23",
    //     PremiumSchedule: "Six Monthly",
    //     PremiumDue: "30th June 2019"
    //   },
    //   actions: {
    //     Renew: "#renew",
    //     Modify: "#modify"
    //   }
    // },
    // {
    //   type: "insurance",
    //   name: `${brand} Car Insurance`,
    //   data: {
    //     Product: "Comprehensive Car Insurance",
    //     PolicyLocation: "1 Fleet Street, Alexandria",
    //     Registration: "CED-432",
    //     PolicyOptions: "Glass",
    //     PolicyStart: "30th September 2017",
    //     PolicyExcess: "$500"
    //   },
    //   actions: {
    //     Renew: "#renew",
    //     Modify: "#modify"
    //   }
    // }
  ];
  // if (props.productArea) {
  //   products = products.filter(p => {
  //     return p.type === props.productArea;
  //   });
  // }

  events = events.filter(e => {
    return (!e.type) || e.type === props.productArea;
  });

  if (props.productArea === "noTask") {
    products = [];
    events = [];
  }

  const EventCard = props => {
    return (
      <Card
        className="Twilio"
        square={false}
        style={{
          minWidth: "100px",
          maxWidth: "240px",
          margin: "0.5rem",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {props.event.image && (
          <CardMedia
            style={{ minHeight: "100px" }}
            image={props.event.image.url}
            title={props.event.image.caption}
          />
        )}
        <CardContent style={{ flex: "1 0 auto" }}>
          <Typography style={{ textTransform: "uppercase", fontSize: "1rem", fontWeight: "bold", letterSpacing: "2px",
 }} className="Twilio" gutterBottom variant="title" component="h3">
            {props.event.headline}
          </Typography>
          <Typography className="Twilio" component="pre" style={{ whiteSpace: "pre-wrap" }}>
            {props.event.description}
          </Typography>
        </CardContent>
        {props.event.actions && (
          <CardActions className="Twilio">
            {Object.entries(props.event.actions).map((item, index) => {
              return (
                <Button size="small" href={item[1]}>
                  {_.startCase(item[0])}
                </Button>
              );
            })}
          </CardActions>
        )}
      </Card>
    );
  };

  const CustomerPanel = props => {
    return (
      <ExpansionPanel defaultExpanded square={false} style={{ margin: "0.5rem" }}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          style={{ background: props.header.background, color: props.header.color }}
        >
          <PersonIcon />
          <Typography
            color="inherit"
            style={{ flexBasis: "50%", flexShrink: 0, letterSpacing: "2px", fontWeight: "normal", fontSize: "1rem", textTransform: "uppercase" }}
          >
            {_.startCase(props.name)}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ flexDirection: "column" }}>
          {Object.entries(props.customer)
            .filter(i => i[0] && i[1])
            .map((item, index) => {
              return (
                <div style={{ display: "flex" }}>
                  <Typography style={{ flexBasis: "33%", flexShrink: 0, fontWeight: "bold" }}>
                    {_.startCase(item[0])}
                  </Typography>
                  <Typography>{item[1]}</Typography>
                </div>
              );
            })}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  };

  const ProductPanel = props => {
    return (
      <ExpansionPanel square={false} style={{ margin: "0.5rem" }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            style={{ flexBasis: "50%", flexShrink: 0, letterSpacing: "2px", fontWeight: "normal", fontSize: "1rem", textTransform: "uppercase" }}
          >
            {_.startCase(props.product.name)}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ flexDirection: "column" }}>
          {Object.entries(props.product.data)
            .filter(i => i[0] && i[1])
            .map((item, index) => {
              return (
                <div style={{ display: "flex" }}>
                  <Typography style={{ flexBasis: "33%", flexShrink: 0, fontWeight: "bold" }}>
                    {_.startCase(item[0])}
                  </Typography>
                  <Typography>{item[1]}</Typography>
                </div>
              );
            })}
        </ExpansionPanelDetails>
        <Divider />
        {props.product.actions && (
          <ExpansionPanelActions>
            {Object.entries(props.product.actions).map((item, index) => {
              return (
                <Button size="small" href={item[1]}>
                  {_.startCase(item[0])}
                </Button>
              );
            })}
          </ExpansionPanelActions>
        )}
      </ExpansionPanel>
    );
  };
  
  const theme = props.theme;
  const muiTheme = createMuiTheme({
    palette: {
      type: theme.calculated.lightTheme ? "dark" : "light",
      primary: {
        main: "#50508B",
        dark: "#50508B",
        contrastText: "#ff0"
      },
      secondary: {
        main: '#0044ff',
        dark: '#0044ff',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#f00',
      },
    },
    typography: {
      fontFamily: "Open Sans"
    }
  })

  return (
    <MuiThemeProvider theme={muiTheme}>
    <div
      class="Twilio"
      style={{ padding: "1rem", display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <br />
      {props.productArea === "noTask" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            flexDirection: "column"
          }}
        >
          <h1
            class="Twilio"
            style={{
              color: "white",
              fontWeight: "normal",
              letterSpacing: "2px",
              fontSize: "1.5rem",
              textAlign: "center"
            }}
          >
            Welcome to {brand}
          </h1>
          <div style={{ color: "white", opacity: "0.25", width: "30%" }}>
            <BrandHero brand={brand} />
          </div>
        </div>
      )}

      {customerData && events && (
        <div style={{ flexDirection: "row", display: "flex", flexWrap: "wrap" }}>
          {events.map(e => {
            return <EventCard event={e} />;
          })}
        </div>
      )}
      {customerData && (
        <CustomerPanel
          name={customerData.name}
          customer={customerData.data}
          header={props.header}
        />
      )}
      {products.map(p => {
        return <ProductPanel product={p} />;
      })}
    </div>
    </MuiThemeProvider>
  );
}
export default Flex.withTheme(CustomCRMComponent);
