// Gmail Label Organizer
// 1. Go to https://script.google.com
// 2. Create a new project
// 3. Paste this entire script
// 4. Click Run > createLabelsAndApply
// 5. Authorize when prompted
// 6. Check execution log for progress (View > Execution log)

// ============================================================
// CONFIGURATION - Edit categories/senders as needed
// ============================================================

const LABEL_MAP = {
  "Jobs/LinkedIn": [
    "jobalerts-noreply@linkedin.com",
  ],
  "Jobs/Indeed": [
    "donotreply@jobalert.indeed.com",
  ],
  "Jobs/AllJobs": [
    "AllJobs@alljob.co.il",
    "alljobs@alljob.co.il",
  ],
  "Jobs/Other": [
    "marketing@gamesjobsdirect.com",
    "diffusion@isarta.com",
  ],

  "Finance/RBC": [
    "catch@payments.interac.ca",
    "ibanking@ib.rbc.com",
    "rbcroyalbank@offers.rbc.com",
    "noreply@rbcdirectinvesting.rbc.com",
  ],
  "Finance/CIBC": [
    "personalbanking@info.cibc.com",
  ],
  "Finance/Wealthsimple": [
    "notifications@m.wealthsimple.com",
    "notifications@o.wealthsimple.com",
    "notifications@e-news.wealthsimple.com",
  ],
  "Finance/Borrowell": [
    "info@email.borrowell.com",
  ],
  "Finance/ClearScore": [
    "news@m.int.clearscore.com",
  ],
  "Finance/PayPal": [
    "no_reply@communications.paypal.com",
  ],
  "Finance/Amex": [
    "Do-not-Reply@inmailer.amexil.co.il",
  ],
  "Finance/Interac": [
    "notify@payments.interac.ca",
  ],
  "Finance/Stripe Invoices": [
    "invoice+statements+acct_1JPmU6Im2uIqkWZk@stripe.com",
    "upcoming-invoice+acct_1JPmU6Im2uIqkWZk@stripe.com",
  ],
  "Finance/Trading": [
    "statements@fpmarkets.com",
    "bit@otp.bitpay.co.il",
  ],

  "Dev/GitHub": [
    "notifications@github.com",
    "noreply@github.com",
  ],
  "Dev/Anthropic": [
    "no-reply@email.claude.com",
    "no-reply-msqZjM1h0wNsRViaqllM3w@mail.anthropic.com",
    "no-reply-f5yuEZn_IXXurAYCsqMikw@mail.anthropic.com",
    "no-reply-Nc9YV1Vfc61ehYhkCKubVQ@mail.anthropic.com",
  ],
  "Dev/PostHog": [
    "hey@posthog.com",
    "joe@posthog.com",
    "billing@posthog.com",
  ],
  "Dev/Sentry": [
    "noreply@md.getsentry.com",
    "learn@sentry.io",
    "help@sentry.io",
  ],
  "Dev/Render": [
    "no-reply@render.com",
  ],
  "Dev/Heroku": [
    "bot@notifications.heroku.com",
  ],
  "Dev/Cursor": [
    "team@mail.cursor.com",
  ],
  "Dev/Other Tools": [
    "team@replicate.email",
    "team@hi.descope.com",
    "noreply@wakatime.com",
    "support@gitguardian.com",
    "hello@send.vidiq.com",
    "developer@vexo.co",
    "hello@ollama.com",
    "team@mail.perplexity.ai",
    "no-reply@marketing.base44.com",
    "team@m.ngrok.com",
    "florent@twic.pics",
    "news@bootstrapstudio.io",
    "support@emailjs.com",
    "alerts@help.clickup.com",
    "support@replit.com",
    "team@info.digitalocean.com",
    "mongodbteam@messages.mongodb.com",
    "email@mail.salesforce.com",
    "soham@mail.composio.dev",
  ],

  "Google/Account": [
    "no-reply@accounts.google.com",
    "noreply@google.com",
  ],
  "Google/Cloud": [
    "CloudPlatform-noreply@google.com",
  ],
  "Google/Flights": [
    "noreply-travel@google.com",
  ],
  "Google/AI": [
    "googleaistudio-noreply@google.com",
    "google-gemini-noreply@google.com",
  ],
  "Google/Payments": [
    "payments-noreply@google.com",
  ],

  "Shopping/Costco": [
    "CostcoNews@digital.costco.ca",
  ],
  "Shopping/Walmart": [
    "walmartca_outreach@mailtr.rnmk.com",
    "heretohelp.ca@custhelp.com",
    "noreply@walmart.ca",
    "offers@walmartphotocentre.ca",
  ],
  "Shopping/FreshCo": [
    "FreshcoOffers@em.freshco.com",
    "freshco@em.freshco.com",
  ],
  "Shopping/Shoppers": [
    "info@e.shoppersdrugmart.ca",
  ],
  "Shopping/Temu": [
    "orders@order.temu.com",
  ],
  "Shopping/PC Optimum": [
    "noreply@email.pcoptimum.ca",
  ],
  "Shopping/Scene+": [
    "news@news.sceneplus.ca",
  ],
  "Shopping/Nespresso": [
    "no-reply@deemailing.nespresso.com",
  ],
  "Shopping/Other": [
    "store+19883711@t.shopifyemail.com",
    "info@certifiedstore.co.il",
    "do-not-reply@thangs.com",
    "thangs-user-updates@thangs.com",
    "hello@emails.airalo.com",
  ],

  "Social/LinkedIn": [
    "updates-noreply@linkedin.com",
    "messages-noreply@linkedin.com",
    "groups-noreply@linkedin.com",
    "notifications-noreply@linkedin.com",
    "security-noreply@linkedin.com",
  ],
  "Social/Discord": [
    "noreply@discord.com",
  ],

  "Lodge/Official": [
    "bonim.hazmana@freemasonry.org.il",
    "gl-Israel@freemasonry.org.il",
  ],
  "Lodge/Chapters": [
    "hakochav13@gmail.com",
    "eilatfreemasons@gmail.com",
    "d.y.lodge18@gmail.com",
    "dylodge18@gmail.com",
    "sec.sharonstar7@gmail.com",
    "reuven.lodge@gmail.com",
    "lodge.raanana70@gmail.com",
    "barkai.lodge.17@gmail.com",
    "secretary.nur@gmail.com",
    "secretaria.la.fraternidad@gmail.com",
    "pablo@rostkier.com",
  ],
  "Lodge/Members": [
    "bsister18@gmail.com",
    "levin.ami@gmail.com",
    "madanes@madanes.net",
    "eedd777@gmail.com",
    "1kestrel1@gmail.com",
    "golandy@bezeqint.net",
    "levi_plating@bezeqint.net",
    "yt2u4u@gmail.com",
    "odedy48@gmail.com",
    "yakov@yb-adv.co.il",
    "Eliash@histadrut.org.il",
    "abualon@walla.com",
    "phillipweiner.m@gmail.com",
  ],

  "Government/Ukraine": [
    "gc_cat@mfa.gov.ua",
    "cabinet-support@mil.ua",
    "toronto@dpdoc.com.ua",
  ],
  "Government/Canada": [
    "do_not_reply-ne_pas_repondre@cra-arc.gc.ca",
    "donotreply@cic.gc.ca",
  ],

  "Services/416Skin": [
    "416skin@gmail.com",
  ],
  "Services/Body In Tune": [
    "notifications@janeapp.com",
  ],
  "Services/Gett": [
    "no-reply@news.gett.com",
  ],
  "Services/Cineplex": [
    "cineplex@campaigns.cineplex.com",
  ],
  "Services/NordVPN": [
    "no-reply@mail.nordvpn.com",
  ],
  "Services/Mr. Lube": [
    "offers@email.mrlube.com",
  ],
  "Services/Sonnet Insurance": [
    "sonnet@email.sonnet.ca",
  ],
  "Services/August Home": [
    "noreply@august.com",
  ],
  "Services/Other": [
    "noreply@entrycall.ca",
    "no-reply@zoom.us",
    "no-reply@lyftmail.com",
    "discover@airbnb.com",
    "redfin.com",
    "catarina@sweet-home-cyprus.com",
    "hello@yuvital.com",
    "info@mail.findhaven.org",
    "hello@mailer.clutch.ca",
    "content@smoove.io",
    "calmail@icc.co.il",
  ],

  "Education/Coursera": [
    "Coursera@m.learn.coursera.org",
  ],
  "Education/Duolingo": [
    "super-support@duolingo.com",
    "hello@duolingo.com",
  ],
  "Education/Robert Kennedy College": [
    "zurich@rkc.edu",
    "chanelle.young@rkc.edu",
  ],
  "Education/SmallTalk": [
    "noreply@smalltalk2.me",
    "anastasiafoms@smalltalk2.me",
  ],

  "Newsletters/Chris Koerner": [
    "chris-koerner@mail.beehiiv.com",
  ],
  "Newsletters/Fortune 500": [
    "fortune@mail.fortune.com",
  ],
  "Newsletters/TED": [
    "recommends@ted.com",
  ],
  "Newsletters/Quora": [
    "thesciencespace-space@quora.com",
  ],
  "Newsletters/Other": [
    "wrgrassrootsresponse@5794956.brevosend.com",
    "truthteam@email.truthsocial.com",
    "news@updates.ubisoft.com",
    "Windowsinsiderprogram@e-mails.microsoft.com",
    "happycamper@campnbb.com",
    "noreply@workforce.intuit.com",
  ],

  "Real Estate/TRREB": [
    "TRREB@canadacentralmatrixmail.com",
  ],
  "Real Estate/Redfin": [
    "redmail@redfin.com",
  ],

  "File Sharing/Smash": [
    "noreply@fromsmash.com",
  ],

  "Domains/Namecheap": [
    "hello@namecheap.com",
    "support@name.com",
  ],

  "Parking/GreenP": [
    "donotreply@greenp.com",
  ],

  "Personal": [
    "mezlinha@gmail.com",
    "berty.ventura@gmail.com",
    "igor@isaev.ca",
    "anael.job1@gmail.com",
  ],

  "Suppliers/Rio Tinto": [
    "noreply@localsuppliersportal.com",
  ],
};

