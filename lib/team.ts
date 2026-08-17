export type TeamMember = {
  slug: string
  name: string
  role: string
  department: string
  photo: string
  summary: string
  responsibilities: string[]
}

export const team: TeamMember[] = [
  { slug: 'ogochukwu-friday-ikwuogu', name: 'Engr. Ogochukwu Friday Ikwuogu', role: 'Managing Director / CEO', department: 'Executive Leadership', photo: '/team/staff-ceo.jpg', summary: 'Leads SchoolGrade Link’s strategy across cybersecurity education, enterprise technology, and critical infrastructure protection.', responsibilities: ['Strategic leadership and governance', 'Client and partner relationships', 'Critical infrastructure security direction'] },
  { slug: 'achi-joal', name: 'Achi Joal', role: 'Head of Product', department: 'Product', photo: '/team/staff-product.jpg', summary: 'Guides the development of technology offerings that translate client requirements into dependable outcomes.', responsibilities: ['Product roadmap and solution design', 'Service quality and delivery alignment', 'Cross-functional product coordination'] },
  { slug: 'benita-ezekiel', name: 'Benita Ezekiel', role: 'Operations & HR Manager', department: 'Operations', photo: '/team/staff-hr.jpg', summary: 'Coordinates people operations and delivery processes that support reliable work across the organisation.', responsibilities: ['Operational planning', 'People and HR coordination', 'Delivery process management'] },
  { slug: 'buchi-ehimatie', name: 'Buchi Ehimatie', role: 'Accounts / Finance Officer', department: 'Finance', photo: '/team/staff-finance.jpg', summary: 'Supports sound financial administration for projects, procurement, and organisational operations.', responsibilities: ['Financial records and reporting', 'Project and procurement support', 'Vendor payment coordination'] },
  { slug: 'favour-esege', name: 'Favour Esege', role: 'Sales Lead', department: 'Sales', photo: '/team/staff-sales.jpg', summary: 'Connects client needs to practical cybersecurity, infrastructure, and hardware solutions.', responsibilities: ['Client discovery', 'Solution and proposal coordination', 'Account development'] },
  { slug: 'unique-egbu', name: 'Unique Egbu', role: 'Marketing Lead', department: 'Marketing', photo: '/team/staff-marketing.jpg', summary: 'Leads the communication of SchoolGrade Link’s expertise, services, and market presence.', responsibilities: ['Brand communications', 'Campaign planning', 'Market engagement'] },
  { slug: 'ewomazino-ighoroje', name: 'Ewomazino Ighoroje', role: 'Business Development Rep', department: 'Business Development', photo: '/team/staff-bdr.jpg', summary: 'Builds relationships with organisations seeking trusted cybersecurity and infrastructure support.', responsibilities: ['Prospect engagement', 'Partnership development', 'Opportunity qualification'] },
  { slug: 'favor-nnorom', name: 'Favor Nnorom', role: 'Customer Success', department: 'Customer Success', photo: '/team/staff-cs.jpg', summary: 'Supports clients through a clear, responsive experience from project kickoff through delivery.', responsibilities: ['Client onboarding', 'Delivery follow-through', 'Service feedback coordination'] },
  { slug: 'joseph-victor', name: 'Joseph Victor', role: 'IT Lead / CTO', department: 'Technology', photo: '/team/staff-cto.jpg', summary: 'Leads technical architecture and implementation across secure IT, OT, and infrastructure engagements.', responsibilities: ['Technical architecture', 'Security implementation oversight', 'Technology delivery leadership'] },
  { slug: 'alli-joah', name: 'Mr. Alli Joah', role: 'Installation Engineer', department: 'Engineering', photo: '/team/staff-install.jpg', summary: 'Delivers on-site installation and integration work for SchoolGrade Link technology solutions.', responsibilities: ['Equipment installation', 'Site integration support', 'Commissioning and validation'] },
]

export const teamBySlug = new Map(team.map((member) => [member.slug, member]))