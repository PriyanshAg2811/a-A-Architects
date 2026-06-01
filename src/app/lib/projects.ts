export type ProjectSection = {
  image: string;
  text: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  thumbnail: string;
  sections: ProjectSection[];
};

export const projects: Project[] = [
  {
    slug: "alpine-retreat",
    title: "Alpine Retreat",
    category: "Residential",
    location: "Aspen, Colorado",
    year: "2024",
    thumbnail: "/images/project-1.jpg",
    sections: [
      {
        image: "/images/project-1.jpg",
        text: "The project is embedded into the mountainside to minimize visual impact. Local timber, stone, and glass are composed into a quiet retreat that feels part of the landscape.",
      },
      {
        image: "/images/project-1b.jpg",
        text: "Locally sourced timber provides warmth throughout the interiors, while generous glazing captures the dramatic alpine light and seasonal views.",
      },
      {
        image: "/images/project-1c.jpg",
        text: "Floor-to-ceiling glazing frames views of the surrounding landscape, making the mountains feel like an extension of the living spaces.",
      },
    ],
  },
  {
    slug: "urban-axis-tower",
    title: "Urban Axis Tower",
    category: "Commercial",
    location: "Chicago, Illinois",
    year: "2023",
    thumbnail: "/images/project-2.jpg",
    sections: [
      {
        image: "/images/project-2.jpg",
        text: "A 40-story office complex redefines the city skyline with a parametric façade that responds to solar angles and shifts light across the plaza.",
      },
      {
        image: "/images/project-2b.jpg",
        text: "The vertical volume gently twists from base to top, creating planted terraces and common spaces that connect interior life with the street below.",
      },
      {
        image: "/images/project-2c.jpg",
        text: "Public circulation is layered through the building, providing a dynamic architectural promenade and a landmark work environment.",
      },
    ],
  },
  {
    slug: "the-glass-pavilion",
    title: "The Glass Pavilion",
    category: "Residential",
    location: "Malibu, California",
    year: "2023",
    thumbnail: "/images/project-3.jpg",
    sections: [
      {
        image: "/images/project-3.jpg",
        text: "Open-concept living celebrates natural light and uninterrupted Pacific views. The building appears to float above its clifftop site.",
      },
      {
        image: "/images/project-3b.jpg",
        text: "Every structural joint is concealed, allowing the glass walls and delicate framing to create seamless indoor-outdoor connections.",
      },
      {
        image: "/images/project-3c.jpg",
        text: "A restrained material palette of stone, polished concrete, and fine metalwork keeps the interior focused on the landscape beyond.",
      },
    ],
  },
  {
    slug: "coastal-sanctuary",
    title: "Coastal Sanctuary",
    category: "Residential",
    location: "Santorini, Greece",
    year: "2022",
    thumbnail: "/images/project-4.jpg",
    sections: [
      {
        image: "/images/project-4.jpg",
        text: "Mediterranean luxury Villa distilled to its essence. Volcanic stone walls and infinity pools merge with the Aegean Sea.",
      },
      {
        image: "/images/project-4b.jpg",
        text: "The interiors are calm and white-washed, while framed courtyards punctuate the building and offer private outdoor rooms.",
      },
      {
        image: "/images/project-4c.jpg",
        text: "Outdoor living is layered across terraces and shaded galleries, making the views the defining feature of each space.",
      },
    ],
  },
  {
    slug: "meridian-cultural-centre",
    title: "Meridian Cultural Centre",
    category: "Cultural",
    location: "Melbourne, Australia",
    year: "2024",
    thumbnail: "/images/project-5.jpg",
    sections: [
      {
        image: "/images/project-5.jpg",
        text: "A civic landmark folded from a continuous concrete ribbon. Galleries, performance spaces, and a rooftop garden are woven together in one sequence.",
      },
      {
        image: "/images/project-5b.jpg",
        text: "Daylight is carefully introduced through skylights and carved openings, giving each zone a distinct atmosphere while maintaining a unified form.",
      },
      {
        image: "/images/project-5c.jpg",
        text: "The building reads as a sculptural object in the city, with a bold, luminous interior that invites the public in.",
      },
    ],
  },
  {
    slug: "tidal-house",
    title: "Tidal House",
    category: "Residential",
    location: "Hokkaido, Japan",
    year: "2022",
    thumbnail: "/images/project-6.jpg",
    sections: [
      {
        image: "/images/project-6.jpg",
        text: "Inspired by the rhythmic erosion of the coastline, the house uses cedar cladding that changes with weather and light.",
      },
      {
        image: "/images/project-6b.jpg",
        text: "The plan is composed around a sequence of intimate interior volumes that open to garden courts and winter sunlight.",
      },
      {
        image: "/images/project-6c.jpg",
        text: "Warm materials and soft lighting create a comfortable retreat that feels grounded in the seasonal landscape.",
      },
    ],
  },
];
