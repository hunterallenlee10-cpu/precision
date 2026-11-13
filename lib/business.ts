// Every business fact on the site lives here. Edit this file, not the components.
// Source: the owner's current site (precisionhomemd.com) and his Facebook page. Nothing invented.

export const business = {
  legalName: "Precision Home Services LLC",
  name: "Precision Home Services",
  tagline: "Built with precision. Finished with pride.",
  phoneDisplay: "(410) 320-4659",
  phoneE164: "+14103204659",
  telHref: "tel:+14103204659",
  smsHref: "sms:+14103204659",
  email: "precisiondp4u@gmail.com",
  address: {
    street: "8009 Jumpers Hole Rd, Suite L",
    streetLine1: "8009 Jumpers Hole Rd",
    streetLine2: "Suite L",
    city: "Pasadena",
    region: "MD",
    regionName: "Maryland",
    postalCode: "21122",
    country: "US",
    county: "Anne Arundel County",
  },
  // Full one-line address, used exactly the same way everywhere (NAP consistency).
  addressOneLine: "8009 Jumpers Hole Rd, Suite L, Pasadena, MD 21122",
  directionsHref:
    "https://www.google.com/maps/dir/?api=1&destination=8009+Jumpers+Hole+Rd+Suite+L+Pasadena+MD+21122",
  // DRAFT: confirm hours with the owner. Source is a third-party listing only.
  hours: "Monday to Friday, 7:00 am to 3:30 pm",
  hoursShort: "Mon to Fri, 7:00 am to 3:30 pm",
  hoursConfirmed: false,
  licence: {
    number: "MHIC #161406",
    numberPlain: "161406",
    body: "Maryland Home Improvement Commission",
    wording: "Licensed and insured in Maryland",
    // Official Maryland Department of Labor "Home Improvement Public Query" (search by licence number).
    // Confirmed at build time (Nov 2026): it is the target of the "License Search" and "Check the License
    // Status of a Contractor or Salesperson" links on https://labor.maryland.gov/license/mhic/
    lookupHref:
      "https://www.dllr.state.md.us/cgi-bin/ElectronicLicensing/OP_search/OP_search.cgi?calling_app=HIC::HIC_qselect",
    commissionHref: "https://labor.maryland.gov/license/mhic/",
  },
  facebookHref: "https://www.facebook.com/profile.php?id=61563082103638",
  currentSite: "https://precisionhomemd.com",
  serviceArea: [
    "Pasadena",
    "Anne Arundel County",
    "Baltimore",
    "Frederick",
    "Ocean City",
    "Washington, D.C.",
  ],
  serviceAreaSentence:
    "Pasadena, Anne Arundel County, Baltimore, Frederick, Ocean City, Washington, D.C. and across Maryland",
  replyPromise: "within one business day",
  lines: {
    hero: "Built With Precision. Finished With Pride.",
    affordable: "Understanding the need for exceptional service at an affordable price.",
    countOn: "A Maryland contractor you can count on.",
    smallSpaces: "Small spaces can add big value.",
    accentWall: "Enhance any room in your home with a custom accent wall.",
    showers:
      "Our team installed three custom tile showers with distinct designs for a customer, along with a kitchen backsplash.",
    mediaWall:
      "Contemporary media wall design with shiplap elements, accent lighting, and a high-tech electric fireplace featuring smart control functionality.",
    chap: "including projects with historical oversight (C.H.A.P)",
    propertyManagement: "Ongoing maintenance, turnovers, and upkeep for rentals and owners.",
    handyman: "Drywall, paint, flooring, doors, fixtures, the punch list, handled.",
  },
  // C.H.A.P. source (checked Nov 2026): https://www.baltimorecity.gov/chap/ (chap.baltimorecity.gov redirects there).
  // The page reads: "The Commission for Historical and Architectural Preservation (CHAP) was created in 1964",
  // and says it has "designated 38 neighborhoods as local historic districts and more than 200 properties as landmarks".
  // Say nothing about approval, permits or timelines.
  chap: {
    name: "Baltimore City's Commission for Historical and Architectural Preservation",
    plain:
      "C.H.A.P. is Baltimore City's Commission for Historical and Architectural Preservation, which looks after the city's local historic districts and landmarks.",
    sourceHref: "https://www.baltimorecity.gov/chap/",
    disclaimer: "General guide, not permit advice.",
  },
  // DRAFT: confirm guarantee terms with the owner.
  guarantee: "Workmanship guarantee on every project",
} as const;

// DRAFT: confirm this review is real and where it was left. Taken from his current site.
export const confirmedReview = {
  quote:
    "They were on time, on budget, and the finish work was incredible. We've already booked them for our basement.",
  author: "Josh H",
  place: "Anne Arundel County, MD",
};
