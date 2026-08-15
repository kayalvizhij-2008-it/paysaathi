# PaySaathi

## Worker-First Salary Verification & Salary Intelligence Platform

PaySaathi is a worker-first web platform that helps users understand their expected salary, analyse payslips, compare expected and received pay, identify potential discrepancies, and maintain a portable digital salary history.

The platform combines salary calculation, document analysis, salary verification, worker profiles, and a digital Salary Passport into a single user-focused experience.

---

## Overview

Salary information is often distributed across payslips, job records, working hours, overtime, shift information, and deductions.

PaySaathi provides a unified workflow for understanding this information.

The platform supports two primary use cases:

### Before Receiving Salary

A user can enter their:

- Job role
- Location
- Working days
- Working hours
- Overtime
- Night-shift information

The system calculates an indicative expected salary based on the provided work conditions.

### After Receiving Salary

A user can upload a payslip and review:

- Basic salary
- Overtime
- Allowances
- Deductions
- Net salary
- Expected salary
- Actual salary
- Potential discrepancies

The resulting record can be saved into the user's Salary Passport.

---

# Key Features

## Expected Salary Calculator

Users can provide work-related information and receive an indicative salary estimate.

### Inputs

- Worker type
- Location
- Working days
- Working hours
- Overtime
- Night shifts

### Output

The platform provides an estimated expected-pay value based on the configured calculation logic.

---

## Payslip Upload & Analysis

Users can upload salary documents in common formats:

- PDF
- PNG
- JPG
- JPEG

The upload interface supports file selection and drag-and-drop interactions.

The analysis workflow is designed to extract structured salary information from uploaded documents.

---

## Salary Breakdown

PaySaathi organizes salary information into understandable components.

```text
Basic Pay
+ Overtime
+ Allowances
- Deductions
----------------
Net Pay
````

This makes it easier to understand how the final salary amount is composed.

---

## Expected vs Actual Salary

The platform compares the user's expected salary information with the salary represented in the uploaded payslip.

Example:

```text
Expected Pay       ₹XX,XXX
Actual Pay         ₹XX,XXX
Difference         ₹X,XXX
```

The system can highlight potential discrepancies that require further review.

---

## Overtime & Shift Analysis

Work conditions can be included in the salary analysis.

Supported factors include:

* Working hours
* Working days
* Overtime
* Night shifts
* Shift-based work

This provides additional context when analysing salary information.

---

# Salary Passport

## Portable Salary History

The Salary Passport is a central feature of PaySaathi.

It allows users to maintain salary records across different jobs and locations.

A Salary Passport record can contain:

* Job role
* Employer information
* Location
* Salary
* Working conditions
* Overtime
* Payslip
* Verification status
* Pay period

Example:

```text
Job 1
   ↓
Salary Record
   ↓
Job 2
   ↓
Salary Record
   ↓
Job 3
   ↓
Salary Record
```

This creates a continuous salary history instead of treating each payslip as an isolated document.

---

# Worker Profiles

The platform supports salary workflows for different categories of workers.

Examples include:

* Construction workers
* Security workers
* Factory workers
* Gig and delivery workers
* Service workers

Worker-specific information can be used to adapt the salary calculation and verification workflow.

---

# Dashboard

The dashboard provides a centralized view of salary information.

It can display:

* Expected salary
* Actual salary
* Overtime
* Verification status
* Recent payslips
* Salary history
* Potential discrepancies
* Salary Passport records

The dashboard acts as the user's primary salary information center.

---

# Multilingual Support

PaySaathi is designed with multilingual accessibility in mind.

The interface can support multiple languages, including:

* English
* Tamil
* Hindi

The architecture can be extended to additional regional languages.

---

# Voice Accessibility

Important salary information can be converted into speech using the browser's Web Speech API.

This provides an alternative interaction method for users who prefer audio-based explanations.

Typical actions include:

* Play
* Pause
* Resume
* Stop

---

# Complaint Draft Generation

When a potential salary discrepancy is identified, PaySaathi can generate a structured complaint draft using the available salary information.

The generated content can be copied or exported for further review.

> Generated complaints are drafts and are not legal advice.

---

# Application Workflow

```text
                    PAYSAATHI
                        │
                        ▼
                Select Worker Type
                        │
                        ▼
                 Enter Work Data
                        │
                        ▼
                Calculate Expected Pay
                        │
                        ▼
                  Upload Payslip
                        │
                        ▼
                 Analyse Document
                        │
                        ▼
               Extract Salary Data
                        │
                        ▼
              Compare Salary Values
                        │
                        ▼
               Verification Result
                        │
              ┌─────────┴─────────┐
              ▼                   ▼
        Save Salary Record    Complaint Draft
              │
              ▼
         Salary Passport
              │
              ▼
           Dashboard
```

---

# Technical Architecture

```text
┌──────────────────────────────────────────┐
│              Presentation Layer          │
│       React / TypeScript / Next.js       │
└───────────────────┬──────────────────────┘
                    │
          ┌─────────┼─────────┐
          │         │         │
          ▼         ▼         ▼
      Salary     Payslip   Dashboard
      Module     Module      Module
          │         │         │
          ▼         ▼         ▼
      Work Data   Upload   Salary Records
          │         │         │
          └─────────┼─────────┘
                    ▼
             Analysis Layer
                    │
                    ▼
          Verification Logic
                    │
             ┌──────┴──────┐
             ▼             ▼
       Expected Pay    Actual Pay
             │             │
             └──────┬──────┘
                    ▼
             Salary Passport
                    │
                    ▼
              User History
