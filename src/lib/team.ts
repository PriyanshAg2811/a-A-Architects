export type TeamMember = {
  id: number;
  name: string;
  position: string;
  experience: string;
  bio: string;
  image: string;
};

export const coFounders = [
  {
    name: "Priyanshu Agarwal",
    position: "Principal Architect & Director",
    bio: "Every project begins with a story, a vision, and a purpose. As Founder and Principal Architect, they are dedicated to creating architecture that enriches lives and responds thoughtfully to its environment. By blending innovation with craftsmanship, they strive to design spaces that remain relevant, resilient, and inspiring for generations.",
    vision: "Inspired by the belief that architecture shapes the way we experience the world, they lead the practice with a vision to create timeless, human-centered spaces defined by innovation, sustainability, and enduring design.",
    image:
      "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1781360577/team_1_copy_3_ri7iyr.png",
  },
  {
    name: "Rakesh Singh",
    position: "Chief Engineer & Director",
    bio: "With extensive expertise in engineering, project leadership, and construction management, they lead the firm's technical vision with a focus on precision, innovation, and excellence. By integrating engineering expertise with architectural ambition, they ensure every project is delivered with structural integrity, operational efficiency, and uncompromising quality.",
    vision: "Driven by a vision of engineering excellence, they lead with precision, innovation, and integrity to deliver safe, efficient, and sustainable solutions that transform ambitious ideas into enduring structures.",
    image:
      "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1782500662/Gemini_Generated_Image_wh3r1owh3r1owh3r_copy_5_cropped_hwcl56.png",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Anubhav Verma",
    position: "Structure Consultant",
    experience: "12 years",
    bio: "Specializing in structural analysis and design, they develop safe, efficient, and economical structural solutions that seamlessly support architectural intent. Their expertise spans RCC, steel structures, foundations, and seismic-resistant design, ensuring every project meets the highest standards of safety, performance, and durability.",
    image:
      "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1782506864/structure_consultant_3_copy_1_zptmyj.png",
  },
  {
    id: 2,
    name: "Parmesh Yadav",
    position: "Sr. Architect",
    experience: "5 years",
    bio: "Passionate about transforming ideas into meaningful spaces, they specialize in designing environments that balance aesthetics, functionality, and sustainability. Their attention to detail and design-driven mindset contribute to projects that inspire and endure.",
    image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1782505855/Parmesh_Yadav_copy_1_igjz0w.png",
  },
  {
    id: 3,
    name: "Anju Verma",
    position: "Sr. Interior Designer",
    experience: "7 years",
    bio: "Passionate about creating interiors that are both elegant and functional, they transform spaces into personalized environments that reflect each client's vision. With a keen eye for detail, material selection, and spatial planning, they deliver interiors that balance comfort, aesthetics, and practicality.",
    image: "/images/team-3.png",
  },
  {
    id: 4,
    name: "Sachin Singh",
    position: "Admin",
    experience: "5 years",
    bio: "Dedicated to operational excellence, they coordinate administrative functions, streamline workflows, and facilitate effective communication across teams. Their proactive approach ensures a well-organized environment, enabling our designers and consultants to focus on delivering exceptional results.",
    image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1782507899/sachin_singh_copy_1_bjivyf.png",
  },
];

export const aboutStats = [
  { value: 7, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Projects Completed" },
  { value: 4, suffix: "L+", label: "Sq. ft. Designed" },
  { value: teamMembers.length + 1, suffix: "", label: "Team Members" },
];
