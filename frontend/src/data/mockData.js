export const leagueInfo = {
  name: 'KSouth League',
  season: '2025/2026',
  currentMatchday: 5,
  totalMatchdays: 14,
  founded: '2015',
  headquarters: 'KSouth Sports Complex',
  chairman: 'Mr. Thabo Nzimande',
  secretary: 'Ms. Lindiwe Khumalo',
  website: 'www.ksouthleague.co.za',
};

export const teams = [
  {
    id: 1, name: 'KSouth United', shortName: 'KSU', primaryColor: '#8B0000', secondaryColor: '#FFD700',
    stadium: 'Unity Park', capacity: 3500, manager: 'David Nkosi', founded: 2008,
    description: 'The most successful club in KSouth League history. Known for their passionate fanbase and attacking football style.',
  },
  {
    id: 2, name: 'Riverside FC', shortName: 'RFC', primaryColor: '#003580', secondaryColor: '#FFFFFF',
    stadium: 'River Bank Arena', capacity: 2800, manager: 'Samuel Dube', founded: 2010,
    description: 'Riverside FC are renowned for their solid defensive displays and clinical counter-attacking play.',
  },
  {
    id: 3, name: 'City Stars', shortName: 'CST', primaryColor: '#CC0000', secondaryColor: '#1a1a1a',
    stadium: 'Star City Arena', capacity: 4000, manager: 'Mike Zwane', founded: 2005,
    description: 'City Stars boast the largest stadium in the league and a rich tradition of nurturing local talent.',
  },
  {
    id: 4, name: 'Valley Athletic', shortName: 'VLA', primaryColor: '#006400', secondaryColor: '#FFFF00',
    stadium: 'Valley End Ground', capacity: 2500, manager: 'Peter Mokoena', founded: 2012,
    description: 'Valley Athletic are known for their disciplined structure and incredible team spirit.',
  },
  {
    id: 5, name: 'Eastern Lions', shortName: 'ELI', primaryColor: '#FF6600', secondaryColor: '#1a1a1a',
    stadium: "Lion's Den", capacity: 3000, manager: 'James Sithole', founded: 2009,
    description: 'Eastern Lions bring raw energy and flair to every match, with a fearless attacking approach.',
  },
  {
    id: 6, name: 'Harbor Town', shortName: 'HTN', primaryColor: '#002366', secondaryColor: '#C0C0C0',
    stadium: 'Port End Ground', capacity: 2200, manager: 'Thomas Khoza', founded: 2014,
    description: 'Harbor Town FC is a young club growing steadily, with a strong youth development programme.',
  },
  {
    id: 7, name: 'Westfield FC', shortName: 'WFC', primaryColor: '#DAA520', secondaryColor: '#1a1a1a',
    stadium: 'Westfield Park', capacity: 2000, manager: 'Robert Bhengu', founded: 2016,
    description: 'Westfield FC are the newest club in the league and are determined to prove themselves.',
  },
  {
    id: 8, name: 'Northern Rangers', shortName: 'NRG', primaryColor: '#4B0082', secondaryColor: '#FFFFFF',
    stadium: 'Rangers Park', capacity: 2600, manager: 'Chris Mhlongo', founded: 2011,
    description: 'Northern Rangers have a reputation for giant-killing performances and never giving up.',
  },
];