// ============================================================
// MAIN FUNCTIONS
// ============================================================

// Max runtime ~5 min to stay under Google's 6-min limit
const MAX_RUNTIME_MS = 5 * 60 * 1000;

/**
 * Main entry point - run this repeatedly until it says "ALL DONE"
 * It saves progress and resumes from where it left off each time.
 */
function createLabelsAndApply() {
  const startTime = Date.now();
  const props = PropertiesService.getScriptProperties();

  Logger.log("=== Gmail Label Organizer ===");

  // Step 1: Create all labels (fast, always runs)
  const labelNames = Object.keys(LABEL_MAP);
  Logger.log(`Ensuring ${labelNames.length} labels exist...`);
  for (const labelName of labelNames) {
    createLabelIfNotExists(labelName);
  }
  Logger.log("Labels ready.\n");

  // Step 2: Resume from saved progress
  const lastLabelIndex = parseInt(props.getProperty("lastLabelIndex") || "0");
  const lastSenderIndex = parseInt(props.getProperty("lastSenderIndex") || "0");
  let totalLabeled = parseInt(props.getProperty("totalLabeled") || "0");

  const entries = Object.entries(LABEL_MAP);
  Logger.log(`Resuming from label ${lastLabelIndex}/${entries.length}, sender ${lastSenderIndex}...`);
  Logger.log(`Previously labeled: ${totalLabeled} threads\n`);

  for (let li = lastLabelIndex; li < entries.length; li++) {
    const [labelName, senders] = entries[li];
    const label = GmailApp.getUserLabelByName(labelName);
    if (!label) {
      Logger.log(`WARNING: Label "${labelName}" not found, skipping.`);
      continue;
    }

    const startSender = (li === lastLabelIndex) ? lastSenderIndex : 0;

    for (let si = startSender; si < senders.length; si++) {
      // Check time before each sender
      if (Date.now() - startTime > MAX_RUNTIME_MS) {
        props.setProperty("lastLabelIndex", li.toString());
        props.setProperty("lastSenderIndex", si.toString());
        props.setProperty("totalLabeled", totalLabeled.toString());
        Logger.log(`\n⏱ Time limit reached. Progress saved.`);
        Logger.log(`Labeled ${totalLabeled} threads so far.`);
        Logger.log(`➡ Click RUN again to continue from "${labelName}" sender #${si}.`);
        return;
      }

      const sender = senders[si];
      const query = `from:${sender}`;
      let threads;
      try {
        threads = GmailApp.search(query, 0, 500);
      } catch (e) {
        Logger.log(`  Error searching for ${sender}: ${e.message}`);
        continue;
      }

      if (threads.length > 0) {
        for (let i = 0; i < threads.length; i += 100) {
          const batch = threads.slice(i, i + 100);
          label.addToThreads(batch);
        }
        totalLabeled += threads.length;
        Logger.log(`  ${labelName} <- ${sender} (${threads.length} threads)`);
      }
    }
  }

  // All done — clear saved progress
  props.deleteProperty("lastLabelIndex");
  props.deleteProperty("lastSenderIndex");
  props.deleteProperty("totalLabeled");
  Logger.log(`\n✅ ALL DONE! Applied labels to ${totalLabeled} total threads.`);
  Logger.log("Check your Gmail sidebar for new labels.");
}

