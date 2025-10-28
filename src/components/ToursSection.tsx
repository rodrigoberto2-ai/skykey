"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

type Tour = {
  title: string;
  images: string[];
  description: string;
  itinerary: string[];
  price: string;
  tips: string;
};

const TOURS: Tour[] = [
  {
    title: "Madrid Classics Tour (Half Day)",
    images: [
      "https://cms.getnomad.app/uploads/Untitled_c8f37e27c9.png",
      "https://nomadicniko.com/wp-content/uploads/2010/07/DSC_2720.jpg",
      "https://madridsecreto.co/wp-content/uploads/2022/11/27170118/Gran-Via-1024x683.jpg",
    ],
    description:
      "Ideal for first-time visitors. A relaxed 3-4 hour walk blending history, architecture, and culture to get a great overview of Madrid and its most iconic sights.",
    itinerary: [
      "Meeting point: Puerta del Sol, the heart of Madrid.",
      "Walk along Gran Vía the city's most famous avenue with shops and historic buildings.",
      "Visit the Royal Palace and Sabatini Gardens.",
      "Stop at El Retiro Park stroll by the lake or the Crystal Palace.",
      "Finish in Barrio de las Letras with a tapa and a glass of Spanish wine.",
    ],
    price:
      "Guided 3h tour from 35-40 per person. Alternative: hop-on hop-off bus from 28/day. (Some tours don't include Royal Palace entry.)",
    tips: "Wear comfortable shoes; morning tours are quieter; at El Retiro you can rent a boat or enjoy a coffee; choose a private tour for a more personal pace.",
  },
  {
    title: "Madrid Food & Tapas Experience",
    images: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/da/af/09/varios-ambientes-con.jpg",
      "https://www.esmadrid.com/sites/default/files/styles/content_type_full/public/recursosturisticos/compras/mercado_san_miguel_2.jpg",
      "https://madride.es/wp-content/uploads/2024/07/Spanish-paella.jpg",
    ],
    description:
      "Discover Madrid through its flavors. This tour blends history, local cuisine, and the unique atmosphere of traditional tapas bars — perfect for food lovers.",
    itinerary: [
      "Start at Mercado de San Miguel to sample gourmet bites.",
      "Stroll through La Latina or Barrio de las Letras with stops for Iberian ham, patatas bravas, and homemade croquettes.",
      "Finish at a terrace or rooftop with city views and a local vermouth or wine.",
    ],
    price:
      "Tapas tour with local guide: 40-50 per person (3-4 food and drink stops). Duration: 2-3 hours. Vegetarian or gluten-free options on request.",
    tips: "Come hungry, try Madrid's vermouth, wear comfortable clothes, and consider an evening slot to pair with a nighttime stroll downtown.",
  },
  {
    title: "Madrid Panoramic Hop-On Hop-Off Bus",
    images: [
      "https://res.cloudinary.com/dtljonz0f/image/upload/c_auto,ar_3:1,w_1200,g_auto/f_auto/q_auto/v1/gc-v1/madrid/Madrid_Grand_Via_rwteay?_a=BAVAZGE70",
      "https://staticsgrupojulia.blob.core.windows.net/statics/EXCURSION/2021/España/Fotografías%20-%20Pictures/TOURS%20DE%20MADRID/MADMHOHO-HOP%20ON%20HOP%20OFF/160.JPG",
      "https://cdn-imgix.headout.com/media/images/532a90deedb4a7452343bc8cb510a1b1-32573-madrid-city-sightseeing--madrid-panoramic-bus-tour-01.jpg?ar=16:10&auto=format&crop=faces,center&fit=crop&h=562.5&q=90&w=900",
    ],
    description:
      "Perfect for exploring Madrid at your own pace. The double-decker bus lets you hop on and off at major attractions — the most flexible way to see the whole city.",
    itinerary: [
      "Departures from Plaza de Cibeles or Neptuno with two main routes:",
      "Historic route: Puerta de Alcalá, Prado Museum, Royal Palace, Temple of Debod.",
      "Modern route: Santiago Bernabéu Stadium, AZCA, Cuatro Torres, North Madrid.",
      "Hop on and off as many times as you like for 24h.",
    ],
    price:
      "1-day ticket: €28 adults / €15 children. 2-day ticket from €35. Includes audio guide in Spanish, English, and Portuguese.",
    tips: "Sit on the upper deck for the best views; bring sunscreen or a light jacket depending on the season; check the last bus times; pair stops with museums or parks.",
  },
  {
    title: "Sunset Tour — Madrid & Literary Quarter",
    images: [
      "https://www.theprincipalmadridhotel.com/content/imgsxml/blog/big156-madridsunset355.jpg",
      "https://www.esmadrid.com/sites/default/files/styles/content_type_full/public/recursos/palacio_real_1.jpg",
      "https://blog.guruwalk.com/wp-content/uploads/2025/08/outdoor-cielo-cloudy-sunset-sunrise-structure-1024x683.webp",
    ],
    description:
      "A guided sunset walk through the heart of Madrid that blends history, architecture, and local charm. Perfect for seeing the city in a different light.",
    itinerary: [
      "Departure from Plaza de Isabel II (Metro Ópera) just as the sun begins to set.",
      "Visit the exterior of the Royal Palace of Madrid and Sabatini Gardens bathed in golden light.",
      "Walk along Gran Vía to admire early 20th-century theaters, façades, and the evening lights of the city.",
      "Explore the Literary Quarter (Barrio de las Letras), discovering historic cafés, small squares, and bohemian atmosphere.",
      "Finish the evening at a rooftop or terrace bar to enjoy a glass of wine or beer while watching Madrid light up.",
    ],
    price:
      "Approximately €32 per person (small group, 2–3 hours). Check availability and inclusions (drink, guide, or transfers) when booking.",
    tips: "Wear comfortable shoes and bring a light jacket for the evening. Take your camera to capture the golden hour. Book in advance, as sunset tours are very popular.",
  },
];

export default function ToursSection() {
  const tours = TOURS;
  const loop = [...tours, ...tours];
  return (
    <section className="w-10/12 mx-auto px-4 pt-4 pb-16">
      <div className="relative">
        <div className="scrollbar-hide overflow-x-hidden">
          <div className="infinite-scroll flex gap-8 w-[200%] p-4">
            {loop.map((tour, index) => (
              <Link
                key={`${slugify(tour.title)}-${index}`}
                href={`/tours/${encodeURIComponent(slugify(tour.title))}`}
                className="group block w-[82vw] sm:w-[320px] md:w-[400px] shrink-0 first:ml-6 last:mr-6"
              >
                <article className="bg-white ring-1 ring-black/10 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                  <header className="px-6 pt-6 pb-3 text-center h-[76px]">
                    <h3 className="text-[0.85rem] tracking-[0.28em] text-[var(--primary)] font-semibold uppercase">{tour.title}</h3>
                  </header>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={tour.images[0]}
                      alt={tour.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 82vw, 520px"
                      priority={index === 0}
                    />
                  </div>
                  <div className="px-8 py-6 text-center">
                    <p className="text-[15px] leading-7 text-gray-800 font-accent">{tour.description}</p>
                    <div className="mt-8">
                      <span className="inline-block px-6 py-3 bg-black text-white text-[12px] tracking-[0.22em] uppercase">VER MAIS</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Removed HorizontalCarousel (replaced by infinite marquee)

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
