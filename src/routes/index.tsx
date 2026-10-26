import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import hero from "@/assets/hero.jpg";
import logo from "@/assets/logo.jpg.asset.json";
import mechas1 from "@/assets/mechas-1.jpg.asset.json";
import mechas2 from "@/assets/mechas-2.jpg.asset.json";
import mechas3 from "@/assets/mechas-3.jpg.asset.json";
import coloracao1 from "@/assets/coloracao-1.jpg.asset.json";
import escova1 from "@/assets/escova-1.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "G&A Studio de Beleza — Cabelo, unhas e sobrancelhas em Campinas" },
      {
        name: "description",
        content:
          "Cuidado, estilo e beleza em um só lugar. Mechas, coloração, escova, unhas, sobrancelhas e maquiagem na Vila Boa Vista, Campinas.",
      },
      { property: "og:title", content: "G&A Studio de Beleza — Campinas" },
      {
        property: "og:description",
        content: "Sua beleza merece um momento só seu. Fale com o studio pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WA = "5519981841123";
const wa = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
const waService = (s: string) =>
  wa(`Olá! Conheci o G&A Studio de Beleza pelo site e gostaria de saber mais sobre o serviço de ${s.toLowerCase()}.`);
const WA_GENERAL = wa(
  "Olá! Conheci o G&A Studio de Beleza pelo site e gostaria de saber mais sobre os serviços e horários disponíveis.",
);
const MAPS =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent("Rua dos Jacarandás, 303, Vila Boa Vista, Campinas - SP, 13064-748");

type Photo = { src: string; alt: string; service: string; cat: Cat };
type Cat = "Cabelo" | "Unhas" | "Sobrancelhas" | "Maquiagem";

const PHOTOS: Photo[] = [
  { src: mechas1.url, alt: "Mechas loiras com ondas feitas no G&A", service: "Mechas", cat: "Cabelo" },
  { src: mechas3.url, alt: "Mechas loiras claras em cabelo longo", service: "Mechas", cat: "Cabelo" },
  { src: escova1.url, alt: "Cabelo iluminado finalizado com ondas", service: "Escova", cat: "Cabelo" },
  { src: mechas2.url, alt: "Mechas platinadas com ondas longas", service: "Mechas", cat: "Cabelo" },
  { src: coloracao1.url, alt: "Coloração castanha com reflexos acobreados", service: "Coloração", cat: "Cabelo" },
];

type Service = { name: string; desc: string; cat: Cat };
const SERVICES: Service[] = [
  { cat: "Cabelo", name: "Corte de cabelo", desc: "Um corte que valoriza seu estilo e combina com você." },
  { cat: "Cabelo", name: "Escova", desc: "Finalização para realçar o movimento e a beleza dos cabelos." },
  { cat: "Cabelo", name: "Mechas", desc: "Ilumine o visual e explore novas possibilidades para seus cabelos." },
  { cat: "Cabelo", name: "Coloração", desc: "Renove a cor e descubra um visual alinhado à sua personalidade." },
  { cat: "Cabelo", name: "Botox capilar", desc: "Consulte as opções de tratamento e os cuidados indicados para seus cabelos." },
  { cat: "Cabelo", name: "Progressiva", desc: "Conheça as opções de alisamento e converse com o studio sobre os cuidados adequados." },
  { cat: "Cabelo", name: "Penteados", desc: "Opções para diferentes ocasiões, estilos e momentos especiais." },
  { cat: "Unhas", name: "Manicure", desc: "Um momento de cuidado para mãos bem cuidadas e um visual que combina com você." },
  { cat: "Unhas", name: "Pedicure", desc: "Dedique um momento ao cuidado dos pés com um serviço pensado para você." },
  { cat: "Sobrancelhas", name: "Design com linha", desc: "Cuidado e atenção aos detalhes para valorizar o desenho das sobrancelhas." },
  { cat: "Sobrancelhas", name: "Embelezamento de sobrancelhas", desc: "Um cuidado delicado para complementar seu visual." },
  { cat: "Maquiagem", name: "Maquiagem", desc: "Realce sua beleza e escolha um visual que combine com a ocasião." },
];

const HOURS = [
  ["Segunda-feira", "09:00–16:00"],
  ["Terça-feira", "09:00–17:00"],
  ["Quarta-feira", "09:00–17:00"],
  ["Quinta-feira", "09:00–17:00"],
  ["Sexta-feira", "09:00–17:30"],
  ["Sábado", "08:00–16:00"],
  ["Domingo", "Fechado"],
];

const NAV = [
  ["Início", "#inicio"],
  ["Serviços", "#servicos"],
  ["Portfólio", "#portfolio"],
  ["Sobre", "#sobre"],
  ["Contato", "#contato"],
];

const photosFor = (s: string) => PHOTOS.filter((p) => p.service === s);

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState<Service | null>(null);
  const [lightbox, setLightbox] = useState<Photo | null>(null);
  const [filter, setFilter] = useState<Cat | "Todos">("Todos");

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightbox(null);
        setSelected(null);
        setMenu(false);
      }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  const gallery = filter === "Todos" ? PHOTOS : PHOTOS.filter((p) => p.cat === filter);

  return (
    <div className="bg-background text-foreground">
      {/* Header */}
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled ? "border-b border-border bg-background/90 backdrop-blur" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#inicio" aria-label="G&A Studio de Beleza — início" className="block overflow-hidden rounded-sm bg-ink">
            <img src={logo.url} alt="G&A Studio de Beleza" className="h-10 w-auto" />
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map(([l, h]) => (
              <a key={h} href={h} className="text-xs uppercase tracking-[0.2em] text-foreground/80 transition hover:text-rose">
                {l}
              </a>
            ))}
            <a href={WA_GENERAL} target="_blank" rel="noreferrer" className="border border-foreground px-4 py-2 text-xs uppercase tracking-[0.2em] transition hover:bg-foreground hover:text-background">
              WhatsApp
            </a>
          </nav>
          <button className="md:hidden p-2" aria-label="Abrir menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>
            <span className="block h-px w-6 bg-foreground" />
            <span className="mt-2 block h-px w-6 bg-foreground" />
          </button>
        </div>
        {menu && (
          <nav className="border-t border-border bg-background px-5 pb-6 md:hidden">
            {NAV.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setMenu(false)} className="block border-b border-border py-4 font-serif text-2xl">
                {l}
              </a>
            ))}
            <a href={WA_GENERAL} target="_blank" rel="noreferrer" className="mt-5 block bg-primary py-3 text-center text-xs uppercase tracking-[0.2em] text-primary-foreground">
              Falar no WhatsApp
            </a>
          </nav>
        )}
      </header>

      {/* Hero */}
      <section id="inicio" className="relative flex min-h-[92svh] items-end overflow-hidden bg-card">
        <img src={hero} alt="Mulher com cabelos longos e brilhantes" className="hero-zoom absolute inset-0 h-full w-full object-cover object-[75%_center]" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent md:bg-gradient-to-r md:from-card md:via-card/40 md:to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 md:pb-28">
          <p className="eyebrow mb-4">Studio de Beleza · Campinas</p>
          <h1 className="max-w-xl text-5xl leading-[1.02] text-background md:text-7xl md:text-foreground">
            Sua beleza merece um momento só seu.
          </h1>
          <p className="mt-5 max-w-md text-base font-light text-background/90 md:text-foreground/80">
            Cuidado, estilo e beleza em um só lugar. Descubra os serviços do G&A e encontre o cuidado ideal para você.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a href="#servicos" className="bg-primary px-7 py-4 text-xs uppercase tracking-[0.22em] text-primary-foreground transition hover:bg-rose">
              Conheça nossos serviços
            </a>
            <a href="#portfolio" className="border-b border-current pb-1 text-xs uppercase tracking-[0.22em] text-background md:text-foreground">
              Ver portfólio
            </a>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-3">
          <img src={mechas1.url} alt="Ambiente do G&A com parede verde" className="aspect-[3/4] w-full object-cover" loading="lazy" />
          <img src={coloracao1.url} alt="Resultado de coloração no studio" className="mt-12 aspect-[3/4] w-full object-cover" loading="lazy" />
        </div>
        <div>
          <p className="eyebrow mb-4">O studio</p>
          <h2 className="text-4xl leading-tight md:text-5xl">Beleza, cuidado e atenção em cada detalhe.</h2>
          <p className="mt-6 font-light leading-relaxed text-muted-foreground">
            No G&A Studio de Beleza, você encontra diferentes serviços em um só lugar — cabelo, unhas, sobrancelhas,
            maquiagem e penteados — com atenção aos detalhes e uma experiência pensada para valorizar seu estilo.
          </p>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="bg-card py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-14 text-center">
            <p className="eyebrow mb-3">O que fazemos</p>
            <h2 className="text-4xl md:text-5xl">Serviços</h2>
          </div>
          {(["Cabelo", "Unhas", "Sobrancelhas", "Maquiagem"] as Cat[]).map((cat) => (
            <div key={cat} className="mb-14 last:mb-0">
              <div className="mb-6 flex items-center gap-4">
                <h3 className="text-2xl italic">{cat}</h3>
                <span className="h-px flex-1 bg-gold/50" />
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {SERVICES.filter((s) => s.cat === cat).map((s) => {
                  const ph = photosFor(s.name);
                  return (
                    <button
                      key={s.name}
                      onClick={() => setSelected(s)}
                      className="group flex flex-col bg-background text-left transition hover:-translate-y-1"
                    >
                      <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary">
                        {ph[0] ? (
                          <img src={ph[0].src} alt={ph[0].alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                        ) : (
                          <div className="flex h-full items-center justify-center font-serif text-6xl italic text-rose/60">
                            {s.name[0]}
                          </div>
                        )}
                        {ph.length > 0 && (
                          <span className="absolute left-2 top-2 bg-background/90 px-2 py-1 text-[10px] uppercase tracking-[0.15em]">
                            {ph.length} {ph.length > 1 ? "fotos reais" : "foto real"}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <span className="font-serif text-xl leading-tight">{s.name}</span>
                        <span className="mt-2 line-clamp-3 text-xs font-light text-muted-foreground">{s.desc}</span>
                        <span className="mt-auto pt-4 text-[10px] uppercase tracking-[0.2em] text-rose">Saiba mais</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Portfólio */}
      <section id="portfolio" className="mx-auto max-w-6xl px-5 py-24">
        <div className="mb-10 text-center">
          <p className="eyebrow mb-3">Portfólio</p>
          <h2 className="text-4xl md:text-5xl">Detalhes que fazem a diferença.</h2>
          <p className="mx-auto mt-4 max-w-md font-light text-muted-foreground">
            Trabalhos reais realizados no G&A Studio de Beleza.
          </p>
        </div>
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {(["Todos", "Cabelo", "Unhas", "Sobrancelhas", "Maquiagem"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.18em] transition ${
                filter === c ? "bg-primary text-primary-foreground" : "border border-border hover:border-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        {gallery.length ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
            {gallery.map((p, i) => (
              <button
                key={p.src}
                onClick={() => setLightbox(p)}
                className={`group overflow-hidden ${i === 0 ? "col-span-2 row-span-2 md:col-span-2" : ""}`}
              >
                <img src={p.src} alt={p.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </button>
            ))}
          </div>
        ) : (
          <p className="py-16 text-center font-light text-muted-foreground">Em breve, novas fotos desta categoria.</p>
        )}
      </section>

      {/* Contato */}
      <section id="contato" className="bg-secondary py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">Contato</p>
            <h2 className="text-4xl leading-tight md:text-5xl">Vamos encontrar o cuidado ideal para você?</h2>
            <p className="mt-5 font-light text-muted-foreground">
              Fale com o studio para conhecer os serviços e consultar os horários disponíveis.
            </p>
            <a href={WA_GENERAL} target="_blank" rel="noreferrer" className="mt-8 inline-block bg-primary px-7 py-4 text-xs uppercase tracking-[0.22em] text-primary-foreground transition hover:bg-rose">
              Conversar no WhatsApp
            </a>
            <p className="mt-4 text-sm">+55 19 98184-1123</p>
            <address className="mt-10 not-italic leading-relaxed">
              <span className="font-serif text-xl">G&A Studio de Beleza</span>
              <br />
              Rua dos Jacarandás, 303
              <br />
              Vila Boa Vista, Campinas — SP
              <br />
              CEP 13064-748
            </address>
            <a href={MAPS} target="_blank" rel="noreferrer" className="mt-4 inline-block border-b border-foreground pb-1 text-xs uppercase tracking-[0.2em]">
              Como chegar
            </a>
          </div>
          <div className="bg-background p-8">
            <h3 className="mb-6 text-2xl italic">Horários</h3>
            <dl>
              {HOURS.map(([d, h]) => (
                <div key={d} className="flex justify-between border-b border-border py-3 text-sm">
                  <dt>{d}</dt>
                  <dd className={h === "Fechado" ? "text-muted-foreground" : ""}>{h}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <footer className="bg-ink py-12 text-center text-ink-foreground">
        <img src={logo.url} alt="G&A Studio de Beleza" className="mx-auto h-20 w-auto" />
        <p className="mt-4 text-xs tracking-[0.2em]">© {new Date().getFullYear()} G&A STUDIO DE BELEZA · CAMPINAS</p>
      </footer>

      {/* Floating WhatsApp */}
      <a href={WA_GENERAL} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp" className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:bg-rose">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 5 5 0 0 0 1 2.6 11.3 11.3 0 0 0 4.4 3.9c1.6.7 2.3.8 3.1.6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3Z" />
        </svg>
      </a>

      {/* Service dialog */}
      {selected && (
        <div role="dialog" aria-modal="true" aria-label={selected.name} className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/60 md:items-center" onClick={() => setSelected(null)}>
          <div className="max-h-[90svh] w-full max-w-2xl overflow-y-auto bg-background p-6 md:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow mb-2">{selected.cat}</p>
                <h3 className="text-3xl">{selected.name}</h3>
              </div>
              <button onClick={() => setSelected(null)} aria-label="Fechar" className="text-2xl leading-none">×</button>
            </div>
            <p className="mt-4 font-light text-muted-foreground">{selected.desc}</p>
            {photosFor(selected.name).length > 0 && (
              <>
                <p className="mt-6 mb-3 text-xs uppercase tracking-[0.2em]">Trabalhos realizados no studio</p>
                <div className="grid grid-cols-2 gap-2">
                  {photosFor(selected.name).map((p) => (
                    <img key={p.src} src={p.src} alt={p.alt} className="aspect-[3/4] w-full object-cover" />
                  ))}
                </div>
              </>
            )}
            <a href={waService(selected.name)} target="_blank" rel="noreferrer" className="mt-6 block bg-primary py-4 text-center text-xs uppercase tracking-[0.22em] text-primary-foreground transition hover:bg-rose">
              Consultar pelo WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div role="dialog" aria-modal="true" aria-label={lightbox.alt} className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} aria-label="Fechar" className="absolute right-5 top-4 text-4xl text-ink-foreground">×</button>
          <figure onClick={(e) => e.stopPropagation()} className="text-center">
            <img src={lightbox.src} alt={lightbox.alt} className="max-h-[80svh] w-auto" />
            <figcaption className="mt-3 text-xs uppercase tracking-[0.2em] text-ink-foreground">{lightbox.service}</figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