/**
 * Reset saved progress (use if you want to start over from scratch)
 */
function resetProgress() {
  const props = PropertiesService.getScriptProperties();
  props.deleteProperty("lastLabelIndex");
  props.deleteProperty("lastSenderIndex");
  props.deleteProperty("totalLabeled");
  Logger.log("Progress reset. Next run will start from the beginning.");
}

/**
 * Creates a label (and parent labels) if it doesn't already exist
 */
function createLabelIfNotExists(labelName) {
  const existing = GmailApp.getUserLabelByName(labelName);
  if (existing) {
    Logger.log(`  Label "${labelName}" already exists.`);
    return;
  }

  // Create parent label first if nested (e.g., "Jobs" for "Jobs/LinkedIn")
  if (labelName.includes("/")) {
    const parent = labelName.split("/")[0];
    const parentLabel = GmailApp.getUserLabelByName(parent);
    if (!parentLabel) {
      GmailApp.createLabel(parent);
      Logger.log(`  Created parent label: "${parent}"`);
    }
  }

  GmailApp.createLabel(labelName);
  Logger.log(`  Created label: "${labelName}"`);
}

// ============================================================
// OPTIONAL: Auto-label new messages on a schedule
// ============================================================

/**
 * Optional: Set up a trigger to auto-label new messages every 6 hours
 * Run this once to schedule automatic labeling
 */
