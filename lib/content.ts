export const COMPANY = {
  name: "PrimeCore Power Solutions",
  short: "PrimeCore",
  phone: "561-701-4220",
  phoneHref: "+15617014220",
  email: "rmartinez@primecoreps.com",
  serviceArea: "Based in Florida — available to work nationwide",
  founded: "2026",
};

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// icon: which line icon components/ServiceIcon.tsx draws for the service.
// photo: station photo shown on the home page service cards.
export const SERVICES = [
  {
    key: "relay-testing",
    photo: "/substation-photos/1000006305.JPG",
    icon: "pulse",
    title: "Relay Testing & Commissioning",
    summary: "Secondary injection, metering, logic, CT/PT checks and end-to-end tests.",
    detail:
      "Functional testing and commissioning of protection schemes: secondary injection and metering tests, logic verification, CT/PT ratio and polarity checks, lockout timing and end-to-end testing once the line is energized.",
  },
  {
    key: "settings-changes",
    photo: "/substation-photos/1000006313.JPG",
    icon: "gear",
    title: "Settings Changes & Firmware",
    summary: "As Found downloads, settings review, firmware upgrades and outage testing.",
    detail:
      "We download As Found settings, review new settings against the drawings and the protection philosophy, upgrade relay firmware, install and compare settings, and test the logic changes during the outage.",
  },
  {
    key: "panel-replacements",
    photo: "/substation-photos/1000006301.JPG",
    icon: "panel",
    title: "Panel Replacements & Scheme Upgrades",
    summary: "Line panel, breaker failure panel, bus differential panel, autotransformer panel and distribution transformer panel replacements, plus distribution scheme upgrades.",
    detail:
      "Complete panel replacements from start to finish: line panel, breaker failure panel, bus differential panel, autotransformer panel and distribution transformer panel replacements, plus distribution scheme upgrades. Wire counts, buzzing, Z block wiring, remote circuits, labeling and full panel checkout before the station goes back in service.",
  },
  {
    key: "capbanks-batteries",
    photo: "/substation-photos/1000000423.JPG",
    icon: "battery",
    title: "Cap Banks & Station Batteries",
    summary: "Capacitor bank installations and battery system and charger replacements, from distribution to transmission.",
    detail:
      "Capacitor bank installations and station battery system and charger replacements at distribution and transmission substations, including the protection and control wiring, testing and commissioning to put them in service.",
  },
  {
    key: "renewable-interconnection",
    photo: "/substation-photos/1000003984.JPG",
    icon: "turbine",
    title: "Renewable Interconnection",
    summary: "Wind and solar collector substations, co-gen tie-ins, 87L and transfer trip.",
    detail:
      "Protection and control for wind and solar collector substations and generation interconnections: line differential (87L), transfer trip, reverse power and the communications between the plant and the utility.",
  },
  {
    key: "clearance-planning",
    photo: "/substation-photos/1000004789.JPG",
    icon: "shield",
    title: "Clearance & Isolation Planning",
    summary: "Isolation lists, add/remove plans and Green Sheets ready before the outage.",
    detail:
      "Isolation lists, add/remove plans and Green Sheets prepared ahead of time, with clearance dates and sequence agreed with your commissioning manager so the outage window goes to the work itself.",
  },
  {
    key: "transmission-distribution",
    photo: "/substation-photos/1000000422.JPG",
    icon: "tower",
    title: "Transmission & Distribution",
    summary: "Tie-ins, new builds and retrofits at transmission and distribution voltages.",
    detail:
      "Substation tie-ins, new construction and retrofits of existing stations at transmission and distribution voltages, working alongside utility and EPC teams.",
  },
];

export const CAPABILITIES = [
  {
    title: "Substation Construction Support",
    description: "On-site support for new substation builds and expansions, working alongside utility and EPC teams.",
  },
  {
    title: "Protection & Control Panel Wiring",
    description: "Wiring, terminations, and point-to-point checks for relay and control panels.",
  },
  {
    title: "Relay Testing & Commissioning",
    description: "Functional testing and commissioning support to verify protection schemes work as designed.",
  },
  {
    title: "Retrofits & Upgrades",
    description: "Upgrading protection and control systems in existing substations with minimal disruption.",
  },
  {
    title: "Transmission-Level Coordination",
    description: "Working within high-voltage transmission projects where substations tie into the grid.",
  },
  {
    title: "Distribution Substation Support",
    description: "Protection and control work for the distribution substations that serve end customers.",
  },
];

// Services page: testing & commissioning by equipment type. icon: see
// components/ServiceIcon.tsx.
export const TESTING = [
  {
    key: "relays",
    icon: "pulse",
    title: "Protective Relays",
    intro: "Microprocessor, static and electromechanical relays.",
    items: [
      "Microprocessor relays: metering checks, set point verification, logic functions and operational testing",
      "Static relays: set point verification and operational testing",
      "Electromechanical relays: calibration, operational testing, maintenance and minor repairs",
      "As Found / As Left settings records and comparisons",
    ],
  },
  {
    key: "transformers",
    icon: "panel",
    title: "Power Transformers",
    intro: "Electrical tests and protective devices on the transformer.",
    items: [
      "Power factor and insulation testing",
      "Turns ratio (TTR)",
      "Bushing current transformers",
      "Sudden pressure relay checks",
      "Temperature probes and gauges",
    ],
  },
  {
    key: "breakers",
    icon: "gear",
    title: "Circuit Breakers",
    intro: "Mechanism and contact condition before energizing.",
    items: ["Timing and travel / velocity", "Contact resistance", "Insulation resistance"],
  },
  {
    key: "instrument-transformers",
    icon: "shield",
    title: "Instrument Transformers",
    intro: "CT and PT circuits from the yard to the relay.",
    items: [
      "CT ratio, polarity, excitation and burden",
      "PT ratio, polarity and phasing",
      "Secondary circuit verification through test switches and relays",
    ],
  },
  {
    key: "scada",
    icon: "tower",
    title: "SCADA & Substation Automation",
    intro: "Supervisory control, data acquisition and communications.",
    items: [
      "RTU / RTAC points checkout with the control center",
      "Relay communications and fiber links",
      "Station metering and power quality meters",
    ],
  },
];

// Experience numbers shown in the band under the home hero.
export const STATS = [
  { num: "300+", label: "substations worked" },
  { num: "500 kV", label: "maximum voltage worked" },
  { num: "12+", label: "years of experience" },
  { num: "50", label: "states we can work in" },
];

