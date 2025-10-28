"use client";
import React, { useEffect, useRef, useState } from "react";
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

export default function ToursSection() {
  const tours: Tour[] = [
    {
      title: "Madrid Classics Tour (Half Day)",
      images: [
        "https://www.patrimonionacional.es/sites/default/files/styles/full/public/2020-05/6-salon_del_trono_cabecera_.jpg",
        "https://cdn.shortpixel.ai/spai/q_lossless%2Bw_887%2Bto_webp%2Bret_img/nomadicniko.com/wp-content/uploads/2010/07/DSC_2720.jpg",
        "https://offloadmedia.feverup.com/madridsecreto.co/wp-content/uploads/2022/11/27170118/Gran-Via-1024x683.jpg",
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
        "https://sh-assets.holidu.com/imagecache/blog-photos/3728_Fill_670_0.JPG",
        "https://estaticos.esmadrid.com/cdn/farfuture/1D-SX3Bvni_SfadJp5WDQXLT0ibyjh7_GaR3rDScrLs/mtime%3A1646729078/sites/default/files/styles/content_type_full/public/recursosturisticos/compras/amercado.jpg?itok=5W7pYggS",
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
        "https://staticsgrupojulia.blob.core.windows.net/statics/EXCURSION/2021/España/Fotografías%20-%20Pictures/TOURS%20DE%20MADRID/MADMHOHO-HOP%20ON%20HOP%20OFF/madrid-city-tour-bus.jpg",
        "https://staticsgrupojulia.blob.core.windows.net/statics/EXCURSION/2021/España/Fotografías%20-%20Pictures/TOURS%20DE%20MADRID/MADMHOHO-HOP%20ON%20HOP%20OFF/160.JPG",
        "https://cdn-imgix.headout.com/media/images/532a90deedb4a7452343bc8cb510a1b1-32573-madrid-city-sightseeing--madrid-panoramic-bus-tour-01.jpg?ar=16%3A10&auto=format&crop=faces%2Ccenter&fit=crop&h=562.5&q=90&w=900",
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
        "https://blog.flatsweethome.com/wp-content/uploads/2019/01/Los-Atardeceres-de-Madrid-que-Cambiarán-tu-Vida-Callao.jpg",
        "https://estaticos.esmadrid.com/cdn/farfuture/6n7HjfWMxYElxfmUW6YcPkqGLUPf2qCprNtLHJGKBw4/mtime:1646729078/sites/default/files/styles/content_type_full/public/widgets/items/images/palacio_real.jpg?itok=9iq2Wwq7",
        "https://blog.guruwalk.com/wp-content/uploads/2025/08/outdoor-cielo-cloudy-sunset-sunrise-structure-1024x683.webp",
      ],
      description:
        "A guided sunset walk through the heart of Madrid that blends history, architecture, and local charm. Perfect for seeing the city in a different light — calm, romantic, and full of energy as night falls.",
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

  return (
    <section className="max-w-7xl mx-auto px-4 pt-4 pb-16">
      <h2 className="font-sans text-4xl font-bold text-left mb-8 text-gray-800">Discover Madrid</h2>
      <HorizontalCarousel>
        {tours.map((tour, index) => (
          <Link
            key={index}
            href={`/tours/${encodeURIComponent(slugify(tour.title))}`}
            className="group block w-[82vw] sm:w-[420px] md:w-[520px] shrink-0"
          >
            <article className="rounded-2xl overflow-hidden bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/5 transition-transform duration-500 ease-out group-hover:-translate-y-1">
              <div className="relative h-60 sm:h-64 md:h-72 overflow-hidden">
                <Image
                  src={tour.images[0]}
                  alt={tour.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 82vw, 520px"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-[var(--primary)] tracking-tight">{tour.title}</h3>
                <p className="mt-2 text-sm sm:text-base text-gray-700 line-clamp-2">{tour.description}</p>
                <div className="mt-4 inline-flex items-center text-[var(--accent)] font-medium">
                  Explore tour <span className="ml-1 transition-transform duration-300 group-hover:translate-x-0.5">?</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </HorizontalCarousel>
    </section>
  );
}

function HorizontalCarousel({ children }: { children: React.ReactNode }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: true });

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      setCanScroll({
        left: el.scrollLeft > 0,
        right: el.scrollLeft + el.clientWidth < el.scrollWidth - 1,
      });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  const scrollBy = (delta: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 pr-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {React.Children.map(children, (child, idx) => (
          <div key={idx} className="snap-start first:ml-1 last:mr-4">
            {child}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent" />
      <button
        aria-label="Scroll left"
        onClick={() => scrollBy(-400)}
        className={`group absolute left-2 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/80 backdrop-blur ring-1 ring-black/10 shadow-sm transition-all hover:bg-white ${canScroll.left ? "opacity-100" : "opacity-0"}`}
      >
        <span className="translate-x-[-1px]">?</span>
      </button>
      <button
        aria-label="Scroll right"
        onClick={() => scrollBy(400)}
        className={`group absolute right-2 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/80 backdrop-blur ring-1 ring-black/10 shadow-sm transition-all hover:bg-white ${canScroll.right ? "opacity-100" : "opacity-0"}`}
      >
        <span className="translate-x-[1px]">?</span>
      </button>
    </div>
  );
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
