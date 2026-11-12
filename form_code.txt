function createVideoEditorOnboardingForm() {
  var form = FormApp.create("4Students - Video Editor Official Onboarding");

  form.setDescription([
    "Official Onboarding & Verification Form for Selected Video Editors at 4Students.",
    "Platform: https://4students.in | Contact: 4studentshub@gmail.com",
    "",
    "Congratulations on being selected! Please fill out all accurate details below to complete your onboarding, identity verification, and payout setup."
  ].join("\n"));

  try {
    form.setCollectEmail(true);
  } catch (e) {}

  form.setAllowResponseEdits(true);
  form.setShowLinkToRespondAgain(false);
  form.setConfirmationMessage(
    "Thank you for submitting your onboarding details! Your profile and payout info have been registered. The 4Students team will reach out via WhatsApp with your first batch of raw footage and briefs."
  );

  // Section 1: Personal & Contact Information
  form.addSectionHeaderItem()
    .setTitle("Section 1: Personal & Contact Information")
    .setHelpText("Please provide your official legal and contact information.");

  form.addTextItem()
    .setTitle("Full Name (as per Official ID)")
    .setHelpText("Enter your first name and surname")
    .setRequired(true);

  form.addTextItem()
    .setTitle("Personal Email Address")
    .setHelpText("Active email address where you will receive project briefs")
    .setRequired(true);

  form.addTextItem()
    .setTitle("WhatsApp / Contact Number")
    .setHelpText("10-digit mobile number for team communication and project coordination")
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle("Current Residential Address")
    .setHelpText("House/Flat No., Street/Area, City, State & PIN Code")
    .setRequired(true);

  form.addTextItem()
    .setTitle("Recent Passport-size Photograph")
    .setHelpText("Form Admin: Change question type to File upload in editor (or respondent can provide a Drive link).")
    .setRequired(true);

  // Section 2: College & Academic Verification
  form.addPageBreakItem()
    .setTitle("Section 2: College & Academic Details")
    .setHelpText("Details to verify your current student enrollment.");

  form.addTextItem()
    .setTitle("College / University / Institute Name")
    .setHelpText("Full official name of your college or university")
    .setRequired(true);

  form.addTextItem()
    .setTitle("Degree / Course & Department")
    .setHelpText("e.g., B.Tech Computer Engineering, BBA, B.Des, BCA, etc.")
    .setRequired(true);

  var yearItem = form.addMultipleChoiceItem();
  yearItem.setTitle("Current Academic Year")
    .setChoiceValues([
      "1st Year",
      "2nd Year",
      "3rd Year",
      "4th Year / Final Year",
      "Postgraduate (Master's / MBA / etc.)"
    ])
    .setRequired(true);

  form.addTextItem()
    .setTitle("College Student ID Card Photo")
    .setHelpText("Form Admin: Change question type to File upload in editor (or respondent can provide a Drive link).")
    .setRequired(true);

  // Section 3: Editing Software & Tools
  form.addPageBreakItem()
    .setTitle("Section 3: Editing Software")
    .setHelpText("Select the software tools you use for video editing.");

  var softwareItem = form.addCheckboxItem();
  softwareItem.setTitle("Editing Software You Use")
    .setChoiceValues([
      "Adobe Premiere Pro",
      "Adobe After Effects",
      "DaVinci Resolve",
      "CapCut / CapCut Desktop",
      "Final Cut Pro (FCPX)",
      "Canva"
    ])
    .showOtherOption(true)
    .setRequired(true);

  // Section 4: Terms of Engagement, Workload & Payment Details
  form.addPageBreakItem()
    .setTitle("Section 4: Terms of Engagement & Payout Details")
    .setHelpText([
      "PLEASE READ THE OFFICIAL TERMS CAREFULLY:",
      "",
      "1. COMPENSATION / RATE: You will be paid Rs 150 per approved reel/short video.",
      "2. WORKLOAD & VOLUME: Estimated volume is approximately 15 to 20 reels per month (may vary; can be fewer based on project requirements).",
      "3. TURNAROUND TIME & REVISIONS: Edits must be delivered within agreed deadlines (typically 24 to 48 hours), including requested revisions.",
      "4. QUALITY & BRAND GUIDELINES: Reels must adhere to 4Students brand colors, accurate captions, and audio sync.",
      "5. CONFIDENTIALITY & OWNERSHIP: All raw footage, audio, scripts, and finished videos are exclusive property of 4Students and must not be shared externally without permission.",
      "6. PAYOUT METHOD: Disbursed directly via UPI based on approved reels."
    ].join("\n"));

  form.addTextItem()
    .setTitle("UPI ID for Payouts / Stipend")
    .setHelpText("Enter your active UPI ID (e.g., name@okaxis, yourphone@paytm, or username@upi)")
    .setRequired(true);

  var agreementItem = form.addCheckboxItem();
  agreementItem.setTitle("Agreement to Terms & Conditions")
    .setChoiceValues([
      "I have read, understood, and accept the payment rate of Rs 150 per approved reel, the expected monthly volume (15-20 reels, or fewer as assigned), and agree to comply with all turnaround time, quality revision, and confidentiality guidelines."
    ])
    .setRequired(true);

  // Automatic Linking to Google Sheet
  var sheet = SpreadsheetApp.create("4Students - Video Editor Responses (Master Sheet)");
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  Logger.log("=================================================");
  Logger.log("FORM EDIT URL: " + form.getEditUrl());
  Logger.log("PUBLIC SHARE LINK: " + form.getPublishedUrl());
  Logger.log("LINKED SPREADSHEET: " + sheet.getUrl());
  Logger.log("=================================================");
}
