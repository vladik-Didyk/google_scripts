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
