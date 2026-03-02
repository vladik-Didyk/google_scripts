# Gmail Label Organizer

A Google Apps Script that automatically creates Gmail labels and organizes your inbox by sender. It categorizes messages into nested label groups (Jobs, Finance, Dev, Shopping, etc.) and applies them to existing messages.

## Features

- **Auto-categorization** — Maps 149+ senders to 68 nested labels across 20 categories
- **Resumable execution** — Saves progress and resumes from where it left off (works around Google's 6-minute execution limit)
- **Auto-labeling trigger** — Optional scheduled trigger to label new messages every 6 hours
- **Undo support** — Remove all created labels with one function call
- **Safe to re-run** — Skips already-created labels, picks up where it left off

## Label Categories

| Category | Sub-labels | Example Senders |
|----------|-----------|-----------------|
| **Jobs** | LinkedIn, Indeed, AllJobs, Other | jobalerts-noreply@linkedin.com |
| **Finance** | RBC, CIBC, Wealthsimple, Borrowell, ClearScore, PayPal, Amex, Interac, Stripe Invoices, Trading | catch@payments.interac.ca |
| **Dev** | GitHub, Anthropic, PostHog, Sentry, Render, Heroku, Cursor, Other Tools | notifications@github.com |
| **Google** | Account, Cloud, Flights, AI, Payments | no-reply@accounts.google.com |
| **Shopping** | Costco, Walmart, FreshCo, Shoppers, Temu, PC Optimum, Scene+, Nespresso, Other | CostcoNews@digital.costco.ca |
| **Social** | LinkedIn, Discord | noreply@discord.com |
| **Lodge** | Official, Chapters, Members | bonim.hazmana@freemasonry.org.il |
| **Government** | Ukraine, Canada | gc_cat@mfa.gov.ua |
| **Services** | 416Skin, Body In Tune, Gett, Cineplex, NordVPN, Mr. Lube, Sonnet Insurance, August Home, Other | 416skin@gmail.com |
| **Education** | Coursera, Duolingo, Robert Kennedy College, SmallTalk | Coursera@m.learn.coursera.org |
| **Newsletters** | Chris Koerner, Fortune 500, TED, Quora, Other | fortune@mail.fortune.com |
| **Real Estate** | TRREB, Redfin | TRREB@canadacentralmatrixmail.com |
| **File Sharing** | Smash | noreply@fromsmash.com |
| **Domains** | Namecheap | hello@namecheap.com |
| **Parking** | GreenP | donotreply@greenp.com |
| **Personal** | — | mezlinha@gmail.com |
| **Suppliers** | Rio Tinto | noreply@localsuppliersportal.com |

## Setup

### 1. Create the Script

1. Go to [script.google.com](https://script.google.com)
2. Click **New Project**
3. Rename the project to **"Gmail Label Organizer"**
4. Delete the default code
5. Copy-paste the contents of `Code.gs`
6. Click **Save** (Ctrl+S / Cmd+S)

### 2. Run It

1. Select **`createLabelsAndApply`** from the function dropdown at the top
2. Click the **Run** button (▶)
3. On first run, click **Review permissions** → select your Google account → **Allow**
4. Monitor progress in **View > Execution log**

### 3. Handle Timeouts

Google Apps Script has a **6-minute execution limit**. The script automatically:
- Saves progress before the 5-minute mark
- Logs where it stopped and how many threads were labeled
- Resumes from the exact same point on the next run

**If it times out:** just click **Run** again. Repeat until the log shows:
```
✅ ALL DONE! Applied labels to X total threads.
```

## Available Functions

| Function | How to Use | Description |
|----------|-----------|-------------|
| `createLabelsAndApply` | **Run this first** | Creates all labels and applies them to existing messages. Saves progress and resumes automatically. |
| `setupDailyTrigger` | Run once (optional) | Sets up automatic labeling of new messages every 6 hours. |
| `labelRecentMessages` | Called by trigger | Labels messages from the last 24 hours. No need to run manually. |
| `resetProgress` | Run if needed | Clears saved progress so the next run starts from the beginning. |
| `removeAllCreatedLabels` | Run to undo | Deletes all labels created by this script. |

## Customization

### Adding a New Sender

Add the sender's email to an existing category in the `LABEL_MAP` object:

```javascript
"Shopping/Costco": [
    "CostcoNews@digital.costco.ca",
    "new-sender@example.com",       // ← add here
],
```

### Adding a New Category

Add a new key to the `LABEL_MAP` object:

```javascript
"Travel/Airbnb": [
    "discover@airbnb.com",
],
```

Nested labels use `/` as a separator. `"Travel/Airbnb"` creates a parent label **Travel** with a child label **Airbnb**.

### After Making Changes

1. Run `resetProgress()` to clear saved state
2. Run `createLabelsAndApply()` to process everything with the new config

## How It Works

### How the Label Map Was Generated

The `LABEL_MAP` was not created manually from scratch — it was generated with the help of Claude Code:

1. **Inbox Scan** — Used the Gmail MCP connection to fetch the 500 most recent messages and extract `From` headers from each one.
2. **Sender Analysis** — Ran a Python script to count messages per sender, finding **149 unique senders**.
3. **Categorization** — Senders were grouped into logical categories based on their names and domains (e.g., `@linkedin.com` → Jobs, `@github.com` → Dev, `@costco.ca` → Shopping).
4. **Hardcoded Map** — The result became the static `LABEL_MAP` dictionary in the script.

### What the Script Does at Runtime

1. **Label Creation** — Iterates through `LABEL_MAP` keys. For nested labels like `"Jobs/LinkedIn"`, creates the parent `"Jobs"` first, then the child. Skips labels that already exist.

2. **Message Labeling** — For each sender email, runs a Gmail search (`from:sender@example.com`), retrieves up to 500 matching threads, and applies the corresponding label in batches of 100.

3. **Progress Tracking** — Uses `PropertiesService.getScriptProperties()` to persist the current label index, sender index, and total threads labeled across executions.

4. **Auto-labeling** (optional) — A time-based trigger runs `labelRecentMessages()` every 6 hours, searching only for messages from the last 24 hours.

### Limitations

- The script does **not** use AI or content analysis at runtime
- It does **not** auto-detect new senders
- It only labels emails from the **149 senders** that were found during the initial scan
- New senders must be manually added to `LABEL_MAP` (see [Customization](#customization))

## Smart Categorization (Auto-Discovery)

The static `LABEL_MAP` covers known senders, but new senders are ignored. The **Smart Categorization** feature auto-discovers unknown senders, suggests labels using domain heuristics, and lets you review everything in a Google Sheet before applying.

### How It Works

1. **Scans your inbox** for senders not in `LABEL_MAP`
2. **Categorizes each sender** using a priority-ordered heuristic engine:

| Priority | Rule | Confidence | Example |
|----------|------|------------|---------|
| 1 | Domain affinity — sender's domain matches one in LABEL_MAP | High | `news@github.com` → `Dev/GitHub` |
| 2 | TLD rules — `.gov.ca` → Government/Canada, `.edu` → Education | High | `info@uoft.edu` → `Education/Other` |
| 3 | Domain keywords — domain contains "bank", "shop", "job", etc. | Medium | `promo@bestbuyshop.com` → `Shopping/Other` |
| 4 | Sender name keywords — display name contains category keywords | Medium | `"PayPal Security" <x@y.com>` → `Finance/Other` |
| 5 | Gmail category fallback — uses `category:promotions` search | Low | PROMOTIONS → `Shopping/Other` |
| 6 | Default | Low | → `Uncategorized` |

3. **Writes results to a Google Sheet** with columns: Sender Email, Sender Name, Domain, Count, Gmail Category, Suggested Label, Confidence, Status, Approved Label, Date Added
4. You **review and approve/reject** in the Sheet, then run the apply function

### Google Sheet Dashboard

The dashboard is auto-created on first run. Key features:

- **Status dropdown**: Pending (yellow), Approved (green), Rejected (red), Applied (blue)
- **Approved Label column**: override the suggestion with a custom label
- **Sorted by message count** (highest-traffic senders first)
- **Conditional formatting** for quick visual scanning

### Workflow

```
1. Run discoverAndCategorizeSenders()    → repeat until "DISCOVERY COMPLETE"
   (the Sheet URL is printed in the execution log)

2. Open Sheet → review suggestions → set Status = "Approved" or "Rejected"
   (optionally type a custom label in the "Approved Label" column)

3. Run applyApprovedLabels()             → repeat until "ALL APPROVED PROCESSED"
```

### Smart Categorization Functions

| Function | How to Use | Description |
|----------|-----------|-------------|
| `discoverAndCategorizeSenders` | **Run this first** | Scans inbox for unknown senders, categorizes them, writes to Google Sheet. Resumable. |
| `applyApprovedLabels` | Run after reviewing Sheet | Creates labels and applies them to Gmail threads for "Approved" rows. Resumable. |
| `resetDiscoveryProgress` | Run if needed | Clears scan progress (Sheet data is preserved). |
| `setupSmartTriggers` | Run once (optional) | Weekly discovery (Sunday 2 AM) + daily apply (3 AM). |

### Notes

- **No external APIs** — pure domain heuristic rules, no API keys needed
- **New OAuth scope** — `spreadsheets` is required (you'll re-authorize on first run)
- **Resumable** — same 5-minute safety cutoff as the original functions
- **Idempotent** — skips senders already in the Sheet or LABEL_MAP
- **Non-destructive** — zero modifications to existing `LABEL_MAP` or functions

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Exceeded maximum execution time" | Normal — just click Run again, it resumes automatically |
| "Authorization required" | Click Review permissions → Allow |
| Labels created but no messages labeled | Check sender emails match exactly (case-insensitive) |
| Want to start over completely | Run `removeAllCreatedLabels()`, then `resetProgress()`, then `createLabelsAndApply()` |
| Script seems stuck (no log output) | It's processing senders with 0 matches — they produce no output. Wait for it to finish or timeout. |

## Technical Notes

- **Google Apps Script limit**: 6 minutes per execution (free accounts)
- **Gmail search limit**: 500 threads per query
- **Batch size**: 100 threads per `addToThreads()` call
- **Safety cutoff**: Script stops at 5 minutes to save progress before the hard limit
- **Storage**: Progress is saved in Script Properties (persists across runs)
