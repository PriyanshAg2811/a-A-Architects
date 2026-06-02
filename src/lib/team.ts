export type TeamMember = {
  id: number;
  name: string;
  position: string;
  experience: string;
  bio: string;
  image: string;
};

export const founder = {
  name: "a+A Architects",
  position: "Principal Architect & Founder",
  bio: "With over 15 years of experience in contemporary architecture, Elena founded the studio with a vision to create spaces that harmonize innovation with environmental consciousness. Her work has been recognized internationally and featured in leading architecture publications.",
  image: "/images/founder.png",
};

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Marcus Chen",
    position: "Senior Architect",
    experience: "12 years",
    bio: "Specializing in commercial architecture and urban design. Marcus brings a wealth of experience in large-scale projects and sustainable building practices.",
    image: "/images/team-1.png",
  },
  {
    id: 2,
    name: "Sofia Rodriguez",
    position: "Design Director",
    experience: "10 years",
    bio: "An award-winning designer focused on residential spaces. Sofia's meticulous attention to detail and innovative approach has transformed countless homes.",
    image: "/images/team-2.png",
  },
  {
    id: 3,
    name: "James Mitchell",
    position: "Project Manager",
    experience: "8 years",
    bio: "Ensures every project is delivered on time and within scope. James' organizational expertise and client communication skills are invaluable to our success.",
    image: "/images/team-3.png",
  },
  {
    id: 4,
    name: "Amara Okafor",
    position: "Sustainability Consultant",
    experience: "9 years",
    bio: "Leading our initiatives in green building certification and sustainable design. Amara brings passion for creating environmentally responsible spaces.",
    image: "/images/team-4.png",
  },
];

export const aboutStats = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 120, suffix: "+", label: "Projects Completed" },
  { value: 8, suffix: "", label: "Design Awards" },
  { value: teamMembers.length + 1, suffix: "", label: "Team Members" },
];
