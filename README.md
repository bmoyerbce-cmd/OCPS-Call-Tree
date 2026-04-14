# OCPS Agent Call Tree

An interactive, browser-based call routing tool for Orange County Public Schools (OCPS) agents handling inbound inquiries. Agents follow a visual decision tree to quickly identify and route callers to the correct OCPS department.

---

## ✅ Completed Features

### Navigation
- **Multi-level call tree** — 10 top-level categories, each branching 2–3 levels deep
- **Clickable option cards** with icons, descriptions, and directional cues
- **Breadcrumb trail** — shows the current path; each step is clickable to go back
- **Progress bar** — animates from "Step 1" to "Routed ✓" in green when a result is reached
- **Start Over / Go Back** buttons for quick reset or one-step backward

### Result Pages
- **Department Result Card** — department name, description, contact list, keyword tags, and "See Also" related departments
- **Contacts** — shows named contacts (with titles), phone numbers, and direct department website links
- **Related department chips** — clickable to jump to a related department result

### Search
- **Floating Action Button (FAB)** — opens a full-screen search overlay
- **Live department search** — filters 50+ departments by name, description, tags, or keywords instantly
- **Full department list** shown by default (alphabetical) when no query is typed
- Search result click routes directly to the result card

### Design
- OCPS blue & gold brand palette
- Responsive grid — collapses to single column on mobile
- Google Fonts (Inter), Font Awesome icons
- Smooth card hover animations and fade/slide transitions

---

## 📁 File Structure

```
index.html          Main entry point
css/
  style.css         All styles (tokens, layout, components)
js/
  data.js           Full call tree data + search index builder
  app.js            Navigation, rendering, breadcrumb, search logic
README.md
```

---

## 🗂️ Entry Point

| Path | Description |
|------|-------------|
| `index.html` | Single-page call tree app |

---

## 🌳 Department Categories Covered

| # | Category | Departments |
|---|----------|------------|
| 1 | Students & Enrollment | Student Enrollment, School Choice, Records & Forms, Student Services, Homeless Education, Migrant Education |
| 2 | Special Populations & Language | ESE, Multilingual/ESOL, Translation, Early Childhood/VPK, Access & Opportunity |
| 3 | Academics & Curriculum | Curriculum & Digital Learning, Assessment, CTE, Athletics, Accountability, Strategic Improvement |
| 4 | Health, Safety & Security | District Police, Safety & Emergency Management, School Health Services, Environmental Compliance, Risk Management |
| 5 | Human Resources & Employment | Human Resources, Recruitment & Evaluation, Professional Standards, Retirement Services, Leadership Development |
| 6 | Finance & Business | Accounts Payable, Budget, Finance, Procurement, Grants, Internal Audit |
| 7 | Facilities, Operations & Transportation | Facilities, Transportation, Food & Nutrition, Real Estate Management |
| 8 | Technology & Information Systems | IT Services, Research, Research Measurement & Strategy |
| 9 | Community, Communications & Legal | Media Relations, Communications, Community Outreach, Family Engagement, Legal Services, EEO/Title IX/ADA/504, School Board Services, Government Relations, Foundation for OCPS |
| 10 | Federal Programs & Funding | Federal Programs (Title I), Evaluation Systems |

---

## 🔧 Data Model

All data lives in `js/data.js` as a nested JavaScript object tree:

```js
{
  id: 'string',          // unique node identifier
  label: 'string',       // display name
  desc: 'string',        // short description (shown on card)
  icon: 'fa-icon-name',  // Font Awesome class
  accent: '#hex',        // card accent color
  iconBg: '#hex',
  iconColor: '#hex',
  // Either:
  children: [ ...nodes ],  // if navigable
  // OR:
  result: {
    department: 'string',
    description: 'string',
    contacts: [{ role, info, type, url? }],
    tags: ['string'],
    relatedDepts: ['string']
  }
}
```

---

## 🔄 Features Not Yet Implemented

- **Live OCPS data sync** — contacts are static; no API integration with OCPS directory
- **Call logging / analytics** — no tracking of which departments are most frequently routed to
- **Agent notes** — no free-text field to attach notes to a routing decision
- **Print / export** — no one-click print of a result card
- **Keyboard navigation** — full arrow-key navigation through cards not implemented

## 🚀 Recommended Next Steps

1. Add agent call notes field on the result card
2. Track routing analytics via the Table API to identify top-called departments
3. Add "Escalation" path — link to supervisor contacts at each department
4. Connect phone numbers to `tel:` links for click-to-call on mobile devices
5. Add a "Favorites" feature for agents to bookmark frequently-used departments
