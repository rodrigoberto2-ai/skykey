import Image from "next/image";

export default function ToursSection() {
  const tours = [
    {
      title: "Madrid Classics Tour (Half Day)",
      image:
        "https://media.tacdn.com/media/attractions-splice-spp-674x446/07/2b/31/9e.jpg",
      description:
        "Ideal for first-time visitors. A relaxed 3â€“4 hour walk blending history, architecture, and culture to get a great overview of Madrid and its most iconic sights.",
      itinerary: [
        "Meeting point: Puerta del Sol, the heart of Madrid.",
        "Walk along Gran VÃ­a â€” the cityâ€™s most famous avenue with shops and historic buildings.",
        "Visit the Royal Palace and Sabatini Gardens.",
        "Stop at El Retiro Park â€” stroll by the lake or the Crystal Palace.",
        "Finish in Barrio de las Letras with a tapa and a glass of Spanish wine.",
      ],
      price:
        "Guided 3h tour from â‚¬35â€“â‚¬40 per person. Alternative: hop-on hop-off bus from â‚¬28/day. (Some tours donâ€™t include Royal Palace entry.)",
      tips:
        "Wear comfortable shoes; morning tours are quieter; at El Retiro you can rent a boat or enjoy a coffee; choose a private tour for a more personal pace.",
    },
    {
      title: "Madrid Food & Tapas Experience",
      image:
        "https://cdn-imgix.headout.com/madrid-food-tours.jpg?auto=format&w=900&q=80",
      description:
        "Discover Madrid through its flavors. This tour blends history, local cuisine, and the unique atmosphere of traditional tapas bars â€” perfect for food lovers.",
      itinerary: [
        "Start at Mercado de San Miguel to sample gourmet bites.",
        "Stroll through La Latina or Barrio de las Letras with stops for Iberian ham, patatas bravas, and homemade croquettes.",
        "Finish at a terrace or rooftop with city views and a local vermouth or wine.",
      ],
      price:
        "Tapas tour with local guide: â‚¬40â€“â‚¬50 per person (3â€“4 food and drink stops). Duration: 2â€“3 hours. Vegetarian or gluten-free options on request.",
      tips:
        "Come hungry, try Madridâ€™s vermouth, wear comfortable clothes, and consider an evening slot to pair with a nighttime stroll downtown.",
    },
    {
      title: "Madrid Panoramic â€” Hop-On Hop-Off Bus",
      image:
        "https://cdn.getyourguide.com/img/tour/5e5c1c37288b2.jpeg/145.jpg",
      description:
        "Perfect for exploring Madrid at your own pace. The double-decker bus lets you hop on and off at major attractions â€” the most flexible way to see the whole city.",
      itinerary: [
        "Departures from Plaza de Cibeles or Neptuno with two main routes:",
        "Historic route: Puerta de AlcalÃ¡, Prado Museum, Royal Palace, Temple of Debod.",
        "Modern route: Santiago BernabÃ©u Stadium, AZCA, Cuatro Torres, North Madrid.",
        "Hop on and off as many times as you like for 24h.",
      ],
      price:
        "1-day ticket: â‚¬28 adults / â‚¬15 children. 2-day ticket from â‚¬35. Includes audio guide in Spanish, English, and Portuguese.",
      tips:
        "Sit on the upper deck for the best views; bring sunscreen or a light jacket depending on the season; check the last bus times; pair stops with museums or parks.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="font-sans text-4xl font-bold text-left mb-12 text-gray-800">
        Discover Madrid with Skykey
      </h2>
      <div className="grid grid-cols-1 gap-10">
        {tours.map((tour, index) => (
          <article
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <TourImage src={tour.image} alt={tour.title} />
            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900">
                {tour.title}
              </h3>
              <p className="text-gray-700">{tour.description}</p>

              <h4 className="font-semibold text-gray-800 mt-4">Itinerary:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {tour.itinerary.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <p className="text-gray-700 mt-4">{tour.price}</p>
              <p className="text-gray-600 italic">{tour.tips}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function TourImage({ src, alt }: { src: string; alt: string }) {
  const placeholder = "/fallback.jpg";
  return (
    <div className="relative h-56 w-full bg-muted">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          if (!target.src.endsWith(placeholder)) {
            target.src = placeholder;
          }
        }}
        className="h-full w-full object-cover"
        loading="lazy"
      />
    </div>
  );
}
