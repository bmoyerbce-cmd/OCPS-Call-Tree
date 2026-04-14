/**
 * OCPS Call Tree Data
 * Organized as a tree: root -> category -> sub-category -> department result
 * Each node: { id, label, desc, icon, accent, iconBg, iconColor, children? | result? }
 */

const CALL_TREE = 
  id: 'root',
  label: "Thank you for calling Orange County Public Schools, my name is ___ I'll be your operator today",
  subtitle:
    'Select the category that best describes the caller\'s issue to route them to the correct OCPS department.',
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
        {
          id: 'enroll-choice',
          label: 'Enrolling / Choosing a School',
          desc: 'New enrollment, school choice, magnet programs, transfers',
          icon: 'fa-school',
          accent: '#0055c4',
          iconBg: '#e8f0fb',
          iconColor: '#0055c4',
          children: [
            {
              id: 'new-enrollment',
              label: 'New Student Enrollment',
              desc: 'First-time enrollment for new students',
              icon: 'fa-clipboard-list',
              accent: '#0055c4',
              iconBg: '#e8f0fb',
              iconColor: '#0055c4',
              result: {
                department: 'Student Enrollment',
                icon: 'fa-clipboard-list',
                description:
                  'The Student Enrollment office handles all new student registration for Orange County Public Schools, including in-boundary enrollment and required documentation.',
                contacts: [
                  { role: 'Main Line', info: '407-317-3233', type: 'phone' },
                  { role: 'Email', info: 'studentenrollment@ocps.net', type: 'email' },
                  {
                    role: 'Website',
                    info: 'ocps.net/student-enrollment',
                    type: 'link',
                    url: 'https://www.ocps.net/student-enrollment'
                  }
                ],
                tags: ['Enrollment', 'Registration', 'New Student', 'Documents'],
                relatedDepts: ['School Choice Services', 'Records and Forms Management']
              }
            },
            {
              id: 'school-choice',
              label: 'School Choice / Magnet / Charter',
              desc: 'Options beyond neighborhood school',
              icon: 'fa-map-marked-alt',
              accent: '#7c3aed',
              iconBg: '#f3f0ff',
              iconColor: '#7c3aed',
              result: {
                department: 'School Choice Services',
                icon: 'fa-map-marked-alt',
                description:
                  'School Choice Services manages applications and placements for magnet schools, charter schools, virtual education options, and open enrollment transfers within OCPS.',
                contacts: [
                  { role: 'Main Line', info: '(407) 317-3233', type: 'phone' },
                  {
                    role: 'Website',
                    info: 'ocps.net/school-choice',
                    type: 'link',
                    url: 'https://www.ocps.net/school-choice'
                  }
                ],
                tags: ['Magnet', 'Charter', 'Transfer', 'Open Enrollment'],
                relatedDepts: ['Student Enrollment', 'Assessment']
              }
            }
          ]
        },
        {
          id: 'student-records',
          label: 'Student Records & Forms',
          desc: 'Transcripts, records requests, forms',
          icon: 'fa-folder-open',
          accent: '#b45309',
          iconBg: '#fffbeb',
          iconColor: '#b45309',
          result: {
            department: 'Records and Forms Management',
            icon: 'fa-folder-open',
            description:
              'Records and Forms Management handles student records requests, transcript releases, records retention, and official district form management.',
            contacts: [
              { role: 'Main Line', info: '407.317.3965', type: 'phone' },
              { role: 'Fax', info: '407.317.3703', type: 'fax' },
              { role: 'Email', info: 'records@ocps.net', type: 'email' },
              {
                role: 'Website',
                info: 'ocps.net/records-and-forms',
                type: 'link',
                url: 'https://www.ocps.net/records-and-forms-management'
              }
            ],
            tags: ['Transcripts', 'Records', 'Forms', 'FERPA'],
            relatedDepts: ['Student Enrollment', 'Legal Services']
          }
        },
        {
          id: 'student-support',
          label: 'Student Support & Wellness',
          desc: 'Counseling, mental health, student services',
          icon: 'fa-heart',
          accent: '#be185d',
          iconBg: '#fdf2f8',
          iconColor: '#be185d',
          result: {
            department: 'Student Services',
            icon: 'fa-heart',
            description:
              'Student Services provides comprehensive supports including school counseling, mental and behavioral health resources, dropout prevention, and student wellness programs.',
            contacts: [
              { role: 'Main Line', info: '407-317-3394', type: 'phone' },
              {
                role: 'Website',
                info: 'ocps.net/student-services',
                type: 'link',
                url: 'https://www.ocps.net/student-services'
              }
            ],
            tags: ['Counseling', 'Mental Health', 'Wellness', 'Support'],
            relatedDepts: ['Health Services', 'Homeless Education', 'Exceptional Student Education']
          }
        },
        {
          id: 'homeless-ed',
          label: 'Homeless / Displaced Students',
          desc: 'Housing instability, McKinney-Vento services',
          icon: 'fa-house-damage',
          accent: '#b45309',
          iconBg: '#fffbeb',
          iconColor: '#b45309',
          result: {
            department: 'Homeless Education',
            icon: 'fa-house-damage',
            description:
              'Homeless Education ensures students experiencing homelessness receive the same educational opportunities as other students, in compliance with the McKinney-Vento Homeless Assistance Act.',
            contacts: [
              { role: 'Main Line', info: '407-317-3200', type: 'phone' },
              {
                role: 'Website',
                info: 'ocps.net/homeless-education',
                type: 'link',
                url: 'https://www.ocps.net/homeless-education'
              }
            ],
            tags: ['McKinney-Vento', 'Housing Instability', 'Homeless', 'Displaced'],
            relatedDepts: ['Student Services', 'Federal Programs', 'Migrant Education']
          }
        },
        {
          id: 'migrant',
          label: 'Migrant Education',
          desc: 'Services for migrant students and families',
          icon: 'fa-globe-americas',
          accent: '#047857',
          iconBg: '#ecfdf5',
          iconColor: '#047857',
          result: {
            department: 'Migrant Education',
            icon: 'fa-globe-americas',
            description:
              'Migrant Education provides academic and support services to students who qualify under the federal Migrant Education Program due to migratory agricultural or fishing work.',
            contacts: [
              { role: 'Main Line', info: '407-317-3485', type: 'phone' },
              {
                role: 'Website',
                info: 'ocps.net/migrant-education',
                type: 'link',
                url: 'https://www.ocps.net/migrant-education'
              }
            ],
            tags: ['Migrant', 'Federal Program', 'Agricultural', 'Support'],
            relatedDepts: ['Homeless Education', 'Multilingual Services', 'Federal Programs']
          }
        }
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
      subOptions: [
        {
          label: 'Exceptional Student Education (ESE) / IEP',
          desc: 'Special education services, IEPs, and disability accommodations',
          url: 'https://www.ocps.net/exceptional-student-education-home'
        },
        {
          label: 'English Language Learners (ESOL)',
          desc: 'Multilingual services and ESOL program support',
          url: 'https://www.ocps.net/multilingual-services'
        },
        {
          label: 'Early Childhood / VPK',
          desc: 'Voluntary Pre-Kindergarten and early learning programs',
          url: 'https://www.ocps.net/early-childhood'
        },
        {
          label: 'Access, Equity & Opportunity',
          desc: 'Equity initiatives and barrier removal programs',
          url: 'https://www.ocps.net/access-and-opportunity'
        }
      ],
      children: [
        {
          id: 'ese',
          label: 'Exceptional Student Education (ESE)',
          desc: 'Special education, IEPs, disability services',
          icon: 'fa-universal-access',
          accent: '#7c3aed',
          iconBg: '#f3f0ff',
          iconColor: '#7c3aed',
          result: {
            department: 'Exceptional Student Education (ESE)',
            icon: 'fa-universal-access',
            description:
              'Exceptional Student Education (ESE) provides services and programs to students with disabilities, including IEP development, specialized instruction, and compliance with IDEA and Section 504.',
            contacts: [
              { role: 'Main Line', info: '407-897-6420', type: 'phone' },
              {
                role: 'ESE Parent Support',
                info: 'https://www.ocps.net/exceptional-student-education-home',
                type: 'link',
                url: 'https://www.ocps.net/exceptional-student-education-home'
              }
            ],
            tags: ['IEP', 'Disability', 'IDEA', 'Section 504', 'Special Education'],
            relatedDepts: ['Student Services', 'Access and Opportunity', 'Health Services']
          }
        },
        {
          id: 'multilingual',
          label: 'Multilingual / ESOL Services',
          desc: 'English language learners, translation, ESOL',
          icon: 'fa-language',
          accent: '#0891b2',
          iconBg: '#ecfeff',
          iconColor: '#0891b2',
          children: [
            {
              id: 'multilingual-dept',
              label: 'Language Support & ESOL',
              desc: 'English language programs for students',
              icon: 'fa-language',
              accent: '#0891b2',
              iconBg: '#ecfeff',
              iconColor: '#0891b2',
              result: {
                department: 'Multilingual Services',
                icon: 'fa-language',
                description:
                  'Multilingual Services oversees English for Speakers of Other Languages (ESOL) programs, language assessments, and support for English Language Learners (ELLs) across OCPS.',
                contacts: [
                  { role: 'Main Line', info: '407-317-3410', type: 'phone' },
                  {
                    role: 'Website',
                    info: 'https://www.ocps.net/multilingual-services-home',
                    type: 'link',
                    url: 'https://www.ocps.net/multilingual-services'
                  }
                ],
                tags: ['ESOL', 'ELL', 'Language Support', 'Bilingual', 'Translation'],
                relatedDepts: ['Family Engagement and Digital Outreach', 'Migrant Education']
              }
            },
            {
              id: 'translation',
              label: 'Translation & Family Language Support',
              desc: 'Document translation, bilingual liaisons',
              icon: 'fa-comments',
              accent: '#0891b2',
              iconBg: '#ecfeff',
              iconColor: '#0891b2',
              result: {
                department: 'Multilingual Services - Translation & Family Support',
                icon: 'fa-comments',
                description:
                  'The Multilingual Services department provides translation of key documents and has bilingual parent engagement liaisons to assist families whose primary language is not English.',
                contacts: [
                  { role: 'Translation Sr. Specialist', info: 'Jessica Vega - Ext. 2028011', type: 'person' },
                  { role: 'Global Family Sr. Manager', info: 'Janine Gonzalez - Ext. 2028009', type: 'person' },
                  { role: 'Bilingual Counselor', info: 'Wanda Alicea - Ext. 2028112', type: 'person' }
                ],
                tags: ['Translation', 'Bilingual', 'Family', 'Language'],
                relatedDepts: ['Family Engagement and Digital Outreach', 'Community Outreach']
              }
            }
          ]
        },
        {
          id: 'early-childhood',
          label: 'Early Childhood / VPK',
          desc: 'Pre-K programs, Voluntary Pre-Kindergarten',
          icon: 'fa-baby',
          accent: '#be185d',
          iconBg: '#fdf2f8',
          iconColor: '#be185d',
          result: {
            department: 'Early Childhood Program (VPK)',
            icon: 'fa-baby',
            description:
              'The Early Childhood Program administers Voluntary Pre-Kindergarten (VPK) and other early learning programs, ensuring young children are school-ready before entering kindergarten.',
            contacts: [
              { role: 'Senior Admin', info: '407-317-3200 Ext. 200-4611', type: 'phone' },
              { role: 'Program Coordinator', info: '407-317-3200 Ext. 635-2263', type: 'phone' },
              {
                role: 'Website',
                info: 'ocps.net/early-childhood',
                type: 'link',
                url: 'https://www.ocps.net/early-childhood'
              }
            ],
            tags: ['VPK', 'Pre-K', 'Early Learning', 'Kindergarten Readiness'],
            relatedDepts: ['Student Enrollment', 'Exceptional Student Education']
          }
        },
        {
          id: 'access-opportunity',
          label: 'Access, Equity & Opportunity',
          desc: 'Equal access, equity initiatives',
          icon: 'fa-balance-scale',
          accent: '#047857',
          iconBg: '#ecfdf5',
          iconColor: '#047857',
          result: {
            department: 'Access and Opportunity',
            icon: 'fa-balance-scale',
            description:
              'Access and Opportunity works to eliminate barriers and ensure equitable access to high-quality education for all OCPS students, regardless of background.',
            contacts: [
              { role: 'Main Line', info: '407-317-3200 x 2003470', type: 'phone' },
              {
                role: 'Website',
                info: 'https://www.ocps.net/accessopportunity',
                type: 'link',
                url: 'https://www.ocps.net/accessopportunity'
              }
            ],
            tags: ['Equity', 'Access', 'Diversity', 'Opportunity'],
            relatedDepts: ['Exceptional Student Education', 'Student Services', 'Community Outreach']
          }
        }
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
      subOptions: [
        {
          label: 'Curriculum & Instructional Materials',
          desc: 'Standards-aligned curriculum, textbooks, digital learning tools',
          url: 'https://www.ocps.net/curriculum-and-digital-learning'
        },
        {
          label: 'Testing & State Assessments',
          desc: 'FSA, FAST, EOCs, and standardized testing information',
          url: 'https://www.ocps.net/assessment'
        },
        {
          label: 'Career & Technical Education (CTE)',
          desc: 'Vocational, trade, and workforce preparation programs',
          url: 'https://www.ocps.net/career-and-technical-education'
        },
        {
          label: 'Athletics & Extracurricular',
          desc: 'Interscholastic sports, eligibility, and activities',
          url: 'https://www.ocps.net/athletics'
        },
        {
          label: 'School Accountability & Performance',
          desc: 'School grades, improvement plans, and strategic data',
          url: 'https://www.ocps.net/accountability'
        }
      ],
      children: [
        {
          id: 'curriculum',
          label: 'Curriculum & Instructional Materials',
          desc: 'Standards, textbooks, digital learning',
          icon: 'fa-book',
          accent: '#1d4ed8',
          iconBg: '#eff6ff',
          iconColor: '#1d4ed8',
          result: {
            department: 'Curriculum and Digital Learning',
            icon: 'fa-book',
            description:
              'Curriculum and Digital Learning oversees the development and implementation of standards-aligned curriculum, instructional materials, and digital learning tools across all grade levels.',
            contacts: [
              { role: 'Main Line', info: '407-317-3318', type: 'phone' },
              {
                role: 'Website',
                info: 'ocps.net/curriculum',
                type: 'link',
                url: 'https://www.ocps.net/curriculum-and-digital-learning-hom'
              }
            ],
            tags: ['Curriculum', 'Instruction', 'Standards', 'Digital Learning', 'Textbooks'],
            relatedDepts: ['Assessment', 'Information Technology Services', 'Research']
          }
        },
        {
          id: 'assessment',
          label: 'Testing & Assessment',
          desc: 'State tests, FSA, standardized testing',
          icon: 'fa-tasks',
          accent: '#b45309',
          iconBg: '#fffbeb',
          iconColor: '#b45309',
          result: {
            department: 'Assessment',
            icon: 'fa-tasks',
            description:
              'The Assessment department manages district and state assessments, including FSA/FAST, EOCs, and other standardized testing for OCPS students.',
            contacts: [
              { role: 'Main Line', info: '407.317.3406', type: 'phone' },
              {
                role: 'Website',
                info: 'ocps.net/assessment',
                type: 'link',
                url: 'https://www.ocps.net/assessment'
              }
            ],
            tags: ['FSA', 'FAST', 'Standardized Testing', 'EOC', 'State Tests'],
            relatedDepts: ['Accountability', 'Research, Measurement and Strategy', 'Curriculum and Digital Learning']
          }
        },
        {
          id: 'cte',
          label: 'Career & Technical Education',
          desc: 'CTE programs, vocational, workforce prep',
          icon: 'fa-hard-hat',
          accent: '#b45309',
          iconBg: '#fffbeb',
          iconColor: '#b45309',
          result: {
            department: 'Career and Technical Education (CTE)',
            icon: 'fa-hard-hat',
            description:
              'Career and Technical Education (CTE) prepares students for college and careers through industry-specific courses and programs in areas such as technology, health sciences, business, and trades.',
            contacts: [
              { role: 'Main Line', info: '407-317-3200 EXT 200.3212', type: 'phone' },
              {
                role: 'Website',
                info: 'ocps.net/cte',
                type: 'link',
                url: 'https://www.ocps.net/career-and-technical-education'
              }
            ],
            tags: ['CTE', 'Vocational', 'Career', 'Workforce', 'Trades'],
            relatedDepts: ['Curriculum and Digital Learning', 'School Choice Services']
          }
        },
        {
          id: 'athletics',
          label: 'Athletics & Activities',
          desc: 'Sports, eligibility, extracurricular',
          icon: 'fa-running',
          accent: '#7c3aed',
          iconBg: '#f3f0ff',
          iconColor: '#7c3aed',
          result: {
            department: 'Athletics',
            icon: 'fa-running',
            description:
              'The Athletics department oversees all OCPS interscholastic sports programs, athletic eligibility, scheduling, and extracurricular athletic activities.',
            contacts: [
              { role: 'Main Line', info: '407-317-3480', type: 'phone' },
              {
                role: 'Website',
                info: 'ocps.net/athletics',
                type: 'link',
                url: 'https://ocpsathletics.net/'
              }
            ],
            tags: ['Sports', 'Athletics', 'Eligibility', 'Extracurricular'],
            relatedDepts: ['Student Services', 'School Board Services']
          }
        },
        {
          id: 'accountability',
          label: 'Accountability & School Performance',
          desc: 'School grades, strategic improvement, data',
          icon: 'fa-chart-bar',
          accent: '#047857',
          iconBg: '#ecfdf5',
          iconColor: '#047857',
          children: [
            {
              id: 'accountability-dept',
              label: 'District Accountability',
              desc: 'School grades, district reporting',
              icon: 'fa-chart-bar',
              accent: '#047857',
              iconBg: '#ecfdf5',
              iconColor: '#047857',
              result: {
                department: 'Accountability',
                icon: 'fa-chart-bar',
                description:
                  'Accountability manages school and district performance reporting, including school grades, progress monitoring, and federal accountability requirements.',
                contacts: [
                  { role: 'Main Line', info: '407-317-3210', type: 'phone' },
                  {
                    role: 'Website',
                    info: 'ocps.net/accountability',
                    type: 'link',
                    url: 'https://www.ocps.net/accountability'
                  }
                ],
                tags: ['School Grades', 'Performance', 'Accountability', 'Reporting'],
                relatedDepts: ['Research, Measurement and Strategy', 'Assessment', 'Strategic Improvement']
              }
            },
            {
              id: 'strategic-improvement',
              label: 'Strategic Improvement / School Transformation',
              desc: 'Underperforming schools, improvement plans',
              icon: 'fa-chart-line',
              accent: '#dc2626',
              iconBg: '#fef2f2',
              iconColor: '#dc2626',
              result: {
                department: 'School Transformation Office / Strategic Improvement',
                icon: 'fa-chart-line',
                description:
                  'The School Transformation Office and Strategic Improvement department provide targeted support to schools that need improvement, focusing on academic turnaround strategies.',
                contacts: [
                  { role: 'Main Line', info: '407.317.3210', type: 'phone' },
                  {
                    role: 'Website',
                    info: 'ocps.net/strategic-improvement',
                    type: 'link',
                    url: 'https://www.ocps.net/132248_3'
                  }
                ],
                tags: ['School Improvement', 'Turnaround', 'Transformation', 'SIP'],
                relatedDepts: ['Accountability', 'Research, Measurement and Strategy', 'Leadership Development']
              }
            }
          ]
        }
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
      subOptions: [
        {
          label: 'Report a Safety Concern / Threat',
          desc: 'District Police, emergencies, and threat management',
          url: 'https://www.ocps.net/district-police'
        },
        {
          label: 'Safety & Emergency Planning',
          desc: 'Emergency protocols, drills, and school safety plans',
          url: 'https://www.ocps.net/safety-and-emergency-management'
        },
        {
          label: 'Student Health / School Nurse',
          desc: 'Medications, immunizations, and health records',
          url: 'https://www.ocps.net/school-health-services'
        },
        {
          label: 'Environmental & Sustainability',
          desc: 'Environmental compliance and facility health standards',
          url: 'https://www.ocps.net/environmental-compliance-sustaina-2'
        },
        {
          label: 'Risk Management / Insurance',
          desc: 'Liability, workers comp, and insurance claims',
          url: 'https://www.ocps.net/risk-management'
        }
      ],
      children: [
        {
          id: 'school-safety',
          label: 'School Safety & Security',
          desc: 'Safety concerns, threat reports, security',
          icon: 'fa-shield-alt',
          accent: '#dc2626',
          iconBg: '#fef2f2',
          iconColor: '#dc2626',
          children: [
            {
              id: 'district-police',
              label: 'District Police',
              desc: 'Law enforcement, emergencies, investigations',
              icon: 'fa-user-shield',
              accent: '#dc2626',
              iconBg: '#fef2f2',
              iconColor: '#dc2626',
              result: {
                department: 'District Police',
                icon: 'fa-user-shield',
                description:
                  'OCPS District Police provides law enforcement services to the school district, handles emergencies, investigates criminal activity on school grounds, and supports school safety.',
                contacts: [
                  { role: 'Chief of District Police', info: 'Bryan Holmes - bryan.holmes@ocps.net', type: 'person' },
                  { role: 'Deputy Chief', info: 'David Rinehart - David.Rinehart@ocps.net', type: 'person' },
                  { role: 'Police Communications', info: 'Kim Harrell - Kimberly.Harrell@ocps.net', type: 'person' }
                ],
                tags: ['Police', 'Safety', 'Emergency', 'Law Enforcement', 'Threat'],
                relatedDepts: ['Safety and Emergency Management', 'Risk Management']
              }
            },
            {
              id: 'safety-emergency',
              label: 'Safety & Emergency Management',
              desc: 'Emergency planning, safety protocols, drills',
              icon: 'fa-exclamation-triangle',
              accent: '#b45309',
              iconBg: '#fffbeb',
              iconColor: '#b45309',
              result: {
                department: 'Safety and Emergency Management',
                icon: 'fa-exclamation-triangle',
                description:
                  'Safety and Emergency Management develops and coordinates district-wide emergency plans, safety drills, crisis protocols, and environmental safety compliance.',
                contacts: [
                  { role: 'School Safety & Security', info: 'Angela Zambaux - Angela.Zambaux@ocps.net', type: 'person' },
                  { role: 'School Safety & Security', info: 'Murray Daniel - frederick.daniel@ocps.net', type: 'person' },
                  { role: 'Threat Management', info: 'Calvin Massiah - Calvin.Massiah@ocps.net', type: 'person' }
                ],
                tags: ['Emergency', 'Drills', 'Safety Plans', 'Crisis', 'Protocols'],
                relatedDepts: ['District Police', 'Risk Management', 'Environmental Compliance & Sustainability']
              }
            }
          ]
        },
        {
          id: 'health-services',
          label: 'Student Health Services',
          desc: 'School nurses, medication, health records',
          icon: 'fa-medkit',
          accent: '#dc2626',
          iconBg: '#fef2f2',
          iconColor: '#dc2626',
          result: {
            department: 'School Health Services',
            icon: 'fa-medkit',
            description:
              'School Health Services oversees the school nursing program, manages student health records, medication administration, immunization requirements, and health-related accommodations.',
            contacts: [
              { role: 'Main Line', info: '407.317.3391', type: 'phone' },
              {
                role: 'Website',
                info: 'ocps.net/health-services',
                type: 'link',
                url: 'https://www.ocps.net/health-services-home'
              }
            ],
            tags: ['Nurse', 'Medication', 'Immunization', 'Health Records', '504 Health'],
            relatedDepts: ['Exceptional Student Education', 'Student Services', 'Risk Management']
          }
        },
        {
          id: 'environmental',
          label: 'Environmental & Sustainability',
          desc: 'Environmental compliance, sustainability programs',
          icon: 'fa-leaf',
          accent: '#047857',
          iconBg: '#ecfdf5',
          iconColor: '#047857',
          result: {
            department: 'Environmental Compliance & Sustainability Department',
            icon: 'fa-leaf',
            description:
              "Environmental Compliance & Sustainability manages the district's environmental compliance programs, sustainability initiatives, and ensures school facilities meet environmental health standards.",
            contacts: [
              { role: 'Main Line', info: '407-317-3700 Ext. 2023970', type: 'phone' },
              {
                role: 'Website',
                info: 'ocps.net/environmental-compliance',
                type: 'link',
                url: 'https://www.ocps.net/environmental-compliance-sustaina-2'
              }
            ],
            tags: ['Environment', 'Sustainability', 'Compliance', 'Facilities'],
            relatedDepts: ['Safety and Emergency Management', 'Facilities', 'Risk Management']
          }
        },
        {
          id: 'risk-management',
          label: 'Risk Management',
          desc: 'Insurance, liability, workers comp',
          icon: 'fa-umbrella',
          accent: '#0891b2',
          iconBg: '#ecfeff',
          iconColor: '#0891b2',
          result: {
            department: 'Risk Management',
            icon: 'fa-umbrella',
            description:
              "Risk Management administers the district's insurance programs, workers' compensation, liability claims, loss prevention, and risk assessment services.",
            contacts: [
              { role: 'Main Line', info: '407-317-3296', type: 'phone' },
              { role: 'Fax', info: '407-317-3359', type: 'fax' },
              {
                role: 'Website',
                info: 'ocps.net/risk-management',
                type: 'link',
                url: 'https://www.ocps.net/risk-management'
              }
            ],
            tags: ['Insurance', 'Liability', 'Workers Comp', 'Claims'],
            relatedDepts: ['Safety and Emergency Management', 'District Police', 'Legal Services']
          }
        }
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
      subOptions: [
        {
          label: 'Employee Benefits & HR Services',
          desc: 'Benefits, leave, personnel records, and HR policies',
          url: 'https://www.ocps.net/human-resources'
        },
        {
          label: 'Job Openings & Applying',
          desc: 'Current vacancies, teacher recruitment, and applications',
          url: 'https://www.ocps.net/recruitment-and-evaluation'
        },
        {
          label: 'Employee Conduct / Misconduct',
          desc: 'Professional standards, investigations, and compliance',
          url: 'ocps.net/professional-standards-and-hr-compl'
        },
        {
          label: 'Retirement & FRS',
          desc: 'Florida Retirement System, DROP, and pension planning',
          url: 'https://www.ocps.net/retirement-services'
        },
        {
          label: 'Leadership & Professional Development',
          desc: 'Admin leadership programs and job-embedded learning',
          url: 'https://www.ocps.net/leadershipdevelopment'
        }
      ],
      children: [
        {
          id: 'hr-main',
          label: 'Human Resources',
          desc: 'Employee benefits, policies, personnel actions',
          icon: 'fa-id-badge',
          accent: '#047857',
          iconBg: '#ecfdf5',
          iconColor: '#047857',
          result: {
            department: 'Human Resources',
            icon: 'fa-id-badge',
            description:
              'Human Resources manages employee benefits, personnel records, HR policies, leave administration, and general workforce services for all OCPS employees.',
            contacts: [
              { role: 'Main Line', info: 'See website', type: 'text' },
              {
                role: 'Website',
                info: 'ocps.net/hr',
                type: 'link',
                url: 'https://www.ocps.net/human-resources'
              }
            ],
            tags: ['Benefits', 'HR', 'Personnel', 'Leave', 'Policies'],
            relatedDepts: ['Recruitment and Evaluation', 'Retirement Services', 'Professional Standards and HR Compliance']
          }
        },
        {
          id: 'recruitment',
          label: 'Recruitment & Hiring',
          desc: 'Job openings, applications, teacher recruitment',
          icon: 'fa-user-plus',
          accent: '#1d4ed8',
          iconBg: '#eff6ff',
          iconColor: '#1d4ed8',
          result: {
            department: 'Recruitment and Evaluation',
            icon: 'fa-user-plus',
            description:
              'Recruitment and Evaluation manages the hiring process for all OCPS positions, including teacher recruitment, job postings, applicant screening, and employee performance evaluations.',
            contacts: [
              { role: 'Main Line', info: '407-317-3200 Ext 2004592', type: 'phone' },
              { role: 'Eval Email', info: 'EvaluationSystems@ocps.net', type: 'email' },
              { role: 'Recruitment Email', info: 'Recruitment@ocps.net', type: 'email' },
              {
                role: 'Website',
                info: 'ocps.net/recruitment',
                type: 'link',
                url: 'https://www.ocps.net/recruitment-and-evaluation'
              }
            ],
            tags: ['Hiring', 'Jobs', 'Teacher Recruitment', 'Evaluation', 'Apply'],
            relatedDepts: ['Human Resources', 'Professional Standards and HR Compliance']
          }
        },
        {
          id: 'professional-standards',
          label: 'Professional Standards & Compliance',
          desc: 'Employee conduct, investigations, misconduct',
          icon: 'fa-gavel',
          accent: '#dc2626',
          iconBg: '#fef2f2',
          iconColor: '#dc2626',
          result: {
            department: 'Professional Standards and HR Compliance',
            icon: 'fa-gavel',
            description:
              'Professional Standards and HR Compliance investigates employee misconduct, ensures compliance with employment regulations, and manages disciplinary processes for OCPS staff.',
            contacts: [
              { role: 'Professional Standards', info: '407-317-3200 Ext. 2003239', type: 'phone' },
              { role: 'HR Compliance', info: '407-317-3200 Ext. 2002520', type: 'phone' },
              { role: 'FMLA', info: '407-317-3200 Ext 2003652', type: 'phone' },
              { role: 'Fingerprint and Badging', info: '407-317-3200 Ext. 2026101', type: 'phone' },
              {
                role: 'Website',
                info: 'ocps.net/professional-standards',
                type: 'link',
                url: 'ocps.net/professional-standards-and-hr-compl'
              }
            ],
            tags: ['Misconduct', 'Investigation', 'Compliance', 'Discipline', 'Employee Conduct', 'Fingerprint', 'Badging'],
            relatedDepts: ['Human Resources', 'Legal Services', 'Recruitment and Evaluation']
          }
        },
        {
          id: 'retirement',
          label: 'Retirement Services',
          desc: 'FRS, retirement planning, pension',
          icon: 'fa-piggy-bank',
          accent: '#7c3aed',
          iconBg: '#f3f0ff',
          iconColor: '#7c3aed',
          result: {
            department: 'Retirement Services',
            icon: 'fa-piggy-bank',
            description:
              'Retirement Services assists OCPS employees with Florida Retirement System (FRS) information, retirement planning, DROP program details, and transition support.',
            contacts: [
              { role: 'Main Line', info: '407-317-3200', type: 'phone' },
              {
                role: 'Website',
                info: 'ocps.net/retirement',
                type: 'link',
                url: 'https://www.ocps.net/retirement-services'
              }
            ],
            tags: ['FRS', 'Retirement', 'Pension', 'DROP', 'Benefits'],
            relatedDepts: ['Human Resources', 'Finance']
          }
        },
        {
          id: 'leadership-dev',
          label: 'Leadership Development',
          desc: 'Professional development, leadership programs',
          icon: 'fa-star',
          accent: '#b45309',
          iconBg: '#fffbeb',
          iconColor: '#b45309',
          result: {
            department: 'Leadership Development',
            icon: 'fa-star',
            description:
              'Leadership Development provides job-embedded learning opportunities and formal programs that enhance leadership capacity for aspiring and current administrators across OCPS.',
            contacts: [
              { role: 'Main Line', info: '407-317-3436', type: 'phone' },
              {
                role: 'Website',
                info: 'ocps.net/leadershipdevelopment',
                type: 'link',
                url: 'https://www.ocps.net/151327_3'
              }
            ],
            tags: ['Leadership', 'Professional Development', 'Principals', 'Admin Training'],
            relatedDepts: ['Human Resources', 'Curriculum and Digital Learning', 'Recruitment and Evaluation']
          }
        }
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
      subOptions: [
        {
          label: 'Vendor Payments & Invoices',
          desc: 'Accounts payable, purchase orders, and reimbursements',
          url: 'https://www.ocps.net/accounts-payable'
        },
        {
          label: 'District Budget & Allocations',
          desc: 'Annual operating budget and school-level allocations',
          url: 'https://www.ocps.net/budget'
        },
        {
          label: 'Purchasing & Contracts',
          desc: 'Vendor contracts, bids, and procurement compliance',
          url: 'https://www.ocps.net/procurement-services'
        },
        {
          label: 'Grants & Federal Funding',
          desc: 'Grant applications, reporting, and fiscal compliance',
          url: 'https://www.ocps.net/grants'
        },
        {
          label: 'Internal Audit',
          desc: 'Financial oversight, audits, and compliance reviews',
          url: 'https://www.ocps.net/internal-audit'
        }
      ],
      children: [
        {
          id: 'accounts-payable',
          label: 'Accounts Payable / Invoices',
          desc: 'Vendor payments, invoices, reimbursements',
          icon: 'fa-file-invoice-dollar',
          accent: '#b45309',
          iconBg: '#fffbeb',
          iconColor: '#b45309',
          result: {
            department: 'Accounts Payable',
            icon: 'fa-file-invoice-dollar',
            description:
              'Accounts Payable processes vendor payments, purchase orders, invoices, and employee reimbursements for Orange County Public Schools.',
            contacts: [
              { role: 'Main Line', info: '407-317-3246', type: 'phone' },
              {
                role: 'Website',
                info: 'ocps.net/accounts-payable',
                type: 'link',
                url: 'https://www.ocps.net/accounts-payable'
              }
            ],
            tags: ['Invoices', 'Vendors', 'Payments', 'Reimbursements', 'Purchase Orders'],
            relatedDepts: ['Finance', 'Procurement Services', 'Budget']
          }
        },
        {
          id: 'budget',
          label: 'Budget',
          desc: 'District budget, allocations, fiscal planning',
          icon: 'fa-chart-pie',
          accent: '#047857',
          iconBg: '#ecfdf5',
          iconColor: '#047857',
          result: {
            department: 'Budget',
            icon: 'fa-chart-pie',
            description:
              "The Budget department develops and manages the district's annual operating budget, school allocations, and provides financial planning support.",
            contacts: [
              { role: 'Main Line', info: '407-317-3268', type: 'phone' },
              {
                role: 'Website',
                info: 'ocps.net/budget',
                type: 'link',
                url: 'https://www.ocps.net/budget'
              }
            ],
            tags: ['Budget', 'Allocations', 'Fiscal Year', 'Financial Planning'],
            relatedDepts: ['Finance', 'Accounts Payable', 'Federal Programs']
          }
        },
        {
          id: 'finance',
          label: 'Finance Department',
          desc: 'General financial services, audits, grants accounting',
          icon: 'fa-landmark',
          accent: '#b45309',
          iconBg: '#fffbeb',
          iconColor: '#b45309',
          result: {
            department: 'Finance',
            icon: 'fa-landmark',
            description:
              'The Finance department provides governmental accounting, financial reporting, and fiscal services. It also oversees Title I federal program financial compliance.',
            contacts: [
              { role: 'Chief Financial Officer', info: 'Doreen Concolino - 407-317-3456', type: 'person' },
              { role: 'SR. Specialist', info: 'Lisa Antonia - 407-317-3200 Ext. 2003456', type: 'person' }
            ],
            tags: ['Finance', 'Accounting', 'Financial Reports', 'Audit', 'Title I Finance'],
            relatedDepts: ['Budget', 'Accounts Payable', 'Grants', 'Internal Audit']
          }
        },
        {
          id: 'procurement',
          label: 'Procurement / Purchasing',
          desc: 'Vendor contracts, bidding, purchasing',
          icon: 'fa-shopping-cart',
          accent: '#0891b2',
          iconBg: '#ecfeff',
          iconColor: '#0891b2',
          result: {
            department: 'Procurement Services',
            icon: 'fa-shopping-cart',
            description:
              'Procurement Services manages purchasing contracts, competitive bids, vendor qualification, and procurement compliance for the district.',
            contacts: [
              { role: 'Main Line', info: '407-317-3988', type: 'phone' },
              {
                role: 'Website',
                info: 'ocps.net/procurement',
                type: 'link',
                url: 'https://www.ocps.net/procurement-services'
              }
            ],
            tags: ['Purchasing', 'Contracts', 'Vendors', 'Bids', 'RFP'],
            relatedDepts: ['Accounts Payable', 'Finance', 'Budget']
          }
        },
        {
          id: 'grants',
          label: 'Grants',
          desc: 'Grant applications, reporting, compliance',
          icon: 'fa-hand-holding-usd',
          accent: '#047857',
          iconBg: '#ecfdf5',
          iconColor: '#047857',
          result: {
            department: 'Grants',
            icon: 'fa-hand-holding-usd',
            description:
              "The Grants department manages the district's competitive and formula grant applications, reporting requirements, fiscal compliance, and grant development.",
            contacts: [
              { role: 'Main Line', info: '407-317-3340', type: 'phone' },
              {
                role: 'Website',
                info: 'ocps.net/grants',
                type: 'link',
                url: 'https://www.ocps.net/grants'
              }
            ],
            tags: ['Grants', 'Federal Funding', 'Compliance', 'Title I', 'Applications'],
            relatedDepts: ['Federal Programs', 'Finance', 'Budget']
          }
        },
        {
          id: 'internal-audit',
          label: 'Internal Audit',
          desc: 'Audits, financial oversight, compliance reviews',
          icon: 'fa-search-dollar',
          accent: '#dc2626',
          iconBg: '#fef2f2',
          iconColor: '#dc2626',
          result: {
            department: 'Internal Audit',
            icon: 'fa-search-dollar',
            description:
              'Internal Audit provides independent, objective assurance and consulting services to improve operations, reviewing financial, compliance, and operational matters across the district.',
            contacts: [
              { role: 'Main Line', info: '407-317-3200', type: 'phone' },
              {
                role: 'Website',
                info: 'ocps.net/internal-audit',
                type: 'link',
                url: 'https://www.ocps.net/internal-audit'
              }
            ],
            tags: ['Audit', 'Oversight', 'Compliance Review', 'Internal Controls'],
            relatedDepts: ['Finance', 'Accounts Payable', 'Legal Services']
          }
        }
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
      subOptions: [
        {
          label: 'School Building / Maintenance',
          desc: 'Construction, repairs, renovations, and facility operations',
          url: 'https://www.ocps.net/facilities'
        },
        {
          label: 'School Bus / Transportation',
          desc: 'Bus routes, stop changes, and transportation eligibility',
          url: 'https://www.ocps.net/transportation-services'
        },
        {
          label: 'School Meals / Cafeteria',
          desc: 'Free/reduced lunch applications, menus, and nutrition',
          url: 'https://www.ocps.net/food-and-nutrition-services'
        },
        {
          label: 'Property & Real Estate',
          desc: 'District property leases, land use, and facility rentals',
          url: 'https://www.ocps.net/real-estate-management'
        }
      ],
      children: [
        {
          id: 'facilities',
          label: 'Facilities / Building Maintenance',
          desc: 'School construction, repairs, renovations',
          icon: 'fa-tools',
          accent: '#374151',
          iconBg: '#f3f4f6',
          iconColor: '#374151',
          result: {
            department: 'Facilities',
            icon: 'fa-tools',
            description:
              'Facilities oversees the construction, renovation, maintenance, and operations of all OCPS school buildings and district properties, managed by the Chief Facilities Officer.',
            contacts: [
              { role: 'Contact Info', info: 'See Website', type: 'text' },
              {
                role: 'Website',
                info: 'ocps.net/facilities',
                type: 'link',
                url: 'https://www.ocps.net/facilities'
              }
            ],
            tags: ['Construction', 'Maintenance', 'Buildings', 'Renovation', 'Repairs'],
            relatedDepts: ['Real Estate Management', 'Environmental Compliance & Sustainability', 'Risk Management']
          }
        },
        {
          id: 'transportation',
          label: 'Transportation / School Buses',
          desc: 'Bus routes, eligibility, stop changes',
          icon: 'fa-bus',
          accent: '#b45309',
          iconBg: '#fffbeb',
          iconColor: '#b45309',
          result: {
            department: 'Transportation Services',
            icon: 'fa-bus',
            description:
              'Transportation Services manages all school bus routes, driver scheduling, bus stop assignments, student eligibility for transportation, and related logistics for OCPS.',
            contacts: [
              { role: 'Main Line', info: '407-317-3800', type: 'phone' },
              {
                role: 'Website',
                info: 'ocps.net/transportation',
                type: 'link',
                url: 'https://www.ocps.net/transportation-services'
              }
            ],
            tags: ['Bus', 'Routes', 'Transportation', 'Bus Stop', 'Eligibility'],
            relatedDepts: ['Safety and Emergency Management', 'Facilities']
          }
        },
        {
          id: 'food',
          label: 'Food & Nutrition Services',
          desc: 'School meals, free/reduced lunch, menus',
          icon: 'fa-utensils',
          accent: '#047857',
          iconBg: '#ecfdf5',
          iconColor: '#047857',
          result: {
            department: 'Food and Nutrition Services',
            icon: 'fa-utensils',
            description:
              'Food and Nutrition Services manages school cafeteria programs, including free and reduced-price meal applications, menu planning, and nutrition compliance.',
            contacts: [
              { role: 'Main Line', info: '407-317-3110', type: 'phone' },
              {
                role: 'Website',
                info: 'ocps.net/food-nutrition',
                type: 'link',
                url: 'https://www.ocps.net/food-and-nutrition-services'
              }
            ],
            tags: ['School Meals', 'Free Lunch', 'Reduced Price', 'Cafeteria', 'Menus'],
            relatedDepts: ['Health Services', 'Facilities']
          }
        },
        {
          id: 'real-estate',
          label: 'Real Estate Management',
          desc: 'Property leases, land use, facility rentals',
          icon: 'fa-map',
          accent: '#374151',
          iconBg: '#f3f4f6',
          iconColor: '#374151',
          result: {
            department: 'Real Estate Management',
            icon: 'fa-map',
            description:
              'Real Estate Management handles the acquisition, disposal, leasing, and management of district-owned and leased properties.',
            contacts: [
              { role: 'Main Line', info: 'See Website', type: 'text' },
              {
                role: 'Website',
                info: 'ocps.net/real-estate',
                type: 'link',
                url: 'https://www.ocps.net/real-estate-management'
              }
            ],
            tags: ['Property', 'Lease', 'Land', 'Rentals', 'Facilities Use'],
            relatedDepts: ['Facilities', 'Legal Services', 'Finance']
          }
        }
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
      subOptions: [
        {
          label: 'IT Help Desk / Device Support',
          desc: 'Technical support, devices, network, and Chromebooks',
          url: 'https://www.ocps.net/information-technology-services'
        },
        {
          label: 'Research & Data Requests',
          desc: 'Formal research studies, data analysis, and IRB',
          url: 'https://www.ocps.net/research'
        },
        {
          label: 'District Strategy & Measurement',
          desc: 'Strategic plan, KPIs, and performance measurement',
          url: 'https://www.ocps.net/research-measurement-and-strategy'
        }
      ],
      children: [
        {
          id: 'its',
          label: 'IT Support & Technology Services',
          desc: 'Devices, network, technical support',
          icon: 'fa-desktop',
          accent: '#0891b2',
          iconBg: '#ecfeff',
          iconColor: '#0891b2',
          result: {
            department: 'Information Technology Services (ITS)',
            icon: 'fa-desktop',
            description:
              "Information Technology Services manages the district's technology infrastructure, device programs, network connectivity, help desk support, and instructional technology under the Chief Information Officer.",
            contacts: [
              { role: 'ITS Department', info: '407-317-3915', type: 'phone' },
              { role: 'Employee Helpdesk', info: '407-317-3375', type: 'phone' },
              {
                role: 'Website',
                info: 'ocps.net/its',
                type: 'link',
                url: 'https://www.ocps.net/information-technology-services'
              }
            ],
            tags: ['IT', 'Technology', 'Devices', 'Network', 'Help Desk', 'Chromebooks'],
            relatedDepts: ['Curriculum and Digital Learning', 'Assessment']
          }
        },
        {
          id: 'research',
          label: 'Research & Data',
          desc: 'Research requests, data analysis, reports',
          icon: 'fa-microscope',
          accent: '#7c3aed',
          iconBg: '#f3f0ff',
          iconColor: '#7c3aed',
          children: [
            {
              id: 'research-dept',
              label: 'Research Department',
              desc: 'Data requests, formal research studies',
              icon: 'fa-microscope',
              accent: '#7c3aed',
              iconBg: '#f3f0ff',
              iconColor: '#7c3aed',
              result: {
                department: 'Research',
                icon: 'fa-microscope',
                description:
                  'The Research department supports evidence-based decision making by conducting and reviewing research studies, managing data requests, and supporting district partners with approved research protocols.',
                contacts: [
                  { role: 'Main Line', info: '407-317-3406', type: 'phone' },
                  {
                    role: 'Website',
                    info: 'ocps.net/research',
                    type: 'link',
                    url: 'https://www.ocps.net/research'
                  }
                ],
                tags: ['Research', 'Data Requests', 'Studies', 'IRB', 'Analysis'],
                relatedDepts: ['Research, Measurement and Strategy', 'Accountability', 'Assessment']
              }
            },
            {
              id: 'rms',
              label: 'Research, Measurement & Strategy',
              desc: 'District strategy, metrics, measurement',
              icon: 'fa-compass',
              accent: '#1d4ed8',
              iconBg: '#eff6ff',
              iconColor: '#1d4ed8',
              result: {
                department: 'Research, Measurement and Strategy',
                icon: 'fa-compass',
                description:
                  "Research, Measurement and Strategy (RMS) oversees the district's strategic plan, performance measurement, and research partnerships under the Chief Strategy Officer.",
                contacts: [
                  { role: 'Executive Assistant', info: 'Miriam Patton - 407-317-3214', type: 'person' }
                ],
                tags: ['Strategy', 'Measurement', 'Strategic Plan', 'KPIs', 'Performance'],
                relatedDepts: ['Research', 'Accountability', 'Assessment']
              }
            }
          ]
        }
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
      subOptions: [
        {
          label: 'Press & Media Inquiries',
          desc: 'Journalist contacts, news releases, and media relations',
          url: 'https://www.ocps.net/media-relations'
        },
        {
          label: 'Community Outreach & Partnerships',
          desc: 'Community partnerships, volunteers, and outreach events',
          url: 'https://www.ocps.net/community-outreach'
        },
        {
          label: 'Family Engagement',
          desc: 'Family involvement, digital communications, and ParentSquare',
          url: 'https://www.ocps.net/family-engagement-and-digital-outre'
        },
        {
          label: 'Legal / EEO / Title IX / ADA / 504',
          desc: 'Legal services, discrimination complaints, and compliance',
          url: 'https://www.ocps.net/legal-services'
        },
        {
          label: 'School Board / Public Records',
          desc: 'Board meetings, agendas, policies, and public records requests',
          url: 'https://www.ocps.net/school-board-services'
        },
        {
          label: 'Foundation for OCPS / Donations',
          desc: 'Scholarships, fundraising, and community giving',
          url: 'https://www.ocps.net/foundation-for-ocps'
        }
      ],
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
              id: 'media-relations',
              label: 'Media Relations',
              desc: 'Press inquiries, news, journalist contacts',
              icon: 'fa-newspaper',
              accent: '#7c3aed',
              iconBg: '#f3f0ff',
              iconColor: '#7c3aed',
              result: {
                department: 'Media Relations',
                icon: 'fa-newspaper',
                description:
                  'Media Relations is the official point of contact for all press and journalist inquiries about Orange County Public Schools.',
                contacts: [
                  { role: 'Main Line', info: '407-317-3458', type: 'phone' },
                  {
                    role: 'Website',
                    info: 'ocps.net/media-relations',
                    type: 'link',
                    url: 'https://www.ocps.net/media-relations'
                  }
                ],
                tags: ['Press', 'Media', 'Journalist', 'News', 'PR'],
                relatedDepts: ['Communications', 'Government Relations', 'Foundation for OCPS']
              }
            },
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
                description:
                  'The Communications department manages district-wide communications, newsletters, website content, social media, and internal and external messaging.',
                contacts: [
                  { role: 'Main Line', info: '407-317-3494', type: 'phone' },
                  {
                    role: 'Website',
                    info: 'ocps.net/communications',
                    type: 'link',
                    url: 'https://www.ocps.net/communications-home'
                  }
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
                  {
                    role: 'Website',
                    info: 'ocps.net/advertising',
                    type: 'link',
                    url: 'https://www.ocps.net/advertising-sales-home'
                  }
                ],
                tags: ['Advertising', 'Sponsorship', 'Partnerships'],
                relatedDepts: ['Communications', 'Foundation for OCPS']
              }
            }
          ]
        },
        {
          id: 'community-outreach',
          label: 'Community & Family Engagement',
          desc: 'Community outreach, family engagement, partnerships',
          icon: 'fa-hands',
          accent: '#be185d',
          iconBg: '#fdf2f8',
          iconColor: '#be185d',
          children: [
            {
              id: 'community-dept',
              label: 'Community Outreach',
              desc: 'Community partnerships, outreach events',
              icon: 'fa-hands',
              accent: '#be185d',
              iconBg: '#fdf2f8',
              iconColor: '#be185d',
              result: {
                department: 'Community Outreach',
                icon: 'fa-hands',
                description:
                  'Community Outreach builds partnerships between OCPS and local organizations, businesses, and community stakeholders to support students and schools.',
                contacts: [
                  { role: 'Main Line', info: '407-317-3323', type: 'phone' },
                  {
                    role: 'Website',
                    info: 'ocps.net/community-outreach',
                    type: 'link',
                    url: 'https://www.ocps.net/community-outreach'
                  }
                ],
                tags: ['Community', 'Partnerships', 'Outreach', 'Volunteers'],
                relatedDepts: ['Family Engagement and Digital Outreach', 'Foundation for OCPS']
              }
            },
            {
              id: 'family-engagement',
              label: 'Family Engagement & Digital Outreach',
              desc: 'Family involvement, digital communications to families',
              icon: 'fa-home',
              accent: '#047857',
              iconBg: '#ecfdf5',
              iconColor: '#047857',
              result: {
                department: 'Family Engagement and Digital Outreach',
                icon: 'fa-home',
                description:
                  'Family Engagement and Digital Outreach supports family involvement in education and manages digital communication channels for engaging parents and guardians.',
                contacts: [
                  { role: 'Main Line', info: '407-317-3300', type: 'phone' },
                  {
                    role: 'Website',
                    info: 'ocps.net/family-engagement',
                    type: 'link',
                    url: 'https://www.ocps.net/family-engagement-and-digital-outre'
                  }
                ],
                tags: ['Family', 'Parents', 'Engagement', 'Digital', 'ParentSquare'],
                relatedDepts: ['Community Outreach', 'Multilingual Services']
              }
            }
          ]
        },
        {
          id: 'legal',
          label: 'Legal Services / Compliance',
          desc: 'Legal questions, EEO, Title IX, labor relations',
          icon: 'fa-balance-scale-right',
          accent: '#374151',
          iconBg: '#f3f4f6',
          iconColor: '#374151',
          children: [
            {
              id: 'legal-dept',
              label: 'Legal Services',
              desc: 'General legal advice, litigation, contracts',
              icon: 'fa-gavel',
              accent: '#374151',
              iconBg: '#f3f4f6',
              iconColor: '#374151',
              result: {
                department: 'Legal Services',
                icon: 'fa-gavel',
                description:
                  'Legal Services provides legal counsel to the district, manages litigation, reviews contracts, and handles labor relations matters under the General Counsel.',
                contacts: [
                  { role: 'Main Line', info: '407-317-3411', type: 'phone' },
                  { role: 'Fax', info: '407-317-3348', type: 'phone' }
                ],
                tags: ['Legal', 'Litigation', 'Contracts', 'Labor Relations', 'Counsel'],
                relatedDepts: ['Professional Standards and HR Compliance', 'Risk Management', 'School Board Services']
              }
            },
            {
              id: 'eeo',
              label: 'Title IX / EEO / ADA / Section 504',
              desc: 'Discrimination, equal opportunity, compliance',
              icon: 'fa-universal-access',
              accent: '#dc2626',
              iconBg: '#fef2f2',
              iconColor: '#dc2626',
              result: {
                department: 'Legal Services / EEO & Compliance',
                icon: 'fa-universal-access',
                description:
                  'For Title IX, EEO, ADA, and Section 504 compliance matters, contact the designated OCPS compliance officers at the Ronald Blocker Educational Leadership Center.',
                contacts: [
                  { role: 'EEO Officer & Title IX Coordinator', info: 'Keshara Cowans - 407-317-3200 Ext. 2002921', type: 'person' },
                  { role: 'ADA Coordinator', info: 'Jay Cardinali - 407-317-3200 Ext. 2002923', type: 'person' },
                  { role: 'Section 504 Sr. Director', info: 'Tajuana Lee-Wenze - 407-317-3200 Ext. 2032688', type: 'person' }
                ],
                tags: ['Title IX', 'EEO', 'ADA', 'Section 504', 'Discrimination', 'Compliance'],
                relatedDepts: ['Legal Services', 'Human Resources', 'Professional Standards and HR Compliance']
              }
            }
          ]
        },
        {
          id: 'school-board-gov',
          label: 'School Board / Government Relations',
          desc: 'Board meetings, government affairs, public records',
          icon: 'fa-landmark',
          accent: '#003d8f',
          iconBg: '#e8f0fb',
          iconColor: '#003d8f',
          children: [
            {
              id: 'school-board-services',
              label: 'School Board Services',
              desc: 'Board meetings, agendas, public records, policies',
              icon: 'fa-chalkboard-teacher',
              accent: '#003d8f',
              iconBg: '#e8f0fb',
              iconColor: '#003d8f',
              result: {
                department: 'School Board Services',
                icon: 'fa-chalkboard-teacher',
                description:
                  'School Board Services supports the elected School Board with meeting logistics, agendas, minutes, public records requests, and board policy management.',
                contacts: [
                  { role: 'Deputy Superintendent', info: 'Bridget Williams - 407-317-3200 Ext 2002904', type: 'person' },
                  { role: 'Main Line', info: '407-317-3200', type: 'phone' }
                ],
                tags: ['School Board', 'Meetings', 'Policy', 'Public Records', 'Agendas'],
                relatedDepts: ['Legal Services', 'Communications', 'Government Relations']
              }
            },
            {
              id: 'government-relations',
              label: 'Government Relations',
              desc: 'Legislative affairs, lobbying, elected officials',
              icon: 'fa-flag',
              accent: '#1d4ed8',
              iconBg: '#eff6ff',
              iconColor: '#1d4ed8',
              result: {
                department: 'Government Relations',
                icon: 'fa-flag',
                description:
                  "Government Relations manages OCPS's relationships with federal, state, and local government entities, monitors legislation, and advocates for district priorities.",
                contacts: [
                  { role: 'Main Line', info: 'Marquise McMiller - 407-317-3200 Ext. 2002966', type: 'person' },
                  {
                    role: 'Website',
                    info: 'ocps.net/government-relations',
                    type: 'link',
                    url: 'https://www.ocps.net/government-relations'
                  }
                ],
                tags: ['Legislative', 'Government', 'Advocacy', 'Lobbying', 'Policy'],
                relatedDepts: ['School Board Services', 'Communications', 'Legal Services']
              }
            }
          ]
        },
        {
          id: 'foundation',
          label: 'Foundation for OCPS',
          desc: 'Donations, scholarships, fundraising, community giving',
          icon: 'fa-hand-holding-heart',
          accent: '#be185d',
          iconBg: '#fdf2f8',
          iconColor: '#be185d',
          result: {
            department: 'Foundation for OCPS',
            icon: 'fa-hand-holding-heart',
            description:
              'The Foundation for OCPS is a nonprofit organization that raises private funds to support scholarships, innovative classroom programs, and community giving for OCPS students and teachers.',
            contacts: [
              { role: 'Mainline', info: '407-317-3261', type: 'phone' },
              {
                role: 'Website',
                info: 'ocps.net/foundation',
                type: 'link',
                url: 'https://www.ocps.net/foundation-for-ocps'
              }
            ],
            tags: ['Foundation', 'Scholarships', 'Donations', 'Fundraising', 'Grants'],
            relatedDepts: ['Communications', 'Community Outreach']
          }
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
      subOptions: [
        {
          label: 'Title I & Federal Program Compliance',
          desc: 'Title I schools, ESSA requirements, and federal funding',
          url: 'https://www.ocps.net/federal-programs'
        },
        {
          label: 'Teacher & Administrator Evaluations',
          desc: 'IPEGS evaluation system and performance protocols',
          url: 'https://www.ocps.net/evaluation-systems'
        }
      ],
      children: [
        {
          id: 'federal-programs',
          label: 'Federal Programs (Title I, etc.)',
          desc: 'Title I schools, federal program compliance',
          icon: 'fa-flag-usa',
          accent: '#1d4ed8',
          iconBg: '#eff6ff',
          iconColor: '#1d4ed8',
          result: {
            department: 'Federal Programs',
            icon: 'fa-flag-usa',
            description:
              'Federal Programs manages Title I and other federally funded educational programs, ensuring compliance with federal regulations and maximizing resources for high-need schools.',
            contacts: [
              { role: 'Main Line', info: '407-317-3485', type: 'phone' },
              {
                role: 'Website',
                info: 'ocps.net/federal-programs',
                type: 'link',
                url: 'https://www.ocps.net/federal-programs'
              }
            ],
            tags: ['Title I', 'Federal', 'Funding', 'Compliance', 'ESSA'],
            relatedDepts: ['Finance', 'Grants', 'Accountability', 'Homeless Education']
          }
        },
        {
          id: 'evaluation-systems',
          label: 'Evaluation Systems',
          desc: 'IPEGS, teacher/administrator evaluations',
          icon: 'fa-clipboard-check',
          accent: '#047857',
          iconBg: '#ecfdf5',
          iconColor: '#047857',
          result: {
            department: 'Evaluation Systems',
            icon: 'fa-clipboard-check',
            description:
              'Evaluation Systems manages teacher and administrator performance evaluation systems, including IPEGS (Instructional Personnel Evaluation and Growth System) and related protocols.',
            contacts: [
              { role: 'Email', info: 'EvaluationSystems@ocps.net', type: 'email' },
              {
                role: 'Website',
                info: 'ocps.net/evaluation-systems',
                type: 'link',
                url: 'https://www.ocps.net/evaluation-systems'
              }
            ],
            tags: ['IPEGS', 'Teacher Evaluation', 'Administrator Evaluation', 'Performance'],
            relatedDepts: ['Human Resources', 'Recruitment and Evaluation', 'Professional Standards and HR Compliance']
          }
        }
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

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      results.push(...buildSearchIndex(child, [...path, node]));
    }
  }

  return results;
}

const SEARCH_INDEX = buildSearchIndex(CALL_TREE);
