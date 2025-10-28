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

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getTour(slug: string): Tour | undefined {
  return tours.find((t) => slugify(t.title) === slug);
}

export default function TourPage({ params }: { params: { slug: string } }) {
  const tour = getTour(params.slug);
  if (!tour) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <p className="text-lg">Tour not found.</p>
        <Link className="text-[var(--accent)] underline" href="/">Back to home</Link>
      </div>
    );
  }

  return (
    <article className="min-h-[80svh]">
      <section className="relative h-[42svh] min-h-[340px]">
        <Image src={tour.images[0]} alt={tour.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white drop-shadow mr-16">
          <h1 className="text-3xl sm:text-4xl font-normal font-accent italic">{tour.title}</h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-lg text-gray-800">{tour.description}</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {tour.images.slice(1).map((src, i) => (
            <div key={i} className="relative h-56 sm:h-64 rounded-xl overflow-hidden">
              <Image src={src} alt={`${tour.title} ${i + 2}`} fill className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]" />
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-[var(--primary)]">Itinerary</h2>
            <ul className="mt-3 list-disc list-inside text-gray-800 space-y-1">
              {tour.itinerary.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[var(--primary)]">Price</h2>
            <p className="mt-2 text-gray-800">{tour.price}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[var(--primary)]">Tips</h2>
            <p className="mt-2 text-gray-800">{tour.tips}</p>
          </div>
        </div>

        <div className="mt-12">
          <Link href="/" className="text-[var(--accent)] font-medium underline">← Back to Home</Link>
        </div>
      </section>
    </article>
  );
}
