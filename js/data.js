/**
 * OCPS Call Tree Data
 * Organized as a tree: root -> category -> sub-category -> department result
 * Each node: { id, label, desc, icon, accent, iconBg, iconColor, children? | result? }
 */

const CALL_TREE = {
  id: 'root',
  label: 'Thank you for calling Orange County Public Schools, my name is ___ I\'ll be your operator today',
  subtitle: 'Select the category that best describes the caller\'s issue to route them to the correct OCPS department.',
  children: [

    // 1. STUDENTS & ENROLLMENT
    {
      id: 'students',
      label: 'Students & Enrollment',
      desc: 'Enrollment, school choice, records, student services',
      icon: 'fa-user-graduate',
      accent: '#0055c4',
      iconBg: '#e8f0fb',
      iconColor: '#0055c4',
      subOptions: [
        {
          label: 'Entering Kindergarten',
          desc: 'New Students Entering Kindergarten',
          url: 'https://ocps.net/student-enrollment-home'
        },
        {
          label: 'New Student',
          desc: 'Entering OCPS for the First Time',
          url: 'https://ocps.net/student-enrollment-home'
        },
        {
          label: 'Changing OCPS Schools',
          desc: 'Currently or Previously Enrolled Students',
          url: 'https://ocps.net/student-enrollment-home'
        },
        {
          label: 'School Choice Options',
          desc: 'Magnet, Charter, and Open Enrollment Programs',
          url: 'https://ocps.net/student-enrollment-home'
        }
      ],
      children: [
        // ...
      ]
    },

    // 2. SPECIAL POPULATIONS
    {
      id: 'special-populations',
      label: 'Special Populations & Language',
      desc: 'ESE, multilingual learners, early childhood',
      icon: 'fa-hands-helping',
      accent: '#7c3aed',
      iconBg: '#f3f0ff',
      iconColor: '#7c3aed',
      children: [
        // ...
      ]
    },

    // 3. ACADEMICS & CURRICULUM
    {
      id: 'academics',
      label: 'Academics & Curriculum',
      desc: 'Instruction, curriculum, testing, CTE, athletics',
      icon: 'fa-book-open',
      accent: '#1d4ed8',
      iconBg: '#eff6ff',
      iconColor: '#1d4ed8',
      children: [
        // ...
      ]
    },

    // 4. HEALTH & SAFETY
    {
      id: 'health-safety',
      label: 'Health, Safety & Security',
      desc: 'School safety, police, health services, emergencies',
      icon: 'fa-shield-alt',
      accent: '#dc2626',
      iconBg: '#fef2f2',
      iconColor: '#dc2626',
      children: [
        // ...
      ]
    },

    // 5. HUMAN RESOURCES & EMPLOYMENT
    {
      id: 'hr-employment',
      label: 'Human Resources & Employment',
      desc: 'Hiring, HR, payroll, retirement, professional standards',
      icon: 'fa-users-cog',
      accent: '#047857',
      iconBg: '#ecfdf5',
      iconColor: '#047857',
      children: [
        // ...
      ]
    },

    // 6. FINANCE & BUSINESS
    {
      id: 'finance-business',
      label: 'Finance & Business Operations',
      desc: 'Budget, payments, accounts payable, procurement',
      icon: 'fa-dollar-sign',
      accent: '#b45309',
      iconBg: '#fffbeb',
      iconColor: '#b45309',
      children: [
        // ...
      ]
    },

    // 7. FACILITIES, OPERATIONS & TRANSPORTATION
    {
      id: 'facilities-ops',
      label: 'Facilities, Operations & Transportation',
      desc: 'Buildings, maintenance, food, buses, real estate',
      icon: 'fa-building',
      accent: '#374151',
      iconBg: '#f3f4f6',
      iconColor: '#374151',
      children: [
        // ...
      ]
    },

    // 8. TECHNOLOGY & INFORMATION
    {
      id: 'technology',
      label: 'Technology & Information Systems',
      desc: 'IT support, systems, data, research',
      icon: 'fa-laptop-code',
      accent: '#0891b2',
      iconBg: '#ecfeff',
      iconColor: '#0891b2',
      children: [
        // ...
      ]
    },

    // 9. COMMUNITY, COMMUNICATIONS & LEGAL
    {
      id: 'community-comms',
      label: 'Community, Communications & Legal',
      desc: 'Media, outreach, family engagement, legal, board',
      icon: 'fa-bullhorn',
      accent: '#7c3aed',
      iconBg: '#f3f0ff',
      iconColor: '#7c3aed',
      children: [
        {
          id: 'communications',
          label: 'Communications / Media / PR',
          desc: 'Press inquiries, media relations, public info',
          icon: 'fa-bullhorn',
          accent: '#7c3aed',
          iconBg: '#f3f0ff',
          iconColor: '#7c3aed',
          children: [
            {
              id: 'communications-dept',
              label: 'Communications Department',
              desc: 'District communications, messaging, publications',
              icon: 'fa-envelope-open-text',
              accent: '#7c3aed',
              iconBg: '#f3f0ff',
              iconColor: '#7c3aed',
              result: {
                department: 'Communications',
                icon: 'fa-envelope-open-text',
                description: 'The Communications department manages district-wide communications, newsletters, website content, social media, and internal and external messaging.',
                contacts: [
                  { role: 'Main Line', info: '407-317-3494', type: 'phone' },
                  { role: 'Website', info: 'ocps.net/communications', type: 'link', url: 'https://www.ocps.net/communications-home' }
                ],
                tags: ['Communications', 'Newsletter', 'Website', 'Social Media', 'Messaging'],
                relatedDepts: ['Media Relations', 'Public Relations', 'Community Outreach']
              }
            },
            {
              id: 'advertising-sales',
              label: 'Advertising Sales',
              desc: 'District advertising programs',
              icon: 'fa-ad',
              accent: '#374151',
              iconBg: '#f3f4f6',
              iconColor: '#374151',
              result: {
                department: 'Advertising Sales',
                icon: 'fa-ad',
                description: 'Advertising Sales manages district advertising partnerships and programs.',
                contacts: [
                  { role: 'Main Line', info: '407-317-3294', type: 'phone' },
                  { role: 'Website', info: 'ocps.net/advertising', type: 'link', url: 'https://www.ocps.net/advertising-sales-home' }
                ],
                tags: ['Advertising', 'Sponsorship', 'Partnerships'],
                relatedDepts: ['Communications', 'Foundation for OCPS']
              }
            }
          ]
        }
      ]
    },

    // 10. FEDERAL PROGRAMS & TITLE I
    {
      id: 'federal',
      label: 'Federal Programs & Funding',
      desc: 'Title I, federal grants, evaluation systems',
      icon: 'fa-flag-usa',
      accent: '#1d4ed8',
      iconBg: '#eff6ff',
      iconColor: '#1d4ed8',
      children: [
        // ...
      ]
    }
  ]
};

// Flat lookup for all leaf departments (search index)
function buildSearchIndex(node, path = []) {
  const results = [];
  if (node.result) {
    results.push({ node, path: [...path] });
  }
  if (node.children) {
    for (const child of node.children) {
      results.push(...buildSearchIndex(child, [...path, node]));
    }
  }
  return results;
}

const SEARCH_INDEX = buildSearchIndex(CALL_TREE);