function setupDailyTrigger() {
  // Remove existing triggers for this function
  const triggers = ScriptApp.getProjectTriggers();
  for (const trigger of triggers) {
    if (trigger.getHandlerFunction() === "labelRecentMessages") {
      ScriptApp.deleteTrigger(trigger);
    }
  }

  // Run every 6 hours
  ScriptApp.newTrigger("labelRecentMessages")
    .timeBased()
    .everyHours(6)
    .create();

  Logger.log("Trigger set: labelRecentMessages will run every 6 hours.");
}

/**
 * Labels messages from the last 24 hours (called by trigger)
 */
function labelRecentMessages() {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);
  const dateStr = Utilities.formatDate(oneDayAgo, Session.getScriptTimeZone(), "yyyy/MM/dd");

  let totalLabeled = 0;

  for (const [labelName, senders] of Object.entries(LABEL_MAP)) {
    const label = GmailApp.getUserLabelByName(labelName);
    if (!label) continue;

    for (const sender of senders) {
      const query = `from:${sender} after:${dateStr}`;
      try {
        const threads = GmailApp.search(query, 0, 100);
        if (threads.length > 0) {
          label.addToThreads(threads);
          totalLabeled += threads.length;
        }
      } catch (e) {
        // Skip errors silently for automated runs
      }
    }
  }

  Logger.log(`Auto-labeled ${totalLabeled} recent threads.`);
}

/**
 * Utility: Remove all labels created by this script
 * Use this to undo everything if needed
 */
function removeAllCreatedLabels() {
  const labelNames = Object.keys(LABEL_MAP);
  const parentNames = new Set();

  // Remove child labels first
  for (const labelName of labelNames) {
    const label = GmailApp.getUserLabelByName(labelName);
    if (label) {
      label.deleteLabel();
      Logger.log(`Deleted: ${labelName}`);
    }
    if (labelName.includes("/")) {
      parentNames.add(labelName.split("/")[0]);
    }
  }

  // Then remove parent labels
  for (const parent of parentNames) {
    const label = GmailApp.getUserLabelByName(parent);
    if (label) {
      label.deleteLabel();
      Logger.log(`Deleted parent: ${parent}`);
    }
  }

  Logger.log("All labels removed.");
}

// ============================================================
// SMART CATEGORIZATION — Auto-discover & categorize unknown senders
// ============================================================

// --- Heuristic Rule Tables ---

// TLD rules — more specific entries first (checked top-to-bottom)
const SMART_TLD_RULES = [
  ['gc.ca', 'Government/Canada'],
  ['gov.ca', 'Government/Canada'],
  ['gov.ua', 'Government/Ukraine'],
  ['mil.ua', 'Government/Ukraine'],
  ['gov.il', 'Government/Israel'],
  ['ac.il', 'Education/Other'],
  ['edu.il', 'Education/Other'],
  ['edu.ua', 'Education/Other'],
  ['edu.ca', 'Education/Other'],
  ['edu', 'Education/Other'],
  ['gov', 'Government/Other'],
  ['mil', 'Government/Other'],
];

// Domain keywords → suggested label (matched against sender's domain)
const SMART_DOMAIN_KEYWORDS = {
  'bank': 'Finance/Other',
  'financ': 'Finance/Other',
  'invest': 'Finance/Other',
  'insur': 'Finance/Other',
  'credit': 'Finance/Other',
  'mortgage': 'Finance/Other',
  'payment': 'Finance/Other',
  'shop': 'Shopping/Other',
  'store': 'Shopping/Other',
  'retail': 'Shopping/Other',
  'market': 'Shopping/Other',
  'job': 'Jobs/Other',
  'career': 'Jobs/Other',
  'recruit': 'Jobs/Other',
  'hiring': 'Jobs/Other',
  'travel': 'Services/Other',
  'hotel': 'Services/Other',
  'flight': 'Services/Other',
  'booking': 'Services/Other',
  'realt': 'Real Estate/Other',
  'property': 'Real Estate/Other',
  'newsletter': 'Newsletters/Other',
};