export const players = [
  // KSouth United (teamId: 1)
  { id: 1, name: 'Lungelo Dlamini', teamId: 1, position: 'GK', jerseyNumber: 1, age: 28, nationality: 'South African', appearances: 4, goals: 0, assists: 0, yellowCards: 0, redCards: 0, cleanSheets: 1 },
  { id: 2, name: 'Njabulo Ngcobo', teamId: 1, position: 'DEF', jerseyNumber: 4, age: 26, nationality: 'South African', appearances: 4, goals: 0, assists: 1, yellowCards: 1, redCards: 0, cleanSheets: 0 },
  { id: 3, name: 'Zakhele Bhengu', teamId: 1, position: 'DEF', jerseyNumber: 5, age: 29, nationality: 'South African', appearances: 4, goals: 0, assists: 0, yellowCards: 2, redCards: 0, cleanSheets: 0 },
  { id: 4, name: 'Thulani Hadebe', teamId: 1, position: 'DEF', jerseyNumber: 6, age: 24, nationality: 'Zimbabwean', appearances: 4, goals: 0, assists: 0, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 5, name: 'Sandile Msweli', teamId: 1, position: 'DEF', jerseyNumber: 3, age: 27, nationality: 'South African', appearances: 3, goals: 0, assists: 0, yellowCards: 1, redCards: 0, cleanSheets: 0 },
  { id: 6, name: 'Bongani Dlamini', teamId: 1, position: 'MID', jerseyNumber: 8, age: 25, nationality: 'South African', appearances: 4, goals: 3, assists: 2, yellowCards: 1, redCards: 0, cleanSheets: 0 },
  { id: 7, name: 'Thando Mkhize', teamId: 1, position: 'MID', jerseyNumber: 10, age: 23, nationality: 'South African', appearances: 4, goals: 1, assists: 2, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 8, name: 'Sibusiso Ntshangase', teamId: 1, position: 'MID', jerseyNumber: 14, age: 28, nationality: 'South African', appearances: 4, goals: 0, assists: 1, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 9, name: 'Sipho Ndaba', teamId: 1, position: 'FWD', jerseyNumber: 9, age: 22, nationality: 'South African', appearances: 4, goals: 4, assists: 1, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 10, name: 'Mxolisi Kunene', teamId: 1, position: 'FWD', jerseyNumber: 11, age: 24, nationality: 'South African', appearances: 3, goals: 0, assists: 1, yellowCards: 1, redCards: 0, cleanSheets: 0 },
  { id: 11, name: 'Lindani Cele', teamId: 1, position: 'MID', jerseyNumber: 7, age: 21, nationality: 'South African', appearances: 2, goals: 0, assists: 0, yellowCards: 0, redCards: 0, cleanSheets: 0 },

  // Riverside FC (teamId: 2)
  { id: 12, name: 'Nkosinathi Mncwango', teamId: 2, position: 'GK', jerseyNumber: 1, age: 30, nationality: 'South African', appearances: 4, goals: 0, assists: 0, yellowCards: 0, redCards: 0, cleanSheets: 2 },
  { id: 13, name: 'Sibonelo Majola', teamId: 2, position: 'DEF', jerseyNumber: 2, age: 25, nationality: 'South African', appearances: 4, goals: 0, assists: 1, yellowCards: 1, redCards: 0, cleanSheets: 0 },
  { id: 14, name: 'Langelihle Nxumalo', teamId: 2, position: 'DEF', jerseyNumber: 5, age: 27, nationality: 'South African', appearances: 4, goals: 0, assists: 0, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 15, name: 'Nhlanhla Mthembu', teamId: 2, position: 'DEF', jerseyNumber: 6, age: 26, nationality: 'South African', appearances: 4, goals: 1, assists: 0, yellowCards: 2, redCards: 0, cleanSheets: 0 },
  { id: 16, name: 'Nkululeko Zungu', teamId: 2, position: 'DEF', jerseyNumber: 3, age: 23, nationality: 'South African', appearances: 4, goals: 0, assists: 0, yellowCards: 1, redCards: 0, cleanSheets: 0 },
  { id: 17, name: 'Andile Cele', teamId: 2, position: 'MID', jerseyNumber: 10, age: 24, nationality: 'South African', appearances: 4, goals: 3, assists: 2, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 18, name: 'Mduduzi Mdlalose', teamId: 2, position: 'MID', jerseyNumber: 8, age: 22, nationality: 'South African', appearances: 4, goals: 0, assists: 1, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 19, name: 'Vusi Mkhize', teamId: 2, position: 'MID', jerseyNumber: 7, age: 29, nationality: 'South African', appearances: 3, goals: 0, assists: 0, yellowCards: 1, redCards: 0, cleanSheets: 0 },
  { id: 20, name: 'Sibusiso Khoza', teamId: 2, position: 'FWD', jerseyNumber: 9, age: 26, nationality: 'South African', appearances: 4, goals: 1, assists: 1, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 21, name: 'Lindani Ngema', teamId: 2, position: 'FWD', jerseyNumber: 11, age: 21, nationality: 'South African', appearances: 3, goals: 0, assists: 1, yellowCards: 0, redCards: 0, cleanSheets: 0 },

  // City Stars (teamId: 3)
  { id: 22, name: 'Mandla Mthethwa', teamId: 3, position: 'GK', jerseyNumber: 1, age: 32, nationality: 'South African', appearances: 4, goals: 0, assists: 0, yellowCards: 0, redCards: 0, cleanSheets: 1 },
  { id: 23, name: 'Siphamandla Gumede', teamId: 3, position: 'DEF', jerseyNumber: 2, age: 25, nationality: 'South African', appearances: 4, goals: 0, assists: 1, yellowCards: 1, redCards: 0, cleanSheets: 0 },
  { id: 24, name: 'Ntokozo Majozi', teamId: 3, position: 'DEF', jerseyNumber: 5, age: 28, nationality: 'South African', appearances: 4, goals: 0, assists: 0, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 25, name: 'Lungani Sithole', teamId: 3, position: 'DEF', jerseyNumber: 4, age: 26, nationality: 'South African', appearances: 4, goals: 0, assists: 0, yellowCards: 2, redCards: 0, cleanSheets: 0 },
  { id: 26, name: 'Lerato Modise', teamId: 3, position: 'MID', jerseyNumber: 10, age: 27, nationality: 'South African', appearances: 4, goals: 4, assists: 1, yellowCards: 1, redCards: 0, cleanSheets: 0 },
  { id: 27, name: 'Thabo Nkosi', teamId: 3, position: 'FWD', jerseyNumber: 9, age: 25, nationality: 'South African', appearances: 4, goals: 4, assists: 0, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 28, name: 'Kagiso Sithole', teamId: 3, position: 'FWD', jerseyNumber: 11, age: 22, nationality: 'South African', appearances: 4, goals: 1, assists: 2, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 29, name: 'Mpendulo Zwane', teamId: 3, position: 'MID', jerseyNumber: 8, age: 24, nationality: 'South African', appearances: 4, goals: 0, assists: 2, yellowCards: 1, redCards: 0, cleanSheets: 0 },
  { id: 30, name: 'Buhle Mthembu', teamId: 3, position: 'DEF', jerseyNumber: 3, age: 23, nationality: 'South African', appearances: 3, goals: 0, assists: 0, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 31, name: 'Zola Khumalo', teamId: 3, position: 'MID', jerseyNumber: 7, age: 26, nationality: 'South African', appearances: 4, goals: 0, assists: 1, yellowCards: 0, redCards: 0, cleanSheets: 0 },

  // Valley Athletic (teamId: 4)
  { id: 32, name: 'Lethiwe Ndlovu', teamId: 4, position: 'GK', jerseyNumber: 1, age: 31, nationality: 'South African', appearances: 4, goals: 0, assists: 0, yellowCards: 0, redCards: 0, cleanSheets: 3 },
  { id: 33, name: 'Mpho Molefe', teamId: 4, position: 'DEF', jerseyNumber: 5, age: 27, nationality: 'Lesothan', appearances: 4, goals: 0, assists: 0, yellowCards: 1, redCards: 0, cleanSheets: 0 },
  { id: 34, name: 'Sizwe Mabunda', teamId: 4, position: 'DEF', jerseyNumber: 4, age: 25, nationality: 'South African', appearances: 4, goals: 0, assists: 0, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 35, name: 'Thokozani Ngubane', teamId: 4, position: 'DEF', jerseyNumber: 3, age: 26, nationality: 'South African', appearances: 3, goals: 0, assists: 1, yellowCards: 1, redCards: 0, cleanSheets: 0 },
  { id: 36, name: 'Teboho Lekola', teamId: 4, position: 'FWD', jerseyNumber: 9, age: 23, nationality: 'South African', appearances: 4, goals: 3, assists: 1, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 37, name: 'Sifiso Mahlangu', teamId: 4, position: 'MID', jerseyNumber: 10, age: 24, nationality: 'South African', appearances: 4, goals: 0, assists: 2, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 38, name: 'Langa Mthiyane', teamId: 4, position: 'MID', jerseyNumber: 8, age: 22, nationality: 'South African', appearances: 4, goals: 0, assists: 0, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 39, name: 'Siyanda Zungu', teamId: 4, position: 'MID', jerseyNumber: 7, age: 28, nationality: 'South African', appearances: 3, goals: 0, assists: 1, yellowCards: 2, redCards: 0, cleanSheets: 0 },
  { id: 40, name: 'Ntokozo Dlamini', teamId: 4, position: 'FWD', jerseyNumber: 11, age: 21, nationality: 'South African', appearances: 3, goals: 0, assists: 0, yellowCards: 0, redCards: 0, cleanSheets: 0 },

  // Eastern Lions (teamId: 5)
  { id: 41, name: 'Sipho Mhlongo', teamId: 5, position: 'GK', jerseyNumber: 1, age: 29, nationality: 'South African', appearances: 4, goals: 0, assists: 0, yellowCards: 0, redCards: 0, cleanSheets: 1 },
  { id: 42, name: 'Lungelo Mthembu', teamId: 5, position: 'DEF', jerseyNumber: 4, age: 26, nationality: 'South African', appearances: 4, goals: 0, assists: 0, yellowCards: 1, redCards: 0, cleanSheets: 0 },
  { id: 43, name: 'Thandolwethu Mbatha', teamId: 5, position: 'DEF', jerseyNumber: 5, age: 28, nationality: 'South African', appearances: 4, goals: 0, assists: 0, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 44, name: 'Nkosana Msweli', teamId: 5, position: 'DEF', jerseyNumber: 3, age: 24, nationality: 'South African', appearances: 4, goals: 0, assists: 1, yellowCards: 2, redCards: 0, cleanSheets: 0 },
  { id: 45, name: 'Senzo Mthethwa', teamId: 5, position: 'FWD', jerseyNumber: 9, age: 26, nationality: 'South African', appearances: 4, goals: 4, assists: 0, yellowCards: 1, redCards: 0, cleanSheets: 0 },
  { id: 46, name: 'Banele Zulu', teamId: 5, position: 'FWD', jerseyNumber: 11, age: 22, nationality: 'South African', appearances: 4, goals: 3, assists: 1, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 47, name: 'Siphiwe Gumbi', teamId: 5, position: 'MID', jerseyNumber: 10, age: 25, nationality: 'South African', appearances: 4, goals: 0, assists: 2, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 48, name: 'Melusi Ntuli', teamId: 5, position: 'MID', jerseyNumber: 8, age: 23, nationality: 'South African', appearances: 4, goals: 0, assists: 1, yellowCards: 1, redCards: 0, cleanSheets: 0 },
  { id: 49, name: 'Bonginkosi Hadebe', teamId: 5, position: 'MID', jerseyNumber: 7, age: 27, nationality: 'South African', appearances: 3, goals: 0, assists: 0, yellowCards: 0, redCards: 0, cleanSheets: 0 },

  // Harbor Town (teamId: 6)
  { id: 50, name: 'Siyabonga Dube', teamId: 6, position: 'GK', jerseyNumber: 1, age: 27, nationality: 'South African', appearances: 4, goals: 0, assists: 0, yellowCards: 1, redCards: 0, cleanSheets: 0 },
  { id: 51, name: 'Muzi Masondo', teamId: 6, position: 'DEF', jerseyNumber: 5, age: 25, nationality: 'South African', appearances: 4, goals: 0, assists: 0, yellowCards: 1, redCards: 0, cleanSheets: 0 },
  { id: 52, name: 'Sifiso Ndlela', teamId: 6, position: 'DEF', jerseyNumber: 4, age: 28, nationality: 'South African', appearances: 4, goals: 0, assists: 0, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 53, name: 'Bongani Khoza', teamId: 6, position: 'DEF', jerseyNumber: 3, age: 26, nationality: 'South African', appearances: 3, goals: 0, assists: 0, yellowCards: 2, redCards: 0, cleanSheets: 0 },
  { id: 54, name: 'Lucky Khumalo', teamId: 6, position: 'FWD', jerseyNumber: 9, age: 24, nationality: 'South African', appearances: 4, goals: 3, assists: 0, yellowCards: 1, redCards: 0, cleanSheets: 0 },
  { id: 55, name: 'Nhlanhlayethu Mbatha', teamId: 6, position: 'MID', jerseyNumber: 10, age: 23, nationality: 'South African', appearances: 4, goals: 0, assists: 1, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 56, name: 'Sanele Nkosi', teamId: 6, position: 'MID', jerseyNumber: 8, age: 22, nationality: 'South African', appearances: 4, goals: 0, assists: 0, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 57, name: 'Thabo Sithole', teamId: 6, position: 'FWD', jerseyNumber: 11, age: 21, nationality: 'South African', appearances: 3, goals: 0, assists: 1, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 58, name: 'Lungani Mhlanga', teamId: 6, position: 'MID', jerseyNumber: 7, age: 26, nationality: 'South African', appearances: 3, goals: 0, assists: 0, yellowCards: 1, redCards: 1, cleanSheets: 0 },

  // Westfield FC (teamId: 7)
  { id: 59, name: 'Nduduzo Khoza', teamId: 7, position: 'GK', jerseyNumber: 1, age: 26, nationality: 'South African', appearances: 4, goals: 0, assists: 0, yellowCards: 1, redCards: 0, cleanSheets: 0 },
  { id: 60, name: 'Mthokozisi Ncube', teamId: 7, position: 'DEF', jerseyNumber: 4, age: 27, nationality: 'Zimbabwean', appearances: 4, goals: 0, assists: 0, yellowCards: 2, redCards: 0, cleanSheets: 0 },
  { id: 61, name: 'Nkosinathi Mchunu', teamId: 7, position: 'DEF', jerseyNumber: 5, age: 25, nationality: 'South African', appearances: 4, goals: 0, assists: 0, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 62, name: 'Themba Mthembu', teamId: 7, position: 'DEF', jerseyNumber: 3, age: 24, nationality: 'South African', appearances: 4, goals: 0, assists: 0, yellowCards: 1, redCards: 1, cleanSheets: 0 },
  { id: 63, name: 'Yusuf Patel', teamId: 7, position: 'FWD', jerseyNumber: 9, age: 23, nationality: 'South African', appearances: 4, goals: 1, assists: 1, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 64, name: 'Siphamandla Ntuli', teamId: 7, position: 'FWD', jerseyNumber: 11, age: 22, nationality: 'South African', appearances: 4, goals: 1, assists: 0, yellowCards: 1, redCards: 0, cleanSheets: 0 },
  { id: 65, name: 'Bonginkosi Nkosi', teamId: 7, position: 'MID', jerseyNumber: 10, age: 25, nationality: 'South African', appearances: 4, goals: 0, assists: 0, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 66, name: 'Mlungisi Shabalala', teamId: 7, position: 'MID', jerseyNumber: 8, age: 21, nationality: 'South African', appearances: 3, goals: 0, assists: 0, yellowCards: 1, redCards: 0, cleanSheets: 0 },
  { id: 67, name: 'Luphelo Dlamini', teamId: 7, position: 'MID', jerseyNumber: 7, age: 20, nationality: 'South African', appearances: 3, goals: 0, assists: 1, yellowCards: 0, redCards: 0, cleanSheets: 0 },

  // Northern Rangers (teamId: 8)
  { id: 68, name: 'Thando Zwane', teamId: 8, position: 'GK', jerseyNumber: 1, age: 28, nationality: 'South African', appearances: 4, goals: 0, assists: 0, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 69, name: 'Sipho Cele', teamId: 8, position: 'DEF', jerseyNumber: 4, age: 26, nationality: 'South African', appearances: 4, goals: 0, assists: 0, yellowCards: 1, redCards: 0, cleanSheets: 0 },
  { id: 70, name: 'Busiwe Majola', teamId: 8, position: 'DEF', jerseyNumber: 5, age: 25, nationality: 'South African', appearances: 4, goals: 0, assists: 0, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 71, name: 'Nhlanhla Dube', teamId: 8, position: 'DEF', jerseyNumber: 3, age: 27, nationality: 'South African', appearances: 4, goals: 0, assists: 0, yellowCards: 2, redCards: 0, cleanSheets: 0 },
  { id: 72, name: 'Dumisani Shabalala', teamId: 8, position: 'FWD', jerseyNumber: 9, age: 24, nationality: 'South African', appearances: 4, goals: 4, assists: 0, yellowCards: 1, redCards: 0, cleanSheets: 0 },
  { id: 73, name: 'Ntokozo Mthembu', teamId: 8, position: 'MID', jerseyNumber: 10, age: 23, nationality: 'South African', appearances: 4, goals: 0, assists: 1, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 74, name: 'Musa Khumalo', teamId: 8, position: 'MID', jerseyNumber: 8, age: 22, nationality: 'South African', appearances: 4, goals: 0, assists: 2, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 75, name: 'Lindani Mthiyane', teamId: 8, position: 'FWD', jerseyNumber: 11, age: 20, nationality: 'South African', appearances: 3, goals: 0, assists: 1, yellowCards: 0, redCards: 0, cleanSheets: 0 },
  { id: 76, name: 'Sibonelo Mbatha', teamId: 8, position: 'MID', jerseyNumber: 7, age: 25, nationality: 'South African', appearances: 3, goals: 0, assists: 0, yellowCards: 1, redCards: 0, cleanSheets: 0 },
];

