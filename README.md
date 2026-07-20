# Automated Gmail Management System

A serverless workflow automation tool built using Google Apps Script to dynamically categorize and label priority emails based on spreadsheet configurations.

## Features
- **Dynamic Integration:** Automatically detects and binds to the active spreadsheet ID without hardcoded configurations.
- **Automated Workflow:** Utilizes time-based triggers to execute background syncs on an hourly schedule.
- **Robust Error Handling:** Employs `try-catch` structures and exception-handling logic to ensure uninterrupted execution.
- **Custom Filtering:** Builds real-time search queries dynamically using user-defined criteria from a Google Sheets interface.

## Tech Stack
- Google Apps Script (JavaScript)
- Gmail API
- Google Sheets API