// Sender display-name keywords → suggested label
const SMART_NAME_KEYWORDS = {
  'bank': 'Finance/Other',
  'financial': 'Finance/Other',
  'payment': 'Finance/Other',
  'invoice': 'Finance/Other',
  'receipt': 'Shopping/Other',
  'order confirm': 'Shopping/Other',
  'shipping': 'Shopping/Other',
  'coupon': 'Shopping/Other',
  'discount': 'Shopping/Other',
  'promo': 'Shopping/Other',
  'newsletter': 'Newsletters/Other',
  'digest': 'Newsletters/Other',
  'weekly update': 'Newsletters/Other',
  'job alert': 'Jobs/Other',
  'career': 'Jobs/Other',
  'security alert': 'Services/Other',
};

// Gmail category → fallback label
const SMART_GMAIL_CATEGORY_MAP = {
  'PROMOTIONS': 'Shopping/Other',
  'SOCIAL': 'Social/Other',
  'UPDATES': 'Services/Other',
  'FORUMS': 'Newsletters/Other',
};

// --- Helper Functions ---

/**
 * Builds a Set of all known sender emails/domains from LABEL_MAP for O(1) lookup.
 */
function buildKnownSenderSet() {
  const set = new Set();
  for (const senders of Object.values(LABEL_MAP)) {
    for (const sender of senders) {
      set.add(sender.toLowerCase());
    }
  }
  return set;
}

/**
 * Extracts the registrable base domain from a full domain.
 * Handles country-code SLDs like .co.il, .com.ua, .ac.uk.
 */
function getBaseDomain(fullDomain) {
  const parts = fullDomain.split('.');
  if (parts.length <= 2) return fullDomain;

  const secondLevel = parts[parts.length - 2];
  const countrySLDs = ['co', 'com', 'org', 'net', 'gov', 'ac', 'edu', 'or', 'ne'];

  if (countrySLDs.includes(secondLevel) && parts.length > 2) {
    return parts.slice(-3).join('.');
  }
  return parts.slice(-2).join('.');
}

/**
 * Maps domains from LABEL_MAP to their most common label.
 * Also maps base domains (e.g., m.wealthsimple.com → wealthsimple.com).
 */
function buildDomainToLabelMap() {
  const domainCounts = {}; // domain → { label → senderCount }

  for (const [label, senders] of Object.entries(LABEL_MAP)) {
    for (const sender of senders) {
      const atIndex = sender.lastIndexOf('@');
      if (atIndex === -1) continue;
      const fullDomain = sender.substring(atIndex + 1).toLowerCase();

      // Map the full subdomain
      if (!domainCounts[fullDomain]) domainCounts[fullDomain] = {};
      domainCounts[fullDomain][label] = (domainCounts[fullDomain][label] || 0) + 1;

      // Also map the base domain
      const base = getBaseDomain(fullDomain);
      if (base !== fullDomain) {
        if (!domainCounts[base]) domainCounts[base] = {};
        domainCounts[base][label] = (domainCounts[base][label] || 0) + 1;
      }
    }
  }

  // For each domain, pick the label with the most senders
  const result = {};
  for (const [domain, labels] of Object.entries(domainCounts)) {
    let best = '', bestCount = 0;
    for (const [label, count] of Object.entries(labels)) {
      if (count > bestCount) { bestCount = count; best = label; }
    }
    result[domain] = best;
  }
  return result;
}

/**
 * Extracts email address, display name, and domain from a GmailMessage.
 */
