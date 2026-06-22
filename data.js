// Maritime Industry News & Regulatory Updates — Comprehensive Source Database
// Sources: IMO, ILO, DNV, Lloyd's Register, ABS, BIMCO, ICS,
//          Gard P&I, UK P&I Club, Safety4Sea, TradeWinds,
//          Flag Administrations (Singapore MPA, Malta Transport, Hong Kong MARDEP, Panama AMP)

const MARITIME_DATA = [
  // ─── IMO (International Maritime Organization) ─────────────────
  {
    id: "imo-ghg-2026",
    title: "IMO GHG Emission Targets & CII Rating Enforcement",
    source: "IMO",
    category: "Environmental",
    convention: "MARPOL Annex VI",
    impact: "High",
    publishDate: "2026-04-15",
    implementationDate: "2026-07-01",
    sourceUrl: "https://www.imo.org/en/About/Conventions/Pages/ListOfConventions.aspx",
    summary: "The International Maritime Organization (IMO) has released updated guidance on greenhouse gas (GHG) emission limits, placing heavy emphasis on the Carbon Intensity Indicator (CII) and Energy Efficiency Existing Ship Index (EEXI). Starting July 2026, ships that receive a 'D' rating for three consecutive years or an 'E' rating in a single year must submit an approved corrective action plan within their Ship Energy Efficiency Management Plan (SEEMP) before a Statement of Compliance can be issued.",
    keyTakeaways: [
      "Annual CII calculation based on operational carbon emissions per gross tonnage and distance.",
      "Ratings range from A (Major superior) to E (Inferior performance).",
      "Immediate corrective action plans required for E-rated vessels or 3-consecutive-D-rated vessels.",
      "Increasing enforcement by Port State Control (PSC) including potential detentions or sailing restrictions.",
      "Applicable to all cargo, Ro-Ro, and cruise vessels above 5,000 gross tonnage (GT)."
    ],
    studyQuestions: [
      {
        question: "Under MARPOL Annex VI, what happens to a vessel that receives an 'E' rating for operational carbon intensity?",
        options: [
          "It must immediately be scrapped or converted.",
          "It must submit an approved corrective action plan within its SEEMP before receiving a Statement of Compliance.",
          "It is subject to an immediate financial penalty of $100,000.",
          "Nothing, as CII ratings are strictly advisory."
        ],
        answerIndex: 1,
        explanation: "Vessels receiving an 'E' rating (or a 'D' rating for three consecutive years) must develop an approved corrective action plan to be integrated into the SEEMP (Ship Energy Efficiency Management Plan) before a Statement of Compliance is issued."
      },
      {
        question: "CII stands for:",
        options: [
          "Carbon Intensity Indicator",
          "Carbon Impact Index",
          "Consolidated International Instrument",
          "Crew Integration Inspector"
        ],
        answerIndex: 0,
        explanation: "CII stands for Carbon Intensity Indicator. It measures how efficiently a ship transports goods or passengers and is given in grams of CO2 emitted per cargo-carrying capacity and nautical mile."
      }
    ],
    flashcards: [
      {
        front: "What is the threshold Gross Tonnage (GT) for vessels required to calculate CII and EEXI?",
        back: "5,000 Gross Tonnage (GT) and above."
      },
      {
        front: "What document must contain the corrective action plan for poorly rated CII vessels?",
        back: "The SEEMP (Ship Energy Efficiency Management Plan) Part III."
      }
    ]
  },
  {
    id: "marpol-sulfur-2026",
    title: "Enforcement of Strict Fuel Sulfur Limits in Coastal ECAs",
    source: "IMO",
    category: "Environmental",
    convention: "MARPOL Annex VI",
    impact: "High",
    publishDate: "2026-02-10",
    implementationDate: "2026-03-01",
    sourceUrl: "https://www.imo.org/en/OurWork/Environment/Pages/Pollution-Prevention.aspx",
    summary: "Port State Administrations have announced enhanced inspection regimes for compliance with MARPOL Annex VI fuel oil sulfur limits. The sulfur content of fuel oil used on board ships operating outside Emission Control Areas (ECAs) remains capped at 0.50% m/m. Within designated ECAs (such as the Baltic Sea, North Sea, North American, and US Caribbean Sea areas), the limit is strictly 0.10% m/m. Port States are deploying drone-based sniffer technology in harbor entrances to monitor exhaust stacks in real-time.",
    keyTakeaways: [
      "0.10% m/m sulfur limit inside ECAs; 0.50% m/m limit in global waters.",
      "Vessels must document change-over procedures to low-sulfur fuel prior to entering ECAs.",
      "Scrubbers (Exhaust Gas Cleaning Systems) must have certified continuous monitoring logs.",
      "Deployment of aerial 'drones' to detect compliance bypasses by analyzing stack exhaust plumes.",
      "Failure to comply can result in severe financial penalties, vessel arrest, and crew criminal liability."
    ],
    studyQuestions: [
      {
        question: "What is the maximum allowable sulfur limit for fuel used inside designated Emission Control Areas (ECAs)?",
        options: [
          "0.50% m/m",
          "0.10% m/m",
          "1.00% m/m",
          "0.25% m/m"
        ],
        answerIndex: 1,
        explanation: "Under MARPOL Annex VI Regulation 14, the sulfur limit for fuel used inside ECAs is 0.10% m/m. Outside ECAs, the limit is 0.50% m/m."
      }
    ],
    flashcards: [
      {
        front: "Name three regions designated as Emission Control Areas (ECAs) for SOx.",
        back: "Baltic Sea, North Sea, North American Area, and United States Caribbean Sea Area."
      },
      {
        front: "What is the standard record length for retaining Bunker Delivery Notes (BDNs) on board?",
        back: "BDNs must be kept on board for at least 3 years after the fuel oil has been delivered."
      }
    ]
  },
  {
    id: "solas-lifeboat-2026",
    title: "SOLAS Lifeboat Release & Launching Arrangement Inspections",
    source: "IMO",
    category: "Safety",
    convention: "SOLAS Chapter III",
    impact: "Medium",
    publishDate: "2026-05-01",
    implementationDate: "2026-10-01",
    sourceUrl: "https://www.imo.org/en/About/Conventions/Pages/ListOfConventions.aspx",
    summary: "Following several high-profile drill accidents, the Maritime Safety Committee (MSC) has updated SOLAS Chapter III rules regarding the maintenance, thorough examination, operational testing, and repair of lifeboats, rescue boats, launching appliances, and release gear. Under the new guidelines, all weekly and monthly inspections must be carefully logged with photographic or electronic checklists. Additionally, the five-year dynamic test of the winch brakes must be witnessed by flag state inspectors or authorized classification societies.",
    keyTakeaways: [
      "Weekly and monthly inspections must be conducted by trained crew members using standardized checklists.",
      "Annual thorough examinations must be performed by the manufacturer or an authorized service provider.",
      "Five-year dynamic winch brake tests must be performed at 1.1 times the maximum working load.",
      "Mandatory safety pins or locking indicators must be visually verifiable from the coxswain's seat."
    ],
    studyQuestions: [
      {
        question: "Who is authorized to conduct the annual thorough examination of lifeboat release gear?",
        options: [
          "Any licensed ship officer.",
          "The Chief Mate and Chief Engineer jointly.",
          "The manufacturer or an explicitly authorized service provider.",
          "Only the Captain."
        ],
        answerIndex: 2,
        explanation: "According to SOLAS regulations, annual thorough examinations and operational tests must be conducted by the manufacturer or a service provider authorized by the administration."
      },
      {
        question: "At what load capacity must the five-year dynamic test of lifeboat winch brakes be carried out?",
        options: [
          "0.5 times the maximum working load",
          "1.0 times the maximum working load",
          "1.1 times the maximum working load",
          "1.5 times the maximum working load"
        ],
        answerIndex: 2,
        explanation: "The five-year dynamic test of the winch brakes must be carried out with proof load equal to 1.1 times the maximum working load of the launching appliance."
      }
    ],
    flashcards: [
      {
        front: "How frequently must lifeboats be launched and maneuvered in the water during drills?",
        back: "At least once every 3 months (quarterly) for standard lifeboats."
      },
      {
        front: "Which SOLAS chapter covers Life-Saving Appliances and Arrangements?",
        back: "SOLAS Chapter III."
      }
    ]
  },
  {
    id: "stcw-digital-2026",
    title: "STCW Digital Seafarer Certifications & Global Verification Portal",
    source: "IMO",
    category: "Operations",
    convention: "STCW",
    impact: "Medium",
    publishDate: "2026-01-18",
    implementationDate: "2026-12-01",
    sourceUrl: "https://www.imo.org/en/OurWork/HumanElement/Pages/STCW-Convention.aspx",
    summary: "To reduce maritime administrative burdens and prevent fraudulent certificates, the IMO is rolling out amendments to the STCW Convention regarding digital certificates. Flag states are required to issue Certificates of Competency (CoC) and Certificates of Proficiency (CoP) in secure digital formats. A global online database will allow Port State Control officers and shipowners to instantly verify certificate validity via QR codes and unique digital identifiers.",
    keyTakeaways: [
      "Mandatory transition to secure, cryptographic digital seafarer certificates.",
      "Introduction of a standardized global verification portal for instant online validation.",
      "Elimination of physical mail delays for endorsements and flag state recognitions.",
      "Strict data privacy regulations (GDPR-compliant security) for seafarer records."
    ],
    studyQuestions: [
      {
        question: "What is the primary driver behind the transition to STCW digital certificates?",
        options: [
          "Reducing paper consumption to save forests.",
          "Accelerating verification, reducing administration, and preventing certificate fraud.",
          "Replacing seafarer passports entirely.",
          "Enabling AI to navigate ships without crew."
        ],
        answerIndex: 1,
        explanation: "The transition is designed to prevent fraudulent certificate usage and streamline verification by PSC officers and operators globally."
      }
    ],
    flashcards: [
      {
        front: "What does STCW stand for?",
        back: "Standards of Training, Certification and Watchkeeping for Seafarers."
      },
      {
        front: "How will PSC inspectors verify the authenticity of a digital STCW certificate?",
        back: "By scanning a secure QR code that links directly to the issuing administration's online registry."
      }
    ]
  },
  {
    id: "bwm-d2-2026",
    title: "Final Transition to Ballast Water D-2 Discharge Standard",
    source: "IMO",
    category: "Environmental",
    convention: "BWM Convention",
    impact: "High",
    publishDate: "2026-03-05",
    implementationDate: "2026-09-08",
    sourceUrl: "https://www.imo.org/en/About/Conventions/Pages/ListOfConventions.aspx",
    summary: "The final grace period for the Ballast Water Management (BWM) Convention's D-1 standard (ballast water exchange) is coming to an end. By September 2026, all vessels operating in international trade must meet the D-2 standard, requiring the installation and operation of an approved Ballast Water Management System (BWMS) that treats water to limit active biological organisms prior to discharge.",
    keyTakeaways: [
      "Total phase-out of the D-1 standard (exchange at sea) in favor of the D-2 standard (treatment).",
      "Vessels must carry an approved Ballast Water Record Book (BWRB), which can be in electronic format.",
      "BWMS systems must be type-approved and regularly calibrated.",
      "Port authorities will conduct biological monitoring and sampling of discharge water."
    ],
    studyQuestions: [
      {
        question: "What is the main difference between the BWM Convention's D-1 and D-2 standards?",
        options: [
          "D-1 covers chemical treatment, while D-2 covers ultraviolet light treatment.",
          "D-1 requires ballast water exchange at sea, while D-2 requires treatment using an approved BWMS.",
          "D-1 applies to tankers, while D-2 applies strictly to container vessels.",
          "D-1 is voluntary, and D-2 is a recommendation."
        ],
        answerIndex: 1,
        explanation: "D-1 standard requires ballast water exchange in deep water (at least 200 nautical miles from land, in water 200 meters deep), whereas D-2 requires treating ballast water with an active BWMS before discharge."
      }
    ],
    flashcards: [
      {
        front: "When is the final deadline for all ships to comply with the D-2 standard?",
        back: "September 8, 2026."
      },
      {
        front: "What records must be kept regarding ballast operations on board?",
        back: "All ballast operations (intake, exchange, treatment, discharge) must be recorded in the Ballast Water Record Book."
      }
    ]
  },

  // ─── ILO (International Labour Organization) ───────────────────
  {
    id: "mlc-rest-2026",
    title: "MLC Crew Rest Hours Amendments & Fatigue Audit Focus",
    source: "ILO",
    category: "Crew Welfare",
    convention: "MLC 2006",
    impact: "High",
    publishDate: "2026-03-20",
    implementationDate: "2026-09-01",
    sourceUrl: "https://www.ilo.org/global/standards/maritime-labour-convention/lang--en/index.htm",
    summary: "The International Labour Organization (ILO) has updated enforcement actions for the Maritime Labour Convention (MLC) 2006. The updates target systematic violations of seafarer rest hours. Port State Control officers will now inspect electronic logbooks and compare them with ship navigation records (VDR data), engine room logs, and port logbooks to verify that records of rest hours are accurate and not falsified. Chronically fatigued crews will lead to vessel detention.",
    keyTakeaways: [
      "Minimum hours of rest shall not be less than 10 hours in any 24-hour period.",
      "Minimum hours of rest shall not be less than 77 hours in any 7-day period.",
      "The 24-hour rest period can be divided into no more than two periods, one of which must be at least 6 hours.",
      "Intervals between consecutive rest periods shall not exceed 14 hours.",
      "Active correlation of logs (e.g. comparing mooring records with rest hours) is now a primary PSC tool."
    ],
    studyQuestions: [
      {
        question: "What is the minimum number of rest hours required for any 7-day period under MLC?",
        options: [
          "70 hours",
          "77 hours",
          "84 hours",
          "90 hours"
        ],
        answerIndex: 1,
        explanation: "MLC 2006 states that the minimum hours of rest must not be less than 77 hours in any seven-day period."
      },
      {
        question: "Into how many periods can the daily 10-hour rest requirement be divided?",
        options: [
          "No more than two periods, one of which must be at least 6 hours.",
          "No more than three periods, each at least 3 hours.",
          "Any number of periods as long as the total equals 10.",
          "It cannot be divided; it must be a single continuous 10-hour block."
        ],
        answerIndex: 0,
        explanation: "The 10 hours of rest may be divided into no more than two periods, one of which must be at least 6 hours in length, and the interval between consecutive periods of rest must not exceed 14 hours."
      }
    ],
    flashcards: [
      {
        front: "What is the maximum duration between consecutive rest periods under MLC?",
        back: "14 hours."
      },
      {
        front: "Which organization administers the Maritime Labour Convention (MLC)?",
        back: "The ILO (International Labour Organization)."
      }
    ]
  },

  // ─── DNV (Technical & Regulatory News) ─────────────────────────
  {
    id: "dnv-methanol-2026",
    title: "DNV Guidelines for Methanol-Fuelled Ships — Class Notation Update",
    source: "DNV",
    category: "Environmental",
    convention: "IGF Code / DNV Rules",
    impact: "High",
    publishDate: "2026-05-20",
    implementationDate: "2026-11-01",
    sourceUrl: "https://www.dnv.com/maritime/",
    summary: "DNV has released updated class notation rules for ships using methanol as fuel. The guidelines cover fuel storage, supply systems, ventilation, fire safety, and operational training requirements. These complement the IMO's IGF Code and represent the most comprehensive technical specification for methanol-fuelled operations in the industry.",
    keyTakeaways: [
      "Methanol fuel tanks must meet double-wall containment requirements with inert-gas blanketing.",
      "Engine room ventilation must ensure methanol vapor concentration stays below 20% LEL at all times.",
      "Crew operational training specific to methanol hazards (toxicity and flammability) is mandatory.",
      "Annual class surveys must include methanol system integrity testing and leak detection validation."
    ],
    studyQuestions: [
      {
        question: "What is a primary safety concern unique to methanol as a marine fuel compared to LNG?",
        options: [
          "It is cryogenic and requires special insulation.",
          "It is toxic and can be absorbed through the skin, in addition to being flammable.",
          "It cannot be stored in liquid form at ambient temperature.",
          "It produces more SOx emissions than conventional fuel."
        ],
        answerIndex: 1,
        explanation: "Methanol is both toxic (can cause blindness or death if ingested, and is absorbed through the skin) and flammable with a nearly invisible flame, making safety training and leak detection critical."
      }
    ],
    flashcards: [
      {
        front: "Which IMO code governs ships using low-flashpoint fuels like methanol and LNG?",
        back: "The IGF Code (International Code of Safety for Ships using Gases or other Low-flashpoint Fuels)."
      },
      {
        front: "What is the maximum methanol vapor concentration allowed in engine rooms?",
        back: "Below 20% of the Lower Explosive Limit (LEL)."
      }
    ]
  },

  // ─── Lloyd's Register (LR) ────────────────────────────────────
  {
    id: "lr-decarbonisation-2026",
    title: "LR Future Fuel Readiness Assessment Framework for Existing Fleets",
    source: "Lloyd's Register",
    category: "Environmental",
    convention: "LR ShipRight / MARPOL",
    impact: "Medium",
    publishDate: "2026-04-08",
    implementationDate: "2027-01-01",
    sourceUrl: "https://www.lr.org/en/marine-shipping/",
    summary: "Lloyd's Register has introduced a structured 'Future Fuel Readiness' assessment framework designed to help shipowners evaluate retrofit options for existing fleets. The framework scores vessels based on structural readiness for alternative fuels such as ammonia, hydrogen, methanol, and LNG. It provides a phased roadmap with cost-benefit analysis tools aligned with IMO's 2030 and 2050 GHG targets.",
    keyTakeaways: [
      "Readiness scoring considers tank placement, structural reinforcement, and supply chain availability.",
      "Phased retrofit roadmaps align with IMO GHG reduction milestones (2030 check, 2050 net-zero target).",
      "Cost-benefit tools help operators compare fuel switch ROI against carbon levy scenarios.",
      "LR's ShipRight notation provides class recognition for 'future-fuel-ready' vessels."
    ],
    studyQuestions: [
      {
        question: "What is the purpose of Lloyd's Register's Future Fuel Readiness assessment?",
        options: [
          "To certify vessels as fully emissions-free immediately.",
          "To score and plan retrofit options for alternative fuels aligned with IMO decarbonisation targets.",
          "To replace traditional class surveys with environmental audits only.",
          "To enforce mandatory fuel-switching timelines on all LR-classed ships."
        ],
        answerIndex: 1,
        explanation: "The framework helps shipowners evaluate and plan phased retrofits to prepare existing vessels for future alternative fuels, aligning with the IMO 2030/2050 GHG targets."
      }
    ],
    flashcards: [
      {
        front: "What is the IMO's long-term GHG target for shipping?",
        back: "Net-zero GHG emissions by or around 2050."
      }
    ]
  },

  // ─── ABS (American Bureau of Shipping) ─────────────────────────
  {
    id: "abs-autonomous-2026",
    title: "ABS Advisory on Autonomous Vessel Operations & MASS Classification",
    source: "ABS",
    category: "Operations",
    convention: "IMO MASS Code / ABS Guide",
    impact: "Medium",
    publishDate: "2026-06-01",
    implementationDate: "2027-03-01",
    sourceUrl: "https://ww2.eagle.org/en.html",
    summary: "The American Bureau of Shipping (ABS) has published a comprehensive advisory guide for Maritime Autonomous Surface Ships (MASS). The guide outlines four degrees of autonomy, addresses cybersecurity requirements for remote control centers, and provides class notation frameworks for autonomous navigation, collision avoidance, and remote engine monitoring systems.",
    keyTakeaways: [
      "MASS Degree 1: Ship with automated processes — seafarers on board to operate systems.",
      "MASS Degree 2: Remotely controlled ship with seafarers on board.",
      "MASS Degree 3: Remotely controlled ship without seafarers on board.",
      "MASS Degree 4: Fully autonomous ship — makes decisions and determines actions by itself.",
      "Cybersecurity certification for Shore Control Centers is mandatory for Degree 2+ vessels."
    ],
    studyQuestions: [
      {
        question: "Under ABS/IMO classification, what is a MASS Degree 3 vessel?",
        options: [
          "A ship with automated processes but crew on board at all times.",
          "A remotely controlled ship without seafarers on board.",
          "A fully autonomous ship that operates without any human oversight.",
          "A conventional vessel with enhanced navigation equipment."
        ],
        answerIndex: 1,
        explanation: "MASS Degree 3 is defined as a remotely controlled ship without seafarers on board. It is operated and controlled from a remote location (Shore Control Center)."
      }
    ],
    flashcards: [
      {
        front: "What does MASS stand for in maritime context?",
        back: "Maritime Autonomous Surface Ships."
      },
      {
        front: "How many degrees of autonomy does the IMO/ABS MASS framework define?",
        back: "Four degrees (1 through 4), from automated processes with crew to fully autonomous."
      }
    ]
  },

  // ─── BIMCO (Commercial Analytics & Contracts) ──────────────────
  {
    id: "bimco-ets-2026",
    title: "BIMCO Clause for EU ETS Emissions Cost Allocation in Charter Parties",
    source: "BIMCO",
    category: "Commercial",
    convention: "EU ETS / Charter Party",
    impact: "High",
    publishDate: "2026-03-15",
    implementationDate: "2026-06-01",
    sourceUrl: "https://www.bimco.org/",
    summary: "BIMCO has released a standardized charter party clause for the allocation of EU Emissions Trading System (ETS) costs between shipowners and charterers. As the EU ETS now covers maritime shipping, voyages into, out of, and within EU ports generate carbon emission obligations. The new BIMCO clause establishes a clear framework for who bears the cost of purchasing EU Allowances (EUAs) and how emissions data is reported.",
    keyTakeaways: [
      "EU ETS applies to 100% of emissions for intra-EU voyages and 50% for voyages into/out of EU ports.",
      "BIMCO clause assigns primary cost responsibility to the commercial operator (charterer) by default.",
      "Shipowners must provide accurate MRV (Monitoring, Reporting and Verification) data to charterers.",
      "Disputes are resolved via arbitration, with BIMCO model clause providing legal certainty.",
      "Non-compliance penalties can reach €100 per tonne of unreported CO2."
    ],
    studyQuestions: [
      {
        question: "Under the EU ETS as applied to shipping, what percentage of emissions is covered for voyages into or out of an EU port?",
        options: [
          "100%",
          "75%",
          "50%",
          "25%"
        ],
        answerIndex: 2,
        explanation: "The EU ETS covers 50% of emissions for voyages that start or end in an EU port, and 100% for voyages between two EU ports."
      }
    ],
    flashcards: [
      {
        front: "What does EUA stand for in the context of EU ETS?",
        back: "European Union Allowances — the tradable carbon permits under the EU Emissions Trading System."
      },
      {
        front: "Who typically bears the cost of purchasing EU Allowances under the BIMCO standard clause?",
        back: "The commercial operator (charterer) bears the primary cost by default."
      }
    ]
  },

  // ─── ICS (International Chamber of Shipping) ──────────────────
  {
    id: "ics-bridge-2026",
    title: "ICS Updated Bridge Procedures Guide — ECDIS Best Practices",
    source: "ICS",
    category: "Safety",
    convention: "SOLAS Chapter V / ECDIS",
    impact: "Medium",
    publishDate: "2026-04-22",
    implementationDate: "2026-08-01",
    sourceUrl: "https://www.ics-shipping.org/",
    summary: "The International Chamber of Shipping (ICS) has published a revised Bridge Procedures Guide incorporating lessons learned from recent grounding and collision incidents. Key updates include enhanced ECDIS usage protocols, mandatory cross-checking between primary and secondary positioning systems, and structured handover procedures with documented checklists.",
    keyTakeaways: [
      "ECDIS must be configured with appropriate safety contours and anti-grounding alarms.",
      "Watchkeepers must cross-check GPS positions with radar/visual fixes at intervals not exceeding 15 minutes.",
      "Bridge handover must include a standardized checklist documenting vessel status and navigational hazards.",
      "Passage plans must be approved by the Master and verified against latest chart updates (T&P notices)."
    ],
    studyQuestions: [
      {
        question: "According to the updated ICS Bridge Procedures Guide, what is the maximum interval for cross-checking GPS positions?",
        options: [
          "5 minutes",
          "10 minutes",
          "15 minutes",
          "30 minutes"
        ],
        answerIndex: 2,
        explanation: "Watchkeepers should cross-check primary GPS positions with alternative means (radar overlay, visual bearings) at intervals not exceeding 15 minutes in coastal waters."
      }
    ],
    flashcards: [
      {
        front: "What does ECDIS stand for?",
        back: "Electronic Chart Display and Information System."
      },
      {
        front: "Who must approve the passage plan on board a vessel?",
        back: "The Master (Captain) must approve the passage plan before departure."
      }
    ]
  },

  // ─── Gard P&I ─────────────────────────────────────────────────
  {
    id: "gard-cargo-claims-2026",
    title: "Gard Loss Prevention: Cargo Liquefaction & IMSBC Code Compliance",
    source: "Gard P&I",
    category: "Safety",
    convention: "IMSBC Code",
    impact: "High",
    publishDate: "2026-05-10",
    implementationDate: "2026-07-15",
    sourceUrl: "https://www.gard.no/",
    summary: "Gard P&I Club has issued a comprehensive loss prevention circular addressing the ongoing risk of cargo liquefaction in bulk carriers. Recent incidents involving nickel ore and bauxite shipments have highlighted the critical importance of verifying Transportable Moisture Limit (TML) certificates and conducting independent can tests before loading. Gard emphasizes that masters must exercise their right to refuse loading if cargo appears excessively wet.",
    keyTakeaways: [
      "Transportable Moisture Limit (TML) and actual moisture content must be verified before loading.",
      "Masters should conduct independent can tests on representative cargo samples.",
      "If cargo moisture exceeds the TML, loading must be refused regardless of shipper pressure.",
      "IMSBC Code Group A cargoes (those that may liquefy) require special attention and declaration.",
      "Claims arising from cargo liquefaction can reach tens of millions of dollars."
    ],
    studyQuestions: [
      {
        question: "What should a ship's master do if bulk cargo appears excessively wet and may exceed the Transportable Moisture Limit?",
        options: [
          "Load the cargo and document concerns in a Letter of Protest.",
          "Refuse to load the cargo until proper TML certification is provided.",
          "Increase ballast to compensate for potential liquefaction.",
          "Load the cargo but reduce speed during the voyage."
        ],
        answerIndex: 1,
        explanation: "Masters have the right and obligation to refuse loading if cargo appears to exceed TML or if proper certification is not available. Cargo liquefaction can cause catastrophic vessel capsizing."
      }
    ],
    flashcards: [
      {
        front: "What does TML stand for in bulk cargo carriage?",
        back: "Transportable Moisture Limit — the maximum moisture content at which a cargo can be safely transported."
      },
      {
        front: "What is the 'can test' used for in bulk carrier operations?",
        back: "A simple shipboard test where a cargo sample is placed in a can and struck against a hard surface to check for free moisture separation, indicating potential liquefaction risk."
      }
    ]
  },

  // ─── UK P&I Club ──────────────────────────────────────────────
  {
    id: "ukpandi-psc-2026",
    title: "UK P&I PSC Detention Analysis & Common Deficiency Trends 2026",
    source: "UK P&I Club",
    category: "Operations",
    convention: "PSC / MOU Regime",
    impact: "Medium",
    publishDate: "2026-04-28",
    implementationDate: "2026-05-15",
    sourceUrl: "https://www.ukpandi.com/",
    summary: "UK P&I Club has released its annual Port State Control (PSC) detention analysis, covering trends across the Paris MOU, Tokyo MOU, and US Coast Guard inspection regimes. The report highlights that fire safety, life-saving appliances, and MARPOL-related deficiencies continue to dominate detention statistics. New focus areas include cyber security compliance and MLC rest-hour documentation.",
    keyTakeaways: [
      "Fire safety deficiencies (blocked fire doors, expired extinguishers) remain the #1 cause of detention.",
      "Life-saving appliance failures (lifeboat davit maintenance, EPIRB battery expiry) are the #2 factor.",
      "MARPOL documentation gaps (Oil Record Book discrepancies) continue to trigger detentions.",
      "Cyber security assessments under ISM Code audits are now a growing focus in Paris MOU inspections.",
      "Vessels detained once are three times more likely to be inspected at next port call."
    ],
    studyQuestions: [
      {
        question: "According to UK P&I Club analysis, what is the most common category of PSC deficiency leading to detention?",
        options: [
          "Navigation equipment malfunction",
          "Fire safety deficiencies",
          "Crew documentation gaps",
          "Hull structural defects"
        ],
        answerIndex: 1,
        explanation: "Fire safety deficiencies, including blocked fire doors, expired extinguishers, and non-functional fire detection systems, consistently rank as the top cause of PSC detentions worldwide."
      }
    ],
    flashcards: [
      {
        front: "What is PSC?",
        back: "Port State Control — the inspection regime where port authorities verify that visiting foreign ships comply with international conventions."
      },
      {
        front: "Name two major PSC MOU regimes.",
        back: "Paris MOU (covering European waters) and Tokyo MOU (covering Asia-Pacific waters)."
      }
    ]
  },

  // ─── Safety4Sea ───────────────────────────────────────────────
  {
    id: "safety4sea-enclosed-2026",
    title: "Safety4Sea: Enclosed Space Entry Fatality Analysis & Prevention Guide",
    source: "Safety4Sea",
    category: "Safety",
    convention: "SOLAS / ISM Code",
    impact: "High",
    publishDate: "2026-05-25",
    implementationDate: "2026-06-15",
    sourceUrl: "https://safety4sea.com/",
    summary: "Safety4Sea has published a comprehensive analysis of enclosed space entry fatalities over the past decade, revealing that 90% of deaths occurred because rescue attempts were made without proper breathing apparatus. The report provides actionable checklists, drill templates, and crew training materials aligned with SOLAS Regulation XI-1/7 and IMO Resolution A.1050(27).",
    keyTakeaways: [
      "Atmosphere must be tested for oxygen (19.5-23.5%), flammable gases (<1% LEL), and toxic gases before entry.",
      "A competent person must authorize entry using a formal enclosed space entry permit.",
      "Rescue teams must never enter without self-contained breathing apparatus (SCBA).",
      "Regular drills (at minimum every two months) must simulate realistic enclosed space rescue scenarios.",
      "Communication equipment must be tested and confirmed operational before entry."
    ],
    studyQuestions: [
      {
        question: "What is the safe oxygen concentration range for enclosed space entry?",
        options: [
          "15.0% - 20.0%",
          "19.5% - 23.5%",
          "21.0% - 25.0%",
          "16.0% - 22.0%"
        ],
        answerIndex: 1,
        explanation: "The safe oxygen concentration for enclosed space entry is between 19.5% and 23.5%. Below 19.5% indicates oxygen deficiency; above 23.5% indicates oxygen enrichment, both of which are dangerous."
      }
    ],
    flashcards: [
      {
        front: "What three atmospheric parameters must be tested before entering an enclosed space on a ship?",
        back: "Oxygen content (19.5-23.5%), flammable gases (<1% LEL), and toxic gases (such as H2S and CO)."
      },
      {
        front: "What is the leading cause of death in enclosed space incidents on ships?",
        back: "Rescuers entering without breathing apparatus to save an incapacitated colleague — approximately 90% of deaths are rescuers."
      }
    ]
  },

  // ─── TradeWinds ───────────────────────────────────────────────
  {
    id: "tradewinds-sanctions-2026",
    title: "TradeWinds Report: Updated Sanctions Screening Obligations for Ship Operators",
    source: "TradeWinds",
    category: "Commercial",
    convention: "OFAC / EU Sanctions Regulation",
    impact: "High",
    publishDate: "2026-06-05",
    implementationDate: "2026-06-20",
    sourceUrl: "https://www.tradewindsnews.com/",
    summary: "TradeWinds reports on the tightening sanctions compliance landscape for ship operators, following new OFAC designations and EU regulation updates. Operators must now screen not only cargo and counterparties, but also intermediate ports of call, STS (Ship-to-Ship) transfer locations, and AIS transmission gaps. Failure to maintain adequate sanctions screening can result in criminal prosecution, asset freezes, and P&I cover withdrawal.",
    keyTakeaways: [
      "Screening must cover cargo, counterparties, ports of call, STS zones, and beneficial ownership chains.",
      "AIS switch-off patterns ('dark fleet' behavior) are now a primary red flag for sanctions investigators.",
      "P&I clubs may withdraw cover if a vessel is found to have knowingly violated sanctions regimes.",
      "OFAC can impose fines up to $20 million per violation for US-nexus sanctions breaches.",
      "Operators must maintain documented compliance programs with regular crew and shore staff training."
    ],
    studyQuestions: [
      {
        question: "What is a primary red flag for sanctions investigators regarding vessel movements?",
        options: [
          "Frequent port calls in open-registry countries.",
          "AIS transmission gaps or switch-offs ('dark fleet' behavior).",
          "Use of very large crude carriers (VLCCs).",
          "Charter party agreements denominated in USD."
        ],
        answerIndex: 1,
        explanation: "AIS switch-offs or transmission gaps are a primary indicator of 'dark fleet' activity, suggesting a vessel may be trying to hide its location during sanctioned trades."
      }
    ],
    flashcards: [
      {
        front: "What does OFAC stand for?",
        back: "Office of Foreign Assets Control — the US Treasury agency that administers and enforces economic sanctions."
      },
      {
        front: "What is 'dark fleet' behavior?",
        back: "Vessels that switch off their AIS transponders to hide their location, typically to conduct sanctioned trades or illicit STS transfers."
      }
    ]
  },

  // ─── USCG (US Coast Guard) ────────────────────────────────────
  {
    id: "cyber-security-2026",
    title: "Cyber Risk Management & OT Network Isolation Mandates",
    source: "USCG",
    category: "Security",
    convention: "ISM Code",
    impact: "Medium",
    publishDate: "2026-05-12",
    implementationDate: "2026-08-01",
    sourceUrl: "https://www.dco.uscg.mil/Our-Organization/Assistant-Commandant-for-Prevention-Policy-CG-5P/Inspections-Compliance-CG-5PC-/Office-of-Commercial-Vessel-Compliance/",
    summary: "The US Coast Guard and major Classification Societies have updated their cyber risk management guidelines, building on IMO Resolution MSC.428(98). New audits will focus on the isolation between Information Technology (IT) networks (e.g. crew internet, administrative computers) and Operational Technology (OT) networks (e.g. engine monitoring, ECDIS, steering gear). Ships fail audits if they do not prove firewall controls and network segmentation are in place.",
    keyTakeaways: [
      "Physical or logical separation (firewalls) between shipboard IT and OT systems is mandatory.",
      "Cybersecurity drills must be incorporated into the vessel's SMS (Safety Management System).",
      "ECDIS charts must only be updated using dedicated, scanned secure USB media or encrypted direct downloads.",
      "Port State inspectors may request evidence of cyber incident response drills."
    ],
    studyQuestions: [
      {
        question: "Under the new cybersecurity mandates, which systems are classified as Operational Technology (OT)?",
        options: [
          "Crew email terminals and cabin entertainment systems.",
          "ECDIS, propulsion controls, and steering systems.",
          "The Captain's administrative laptop and printer.",
          "Port agency databases."
        ],
        answerIndex: 1,
        explanation: "Operational Technology (OT) refers to devices and systems that monitor or control physical processes on board, such as ECDIS, engine automation, and steering."
      }
    ],
    flashcards: [
      {
        front: "Which IMO resolution mandates integrating cyber risk management into Safety Management Systems (SMS)?",
        back: "Resolution MSC.428(98)."
      },
      {
        front: "Why is separation of IT and OT networks critical on board?",
        back: "To prevent cyber threats (like malware or ransomware) from spreading from crew internet networks to critical machinery control systems."
      }
    ]
  },

  // ─── EMSA (European Maritime Safety Agency) ───────────────────
  {
    id: "cargo-securing-2026",
    title: "Updated Cargo Securing Manual (CSM) Guidelines",
    source: "EMSA",
    category: "Operations",
    convention: "SOLAS Chapter VI",
    impact: "Low",
    publishDate: "2026-06-02",
    implementationDate: "2027-01-01",
    sourceUrl: "https://www.emsa.europa.eu/",
    summary: "EMSA and Flag Administrations have finalized revisions to the guidelines for preparing the Cargo Securing Manual (CSM). The update accounts for the higher acceleration forces experienced by ultra-large container ships and heavy cargo transporters in severe weather. CSM revisions must update lashing calculations, check device certifications, and outline lash monitoring protocols.",
    keyTakeaways: [
      "Mandatory revision of lashing calculations to account for modern vessel acceleration metrics.",
      "Standardized checklists for checking container lashing gear wear and tear.",
      "Rules for approval and calibration of shipboard lashing calculation software.",
      "Applies to all ships carrying cargo other than solid or liquid bulk."
    ],
    studyQuestions: [
      {
        question: "Which vessels are required to carry an approved Cargo Securing Manual (CSM)?",
        options: [
          "Only tankers carrying liquid chemical cargoes.",
          "All ships carrying cargoes other than solid or liquid bulk.",
          "Only ships over 100,000 gross tonnage.",
          "Passenger ships carrying luggage only."
        ],
        answerIndex: 1,
        explanation: "SOLAS Chapters VI and VII require that all cargo vessels carrying cargo other than solid or liquid bulk have an approved Cargo Securing Manual."
      }
    ],
    flashcards: [
      {
        front: "Under which SOLAS chapter is the Cargo Securing Manual mandated?",
        back: "SOLAS Chapter VI (Regulation 5.6)."
      }
    ]
  },

  // ─── Flag Administration: Singapore MPA ───────────────────────
  {
    id: "mpa-singapore-green-2026",
    title: "MPA Singapore: Green Ship Programme Incentives & LNG Bunkering Standards",
    source: "Singapore MPA",
    category: "Environmental",
    convention: "MPA Shipping Circular",
    impact: "Medium",
    publishDate: "2026-04-12",
    implementationDate: "2026-07-01",
    sourceUrl: "https://www.mpa.gov.sg/",
    summary: "The Maritime and Port Authority of Singapore has expanded its Green Ship Programme (GSP), offering enhanced incentive rebates on annual tonnage tax and port dues for Singapore-flagged vessels adopting alternative fuels or achieving superior CII ratings. Additionally, MPA has published updated bunkering standards for LNG and biofuel operations at Singapore's anchorages and terminals.",
    keyTakeaways: [
      "Up to 75% rebate on Initial Registration Fee for qualifying Green Ship Programme vessels.",
      "50% rebate on annual tonnage tax for vessels achieving CII rating of A or B.",
      "LNG bunkering at designated anchorages now subject to standardized safety zones and notification procedures.",
      "Biofuel blends (up to B24) approved for bunkering with certified sustainability documentation."
    ],
    studyQuestions: [
      {
        question: "What incentive does the MPA Green Ship Programme offer for vessels with superior CII ratings?",
        options: [
          "Free drydocking at Singapore shipyards.",
          "Up to 50% rebate on annual tonnage tax for A or B rated vessels.",
          "Waiver of all PSC inspections at Singapore port.",
          "Priority berthing at container terminals."
        ],
        answerIndex: 1,
        explanation: "The MPA Green Ship Programme offers up to 50% rebate on annual tonnage tax for Singapore-flagged vessels that achieve CII ratings of A or B."
      }
    ],
    flashcards: [
      {
        front: "What is the MPA Green Ship Programme?",
        back: "A Singapore flag state incentive that provides tax and fee rebates for vessels using green technology or achieving high environmental performance ratings."
      }
    ]
  },

  // ─── Flag Administration: Malta Transport ─────────────────────
  {
    id: "malta-mlc-audit-2026",
    title: "Transport Malta: Enhanced MLC & ISM Audit Procedures for Malta-Flagged Ships",
    source: "Malta Transport",
    category: "Crew Welfare",
    convention: "MLC 2006 / ISM Code",
    impact: "Medium",
    publishDate: "2026-05-05",
    implementationDate: "2026-09-01",
    sourceUrl: "https://www.transport.gov.mt/maritime",
    summary: "Transport Malta has announced enhanced audit procedures for Malta-flagged vessels regarding MLC 2006 compliance and ISM Code certification. The updates include unannounced remote audits via video conferencing, mandatory pre-audit documentation uploads, and stricter timelines for corrective actions. Malta remains one of the world's largest ship registries and is intensifying quality standards to maintain its Paris MOU White List position.",
    keyTakeaways: [
      "Unannounced remote ISM/MLC audits via video conferencing are now authorized.",
      "Pre-audit documentation packages must be uploaded to Malta's e-Ship platform 14 days before scheduled audits.",
      "Non-conformity corrective actions must be completed within 90 days (reduced from 6 months).",
      "Repeat non-conformities will trigger increased audit frequency and possible flag withdrawal."
    ],
    studyQuestions: [
      {
        question: "What is a new feature of Transport Malta's audit procedures for flagged vessels?",
        options: [
          "All audits will be conducted only at Malta ports.",
          "Unannounced remote audits via video conferencing are now authorized.",
          "Flag state inspections have been entirely abolished.",
          "Only vessels over 50,000 GT are subject to audit."
        ],
        answerIndex: 1,
        explanation: "Transport Malta has authorized unannounced remote audits via video conferencing to supplement traditional on-board inspections, increasing coverage of the large Malta-flagged fleet."
      }
    ],
    flashcards: [
      {
        front: "Why is maintaining Paris MOU White List status important for a flag state like Malta?",
        back: "White List status means the flag state's vessels have low detention rates and are considered low-risk, resulting in fewer inspections and better commercial reputation."
      }
    ]
  },

  // ─── Flag Administration: Hong Kong MARDEP ────────────────────
  {
    id: "hk-mardep-emissions-2026",
    title: "MARDEP Hong Kong: At-Berth Emission Control Requirements for Ocean-Going Vessels",
    source: "Hong Kong MARDEP",
    category: "Environmental",
    convention: "MARDEP Marine Notice",
    impact: "High",
    publishDate: "2026-03-28",
    implementationDate: "2026-07-01",
    sourceUrl: "https://www.mardep.gov.hk/en/home.html",
    summary: "The Hong Kong Marine Department (MARDEP) has mandated that all ocean-going vessels (OGVs) must switch to fuel with sulfur content not exceeding 0.10% m/m while at berth in Hong Kong waters. This extends the existing requirement to cover all vessel types, including Ro-Ro ships and cruise vessels. Shore power connection is accepted as an alternative compliance method for equipped terminals.",
    keyTakeaways: [
      "All OGVs must use fuel with ≤0.10% sulfur content while at berth in Hong Kong waters.",
      "Shore power (cold ironing) is accepted as an alternative compliance method at equipped terminals.",
      "Fuel switchover must be completed within 1 hour of first line ashore.",
      "Non-compliance carries fines up to HKD 200,000 and potential port entry restrictions."
    ],
    studyQuestions: [
      {
        question: "What is the maximum sulfur content allowed in fuel used by OGVs while at berth in Hong Kong?",
        options: [
          "0.50% m/m",
          "0.30% m/m",
          "0.10% m/m",
          "0.05% m/m"
        ],
        answerIndex: 2,
        explanation: "MARDEP requires all ocean-going vessels at berth in Hong Kong waters to use fuel with sulfur content not exceeding 0.10% m/m, aligning with ECA-equivalent standards."
      }
    ],
    flashcards: [
      {
        front: "What is 'cold ironing' (shore power)?",
        back: "The practice of connecting a vessel to shore-side electrical power while at berth, allowing it to shut down its auxiliary engines and reduce emissions."
      }
    ]
  },

  // ─── Flag Administration: Panama Maritime Authority ───────────
  {
    id: "panama-amp-tonnage-2026",
    title: "Panama AMP: Revised Tonnage Tax & Vessel Registration Modernization",
    source: "Panama AMP",
    category: "Commercial",
    convention: "Panama Maritime Law",
    impact: "Low",
    publishDate: "2026-05-18",
    implementationDate: "2026-08-01",
    sourceUrl: "https://amp.gob.pa/",
    summary: "The Panama Maritime Authority (Autoridad Marítima de Panamá — AMP) has announced a modernization of its vessel registration platform with fully digital certificates and revised tonnage tax scales. Panama, the world's largest ship registry, is implementing competitive fee structures for newbuilds and second-hand registrations, alongside streamlined STCW endorsement processing for Panama-flagged seafarers.",
    keyTakeaways: [
      "Fully digital Certificates of Registry with blockchain-verified authentication.",
      "Revised tonnage tax scale offering discounts for vessels under 10 years old.",
      "STCW endorsement applications now fully digital with average processing time reduced to 15 business days.",
      "Annual safety inspection compliance rate tracking integrated into the registration portal."
    ],
    studyQuestions: [
      {
        question: "What technology is Panama AMP using to authenticate digital Certificates of Registry?",
        options: [
          "Traditional notarial stamps.",
          "Blockchain-verified authentication.",
          "Watermarked PDF documents only.",
          "Email-based two-factor authentication."
        ],
        answerIndex: 1,
        explanation: "Panama AMP is implementing blockchain-verified authentication for digital Certificates of Registry, ensuring tamper-proof documentation for the world's largest ship registry."
      }
    ],
    flashcards: [
      {
        front: "What is Panama's status in global ship registration?",
        back: "Panama has the world's largest ship registry by tonnage, also known as an 'open registry' or 'flag of convenience.'"
      }
    ]
  }
];