export const results = [
  // Matchday 1 - April 5, 2026
  {
    id: 1, matchday: 1, date: '2026-04-05', time: '15:00',
    homeTeamId: 1, awayTeamId: 6, homeScore: 2, awayScore: 1,
    venue: 'Unity Park',
    scorers: [
      { playerId: 6, playerName: 'Bongani Dlamini', teamId: 1, minute: 22 },
      { playerId: 9, playerName: 'Sipho Ndaba', teamId: 1, minute: 67 },
      { playerId: 54, playerName: 'Lucky Khumalo', teamId: 6, minute: 80 },
    ],
    yellowCards: [{ playerName: 'Zakhele Bhengu', teamId: 1, minute: 55 }],
    redCards: [],
    motm: { playerId: 9, playerName: 'Sipho Ndaba', teamId: 1 },
  },
  {
    id: 2, matchday: 1, date: '2026-04-05', time: '15:00',
    homeTeamId: 2, awayTeamId: 4, homeScore: 0, awayScore: 0,
    venue: 'River Bank Arena',
    scorers: [],
    yellowCards: [{ playerName: 'Nkululeko Zungu', teamId: 2, minute: 67 }],
    redCards: [],
    motm: { playerId: 12, playerName: 'Nkosinathi Mncwango', teamId: 2 },
  },
  {
    id: 3, matchday: 1, date: '2026-04-05', time: '15:00',
    homeTeamId: 3, awayTeamId: 7, homeScore: 3, awayScore: 0,
    venue: 'Star City Arena',
    scorers: [
      { playerId: 27, playerName: 'Thabo Nkosi', teamId: 3, minute: 15 },
      { playerId: 26, playerName: 'Lerato Modise', teamId: 3, minute: 43 },
      { playerId: 26, playerName: 'Lerato Modise', teamId: 3, minute: 78 },
    ],
    yellowCards: [{ playerName: 'Mthokozisi Ncube', teamId: 7, minute: 30 }],
    redCards: [],
    motm: { playerId: 26, playerName: 'Lerato Modise', teamId: 3 },
  },
  {
    id: 4, matchday: 1, date: '2026-04-05', time: '15:00',
    homeTeamId: 5, awayTeamId: 8, homeScore: 2, awayScore: 1,
    venue: "Lion's Den",
    scorers: [
      { playerId: 45, playerName: 'Senzo Mthethwa', teamId: 5, minute: 30 },
      { playerId: 46, playerName: 'Banele Zulu', teamId: 5, minute: 55 },
      { playerId: 72, playerName: 'Dumisani Shabalala', teamId: 8, minute: 71 },
    ],
    yellowCards: [],
    redCards: [],
    motm: { playerId: 45, playerName: 'Senzo Mthethwa', teamId: 5 },
  },

  // Matchday 2 - April 12, 2026
  {
    id: 5, matchday: 2, date: '2026-04-12', time: '15:00',
    homeTeamId: 4, awayTeamId: 5, homeScore: 0, awayScore: 1,
    venue: 'Valley End Ground',
    scorers: [
      { playerId: 45, playerName: 'Senzo Mthethwa', teamId: 5, minute: 88 },
    ],
    yellowCards: [{ playerName: 'Siyanda Zungu', teamId: 4, minute: 45 }],
    redCards: [],
    motm: { playerId: 41, playerName: 'Sipho Mhlongo', teamId: 5 },
  },
  {
    id: 6, matchday: 2, date: '2026-04-12', time: '15:00',
    homeTeamId: 8, awayTeamId: 3, homeScore: 2, awayScore: 1,
    venue: 'Rangers Park',
    scorers: [
      { playerId: 72, playerName: 'Dumisani Shabalala', teamId: 8, minute: 20 },
      { playerId: 72, playerName: 'Dumisani Shabalala', teamId: 8, minute: 65 },
      { playerId: 26, playerName: 'Lerato Modise', teamId: 3, minute: 45 },
    ],
    yellowCards: [{ playerName: 'Lungani Sithole', teamId: 3, minute: 60 }],
    redCards: [],
    motm: { playerId: 72, playerName: 'Dumisani Shabalala', teamId: 8 },
  },
  {
    id: 7, matchday: 2, date: '2026-04-12', time: '15:00',
    homeTeamId: 6, awayTeamId: 2, homeScore: 1, awayScore: 1,
    venue: 'Port End Ground',
    scorers: [
      { playerId: 54, playerName: 'Lucky Khumalo', teamId: 6, minute: 34 },
      { playerId: 17, playerName: 'Andile Cele', teamId: 2, minute: 79 },
    ],
    yellowCards: [{ playerName: 'Siyabonga Dube', teamId: 6, minute: 25 }],
    redCards: [],
    motm: { playerId: 17, playerName: 'Andile Cele', teamId: 2 },
  },
  {
    id: 8, matchday: 2, date: '2026-04-12', time: '15:00',
    homeTeamId: 7, awayTeamId: 1, homeScore: 0, awayScore: 3,
    venue: 'Westfield Park',
    scorers: [
      { playerId: 9, playerName: 'Sipho Ndaba', teamId: 1, minute: 12 },
      { playerId: 9, playerName: 'Sipho Ndaba', teamId: 1, minute: 58 },
      { playerId: 6, playerName: 'Bongani Dlamini', teamId: 1, minute: 73 },
    ],
    yellowCards: [{ playerName: 'Themba Mthembu', teamId: 7, minute: 80 }],
    redCards: [],
    motm: { playerId: 9, playerName: 'Sipho Ndaba', teamId: 1 },
  },

  // Matchday 3 - April 26, 2026
  {
    id: 9, matchday: 3, date: '2026-04-26', time: '15:00',
    homeTeamId: 5, awayTeamId: 1, homeScore: 1, awayScore: 2,
    venue: "Lion's Den",
    scorers: [
      { playerId: 46, playerName: 'Banele Zulu', teamId: 5, minute: 67 },
      { playerId: 6, playerName: 'Bongani Dlamini', teamId: 1, minute: 44 },
      { playerId: 7, playerName: 'Thando Mkhize', teamId: 1, minute: 82 },
    ],
    yellowCards: [{ playerName: 'Nkosana Msweli', teamId: 5, minute: 35 }],
    redCards: [],
    motm: { playerId: 7, playerName: 'Thando Mkhize', teamId: 1 },
  },
  {
    id: 10, matchday: 3, date: '2026-04-26', time: '15:00',
    homeTeamId: 3, awayTeamId: 6, homeScore: 4, awayScore: 1,
    venue: 'Star City Arena',
    scorers: [
      { playerId: 27, playerName: 'Thabo Nkosi', teamId: 3, minute: 8 },
      { playerId: 26, playerName: 'Lerato Modise', teamId: 3, minute: 30 },
      { playerId: 27, playerName: 'Thabo Nkosi', teamId: 3, minute: 56 },
      { playerId: 28, playerName: 'Kagiso Sithole', teamId: 3, minute: 78 },
      { playerId: 54, playerName: 'Lucky Khumalo', teamId: 6, minute: 90 },
    ],
    yellowCards: [{ playerName: 'Bongani Khoza', teamId: 6, minute: 44 }],
    redCards: [],
    motm: { playerId: 27, playerName: 'Thabo Nkosi', teamId: 3 },
  },
  {
    id: 11, matchday: 3, date: '2026-04-26', time: '15:00',
    homeTeamId: 2, awayTeamId: 8, homeScore: 2, awayScore: 1,
    venue: 'River Bank Arena',
    scorers: [
      { playerId: 17, playerName: 'Andile Cele', teamId: 2, minute: 24 },
      { playerId: 15, playerName: 'Nhlanhla Mthembu', teamId: 2, minute: 68 },
      { playerId: 72, playerName: 'Dumisani Shabalala', teamId: 8, minute: 45 },
    ],
    yellowCards: [{ playerName: 'Nhlanhla Dube', teamId: 8, minute: 55 }],
    redCards: [],
    motm: { playerId: 12, playerName: 'Nkosinathi Mncwango', teamId: 2 },
  },
  {
    id: 12, matchday: 3, date: '2026-04-26', time: '15:00',
    homeTeamId: 4, awayTeamId: 7, homeScore: 2, awayScore: 0,
    venue: 'Valley End Ground',
    scorers: [
      { playerId: 36, playerName: 'Teboho Lekola', teamId: 4, minute: 15 },
      { playerId: 36, playerName: 'Teboho Lekola', teamId: 4, minute: 55 },
    ],
    yellowCards: [],
    redCards: [{ playerName: 'Themba Mthembu', teamId: 7, minute: 70 }],
    motm: { playerId: 32, playerName: 'Lethiwe Ndlovu', teamId: 4 },
  },

  // Matchday 4 - May 3, 2026
  {
    id: 13, matchday: 4, date: '2026-05-03', time: '15:00',
    homeTeamId: 1, awayTeamId: 3, homeScore: 1, awayScore: 1,
    venue: 'Unity Park',
    scorers: [
      { playerId: 9, playerName: 'Sipho Ndaba', teamId: 1, minute: 38 },
      { playerId: 27, playerName: 'Thabo Nkosi', teamId: 3, minute: 72 },
    ],
    yellowCards: [
      { playerName: 'Lerato Modise', teamId: 3, minute: 50 },
      { playerName: 'Zakhele Bhengu', teamId: 1, minute: 85 },
    ],
    redCards: [],
    motm: { playerId: 1, playerName: 'Lungelo Dlamini', teamId: 1 },
  },
  {
    id: 14, matchday: 4, date: '2026-05-03', time: '15:00',
    homeTeamId: 8, awayTeamId: 4, homeScore: 0, awayScore: 1,
    venue: 'Rangers Park',
    scorers: [
      { playerId: 36, playerName: 'Teboho Lekola', teamId: 4, minute: 60 },
    ],
    yellowCards: [{ playerName: 'Sipho Cele', teamId: 8, minute: 40 }],
    redCards: [],
    motm: { playerId: 32, playerName: 'Lethiwe Ndlovu', teamId: 4 },
  },
  {
    id: 15, matchday: 4, date: '2026-05-03', time: '15:00',
    homeTeamId: 7, awayTeamId: 5, homeScore: 2, awayScore: 3,
    venue: 'Westfield Park',
    scorers: [
      { playerId: 45, playerName: 'Senzo Mthethwa', teamId: 5, minute: 10 },
      { playerId: 63, playerName: 'Yusuf Patel', teamId: 7, minute: 23 },
      { playerId: 46, playerName: 'Banele Zulu', teamId: 5, minute: 45 },
      { playerId: 64, playerName: 'Siphamandla Ntuli', teamId: 7, minute: 67 },
      { playerId: 45, playerName: 'Senzo Mthethwa', teamId: 5, minute: 78 },
    ],
    yellowCards: [{ playerName: 'Mlungisi Shabalala', teamId: 7, minute: 88 }],
    redCards: [],
    motm: { playerId: 45, playerName: 'Senzo Mthethwa', teamId: 5 },
  },
  {
    id: 16, matchday: 4, date: '2026-05-03', time: '15:00',
    homeTeamId: 6, awayTeamId: 2, homeScore: 0, awayScore: 2,
    venue: 'Port End Ground',
    scorers: [
      { playerId: 17, playerName: 'Andile Cele', teamId: 2, minute: 50 },
      { playerId: 20, playerName: 'Sibusiso Khoza', teamId: 2, minute: 85 },
    ],
    yellowCards: [{ playerName: 'Lungani Mhlanga', teamId: 6, minute: 60 }],
    redCards: [{ playerName: 'Lungani Mhlanga', teamId: 6, minute: 75 }],
    motm: { playerId: 12, playerName: 'Nkosinathi Mncwango', teamId: 2 },
  },
];

