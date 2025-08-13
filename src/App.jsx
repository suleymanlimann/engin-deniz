import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Instagram,
  Facebook,
  MapPin,
  Star,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/** -------------------------------------------------------
 * JS Sürümü (TypeScript anotasyonları kaldırıldı)
 * - HTMLScriptElement kullanımı sadeleştirildi (id ile tek sefer ekleme)
 * - React/Next SSR uyumu (yalnızca useEffect içinde doküman erişimi)
 * - allowTransparency kaldırıldı (deprecated)
 * ------------------------------------------------------ */

const fallbackImg = (e) => {
  e.currentTarget.src = "/images/placeholder.jpg";
};

function useSlider(items, visible = 3) {
  const safe = Array.isArray(items) ? items : [];
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, safe.length - visible);
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));
  const prev = () => setIndex((i) => Math.max(0, i - 1));
  useEffect(() => {
    setIndex(0);
  }, [safe.length, visible]);
  return { index, next, prev, maxIndex, items: safe, visible };
}

function MediaBox({ src, alt, ratio = "aspect-[4/3]", className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${ratio} ${className}`}>
      <img
        src={src}
        alt={alt}
        onError={fallbackImg}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover object-center block"
      />
    </div>
  );
}

// ---- Site Sabitleri ----
const GOOGLE_PLACE_EMBED =
  "https://www.google.com/maps?q=Yenik%C3%B6y%20Merkez%20Mh.%20Tekno%20Park%20Cd.%20No%3A13%2C%20Ba%C5%9Fiskele%2C%20Kocaeli%2C%20%C4%B0zmit%2041275&output=embed";
const WHATSAPP_LINK = "https://wa.me/905017256051";
const TEL_LINK = "tel:+902623230202";
const IG_URL = "https://www.instagram.com/estetikburundoktorum?igsh=bTZjMjFlYml5NGN2";
const FB_URL =
  "https://www.facebook.com/p/Op-Dr-Engin-Deniz-Mi%C3%A7oo%C4%9Fullar%C4%B1-100092397775662/";
const GOOGLE_SHARE = "https://share.google/E0lDjW6ci3g0XWiHj";

// Görseller (/public/images)
const HERO_IMG = "/images/opdr-hero.jpg";
const SURGERY_IMG = "/images/op-surgery.jpg";
const AVATAR_IMG = "/images/op-avatar.jpg";

const galleryImage1 = "/images/gallery-1.jpg";
const galleryImage2 = "/images/gallery-2.jpg";
const galleryImage3 = "/images/gallery-3.jpg";


// ---- Fallback Yorumlar ----
const FALLBACK_REVIEWS = [
  {
    author_name: "Z*** Y***",
    rating: 5,
    relative_time_description: "2 hafta önce",
    text: "Rinoplasti sonrası nefesim düzeldi, doğal sonuç.",
  },
  {
    author_name: "M*** K***",
    rating: 5,
    relative_time_description: "1 ay önce",
    text: "Vertigo tedavisinde kısa sürede sonuç aldık.",
  },
  {
    author_name: "H*** A***",
    rating: 5,
    relative_time_description: "3 ay önce",
    text: "KBB alanında çok ilgili ve açıklayıcı.",
  },
];

export default function DrMicoogullari() {
  const [reviews, setReviews] = useState(null);

  // ---- JSON-LD (schema) tek sefer ekle ----
  useEffect(() => {
    if (typeof document === "undefined") return;

    const ld = {
      "@context": "https://schema.org",
      "@type": "Physician",
      name: "Op. Dr. Engin Deniz Miçooğulları",
      medicalSpecialty: ["Otolaryngology", "Rhinoplasty", "HeadNeckSurgery"],
      sameAs: [IG_URL, FB_URL, GOOGLE_SHARE],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Yeniköy Merkez Mh. Tekno Park Cd. No:13",
        addressLocality: "Başiskele",
        addressRegion: "Kocaeli, İzmit",
        addressCountry: "TR",
      },
      telephone: "+90 262 323 02 02",
    };

    const id = "schema-physician";
    let tag = document.getElementById(id);
    if (!tag) {
      tag = document.createElement("script");
      tag.type = "application/ld+json"; // HTMLScriptElement özelliği
      tag.id = id;
      document.head.appendChild(tag);
    }
    // HTMLScriptElement.text / .textContent kullanılabilir; React tarafında güvenli olan textContent
    tag.textContent = JSON.stringify(ld);
  }, []);

  // ---- Yorumlar ----
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.__GOOGLE_REVIEWS__) {
        setReviews(window.__GOOGLE_REVIEWS__);
        return;
      }
    } catch { }

    fetch("/api/google-reviews")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && Array.isArray(d.reviews)) setReviews(d.reviews);
      })
      .catch(() => { })
      .finally(() => setReviews((cur) => cur ?? FALLBACK_REVIEWS));
  }, []);

  const reviewSlider = useSlider(reviews, 3);
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white text-slate-800 scroll-smooth">
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <a
            href="#hero"
            className="font-semibold text-lg md:text-xl tracking-tight flex items-center gap-3"
          >
            <img
              src={AVATAR_IMG}
              onError={fallbackImg}
              alt="Dr. Avatar"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full border object-cover"
            />

            Op. Dr. Engin Deniz Miçooğulları
          </a>
          <nav className="hidden md:flex items-center gap-5 text-sm">
            <a href="#hakkinda" className="hover:text-sky-700">Hakkında</a>
            <a href="#uzmanlik" className="hover:text-sky-700">Uzmanlık</a>
            <a href="#deneyim" className="hover:text-sky-700">Deneyim</a>
            <a href="#yorumlar" className="hover:text-sky-700">Yorumlar</a>
            <a href="#galeri" className="hover:text-sky-700">Galeri</a>
            <a href="#instagram" className="hover:text-sky-700">Instagram</a>
            <a href="#iletisim" className="hover:text-sky-700">İletişim</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild className="hidden sm:inline-flex">
              <a href={TEL_LINK}><Phone className="w-4 h-4 mr-2" /> Randevu</a>
            </Button>
            <Button asChild variant="secondary" className="hidden sm:inline-flex">
              <a href={WHATSAPP_LINK}><MessageCircle className="w-4 h-4 mr-2" /> WhatsApp</a>
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 lg:py-12 grid lg:grid-cols-2 gap-8 items-center">
          {/* LEFT */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-extrabold leading-tight"
            >
              KBB Uzmanı & Rinoplasti
              <span className="text-sky-700 block">Doğal Sonuç, Rahat Nefes</span>
            </motion.h1>

            <p className="mt-4 text-base md:text-lg text-slate-600 max-w-prose">
              21+ yıllık deneyimle rinoplasti, septorhinoplasti, sinüzit, vertigo, alerji, horlama ve kulak hastalıklarında kapsamlı yaklaşım.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href={TEL_LINK}><Phone className="w-5 h-5 mr-2" /> (0262) 323 02 02</a>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href={WHATSAPP_LINK}><MessageCircle className="w-5 h-5 mr-2" /> 0501 725 60 51</a>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <a href={IG_URL}><Instagram className="w-5 h-5 mr-2" /> Instagram</a>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <a href={FB_URL}><Facebook className="w-5 h-5 mr-2" /> Facebook</a>
              </Button>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <img
                src={AVATAR_IMG}
                onError={fallbackImg}
                alt="Op. Dr. Engin Deniz Miçooğulları"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full border object-cover"
              />
              <Badge variant="secondary" className="text-sky-800">21+ Yıl Deneyim</Badge>
              <Badge variant="outline" className="border-sky-200">Rinoplasti • Sinüzit • Vertigo • KBB</Badge>
            </div>
          </div>

          {/* RIGHT – simplified, tighter, more premium */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="relative"
          >
            {/* subtle background glow */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute right-0 top-6 h-72 w-72 rounded-full bg-sky-100 blur-3xl opacity-60" />
            </div>

            {/* main doctor visual */}
            <Card className="rounded-3xl border-0 shadow-xl">
              <div className="relative rounded-3xl overflow-hidden border shadow-xl">
                {/* Doctor image cropped from bottom */}
                <img
                  src={HERO_IMG}
                  alt="Op. Dr. Engin Deniz Miçooğulları"
                  className="object-cover w-full h-full object-top"
                  style={{ aspectRatio: '5/5' }}
                />

                {/* bottom overlay label */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="rounded-2xl bg-white/90 backdrop-blur px-4 py-3 shadow border flex items-center gap-3">
                    <img
                      src={AVATAR_IMG}
                      onError={fallbackImg}
                      alt="Op. Dr. Engin Deniz Miçooğulları"
                      className="w-8 h-8 rounded-full object-cover border"
                    />
                    <div className="text-sm">
                      <div className="font-semibold">Op. Dr. Engin Deniz Miçooğulları</div>
                      <div className="text-slate-600">KBB Uzmanı • Rinoplasti</div>
                    </div>
                  </div>
                </div>

              </div>
            </Card>

            {/* compact secondary row */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <MediaBox
                src={SURGERY_IMG}
                alt="Ameliyathane"
                ratio="aspect-[5/3] rounded-2xl"
                className="[&>img]:object-cover shadow-md"
              />

              <div className="grid gap-4">
                <Card className="rounded-2xl">
                  <CardContent className="p-5">
                    <div className="text-2xl font-extrabold tracking-tight">21+ Yıl</div>
                    <div className="text-slate-600">Deneyim</div>
                  </CardContent>
                </Card>
                <Card className="rounded-2xl">
                  <CardContent className="p-5">
                    <div className="text-2xl font-extrabold tracking-tight">%98+</div>
                    <div className="text-slate-600">Hasta Memnuniyeti</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* HAKKINDA */}
      <section id="hakkinda" className="py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-4">Hakkında</h2>
              <p className="text-slate-700 leading-relaxed">
                Op. Dr. Engin Deniz Miçooğulları, estetik & fonksiyonel burun cerrahisi, sinüzit, vertigo, alerji, horlama,
                kulak hastalıkları ve baş-boyun cerrahisi alanlarında kapsamlı deneyime sahiptir.
              </p>
              <ul className="mt-5 space-y-2 text-slate-700">
                {[
                  "Dicle Üniversitesi – Tıp (1998–2004)",
                  "Yüzüncü Yıl Üniversitesi – KBB-Baş Boyun Cerrahisi (2007–2012)",
                  "Özel Aktif Kocaeli Hastanesi – KBB Uzmanı (2023– )",
                  "Özel Defne Hastanesi – KBB Uzmanı (2017–2023)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 text-sky-600" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <Card className="border-sky-100 h-full">
              <CardHeader>
                <CardTitle>Randevu & İletişim</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> (0262) 323 02 02</p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Yeniköy Merkez Mh. Tekno Park Cd. No:13, Başiskele, Kocaeli, İzmit 41275
                </p>
                <div className="flex gap-2 pt-2">
                  <Button asChild size="sm"><a href={TEL_LINK}>Ara</a></Button>
                  <Button asChild size="sm" variant="secondary"><a href={WHATSAPP_LINK}>WhatsApp</a></Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* UZMANLIK */}
      <section id="uzmanlik" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-7">Uzmanlık Alanları</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Rinoplasti & Septorhinoplasti", desc: "Estetik ve fonksiyonel denge – doğal görünüm, rahat nefes." },
              { title: "Sinüzit", desc: "Endoskopik yaklaşımlar, medikal ve cerrahi tedavi seçenekleri." },
              { title: "Vertigo", desc: "Denge bozuklukları için kapsamlı değerlendirme ve tedavi." },
              { title: "Alerji & Horlama", desc: "Üst hava yolları sorunlarında etkili çözümler." },
              { title: "Kulak Hastalıkları", desc: "Tinnitus, otoskleroz, kulak zarı problemleri ve daha fazlası." },
              { title: "Baş-Boyun Cerrahisi", desc: "Vokal kord paralizileri ve sinirsel rahatsızlıklar." },
            ].map((s, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow rounded-2xl h-full">
                <CardHeader><CardTitle className="text-xl">{s.title}</CardTitle></CardHeader>
                <CardContent className="text-slate-600">{s.desc}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* DENEYİM */}
      <section id="deneyim" className="py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-7">Mesleki Deneyim</h2>
          <div className="relative pl-6 border-l-2 border-sky-100 space-y-7">
            {[
              { years: "2023–günümüz", place: "Özel Aktif Kocaeli Hastanesi", role: "KBB Uzmanı" },
              { years: "2017–2023", place: "Özel Defne Hastanesi", role: "KBB Uzmanı" },
              { years: "2014–2017", place: "Hatay Dörtyol Devlet Hastanesi", role: "KBB" },
              { years: "2007–2008", place: "Yeni Yüzyıl Eğitim Araştırma Hastanesi", role: "KBB" },
              { years: "2005–2007", place: "SGK Sağlık İşleri Müdürlüğü Adana", role: "Hekim" },
              { years: "2004–2005", place: "Siirt 50. Yıl SGK Hastanesi & Adıyaman Besni Aile Sağlığı Merkezi", role: "Hekim" },
            ].map((e, i) => (
              <div key={i} className="ml-2">
                <div className="w-3 h-3 bg-sky-500 rounded-full -ml-[1.15rem] mb-2" />
                <div className="text-sm text-slate-500">{e.years}</div>
                <div className="font-semibold">{e.place}</div>
                <div className="text-slate-600">{e.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GOOGLE YORUMLAR */}
      <section id="yorumlar" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Google Yorumları</h2>
            <div className="flex items-center gap-2 text-slate-600 text-sm">
              <Sparkles className="w-4 h-4" /> Doğrulanmış hasta görüşleri
              <Button asChild variant="outline" className="ml-3">
                <a href={GOOGLE_SHARE} target="_blank" rel="noreferrer">Google’da Gör</a>
              </Button>
            </div>
          </div>

          {/* MOBILE: native swipe */}
          <div className="relative md:hidden">
            <div
              id="reviewsTrack"
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label="Google yorumları kaydırılabilir liste"
            >
              {reviewSlider.items.map((r, i) => (
                <Card key={i} className="rounded-2xl border-sky-100 snap-center shrink-0 w-[85vw]">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold truncate max-w-[70%]">{r.author_name}</div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star key={s} className={`w-4 h-4 ${s < (r.rating || 0) ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-slate-300'}`} />
                        ))}
                      </div>
                    </div>
                    {r.text && <p className="text-sm text-slate-600 line-clamp-4">{r.text}</p>}
                    {r.relative_time_description && (
                      <div className="text-xs text-slate-500 mt-3">{r.relative_time_description}</div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Mobile controls */}
            <div className="flex items-center justify-end gap-2 mt-4">
              <Button
                variant="outline"
                size="icon"
                aria-label="Önceki"
                onClick={() => {
                  const el = document.getElementById('reviewsTrack');
                  if (!el) return;
                  const first = el.querySelector(':scope > *');
                  const cardWidth = first?.getBoundingClientRect().width || el.clientWidth * 0.9;
                  el.scrollBy({ left: -(cardWidth + 16), behavior: 'smooth' });
                }}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Sonraki"
                onClick={() => {
                  const el = document.getElementById('reviewsTrack');
                  if (!el) return;
                  const first = el.querySelector(':scope > *');
                  const cardWidth = first?.getBoundingClientRect().width || el.clientWidth * 0.9;
                  el.scrollBy({ left: cardWidth + 16, behavior: 'smooth' });
                }}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* DESKTOP/TABLET: clean 3-column grid (no scroll) */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4">
            {reviewSlider.items.slice(0, 6).map((r, i) => (
              <Card key={i} className="rounded-2xl border-sky-100">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold truncate max-w-[70%]">{r.author_name}</div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className={`w-4 h-4 ${s < (r.rating || 0) ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-slate-300'}`} />
                      ))}
                    </div>
                  </div>
                  {r.text && <p className="text-sm text-slate-600 line-clamp-3">{r.text}</p>}
                  {r.relative_time_description && (
                    <div className="text-xs text-slate-500 mt-3">{r.relative_time_description}</div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* GALERİ */}
      <section id="galeri" className="py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-6">Fotoğraf Galerisi</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MediaBox
              src={galleryImage1}
              alt="Portre"
              className="[&>img]:object-contain bg-slate-100 h-[250px]"
              ratio="aspect-auto"
            />
            <MediaBox
              src={galleryImage2}
              alt="Ameliyathane"
              className="[&>img]:object-contain bg-slate-100 h-[250px]"
              ratio="aspect-auto"
            />
            <MediaBox
              src={galleryImage3}
              alt="Portre"
              className="[&>img]:object-contain bg-slate-100 h-[250px]"
              ratio="aspect-auto"
            />
          </div>
        </div>
      </section>



      {/* INSTAGRAM – SnapWidget */}
      <section id="instagram" className="py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Instagram</h2>
            <Button asChild variant="ghost">
              <a href={IG_URL}><Instagram className="w-4 h-4 mr-2" /> @estetikburundoktorum</a>
            </Button>
          </div>
          <div className="rounded-2xl overflow-hidden border">
            <iframe
              src="https://snapwidget.com/embed/"
              title="Instagram Feed"
              className="w-full min-h-[480px]"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              loading="lazy"
            />
          </div>
          <p className="text-xs text-slate-500 mt-4">
            SnapWidget panelinden aldığın <code>embed</code> URL’sini iframe <code>src</code> alanına yapıştır.
          </p>
        </div>
      </section>

      {/* İLETİŞİM & KONUM */}
      <section id="iletisim" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-8 items-stretch">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>İletişim</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-slate-700">
                <p className="flex gap-2 items-center"><Phone className="w-4 h-4" /> (0262) 323 02 02</p>
                <p className="flex gap-2 items-center"><MapPin className="w-4 h-4" /> Yeniköy Merkez Mh. Tekno Park Cd. No:13, Başiskele, Kocaeli, İzmit 41275</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button asChild><a href={TEL_LINK}><Phone className="w-4 h-4 mr-2" /> Hemen Ara</a></Button>
                  <Button asChild variant="secondary"><a href={WHATSAPP_LINK}><MessageCircle className="w-4 h-4 mr-2" /> WhatsApp</a></Button>
                  <Button asChild variant="outline"><a href={GOOGLE_SHARE}><MapPin className="w-4 h-4 mr-2" /> Google Yeri</a></Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <CardTitle>Konum</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl overflow-hidden border aspect-[4/3]">
                <iframe
                  src={GOOGLE_PLACE_EMBED}
                  className="w-full h-full"
                  loading="lazy"
                  title="Harita"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-8 text-center text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          © {year} Op. Dr. Engin Deniz Miçooğulları — Tüm hakları saklıdır.
          <div className="mt-2 flex gap-3 justify-center">
            <a className="hover:underline" href={IG_URL}>Instagram</a>
            <span>•</span>
            <a className="hover:underline" href={FB_URL}>Facebook</a>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTIONS */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2">
        <a href={WHATSAPP_LINK} className="rounded-full shadow-lg bg-emerald-500 text-white p-3">
          <MessageCircle className="w-5 h-5" />
        </a>
        <a href={TEL_LINK} className="rounded-full shadow-lg bg-sky-600 text-white p-3">
          <Phone className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