```

---

# Technology Stack

## Frontend

* React
* TypeScript
* Next.js / Vite
* Tailwind CSS

## UI & Animation

* Framer Motion
* CSS animations
* CSS transforms
* SVG animations
* Responsive UI components

## Document Processing

* PDF file handling
* Image file handling
* OCR-ready processing architecture
* Structured salary extraction

## Browser APIs

* File API
* Web Speech API
* LocalStorage

## Development Tools

* Git
* GitHub
* npm
* Modern JavaScript / TypeScript tooling

---

# Technical Implementation

## Component-Based Architecture

The application is structured around reusable components for:

* Navigation
* Worker profiles
* Salary forms
* Salary cards
* File uploads
* Verification results
* Dashboard widgets
* Salary Passport records
* Interactive forms

This allows individual features to be developed and maintained independently.

---

## Client-Side Data Persistence

For the prototype environment, salary records can be persisted using browser-based storage.

This allows information created during the verification workflow to remain available across:

* Dashboard
* Salary Passport
* Verification history

A production version can replace this layer with a secure backend database.

---

## Responsive Interface

The application is designed for multiple screen sizes:

* Desktop
* Laptop
* Tablet
* Mobile

The interface adapts navigation, forms, cards, tables, and interactive elements according to viewport size.

---

## Motion & Interaction

Motion is used to communicate application state and improve usability.

Examples include:

* Page transitions
* Upload feedback
* Verification progress
* Salary number transitions
* Timeline animations
* Card interactions
* Hover states
* Dashboard transitions

Animations are designed to complement the user workflow rather than replace functionality.

---

# Project Structure

```text
paysaathi/
│
├── public/
│   ├── assets/
│   └── sample-data/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── sections/
│   ├── hooks/
│   ├── utils/
│   ├── data/
│   └── styles/
│
├── package.json
├── README.md
├── .gitignore
└── configuration files
```

---

# Installation

## Prerequisites

* Node.js 18+
* npm

Verify the installation:

```bash
node -v
npm -v
```

---

## Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/paysaathi.git
```

```bash
cd paysaathi
```

---

## Install Dependencies

```bash
npm install
```

---

## Start the Development Server

```bash
npm run dev
```

Open the local development URL displayed by the development server.

---

# Environment Variables

If external services are configured, create a local environment file:

```text
.env.local
```

Example:

```env
NEXT_PUBLIC_API_URL=your_api_url
```

Never commit sensitive credentials.

Do not upload:

```text
.env
.env.local
API keys
Secret tokens
Passwords
Private credentials
```

---

# Example Salary Verification

```text
Worker Type:
Security Worker

Location:
Tamil Nadu

Working Hours:
10 hours/day

Night Shift:
Enabled

Expected Pay:
₹XX,XXX

Actual Pay:
₹XX,XXX

Overtime:
₹X,XXX

Deductions:
₹X,XXX

Verification:
Potential discrepancy detected
```

The values above are illustrative.

---

# Data Flow

```text
User Input
    │
    ▼
Work Profile
    │
    ▼
Expected Salary Calculation
    │
    ▼
Payslip Upload
    │
    ▼
Document Processing
    │
    ▼
Salary Extraction
    │
    ▼
Verification
    │
    ▼
Result
    │
    ├───────────────┐
    ▼               ▼
Dashboard      Salary Passport
```

---

# Security Considerations

Salary and payslip information may contain sensitive financial and personal data.

A production implementation should include:

* Authentication
* Authorization
* Encryption at rest
* Encryption in transit
* Secure document storage
* Access control
* Data minimization
* Consent management
* User-controlled deletion
* Secure API endpoints
* Audit logging

The current implementation is a prototype and should not be used to process sensitive production data without appropriate security controls.

---

# Responsible Use

PaySaathi is designed to identify information that may require review.

A detected discrepancy does not automatically establish that an employer has violated a law or regulation.

Salary calculations depend on:

* User-provided information
* Configured rules
* Available salary data
* Document extraction accuracy

The platform should therefore be treated as an assistance and information tool rather than a definitive legal authority.

---

# Current Status

PaySaathi currently provides a functional prototype covering the core salary verification journey:

* Worker selection
* Worker-specific salary inputs
* Expected salary calculation
* Payslip upload
* Salary analysis workflow
* Expected vs actual salary comparison
* Overtime information
* Night-shift information
* Salary Passport
* Dashboard
* Multilingual interface
* Voice accessibility
* Complaint draft generation
* Responsive interface
* Interactive UI and animations

---

# Future Improvements

## Backend Integration

Introduce a production backend for:

* User authentication
* Secure salary records
* Document storage
* Cross-device synchronization

## OCR Improvements

Improve extraction accuracy for:

* Different payslip layouts
* Low-quality images
* Regional formats
* Scanned documents

## Verified Salary Rules

Integrate authoritative wage and statutory datasets with versioned rule management.

## Expanded Language Support

Extend the platform to additional Indian regional languages.

## Advanced Analytics

Provide salary trends and historical analysis while maintaining user privacy.

## Organization Dashboard

Develop dedicated workflows for organizations supporting workers.

---

# Project Objectives

PaySaathi focuses on four core objectives:

### 1. Understand

Make salary information easier to understand.

### 2. Verify

Help users compare expected and received salary information.

### 3. Preserve

Maintain salary records in one place.

### 4. Carry Forward

Allow users to build a continuous salary history across jobs.

---

# License

This project is currently maintained as a prototype.

Licensing terms can be defined as the project moves toward production.

```
```
