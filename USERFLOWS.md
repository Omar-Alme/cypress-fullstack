# AI Daily Reflection Journal – User Flows

This document contains the planned user flows for the application.  
Each flow has two parts:  
1. **User Story** (from the user’s perspective).  
2. **Steps** (for Cypress test planning).  

---

## User Flow 1 – Emma logs her day

**Story**  
Emma visits the homepage in the evening to reflect on her day. She selects a rating of 4 out of 5 and writes: *“Today was a good day, I went for a long walk and finished my school project.”* She clicks **Save**. After a moment, an AI-generated summary, mood label, and tip for tomorrow appear. She then visits the history page and sees that today’s reflection is listed at the top.  

**Steps**  
- User opens homepage  
- Selects rating (4)  
- Writes reflection text (≥10 chars)  
- Clicks **Save**  
- System saves entry to DB  
- AI generates summary, mood, tip  
- Entry appears at top of history page  

---

## User Flow 2 – Johan forgets to write text

**Story**  
Johan opens the app and wants to quickly log his mood. He selects a rating of 3 but forgets to type anything in the text field. When he clicks **Save**, the system shows an error message: *“Reflection is too short.”* Nothing is added to the history.  

**Steps**  
- User opens homepage  
- Selects rating (3)  
- Leaves text empty  
- Clicks **Save**  
- System shows error: *“Reflection is too short”*  
- No entry saved to history  

---

## User Flow 3 – Sara experiences an AI failure

**Story**  
Sara writes a reflection about her stressful day and presses **Save**. The entry is successfully saved in the database, but the AI service is temporarily unavailable. On the history page, she sees her entry without the AI summary, mood, or tip, and the system shows a message: *“AI service is currently unavailable.”*  

**Steps**  
- User opens homepage  
- Selects rating (2)  
- Writes reflection text  
- Clicks **Save**  
- DB saves entry  
- AI call fails  
- Entry shown in history without AI fields  
- System shows message: *“AI service is currently unavailable”*  

---

## User Flow 4 – Ali reviews his week

**Story**  
Ali visits the history page to look back on his past week. He sees a list of his reflections, each with date, rating, text, AI summary, mood, and tip. He notices that his mood ratings have improved toward the end of the week.  

**Steps**  
- User opens history page  
- System fetches entries from DB  
- Entries are listed with date, rating, text, AI fields (if available)  
- User can review past reflections and trends  

---