function parseSender(message) {
  const from = message.getFrom();
  if (!from) return null;

  const angleMatch = from.match(/<([^>]+)>/);
  const email = (angleMatch ? angleMatch[1] : from).trim().toLowerCase();

  if (!email.includes('@')) return null;

  const name = from.replace(/<[^>]+>/, '').replace(/"/g, '').trim();
  const domain = email.split('@')[1];

  return { email: email, name: name, domain: domain };
}

/**
 * Detects which Gmail category a sender's messages fall into.
 * Searches category:promotions/social/updates/forums. Returns 'PRIMARY' if none match.
 */
function detectGmailCategory(email) {
  const categories = ['promotions', 'social', 'updates', 'forums'];
  for (const cat of categories) {
    try {
      const threads = GmailApp.search('from:' + email + ' category:' + cat, 0, 1);
      if (threads.length > 0) return cat.toUpperCase();
    } catch (e) { /* skip */ }
  }
  return 'PRIMARY';
}

/**
 * Pure heuristic engine — returns { label, confidence } for a sender.
 *
 * Priority order:
 *   1. Domain affinity (exact or parent domain in LABEL_MAP)  → High
 *   2. TLD rules (.gov, .edu, etc.)                           → High
 *   3. Domain keywords (bank, shop, job, etc.)                 → Medium
 *   4. Sender name keywords                                    → Medium
 *   5. Gmail category fallback                                 → Low
 *   6. Default → Uncategorized                                 → Low
 */
function categorizeSender(email, name, domain, gmailCategory, domainToLabel) {
  // Priority 1: Domain affinity — exact domain match
  if (domainToLabel[domain]) {
    return { label: domainToLabel[domain], confidence: 'High' };
  }
  // Walk up the domain hierarchy (e.g., sub.example.com → example.com)
  const parts = domain.split('.');
  for (let i = 1; i < parts.length - 1; i++) {
    const parent = parts.slice(i).join('.');
    if (domainToLabel[parent]) {
      return { label: domainToLabel[parent], confidence: 'High' };
    }
  }

  // Priority 2: TLD rules
  for (const [tld, label] of SMART_TLD_RULES) {
    if (domain === tld || domain.endsWith('.' + tld)) {
      return { label: label, confidence: 'High' };
    }
  }

  // Priority 3: Domain keywords
  for (const [keyword, label] of Object.entries(SMART_DOMAIN_KEYWORDS)) {
    if (domain.includes(keyword)) {
      return { label: label, confidence: 'Medium' };
    }
  }

  // Priority 4: Sender name keywords
  const lowerName = (name || '').toLowerCase();
  if (lowerName) {
    for (const [keyword, label] of Object.entries(SMART_NAME_KEYWORDS)) {
      if (lowerName.includes(keyword)) {
        return { label: label, confidence: 'Medium' };
      }
    }
  }

  // Priority 5: Gmail category fallback
  if (gmailCategory && SMART_GMAIL_CATEGORY_MAP[gmailCategory]) {
    return { label: SMART_GMAIL_CATEGORY_MAP[gmailCategory], confidence: 'Low' };
  }

  // Priority 6: Default
  return { label: 'Uncategorized', confidence: 'Low' };
}

// --- Google Sheet Dashboard ---

/**
 * Creates or retrieves the dashboard Google Sheet.
 * Sets up headers, column widths, Status dropdown, and conditional formatting.
 */
function getOrCreateDashboard() {
  const props = PropertiesService.getScriptProperties();
  const sheetId = props.getProperty('dashboardSheetId');

  // Try to open existing sheet
  if (sheetId) {
    try {
      const ss = SpreadsheetApp.openById(sheetId);
      const sheet = ss.getSheetByName('Dashboard');
      if (sheet) return { sheet: sheet, spreadsheet: ss };
    } catch (e) { /* deleted or no access — recreate */ }
  }

  // Create new spreadsheet
  const ss = SpreadsheetApp.create('Gmail Smart Label Organizer');
  const sheet = ss.getActiveSheet();
  sheet.setName('Dashboard');

  // Headers
  const headers = [
    'Sender Email', 'Sender Name', 'Domain', 'Count',
    'Gmail Category', 'Suggested Label', 'Confidence',
    'Status', 'Approved Label', 'Date Added'
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#4a86c8')
    .setFontColor('#ffffff');

  // Column widths
  var widths = [250, 200, 150, 60, 120, 200, 100, 100, 200, 100];
  for (var w = 0; w < widths.length; w++) {
    sheet.setColumnWidth(w + 1, widths[w]);
  }

  // Data validation for Status column (dropdown)
  var statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Pending', 'Approved', 'Rejected', 'Applied'])
    .setAllowInvalid(false)
    .build();
  sheet.getRange('H2:H1000').setDataValidation(statusRule);

  // Conditional formatting for Status column
  var statusRange = sheet.getRange('H2:H1000');
  var rules = [
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Pending').setBackground('#fff2cc')
      .setRanges([statusRange]).build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Approved').setBackground('#d9ead3')
      .setRanges([statusRange]).build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Rejected').setBackground('#f4cccc')
      .setRanges([statusRange]).build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Applied').setBackground('#cfe2f3')
      .setRanges([statusRange]).build(),
  ];
  sheet.setConditionalFormatRules(rules);

  // Freeze header row
  sheet.setFrozenRows(1);

  // Persist sheet ID
  props.setProperty('dashboardSheetId', ss.getId());

  Logger.log('Created dashboard: ' + ss.getUrl());
  return { sheet: sheet, spreadsheet: ss };
}

// --- Main Entry Points ---

/**
 * Main discovery function — scans inbox for unknown senders, categorizes them
 * using domain heuristics, and writes results to a Google Sheet dashboard.
 *
 * Resumable: saves page offset in PropertiesService. Run repeatedly until
 * the log shows "DISCOVERY COMPLETE".
 */
function discoverAndCategorizeSenders() {
  var startTime = Date.now();
  var props = PropertiesService.getScriptProperties();

  Logger.log('=== Smart Sender Discovery ===');

  // Build lookup structures
  var knownSenders = buildKnownSenderSet();
  var domainToLabel = buildDomainToLabelMap();

  // Get or create dashboard
  var dashboard = getOrCreateDashboard();
  var sheet = dashboard.sheet;
  var spreadsheet = dashboard.spreadsheet;
  Logger.log('Dashboard: ' + spreadsheet.getUrl());

  // Load existing emails from sheet to skip duplicates
  var existingEmails = new Set();
  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    var emailCol = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    for (var e = 0; e < emailCol.length; e++) {
      if (emailCol[e][0]) existingEmails.add(emailCol[e][0].toString().toLowerCase());
    }
  }

  // Resume from saved progress
  var pageOffset = parseInt(props.getProperty('discoverPageOffset') || '0');
  var pageSize = 100;
  var newSendersCount = 0;
  var seenThisRun = new Set();
  var rowBuffer = [];
  var today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');

  Logger.log('Scanning inbox from offset ' + pageOffset + '...\n');

  while (true) {
    // Time check before fetching next page
    if (Date.now() - startTime > MAX_RUNTIME_MS) {
      if (rowBuffer.length > 0) {
        var flushStart = sheet.getLastRow() + 1;
        sheet.getRange(flushStart, 1, rowBuffer.length, 10).setValues(rowBuffer);
        rowBuffer = [];
      }
      props.setProperty('discoverPageOffset', pageOffset.toString());
      Logger.log('\n⏱ Time limit reached. Found ' + newSendersCount + ' new senders this run.');
      Logger.log('➡ Run again to continue from offset ' + pageOffset + '.');
      return;
    }

    var threads;
    try {
      threads = GmailApp.search('in:inbox', pageOffset, pageSize);
    } catch (err) {
      Logger.log('Search error at offset ' + pageOffset + ': ' + err.message);
      // Preserve progress on error instead of falling through to deleteProperty
      if (rowBuffer.length > 0) {
        var errFlush = sheet.getLastRow() + 1;
        sheet.getRange(errFlush, 1, rowBuffer.length, 10).setValues(rowBuffer);
      }
      props.setProperty('discoverPageOffset', pageOffset.toString());
      Logger.log('Progress saved. Run again to retry from offset ' + pageOffset + '.');
      return;
    }

    if (threads.length === 0) break; // No more threads — scan complete

    for (var t = 0; t < threads.length; t++) {
      var messages;
      try { messages = threads[t].getMessages(); } catch (err2) { continue; }
      if (!messages || messages.length === 0) continue;

      var sender = parseSender(messages[0]);
      if (!sender) continue;

      // Skip: already known, already in sheet, or already seen this run
      if (knownSenders.has(sender.email) || knownSenders.has(sender.domain) ||
          existingEmails.has(sender.email) || seenThisRun.has(sender.email)) continue;

      seenThisRun.add(sender.email);

      // Safety margin — stop 90s early to account for up to 5 GmailApp.search() calls per sender
      if (Date.now() - startTime > MAX_RUNTIME_MS - 90000) {
        if (rowBuffer.length > 0) {
          var earlyFlush = sheet.getLastRow() + 1;
          sheet.getRange(earlyFlush, 1, rowBuffer.length, 10).setValues(rowBuffer);
          rowBuffer = [];
        }
        props.setProperty('discoverPageOffset', pageOffset.toString());
        Logger.log('\n⏱ Time limit approaching. Found ' + newSendersCount + ' new senders this run.');
        Logger.log('➡ Run again to continue from offset ' + pageOffset + '.');
        return;
      }

      // Count total threads from this sender
      var count = 1;
      try {
        count = GmailApp.search('from:' + sender.email, 0, 500).length;
      } catch (err3) { /* keep count = 1 */ }

      // Detect Gmail category
      var gmailCategory = detectGmailCategory(sender.email);

      // Categorize using heuristic engine
      var result = categorizeSender(sender.email, sender.name, sender.domain, gmailCategory, domainToLabel);

      rowBuffer.push([
        sender.email, sender.name, sender.domain, count,
        gmailCategory, result.label, result.confidence,
        'Pending', '', today
      ]);
      newSendersCount++;
      existingEmails.add(sender.email);

      Logger.log('  ' + sender.email + ' → ' + result.label + ' (' + result.confidence + ')');

      // Flush buffer every 20 senders for safety
      if (rowBuffer.length >= 20) {
        var batchStart = sheet.getLastRow() + 1;
        sheet.getRange(batchStart, 1, rowBuffer.length, 10).setValues(rowBuffer);
        rowBuffer = [];
      }
    }

    pageOffset += threads.length;
  }

  // Flush remaining buffer
  if (rowBuffer.length > 0) {
    var finalFlush = sheet.getLastRow() + 1;
    sheet.getRange(finalFlush, 1, rowBuffer.length, 10).setValues(rowBuffer);
  }

  // Sort all data rows by Count (column 4) descending
  var finalLastRow = sheet.getLastRow();
  if (finalLastRow > 1) {
    sheet.getRange(2, 1, finalLastRow - 1, 10).sort({ column: 4, ascending: false });
  }

  // Clear saved progress
  props.deleteProperty('discoverPageOffset');
  Logger.log('\n✅ DISCOVERY COMPLETE. Found ' + newSendersCount + ' new senders.');
  Logger.log('Review suggestions at: ' + spreadsheet.getUrl());
}

/**
 * Reads "Approved" rows from the dashboard, creates labels, and applies them
 * to matching Gmail threads. Updates status to "Applied" when done.
 *
 * Resumable: run repeatedly until the log shows "ALL APPROVED PROCESSED".
 */
function applyApprovedLabels() {
  var startTime = Date.now();

  Logger.log('=== Applying Approved Labels ===');

  var dashboard = getOrCreateDashboard();
  var sheet = dashboard.sheet;
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    Logger.log('No senders in dashboard.');
    return;
  }

  var data = sheet.getRange(2, 1, lastRow - 1, 10).getValues();
  var applied = 0;
  var skipped = 0;

  for (var i = 0; i < data.length; i++) {
    if (Date.now() - startTime > MAX_RUNTIME_MS) {
      Logger.log('\n⏱ Time limit. Applied ' + applied + ' labels so far.');
      Logger.log('➡ Run again to continue.');
      return;
    }

    var status = data[i][7];
    if (status !== 'Approved') {
      if (status === 'Pending') skipped++;
      continue;
    }

    var email = data[i][0];
    var approvedLabel = (data[i][8] || '').toString().trim();
    var suggestedLabel = (data[i][5] || '').toString().trim();
    var labelName = approvedLabel || suggestedLabel;

    if (!labelName || labelName === 'Uncategorized') {
      Logger.log('  Skipping ' + email + ': no valid label');
      continue;
    }

    // Create label (and parent) if needed
    createLabelIfNotExists(labelName);
    var label = GmailApp.getUserLabelByName(labelName);
    if (!label) {
      Logger.log('  Failed to create/get label: ' + labelName);
      continue;
    }

    // Apply label to all threads from this sender
    try {
      var threads = GmailApp.search('from:' + email, 0, 500);
      if (threads.length > 0) {
        for (var j = 0; j < threads.length; j += 100) {
          label.addToThreads(threads.slice(j, j + 100));
        }
        Logger.log('  ' + labelName + ' ← ' + email + ' (' + threads.length + ' threads)');
      }
    } catch (err) {
      Logger.log('  Error for ' + email + ': ' + err.message);
      continue;
    }

    // Update status in sheet
    sheet.getRange(i + 2, 8).setValue('Applied');
    applied++;
  }

  Logger.log('\n✅ ALL APPROVED PROCESSED.');
  Logger.log('Applied: ' + applied + ', Still pending: ' + skipped);
}

