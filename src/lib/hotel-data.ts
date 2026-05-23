export type CitySlug = "almaty" | "astana";

export type Room = {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  area: number;
  guests: number;
  bed: string;
  view: string;
  highlights: string[];
};

export type CityConfig = {
  slug: CitySlug;
  name: string;
  locationTag: string;
  heroImage: string;
  entryImage: string;
  aboutImagePrimary: string;
  aboutImageSecondary: string;
  contactMapImage: string;
  whatsapp: string;
  address: string;
  coordinates: string;
  bnovoUidPlaceholder: string;
  rooms: Room[];
};

const sharedRooms: Record<CitySlug, Room[]> = {
  almaty: [
    {
      id: "skyline-suite",
      name: "Skyline Suite",
      subtitle: "Mountain light, urban silence",
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=80",
      area: 54,
      guests: 2,
      bed: "King bed",
      view: "Ile Alatau + city skyline",
      highlights: [
        "Private tea corner",
        "Freestanding stone bath",
        "Curated minibar with local ingredients",
      ],
    },
    {
      id: "terrace-loft",
      name: "Terrace Loft",
      subtitle: "Editorial comfort above the city",
      image:
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1600&q=80",
      area: 42,
      guests: 2,
      bed: "Queen bed",
      view: "Panoramic rooftop terrace",
      highlights: [
        "Private outdoor lounge",
        "Rainfall shower with warm stone finish",
        "Sunrise breakfast service",
      ],
    },
    {
      id: "atelier-room",
      name: "Atelier Room",
      subtitle: "Refined essentials for design-minded stays",
      image:
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1600&q=80",
      area: 31,
      guests: 2,
      bed: "King bed",
      view: "Inner garden courtyard",
      highlights: [
        "Acoustic wall treatment for deep rest",
        "Flexible workspace with warm lighting",
        "Signature linen program",
      ],
    },
  ],
  astana: [
    {
      id: "horizon-suite",
      name: "Horizon Suite",
      subtitle: "Architectural calm above the capital",
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80",
      area: 56,
      guests: 2,
      bed: "King bed",
      view: "Esil embankment panorama",
      highlights: [
        "Floor-to-ceiling glazing",
        "Evening tea ritual setup",
        "Marble vanity and soaking tub",
      ],
    },
    {
      id: "executive-studio",
      name: "Executive Studio",
      subtitle: "Soft luxury for modern city tempo",
      image:
        "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=80",
      area: 38,
      guests: 2,
      bed: "Queen bed",
      view: "Government district lights",
      highlights: [
        "Tailored work-lounge zoning",
        "Smart blackout system",
        "Art books and vinyl listening set",
      ],
    },
    {
      id: "quiet-deluxe",
      name: "Quiet Deluxe",
      subtitle: "Minimal, warm, intentionally private",
      image:
        "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=1600&q=80",
      area: 33,
      guests: 2,
      bed: "King bed",
      view: "Calm inner court",
      highlights: [
        "Hypoallergenic pillow menu",
        "Japanese-style tea kit",
        "Night concierge messaging service",
      ],
    },
  ],
};

export const cityConfigs: Record<CitySlug, CityConfig> = {
  almaty: {
    slug: "almaty",
    name: "Hi Hotel Almaty",
    locationTag: "Almaty, Kazakhstan",
    heroImage:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2000&q=80",
    entryImage:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1800&q=80",
    aboutImagePrimary:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1800&q=80",
    aboutImageSecondary:
      "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1800&q=80",
    contactMapImage:
      "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1800&q=80",
    whatsapp: "+7 700 123 40 40",
    address: "Dostyk Ave 128, Almaty 050051",
    coordinates: "43.2220, 76.8512",
    bnovoUidPlaceholder: "BNOVO_ALMATY_UID",
    rooms: sharedRooms.almaty,
  },
  astana: {
    slug: "astana",
    name: "Hi Hotel Astana",
    locationTag: "Astana, Kazakhstan",
    heroImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2000&q=80",
    entryImage:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1800&q=80",
    aboutImagePrimary:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1800&q=80",
    aboutImageSecondary:
      "https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=1800&q=80",
    contactMapImage:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1800&q=80",
    whatsapp: "+7 700 456 11 11",
    address: "Dostyk Street 12/1, Astana 010000",
    coordinates: "51.1694, 71.4491",
    bnovoUidPlaceholder: "BNOVO_ASTANA_UID",
    rooms: sharedRooms.astana,
  },
};

export const citySlugs = Object.keys(cityConfigs) as CitySlug[];

export function isCitySlug(value: string): value is CitySlug {
  return citySlugs.includes(value as CitySlug);
}