export const fixtures = [
  // Matchday 5 - June 7, 2026
  { id: 17, matchday: 5, date: '2026-06-07', time: '15:00', homeTeamId: 1, awayTeamId: 5, venue: 'Unity Park', status: 'upcoming' },
  { id: 18, matchday: 5, date: '2026-06-07', time: '15:00', homeTeamId: 2, awayTeamId: 3, venue: 'River Bank Arena', status: 'upcoming' },
  { id: 19, matchday: 5, date: '2026-06-07', time: '15:00', homeTeamId: 4, awayTeamId: 6, venue: 'Valley End Ground', status: 'upcoming' },
  { id: 20, matchday: 5, date: '2026-06-07', time: '15:00', homeTeamId: 8, awayTeamId: 7, venue: 'Rangers Park', status: 'upcoming' },

  // Matchday 6 - June 14, 2026
  { id: 21, matchday: 6, date: '2026-06-14', time: '15:00', homeTeamId: 3, awayTeamId: 1, venue: 'Star City Arena', status: 'upcoming' },
  { id: 22, matchday: 6, date: '2026-06-14', time: '15:00', homeTeamId: 5, awayTeamId: 2, venue: "Lion's Den", status: 'upcoming' },
  { id: 23, matchday: 6, date: '2026-06-14', time: '15:00', homeTeamId: 6, awayTeamId: 8, venue: 'Port End Ground', status: 'upcoming' },
  { id: 24, matchday: 6, date: '2026-06-14', time: '15:00', homeTeamId: 7, awayTeamId: 4, venue: 'Westfield Park', status: 'upcoming' },

  // Matchday 7 - June 21, 2026
  { id: 25, matchday: 7, date: '2026-06-21', time: '15:00', homeTeamId: 1, awayTeamId: 2, venue: 'Unity Park', status: 'upcoming' },
  { id: 26, matchday: 7, date: '2026-06-21', time: '15:00', homeTeamId: 4, awayTeamId: 3, venue: 'Valley End Ground', status: 'upcoming' },
  { id: 27, matchday: 7, date: '2026-06-21', time: '15:00', homeTeamId: 5, awayTeamId: 6, venue: "Lion's Den", status: 'upcoming' },
  { id: 28, matchday: 7, date: '2026-06-21', time: '15:00', homeTeamId: 7, awayTeamId: 8, venue: 'Westfield Park', status: 'upcoming' },

  // Matchday 8 - June 28, 2026
  { id: 29, matchday: 8, date: '2026-06-28', time: '15:00', homeTeamId: 2, awayTeamId: 4, venue: 'River Bank Arena', status: 'upcoming' },
  { id: 30, matchday: 8, date: '2026-06-28', time: '15:00', homeTeamId: 3, awayTeamId: 5, venue: 'Star City Arena', status: 'upcoming' },
  { id: 31, matchday: 8, date: '2026-06-28', time: '15:00', homeTeamId: 6, awayTeamId: 1, venue: 'Port End Ground', status: 'upcoming' },
  { id: 32, matchday: 8, date: '2026-06-28', time: '15:00', homeTeamId: 8, awayTeamId: 5, venue: 'Rangers Park', status: 'upcoming' },
];

