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
  isMain?: boolean;
};

export const projects: Project[] = [
  {
    slug: "alpine-retreat",
    title: "Alpine Retreat",
    category: "Residential",
    location: "Aspen, Colorado",
    year: "2024",
    thumbnail: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780579124/copy1_of_bhasin_hand_sketch_tq4liy.png",
    sections: [
      {
        image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780492961/Asymmetrical_Boxing_Main_Image_rqpitw.jpg",
        text: "The project is embedded into the mountainside to minimize visual impact. Local timber, stone, and glass are composed into a quiet retreat that feels part of the landscape.",
      },
      {
        image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780493444/Asymmetrical_Boxing_Main_Image_2_noi24q.jpg",
        text: "Locally sourced timber provides warmth throughout the interiors, while generous glazing captures the dramatic alpine light and seasonal views.",
      },
    ],
    isMain: true,
  },
  {
    slug: "urban-axis-tower",
    title: "Urban Axis Tower",
    category: "Commercial",
    location: "Chicago, Illinois",
    year: "2023",
    thumbnail: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780572506/cvm_hand_sketch_hvd2gw.png",
    sections: [
      {
        image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780572394/cvm_16_-_Photo_czr4m8.jpg",
        text: "A 40-story office complex redefines the city skyline with a parametric façade that responds to solar angles and shifts light across the plaza.",
      },
      {
        image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780572393/cvm_12_-_Photo_k1tsxb.jpg",
        text: "The vertical volume gently twists from base to top, creating planted terraces and common spaces that connect interior life with the street below.",
      },
    ],
    isMain: true,
  },
  {
    slug: "the-glass-pavilion",
    title: "The Glass Pavilion",
    category: "Residential",
    location: "Malibu, California",
    year: "2023",
    thumbnail: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780574501/geometric_spaces_2_e8vbvd.png",
    sections: [
      {
        image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780574467/geometric_spaces_1_klbdof.png",
        text: "Open-concept living celebrates natural light and uninterrupted Pacific views. The building appears to float above its clifftop site.",
      },
      {
        image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780574887/geometric_spaces_3_khj6qy.png",
        text: "Every structural joint is concealed, allowing the glass walls and delicate framing to create seamless indoor-outdoor connections.",
      },
    ],
    isMain: true,
  },
  {
    slug: "coastal-sanctuary",
    title: "Coastal Sanctuary",
    category: "Residential",
    location: "Santorini, Greece",
    year: "2022",
    thumbnail: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780573808/project_full_moon_free_hand_sketch_geqdhf.png",
    sections: [
      {
        image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780573452/Render_Opt7.2_golvc1.png",
        text: "Mediterranean luxury Villa distilled to its essence. Volcanic stone walls and infinity pools merge with the Aegean Sea.",
      },
      {
        image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780573539/project_full_moon_nc5gts.png",
        text: "The interiors are calm and white-washed, while framed courtyards punctuate the building and offer private outdoor rooms.",
      },
    ],
    isMain: true,
  },
  {
    slug: "meridian-cultural-centre",
    title: "Meridian Cultural Centre",
    category: "Cultural",
    location: "Melbourne, Australia",
    year: "2024",
    thumbnail: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780579852/prabhat_residence_sketch_vxiuol.png",
    sections: [
      {
        image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780579779/1_PHOTO_SET_1_3_m9qqea.jpg",
        text: "A civic landmark folded from a continuous concrete ribbon. Galleries, performance spaces, and a rooftop garden are woven together in one sequence.",
      },
    ],
  },
  {
    slug: "tidal-house",
    title: "Tidal House",
    category: "Residential",
    location: "Hokkaido, Japan",
    year: "2022",
    thumbnail: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780580749/poonam_residence_sketch_jdd8in.png",
    sections: [
      {
        image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780580182/WhatsApp_Image_2026-06-04_at_19.05.26_agywvu.jpg",
        text: "Inspired by the rhythmic erosion of the coastline, the house uses cedar cladding that changes with weather and light.",
      },
      {
        image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780580471/WhatsApp_Image_2026-06-04_at_19.05.25_1_hvlrij.jpg",
        text: "The plan is composed around a sequence of intimate interior volumes that open to garden courts and winter sunlight.",
      },
    ],
    isMain: true,
  },
  {
    slug: "tidal-house1",
    title: "Tidal House1",
    category: "Residential",
    location: "Hokkaido, Japan",
    year: "2022",
    thumbnail: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780581565/dining_sketch_waqxbe.png",
    sections: [
      {
        image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780580645/WhatsApp_Image_2024-06-12_at_02.07.12_z2hfu3.jpg",
        text: "Inspired by the rhythmic erosion of the coastline, the house uses cedar cladding that changes with weather and light.",
      },
      {
        image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780580678/WhatsApp_Image_2023-09-22_at_23.45.14_1_edli0h.jpg",
        text: "Warm materials and soft lighting create a comfortable retreat that feels grounded in the seasonal landscape.",
      },
      {
        image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780580682/WhatsApp_Image_2023-09-22_at_23.45.14_qrxith.jpg",
        text: "The plan is composed around a sequence of intimate interior volumes that open to garden courts and winter sunlight.",
      },
      {
        image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780580675/WhatsApp_Image_2023-09-22_at_23.45.13_1_vsmyv3.jpg",
        text: "Warm materials and soft lighting create a comfortable retreat that feels grounded in the seasonal landscape.",
      },
      {
        image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780580693/WhatsApp_Image_2023-09-18_at_19.23.24_rsohqc.jpg",
        text: "Warm materials and soft lighting create a comfortable retreat that feels grounded in the seasonal landscape.",
      },
      {
        image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780580686/WhatsApp_Image_2023-09-18_at_19.23.22_1_qvtkfv.jpg",
        text: "Warm materials and soft lighting create a comfortable retreat that feels grounded in the seasonal landscape.",
      },
      {
        image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780580689/WhatsApp_Image_2023-09-18_at_19.23.22_dbxjvs.jpg",
        text: "Warm materials and soft lighting create a comfortable retreat that feels grounded in the seasonal landscape.",
      },
    ],
    isMain: true,
  },
  {
    slug: "tidal-house2",
    title: "Tidal House1",
    category: "Residential",
    location: "Hokkaido, Japan",
    year: "2022",
    thumbnail: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780606426/shailesh_ji_residence_sketch_qlruld.png",
    sections: [
      {
        image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780606225/shailesh_ji_view_xweb9e.png",
        text: "Inspired by the rhythmic erosion of the coastline, the house uses cedar cladding that changes with weather and light.",
      },
      {
        image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780606226/shailesh_ji_view_3_cdbrzm.png",
        text: "Warm materials and soft lighting create a comfortable retreat that feels grounded in the seasonal landscape.",
      },
      {
        image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780606227/shailesh_ji_view_2_a4uzph.png",
        text: "The plan is composed around a sequence of intimate interior volumes that open to garden courts and winter sunlight.",
      },
    ],
    isMain: true,
  },
  {
    slug: "tidal-house3",
    title: "Tidal House1",
    category: "Residential",
    location: "Hokkaido, Japan",
    year: "2022",
    thumbnail: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780603027/mehmodabad_residence_sketch_jxescp.png",
    sections: [
      {
        image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780602889/option4.3_copy_qjn9pw.jpg",
        text: "Inspired by the rhythmic erosion of the coastline, the house uses cedar cladding that changes with weather and light.",
      },
      {
        image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780602890/option3.2_copy_exjilz.jpg",
        text: "Warm materials and soft lighting create a comfortable retreat that feels grounded in the seasonal landscape.",
      },
      // {
      //   image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780602887/option1.3_copy_pf2mai.jpg",
      //   text: "The plan is composed around a sequence of intimate interior volumes that open to garden courts and winter sunlight.",
      // },
      // {
      //   image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780602889/option1.2.3_copy_ipgwrx.jpg",
      //   text: "The plan is composed around a sequence of intimate interior volumes that open to garden courts and winter sunlight.",
      // },
    ],
    isMain: true,
  },
  {
    slug: "tidal-house4",
    title: "Tidal House1",
    category: "Residential",
    location: "Hokkaido, Japan",
    year: "2022",
    thumbnail: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780602608/shyam_narayan_tiwari_sketch_kqm69e.png",
    sections: [
      {
        image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780602467/TiwariNarayanTiwari-Ahimamau-Lko-Design-3d-2026-03-08_copy_esgdph.jpg",
        text: "Inspired by the rhythmic erosion of the coastline, the house uses cedar cladding that changes with weather and light.",
      },
    ],
    isMain: true,
  },
  {
    slug: "tidal-house5",
    title: "Tidal House1",
    category: "Residential",
    location: "Hokkaido, Japan",
    year: "2022",
    thumbnail: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780656628/sushil_ji_residence_sketch_zjdusb.png",
    sections: [
      {
        image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780656578/sushil_ji_residence_2_thohni.png",
        text: "Inspired by the rhythmic erosion of the coastline, the house uses cedar cladding that changes with weather and light.",
      },
      {
        image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780656572/sushil_ji_residence_4_ihxx5l.png",
        text: "Inspired by the rhythmic erosion of the coastline, the house uses cedar cladding that changes with weather and light.",
      },
      {
        image: "https://res.cloudinary.com/dhnxyhcwv/image/upload/v1780656571/sushil_ji_residence_1_c89c5l.png",
        text: "Inspired by the rhythmic erosion of the coastline, the house uses cedar cladding that changes with weather and light.",
      },
    ],
    isMain: true,
  },
];