// --- Utility Functions ---

/**
 * Clears discovery progress so the next run scans from the beginning.
 * The dashboard sheet and its data are preserved.
 */
function resetDiscoveryProgress() {
  var props = PropertiesService.getScriptProperties();
  props.deleteProperty('discoverPageOffset');
  Logger.log('Discovery progress reset. Next run starts from the beginning.');
  Logger.log('Note: Dashboard sheet and its data are preserved.');
}

/**
 * Optional: Sets up automatic triggers for discovery and label application.
 *   - Discovery: weekly on Sunday at 2 AM
 *   - Apply approved: daily at 3 AM
 */
function setupSmartTriggers() {
  // Remove existing smart triggers
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    var fn = triggers[i].getHandlerFunction();
    if (fn === 'discoverAndCategorizeSenders' || fn === 'applyApprovedLabels') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  // Weekly discovery (Sundays at 2 AM)
  ScriptApp.newTrigger('discoverAndCategorizeSenders')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.SUNDAY)
    .atHour(2)
    .create();

  // Daily apply (every day at 3 AM)
  ScriptApp.newTrigger('applyApprovedLabels')
    .timeBased()
    .everyDays(1)
    .atHour(3)
    .create();

  Logger.log('Smart triggers configured:');
  Logger.log('  - Discovery: weekly on Sunday at 2 AM');
  Logger.log('  - Apply approved: daily at 3 AM');
}
