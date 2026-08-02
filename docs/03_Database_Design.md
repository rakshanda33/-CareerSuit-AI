# Database Design

CareerSuit AI uses **PostgreSQL** as its primary database to store user information, resumes, AI analysis results, and application history.

## Database Entities

### User

Stores user account information.

Attributes:
- User ID
- Name
- Email
- Password
- Created At

---

### Resume

Stores uploaded resumes.

Attributes:
- Resume ID
- User ID
- File Name
- File Path
- Uploaded At

---

### Resume Analysis

Stores AI-generated analysis results.

Attributes:
- Analysis ID
- Resume ID
- Resume Score
- ATS Score
- Strengths
- Weaknesses
- Suggestions
- Created At

---

### Cover Letter

Stores generated cover letters.

Attributes:
- Cover Letter ID
- Resume ID
- Job Title
- Company
- Content
- Created At

---

## Entity Relationship

User
│
├── Resume
│
├── Resume Analysis
│
└── Cover Letter