// Reserve updates for live parsing simulation — drawn from various sources
const RESERVE_UPDATES = [
  {
    id: "imo-biofouling-2026",
    title: "Revised IMO Biofouling Guidelines for Invasive Species Control",
    source: "IMO",
    category: "Environmental",
    convention: "Biofouling Guidelines",
    impact: "Low",
    publishDate: "2026-06-20",
    implementationDate: "2026-11-01",
    sourceUrl: "https://www.imo.org/en/About/Conventions/Pages/ListOfConventions.aspx",
    summary: "The IMO has updated its guidelines for the control and management of ships' biofouling to prevent the transfer of invasive aquatic species. The updates emphasize proactive hull cleaning and mandatory biofouling management plans and record books.",
    keyTakeaways: [
      "Mandatory Biofouling Management Plan (BFMP) tailored to each vessel's design.",
      "Hull cleaning logs, dry-docks, and anti-fouling applications recorded in a Biofouling Record Book.",
      "Port inspectors will focus on niche areas like sea chests and thruster tunnels during boarding operations."
    ],
    studyQuestions: [
      {
        question: "What is the primary document required on board to comply with the updated Biofouling Guidelines?",
        options: [
          "Ballast Water Record Book",
          "Biofouling Management Plan (BFMP) and Record Book",
          "International Anti-Fouling Certificate",
          "Garbage Management Log"
        ],
        answerIndex: 1,
        explanation: "Vessels must carry a ship-specific Biofouling Management Plan (BFMP) and keep an active Biofouling Record Book detailing all anti-fouling activities."
      }
    ],
    flashcards: [
      {
        front: "What is the main goal of the IMO Biofouling Guidelines?",
        back: "To control and manage ships' biofouling in order to minimize the transfer of invasive aquatic species."
      }
    ]
  },
  {
    id: "ilo-wage-2027",
    title: "ILO Revision of Minimum Monthly Basic Wage for Able Seafarers",
    source: "ILO",
    category: "Crew Welfare",
    convention: "MLC 2006",
    impact: "Medium",
    publishDate: "2026-06-22",
    implementationDate: "2027-01-01",
    sourceUrl: "https://www.ilo.org/global/standards/maritime-labour-convention/lang--en/index.htm",
    summary: "The Joint Maritime Commission of the ILO has updated the minimum basic wage scale for able seafarers. The new guidelines adjust compensation indices to reflect inflation and ensure seafarer welfare levels across international fleets.",
    keyTakeaways: [
      "Revised minimum basic wage baseline for Able Seafarers under MLC guidelines.",
      "Proportional changes to overtime rates and holiday pay calculations.",
      "Applies to all flag states that have ratified the MLC 2006 convention."
    ],
    studyQuestions: [
      {
        question: "Which ILO body is responsible for updating the seafarer minimum wage guidelines?",
        options: [
          "The International Maritime Safety Committee",
          "The Joint Maritime Commission (JMC)",
          "The Governing Body of Port State Control",
          "The Seafarers Welfare Association"
        ],
        answerIndex: 1,
        explanation: "The Joint Maritime Commission (JMC) is the ILO body that reviews and updates seafarer minimum wage guidelines."
      }
    ],
    flashcards: [
      {
        front: "Under which convention is the seafarer minimum wage scale governed?",
        back: "The Maritime Labour Convention (MLC) 2006."
      }
    ]
  },
  {
    id: "dnv-ammonia-2026",
    title: "DNV Ammonia as Fuel — Safety Risk Assessment Framework",
    source: "DNV",
    category: "Environmental",
    convention: "IGF Code / DNV Rules",
    impact: "High",
    publishDate: "2026-06-25",
    implementationDate: "2027-04-01",
    sourceUrl: "https://www.dnv.com/maritime/",
    summary: "DNV has published a risk assessment framework for ships considering ammonia as a marine fuel. The framework addresses the unique toxicity hazards of ammonia, including crew exposure limits, emergency response procedures, and ventilation requirements for fuel storage and handling spaces.",
    keyTakeaways: [
      "Ammonia is highly toxic — TWA exposure limit is 25 ppm; IDLH concentration is 300 ppm.",
      "Fuel preparation rooms require gas-tight bulkheads and independent ventilation systems.",
      "Emergency gas scrubbing systems must be installed near fuel tank vents.",
      "Crew must undergo specialized ammonia safety training with annual refresher courses."
    ],
    studyQuestions: [
      {
        question: "What is the primary safety concern with ammonia as a marine fuel?",
        options: [
          "It is cryogenic like LNG.",
          "It is highly toxic to humans, with a low exposure threshold.",
          "It produces more CO2 than conventional fuel.",
          "It cannot be stored in liquid form."
        ],
        answerIndex: 1,
        explanation: "Ammonia is highly toxic — the 8-hour TWA exposure limit is just 25 ppm, and concentrations of 300 ppm are immediately dangerous to life and health (IDLH)."
      }
    ],
    flashcards: [
      {
        front: "What does IDLH stand for?",
        back: "Immediately Dangerous to Life or Health — the concentration of a substance that poses immediate threat to life or would cause irreversible health effects."
      }
    ]
  },
  {
    id: "bimco-piracy-2026",
    title: "BIMCO Anti-Piracy Guidance for Gulf of Guinea & Red Sea Transits",
    source: "BIMCO",
    category: "Security",
    convention: "BMP5 / BIMCO Clause",
    impact: "High",
    publishDate: "2026-06-18",
    implementationDate: "2026-07-01",
    sourceUrl: "https://www.bimco.org/",
    summary: "BIMCO has updated its anti-piracy guidance and standard charter party clauses for transits through the Gulf of Guinea and Red Sea high-risk areas. The update reflects the resurgence of piracy incidents and includes guidance on Best Management Practices (BMP5), citadel procedures, and coordination with international naval forces.",
    keyTakeaways: [
      "BMP5 measures including razor wire, water cannons, and CCTV monitoring are recommended for high-risk transits.",
      "Citadel designation must be verified as a safe room with independent communications and engine controls.",
      "Coordination with UKMTO and regional naval forces is mandatory when transiting high-risk zones.",
      "Charter party war risk clauses must be updated to reflect current threat assessments."
    ],
    studyQuestions: [
      {
        question: "What is a 'citadel' in the context of anti-piracy measures?",
        options: [
          "A reinforced bridge with bulletproof glass.",
          "A designated safe room where crew can shelter and maintain communications and engine control.",
          "A secure area on deck for storing weapons.",
          "The vessel's main engine room."
        ],
        answerIndex: 1,
        explanation: "A citadel is a designated safe room, typically in the vessel's inner spaces, where crew can shelter during a piracy attack while maintaining communications with authorities and control over the ship's propulsion."
      }
    ],
    flashcards: [
      {
        front: "What does BMP5 stand for?",
        back: "Best Management Practices 5 — the industry guide for protecting ships from piracy and robbery in high-risk areas."
      }
    ]
  },
  {
    id: "lr-wind-propulsion-2026",
    title: "Lloyd's Register Guidance Note on Wind-Assisted Propulsion Systems",
    source: "Lloyd's Register",
    category: "Environmental",
    convention: "LR Rules / MARPOL",
    impact: "Low",
    publishDate: "2026-06-15",
    implementationDate: "2027-02-01",
    sourceUrl: "https://www.lr.org/en/marine-shipping/",
    summary: "Lloyd's Register has published a guidance note for the design, installation, and survey of wind-assisted propulsion systems including rotor sails, rigid wing sails, and kite systems. The note covers structural requirements, stability assessments, and claimed CII rating improvements for vessels adopting these technologies.",
    keyTakeaways: [
      "Wind-assisted propulsion can contribute to CII rating improvement of 5-15% depending on trade route.",
      "Structural assessments must account for wind loading on deck-mounted systems in extreme weather.",
      "Class notation available for wind-assisted vessels meeting LR technical requirements.",
      "Stability booklet must be updated to reflect the additional windage area and topside weight."
    ],
    studyQuestions: [
      {
        question: "What typical CII rating improvement can wind-assisted propulsion provide?",
        options: [
          "1-2%",
          "5-15%",
          "25-30%",
          "50% or more"
        ],
        answerIndex: 1,
        explanation: "Wind-assisted propulsion systems typically contribute 5-15% CII improvement depending on the vessel type, system design, and prevailing trade route wind conditions."
      }
    ],
    flashcards: [
      {
        front: "Name three types of wind-assisted propulsion systems for ships.",
        back: "Rotor sails (Flettner rotors), rigid wing sails, and kite systems."
      }
    ]
  },
  {
    id: "gard-collision-2026",
    title: "Gard Analysis: Collision Avoidance Failures & COLREG Misapplication",
    source: "Gard P&I",
    category: "Safety",
    convention: "COLREGS",
    impact: "Medium",
    publishDate: "2026-06-28",
    implementationDate: "2026-07-15",
    sourceUrl: "https://www.gard.no/",
    summary: "Gard P&I has published an analysis of recent collision incidents revealing common patterns of COLREG misapplication. Key findings include failure to maintain proper lookout, over-reliance on ARPA/AIS data without visual verification, and incorrect application of Rule 15 (crossing situations). The circular provides decision-tree guides for watchkeepers.",
    keyTakeaways: [
      "Rule 5 (Lookout) violations present in 78% of analyzed collision cases.",
      "Over-reliance on electronic navigation aids without visual cross-checking is a recurring factor.",
      "Rule 15 (crossing situations) frequently misapplied — give-way vessel often fails to take early action.",
      "Gard recommends implementing 'challenge and response' protocols between OOW and helmsman."
    ],
    studyQuestions: [
      {
        question: "Which COLREG rule was most frequently violated in Gard's collision analysis?",
        options: [
          "Rule 10 — Traffic Separation Schemes",
          "Rule 5 — Lookout",
          "Rule 9 — Narrow Channels",
          "Rule 13 — Overtaking"
        ],
        answerIndex: 1,
        explanation: "Rule 5 (Lookout) was found to be violated in 78% of collision cases analyzed by Gard, making it the most commonly breached regulation."
      }
    ],
    flashcards: [
      {
        front: "What does COLREGS stand for?",
        back: "Convention on the International Regulations for Preventing Collisions at Sea, 1972."
      }
    ]
  },
  {
    id: "mpa-sg-cybersecurity-2026",
    title: "Singapore MPA: Maritime Cybersecurity Code of Practice for Port Facilities",
    source: "Singapore MPA",
    category: "Security",
    convention: "MPA Maritime Circular",
    impact: "Medium",
    publishDate: "2026-06-30",
    implementationDate: "2026-10-01",
    sourceUrl: "https://www.mpa.gov.sg/",
    summary: "MPA Singapore has issued a Code of Practice for maritime cybersecurity covering port facilities, terminals, and interfacing vessel systems. The code mandates cybersecurity risk assessments, incident reporting timelines, and data protection standards for port community systems operating in Singapore waters.",
    keyTakeaways: [
      "All port operators must conduct annual cybersecurity risk assessments aligned with IEC 62443 standards.",
      "Cybersecurity incidents must be reported to MPA within 72 hours of detection.",
      "Port community systems handling vessel data must implement end-to-end encryption.",
      "Regular penetration testing required for critical port operational technology systems."
    ],
    studyQuestions: [
      {
        question: "Within what timeframe must cybersecurity incidents be reported to MPA Singapore?",
        options: [
          "24 hours",
          "48 hours",
          "72 hours",
          "7 days"
        ],
        answerIndex: 2,
        explanation: "MPA Singapore's Code of Practice requires that cybersecurity incidents affecting port facilities be reported within 72 hours of detection."
      }
    ],
    flashcards: [
      {
        front: "What international standard does MPA Singapore reference for port cybersecurity risk assessments?",
        back: "IEC 62443 — the international standard for industrial cybersecurity."
      }
    ]
  }
];

// Export for ES Modules or define globally if loaded in browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MARITIME_DATA, RESERVE_UPDATES };
} else {
  window.MARITIME_DATA = MARITIME_DATA;
  window.RESERVE_UPDATES = RESERVE_UPDATES;
}
