# Gmail Vacation Assistant

## Project Summary

- Gmail Vacation Assistant is a Node.js application designed to automatically respond to your Gmail emails while you're on vacation.
- It monitors your Gmail inbox, identifies unread emails, and sends automated responses, ensuring your contacts are informed even when you're away.

## Objective of Problem Statement

The project aimed to address the challenge of managing emails during a user's vacation.

**The key objectives were:**

- **Automated Vacation Responses:** Create a solution that can automatically send vacation response emails to incoming messages.

- **Label and Organization:** Develop a system to categorize vacation-related emails with a dedicated label for efficient organization.

## Tech Stack

- **Node.js**
- **Express.js**
- **Gmail API**
- **Google Cloud Platform** (for API credentials)

## npm dependencies

| Dependency                 | Version  | Purpose                                                                                      |
| -------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| `@google-cloud/local-auth` | ^3.0.0   | Used for authenticating the application with the Gmail API.                                  |
| `colors`                   | ^1.4.0   | Provides color formatting for console output to improve readability.                         |
| `dotenv`                   | ^16.3.1  | Enables loading environment variables from a `.env` file for configuration.                  |
| `express`                  | ^4.18.2  | A web framework used to create an HTTP server for API endpoints and routing.                 |
| `fs.promises`              | ^0.1.2   | A module for asynchronous file system operations, such as reading the Gmail API credentials. |
| `googleapis`               | ^128.0.0 | The core library for working with various Google APIs, including the Gmail API.              |

These dependencies are essential for various functionalities of the AutoResponderMailBot application.

## Design and User Interface

- AutoResponderMailBot primarily operates as a backend service, and it does not have a graphical user interface (GUI).
- It is designed to run as a server and interact with the Gmail API programmatically.
- Users can configure the service through environment variables in the `.env` file.

## Functionality and Features

The key functionalities and features of AutoResponderMailBot include:

1. **Authentication with Gmail API:**

   - The application authenticates itself with the Gmail API using user-provided credentials. This ensures it has access to the Gmail account.

2. **Label Creation:**

   - The system creates a designated Gmail label (e.g., "Vacation-Mails") to organize and identify vacation-related emails.

3. **Labeling and Categorization:**

   - Unread emails in the inbox are identified based on specific criteria, such as not being from the user (to exclude sent messages) and not already having user-defined labels.
   - AutoResponderMailBot adds the "Vacation-Mails" label to these emails.

4. **Automated Replies:**

   - The application sends automated vacation response emails to the identified messages.
   - The reply includes a message informing the sender of the user's vacation status and providing alternative contact information.

5. **Randomized Response Interval:**
   - To mimic a more natural response pattern, the application introduces a random delay (between 45 and 120 seconds) before processing each email, preventing immediate, simultaneous responses.

AutoResponderMailBot is designed to help users maintain professional communication while on vacation and ensure that their contacts receive timely notifications about their unavailability.

### Extensions Used

- `JavaScript (ES6) code snippets`
- `Better Comments`

### Links Used

- https://console.cloud.google.com/
- https://developers.google.com/oauthplayground/