export const news = [
  {
    id: 1,
    title: 'KSouth United Top the Table After Four Matchdays',
    category: 'League News',
    date: '2026-05-05',
    author: 'Sipho Mthembu',
    summary: 'KSouth United maintain their perfect home record and sit top of the table with 10 points after the first four matchdays of the 2025/2026 season.',
    content: `KSouth United continued their impressive start to the 2025/2026 KSouth League season with a hard-fought 1-1 draw against City Stars in matchday 4. Despite not winning, United remain top of the table with 10 points from four games.\n\nStrikers Sipho Ndaba has been in sensational form, netting four goals already this season to claim joint top scorer alongside Lerato Modise, Thabo Nkosi, Senzo Mthethwa, and Dumisani Shabalala.\n\n"We are pleased with our start but we know there is still a lot of work to do," said manager David Nkosi. "Every game in this league is tough and we need to stay focused."\n\nThe next challenge for United comes on June 7 when they host Eastern Lions in what promises to be an exciting top-of-the-table clash.`,
    image: null,
    featured: true,
  },
  {
    id: 2,
    title: 'Valley Athletic Goalkeeper Ndlovu Sets Clean Sheet Record',
    category: 'Match Report',
    date: '2026-05-04',
    author: 'Bongiwe Dlamini',
    summary: 'Valley Athletic goalkeeper Lethiwe Ndlovu has kept three clean sheets in four matches, establishing himself as the best goalkeeper in the league so far.',
    content: `Valley Athletic goalkeeper Lethiwe Ndlovu is making headlines this season with three clean sheets in four appearances, making him the standout keeper in the KSouth League.\n\nNdlovu's performances have been instrumental in Valley Athletic's solid start. Despite not having the most goals, their watertight defence has kept them in the top five with 7 points.\n\n"Lethiwe has been outstanding," said manager Peter Mokoena. "His leadership at the back and his reflexes in crucial moments have been the difference for us."\n\nForward Teboho Lekola has also impressed, scoring three goals including a brace against Westfield FC.`,
    image: null,
    featured: false,
  },
  {
    id: 3,
    title: 'Northern Rangers Stun City Stars with Upset Win',
    category: 'Match Report',
    date: '2026-04-13',
    author: 'Thabo Nzimande',
    summary: 'Northern Rangers produced the upset of the season so far, defeating title favourites City Stars 2-1 at Rangers Park in matchday 2.',
    content: `In one of the most shocking results of the young season, Northern Rangers defeated City Stars 2-1 at Rangers Park in matchday 2. Dumisani Shabalala was the hero, scoring twice to hand his side their first and only victory of the season.\n\nCity Stars dominated possession but failed to convert their chances, with Lerato Modise's consolation goal coming too late to save a point.\n\n"We knew we had to be compact and hit them on the counter," said Rangers manager Chris Mhlongo. "The boys executed the game plan perfectly."\n\nNorthern Rangers remain in 6th place despite the landmark win, while City Stars have recovered to sit 4th.`,
    image: null,
    featured: false,
  },
  {
    id: 4,
    title: 'KSouth League Season Preview: 8 Teams Battle for Glory',
    category: 'League News',
    date: '2026-03-30',
    author: 'Editorial Team',
    summary: 'As the 2025/2026 KSouth League season gets underway, we preview all eight teams and their prospects for the campaign ahead.',
    content: `The 2025/2026 KSouth League season promises to be the most competitive yet, with eight clubs vying for the coveted championship trophy. Here is our club-by-club preview:\n\n**KSouth United** - Defending champions and favourites again under David Nkosi. With a settled squad and Sipho Ndaba in attack, they are the team to beat.\n\n**City Stars** - The most resourced club in the league. With Lerato Modise and Thabo Nkosi upfront, they have the firepower to challenge.\n\n**Riverside FC** - Defensively solid and dangerous on the counter. Andile Cele is a player to watch in midfield.\n\n**Eastern Lions** - Senzo Mthethwa leads the attack and the Lions will be hoping to challenge for top spot this season.\n\n**Valley Athletic** - Dark horses of the campaign. A tough team to beat, especially at home.\n\n**Northern Rangers**, **Harbor Town**, and **Westfield FC** will be looking to improve on previous seasons and cause upsets along the way.`,
    image: null,
    featured: false,
  },
  {
    id: 5,
    title: 'Westfield FC Looking to End Losing Streak',
    category: 'League News',
    date: '2026-05-06',
    author: 'Sipho Mthembu',
    summary: 'Bottom-placed Westfield FC have yet to score a point this season and manager Robert Bhengu is calling on the squad to dig deep.',
    content: `Westfield FC find themselves at the foot of the KSouth League table with zero points from their first four matches. The club have conceded 11 goals — the most in the league — and have netted just twice.\n\nManager Robert Bhengu addressed the media ahead of the matchday 5 trip to Northern Rangers, calling for unity and determination from his squad.\n\n"It has been a difficult start and I am not going to hide from that," said Bhengu. "But we have a lot of football still to play and we believe we can turn things around."\n\nYusuf Patel and Siphamandla Ntuli provide the only scoring threats for Westfield, and Bhengu will be counting on them to step up. The match against Northern Rangers on June 7 represents a crucial opportunity to get off the mark.`,
    image: null,
    featured: false,
  },
  {
    id: 6,
    title: 'Referee Appointments Confirmed for Matchday 5',
    category: 'Announcement',
    date: '2026-06-02',
    author: 'League Secretary',
    summary: 'The KSouth League has confirmed referee appointments for all four matchday 5 fixtures scheduled for June 7, 2026.',
    content: `The KSouth League Referees Committee has confirmed the following appointments for matchday 5:\n\n- **KSouth United vs Eastern Lions** (Unity Park): Sifiso Ngubane (Centre), Mpho Radebe, Thandi Sithole (Assistants)\n\n- **Riverside FC vs City Stars** (River Bank Arena): Vusi Khoza (Centre), Lucky Dlamini, Ntokozo Mthembu (Assistants)\n\n- **Valley Athletic vs Harbor Town** (Valley End Ground): Andile Nkosi (Centre), Bongani Msweli, Langa Cele (Assistants)\n\n- **Northern Rangers vs Westfield FC** (Rangers Park): Sibonelo Hadebe (Centre), Dumisani Khumalo, Sipho Zwane (Assistants)\n\nAll referees hold valid South African Football Association (SAFA) licences. Kick-off for all matches is 15:00.`,
    image: null,
    featured: false,
  },
];

export const awards = {
  playerOfMonth: [
    { month: 'April 2026', playerId: 9, playerName: 'Sipho Ndaba', teamId: 1, reason: '4 goals including crucial away winner at Westfield' },
  ],
  playerOfSeason: null,
  topScorerTrophy: null,
  bestGoalkeeperTrophy: null,
};
