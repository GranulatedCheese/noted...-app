# Noted
Noted is an AI-powered web-based note-taking application targeted toward students. It can take handwritten notes and transform them into stylized documents, and users can easily share notes among peers in their groups or classes. Noted is still in early development and will take time as I am the sole developer of the project.

### Project Purpose

When I first began college, I noticed many students using laptops and drawing tablets to take notes. I wondered, "What if an app could turn those notes into text documents, like Microsoft Word or Google Docs?" Furthermore, "What if those notes could be easily shared with other students in my class or groups?" I looked around online to see if somebody had already made this, and from what I found, an all-in-one app did not exist. I found some that did each function separately, but they usually fell short somehow. So, I took it upon myself to set out and build this application.

### Project Goals

- User Authentication
    * Users can signup/signin to accounts.
    * In the user's account, data such as the groups, classes, and school their in will be saved.
    * Securely stores user's notes.
- User Groups
    * User's can create custom groups for clubs or organizations.
    * Notes from users in the groups can be shared with other users in the respective groups.
- School-Based Classes
    * Similar to groups, classes will be based off real classes from existing library of schools
        * Example: CS50 *(Class)* at Harvard University *(School)*
    * Notes will be shared from the students within the classes.
- AI-OCR
    * Custom AI-OCR model to detect handwritten text.
    * Will have the ability to detect handwritten stylization, such as underlining, bolding, and line breaks, and implement them into a text-document format like Google Docs.
- Cloud Based Notes
    * Notes will be stored in the cloud for quick read and write.

### Features

- Light/dark mode toggle
- Cross platform
    * Will be a multiplatform program
        *IOS App, Android APP, etc...
- Offline mode
    * Can write and access locally cached notes without internet.
    * When connection is found again, AI will act upon any offline notes.

### Tech Stack

**Client:** 
- React *(TypeScript)* and TailwindCSS

**Server:** 
- FastAPI *(Python)* and PyTorch *(for now)*

**Database:** 
- PostGreSQL *(development)*



