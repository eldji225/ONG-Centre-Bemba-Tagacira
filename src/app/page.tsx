"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Leaf,
  Microscope,
  Shield,
  Users,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Heart,
  HandHeart,
  ArrowUp,
  Menu,
  X,
  Beaker,
  BookOpen,
  Scale,
  Eye,
  FileText,
  CheckCircle2,
  AlertCircle,
  FlaskConical,
  TreePine,
  GraduationCap,
  Globe,
  Recycle,
  Lock,
  BarChart3,
  Send,
  UserPlus,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

/* ─────────── ANIMATED COUNTER ─────────── */
function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString("fr-FR")}
      {suffix}
    </span>
  );
}

/* ─────────── SECTION WRAPPER ─────────── */
function Section({
  id,
  children,
  className = "",
  dark = false,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative py-20 md:py-28 ${
        dark ? "bg-earth-900" : "bg-earth-800"
      } ${className}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

/* ─────────── SECTION HEADER ─────────── */
function SectionHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-12 text-center md:mb-16">
      <span className="mb-3 inline-block rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-gold-400 uppercase">
        {label}
      </span>
      <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
      <div className="section-divider mx-auto mt-6" />
    </div>
  );
}

/* ─────────── STAT CARD ─────────── */
function StatCard({
  icon: Icon,
  value,
  suffix,
  label,
  color,
}: {
  icon: React.ElementType;
  value: number;
  suffix?: string;
  label: string;
  color: "gold" | "emerald";
}) {
  const borderColor =
    color === "gold" ? "border-gold-500/30" : "border-emerald-500/30";
  const iconColor =
    color === "gold" ? "text-gold-400" : "text-emerald-400";
  const numColor =
    color === "gold" ? "text-gold-300" : "text-emerald-300";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl border ${borderColor} bg-earth-700/50 p-6 text-center backdrop-blur-sm`}
    >
      <Icon className={`mx-auto mb-3 h-8 w-8 ${iconColor}`} />
      <div className={`text-3xl font-bold md:text-4xl ${numColor}`}>
        <AnimatedCounter target={value} suffix={suffix} />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </motion.div>
  );
}

/* ─────────── MISSION CARD ─────────── */
function MissionCard({
  number,
  icon: Icon,
  title,
  subtitle,
  description,
  tags,
  color,
}: {
  number: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: "gold" | "emerald" | "sky" | "lime";
}) {
  const colorMap = {
    gold: {
      border: "border-gold-500/20 hover:border-gold-500/50",
      icon: "text-gold-400",
      badge: "bg-gold-500/10 text-gold-300",
      num: "text-gold-500/30",
    },
    emerald: {
      border: "border-emerald-500/20 hover:border-emerald-500/50",
      icon: "text-emerald-400",
      badge: "bg-emerald-500/10 text-emerald-300",
      num: "text-emerald-500/30",
    },
    sky: {
      border: "border-sky-500/20 hover:border-sky-500/50",
      icon: "text-sky-400",
      badge: "bg-sky-500/10 text-sky-300",
      num: "text-sky-500/30",
    },
    lime: {
      border: "border-lime-500/20 hover:border-lime-500/50",
      icon: "text-lime-400",
      badge: "bg-lime-500/10 text-lime-300",
      num: "text-lime-500/30",
    },
  };
  const c = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5 }}
      className={`group relative overflow-hidden rounded-xl border ${c.border} bg-earth-700/40 p-6 transition-all duration-300 backdrop-blur-sm`}
    >
      <span
        className={`absolute -right-2 -top-2 text-7xl font-black ${c.num}`}
      >
        {number}
      </span>
      <div className="relative z-10">
        <Icon className={`mb-3 h-7 w-7 ${c.icon}`} />
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="mb-3 text-xs font-medium tracking-wider text-muted-foreground uppercase">
          {subtitle}
        </p>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${c.badge}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────── ETHICS ARTICLE ─────────── */
function EthicsArticle({
  number,
  icon: Icon,
  title,
  subtitle,
  commitments,
}: {
  number: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  commitments: { heading: string; text: string }[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-gold-500/15 bg-earth-700/40 p-6 backdrop-blur-sm md:p-8"
    >
      <div className="mb-4 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gold-500/10">
          <Icon className="h-6 w-6 text-gold-400" />
        </div>
        <div>
          <span className="text-xs font-bold tracking-widest text-gold-500 uppercase">
            Article {number}
          </span>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <div className="space-y-4 pl-0 md:pl-16">
        {commitments.map((c, i) => (
          <div key={i}>
            <h4 className="mb-1 text-sm font-semibold text-gold-300">
              {c.heading}
            </h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {c.text}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────── PILLAR CARD ─────────── */
function PillarCard({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: "gold" | "emerald" | "sky" | "amber";
}) {
  const colorMap = {
    gold: {
      border: "border-gold-500/20 hover:border-gold-500/50",
      iconBg: "bg-gold-500/10",
      iconColor: "text-gold-400",
    },
    emerald: {
      border: "border-emerald-500/20 hover:border-emerald-500/50",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    sky: {
      border: "border-sky-500/20 hover:border-sky-500/50",
      iconBg: "bg-sky-500/10",
      iconColor: "text-sky-400",
    },
    amber: {
      border: "border-amber-500/20 hover:border-amber-500/50",
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-400",
    },
  };
  const c = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl border ${c.border} bg-earth-700/40 p-6 transition-all duration-300 backdrop-blur-sm`}
    >
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${c.iconBg}`}
      >
        <Icon className={`h-6 w-6 ${c.iconColor}`} />
      </div>
      <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}

/* ─────────── REPORT CARD ─────────── */
function ReportCard({
  title,
  type,
  year,
  pages,
  code,
  status,
}: {
  title: string;
  type: string;
  year: number;
  pages: number;
  code: string;
  status: "available" | "upcoming";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-lg border border-gold-500/10 bg-earth-700/40 p-5 backdrop-blur-sm"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-gold-500/10 px-3 py-1 text-xs font-medium text-gold-300">
          {type}
        </span>
        <span className="text-xs text-muted-foreground">{code}</span>
      </div>
      <h4 className="mb-1 font-semibold text-white">{title}</h4>
      <p className="mb-4 text-xs text-muted-foreground">
        {status === "available" ? `${pages} pages · ${year}` : `En préparation · ${year}`}
      </p>
      {status === "available" ? (
        <button className="inline-flex items-center gap-2 rounded-lg border border-gold-500/30 bg-gold-500/10 px-4 py-2 text-sm font-medium text-gold-300 transition-colors hover:bg-gold-500/20">
          <FileText className="h-4 w-4" />
          Demander le rapport
        </button>
      ) : (
        <span className="inline-flex items-center gap-2 rounded-lg border border-muted-foreground/20 bg-earth-600/30 px-4 py-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          En cours de preparation
        </span>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════ */
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#accueil", label: "Accueil" },
    { href: "#presentation", label: "L'ONG" },
    { href: "#impact", label: "Impact" },
    { href: "#missions", label: "Missions" },
    { href: "#charte", label: "Charte" },
    { href: "#transparence", label: "Transparence" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-earth-900 text-foreground">
      {/* ─────────── HEADER / NAV ─────────── */}
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-gold-500/10 bg-earth-900/95 shadow-lg shadow-black/20 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <a href="#accueil" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500/10">
              <Leaf className="h-5 w-5 text-gold-400" />
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-bold text-white">
                Centre Bemba Tagaçira
              </span>
              <span className="block text-[10px] tracking-wider text-muted-foreground uppercase">
                ONG &middot; Abidjan
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-earth-700/50 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-3 lg:flex">
            <a href="#adhesion">
              <Button
                variant="outline"
                size="sm"
                className="border-gold-500/30 bg-gold-500/10 text-gold-300 hover:bg-gold-500/20 hover:text-gold-200"
              >
                <HandHeart className="mr-2 h-4 w-4" />
                Devenir Sentinelle
              </Button>
            </a>
            <a href="#contact">
              <Button
                size="sm"
                className="bg-emerald-600 text-white hover:bg-emerald-500"
              >
                <Heart className="mr-2 h-4 w-4" />
                Soutenir l'ONG
              </Button>
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-muted-foreground hover:bg-earth-700/50 hover:text-white lg:hidden"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-gold-500/10 bg-earth-900/98 backdrop-blur-md lg:hidden"
            >
              <nav className="flex flex-col gap-1 px-4 py-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const hash = link.href.startsWith("#") ? link.href : `#${link.href.split("#")[1]}`;
                      setMobileMenuOpen(false);
                      setTimeout(() => {
                        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
                      }, 300);
                    }}
                    className="rounded-lg px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-earth-700/50 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
                <hr className="my-2 border-gold-500/10" />
                <a
                  href="#adhesion"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    setTimeout(() => {
                      document.querySelector("#adhesion")?.scrollIntoView({ behavior: "smooth" });
                    }, 300);
                  }}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-gold-300 transition-colors hover:bg-gold-500/10"
                >
                  <HandHeart className="mr-2 inline h-4 w-4" />
                  Devenir Sentinelle
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    setTimeout(() => {
                      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                    }, 300);
                  }}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-500/10"
                >
                  <Heart className="mr-2 inline h-4 w-4" />
                  Soutenir l'ONG
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─────────── HERO ─────────── */}
      <section
        id="accueil"
        className="relative flex min-h-screen items-center overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-earth-900 via-[#1a1a0e] to-[#0d1a0d]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,164,21,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(5,150,105,0.06),transparent_50%)]" />

        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8a415' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-32 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-gold-500/5 px-5 py-2 text-sm text-gold-300"
            >
              <span className="text-base">🇨🇮</span>
              ONG de droit ivoirien &mdash; Abidjan, Côte d'Ivoire
            </motion.div>

            {/* Title */}
            <h1 className="mb-2 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Centre Bemba{" "}
              <span className="text-gradient-gold">Tagaçira</span>
            </h1>

            {/* Subtitle */}
            <p className="mb-6 text-lg font-medium text-emerald-400 md:text-xl">
              Pharmacopée Africaine
            </p>

            {/* Decorative separator */}
            <div className="section-divider mx-auto mb-8" />

            {/* Tagline */}
            <p className="mx-auto mb-4 max-w-2xl text-xl font-light italic text-gold-200/80 md:text-2xl">
              La science au service de la tradition, la tradition pour la
              protection de la vie.
            </p>

            {/* Description */}
            <p className="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Organisation ivoirienne dédiée à la valorisation de la pharmacopée
              africaine par la rigueur scientifique. Recherche biochimique,
              standardisation des préparations médicinales et transmission des
              savoirs ancestraux &mdash; depuis Abidjan, pour toute l'Afrique.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#presentation">
                <Button
                  size="lg"
                  className="bg-gold-500 text-earth-900 hover:bg-gold-400"
                >
                  Découvrir l'ONG
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="#contact">
                <Button
                  size="lg"
                  className="bg-emerald-600 text-white hover:bg-emerald-500"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Soutenir l'ONG
                </Button>
              </a>
              <a href="#adhesion">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gold-500/30 text-gold-300 hover:bg-gold-500/10 hover:text-gold-200"
                >
                  <HandHeart className="mr-2 h-4 w-4" />
                  Devenir Sentinelle
                </Button>
              </a>
            </div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-8"
            >
              {[
                {
                  value: 3200,
                  suffix: "+",
                  label: "Bénéficiaires",
                  color: "emerald" as const,
                  icon: Users,
                },
                {
                  value: 5,
                  suffix: " ans",
                  label: "D'activité",
                  color: "gold" as const,
                  icon: Clock,
                },
                {
                  value: 98,
                  suffix: "%",
                  label: "Conformité",
                  color: "emerald" as const,
                  icon: CheckCircle2,
                },
                {
                  value: 120,
                  suffix: "+",
                  label: "Sentinelles formées",
                  color: "gold" as const,
                  icon: GraduationCap,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-gold-500/10 bg-earth-800/60 p-4 backdrop-blur-sm"
                >
                  <stat.icon
                    className={`mx-auto mb-2 h-5 w-5 ${
                      stat.color === "gold"
                        ? "text-gold-400"
                        : "text-emerald-400"
                    }`}
                  />
                  <div
                    className={`text-2xl font-bold md:text-3xl ${
                      stat.color === "gold"
                        ? "text-gold-300"
                        : "text-emerald-300"
                    }`}
                  >
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Founder credit */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-8 text-sm text-muted-foreground"
            >
              Fondé par{" "}
              <span className="font-medium text-gold-300">
                Tounkara Al Foussein
              </span>{" "}
              &mdash; Expert en chimie alimentaire & contrôle qualité &middot;
              Ethnobotaniste
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="h-6 w-6 text-gold-500/40" />
        </motion.div>
      </section>

      {/* ─────────── PRÉSENTATION ─────────── */}
      <Section id="presentation" dark>
        <SectionHeader
          label="Qui sommes-nous"
          title="L'ONG Centre Bemba Tagaçira"
          description="Nous sommes convaincus que la pharmacopée ivoirienne, lorsqu'elle est encadrée par une démarche scientifique rigoureuse, constitue un levier majeur pour la santé communautaire et le développement durable."
        />

        {/* Founder quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl rounded-xl border-l-4 border-gold-500/40 bg-earth-700/30 p-6 md:p-8"
        >
          <p className="mb-4 text-base leading-relaxed italic text-gold-200/80 md:text-lg">
            &ldquo;Fort d'une expertise en chimie alimentaire et contrôle
            qualité, et héritier de savoirs ethnobotaniques ancestraux, j'ai
            fondé ce centre avec une vision novatrice : concilier la rigueur des
            protocoles de laboratoire avec la profondeur de la médecine
            traditionnelle africaine.&rdquo;
          </p>
          <footer className="text-sm text-muted-foreground">
            <span className="font-medium text-gold-300">
              Tounkara Al Foussein
            </span>
            , Président &mdash; ONG Centre Bemba Tagaçira, Abidjan, Côte
            d'Ivoire
          </footer>
        </motion.blockquote>

        {/* Approach */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mb-16 max-w-3xl rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-6 text-center md:p-8"
        >
          <h3 className="mb-3 text-lg font-bold text-emerald-400">
            Notre Approche
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            Notre démarche repose sur une approche holistique de la santé,
            visant à renforcer les défenses naturelles de l'individu par des
            méthodes naturelles contrôlées et tracées. Chaque préparation est
            soumise à des protocoles rigoureux de contrôle qualité, incluant la
            mesure du pH, l'analyse microbiologique et la traçabilité complète de
            la chaîne de production, de la cueillette à la distribution.
          </p>
        </motion.div>

        {/* 4 Pillars */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <PillarCard
            icon={Microscope}
            title="Recherche & Développement"
            description="Étude biochimique et microbiologique des plantes médicinales, notamment le Scoparia dulcis (Timitimi), pour garantir leur efficacité et sécurité sanitaire."
            color="gold"
          />
          <PillarCard
            icon={BarChart3}
            title="Standardisation"
            description="Mise en place de normes de contrôle qualité strictes (pH, analyse microbiologique, traçabilité) pour les préparations médicinales traditionnelles."
            color="emerald"
          />
          <PillarCard
            icon={BookOpen}
            title="Transmission"
            description="Formation d'une nouvelle génération de Sentinelles au respect des ressources naturelles et des protocoles d'hygiène et de qualité."
            color="sky"
          />
          <PillarCard
            icon={Users}
            title="Collaboration"
            description="Ouverture à toute collaboration institutionnelle visant à intégrer nos solutions dans le paysage sanitaire national ivoirien."
            color="amber"
          />
        </div>

        {/* Key facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { icon: Leaf, label: "7 Plantes étudiées", sub: "Dont Scoparia dulcis" },
            { icon: MapPin, label: "Abidjan", sub: "Siège social" },
            { icon: Scale, label: "Droit ivoirien", sub: "ONG enregistrée" },
            { icon: Users, label: "Réseau de Sentinelles", sub: "Formées & actives" },
          ].map((fact) => (
            <div
              key={fact.label}
              className="rounded-lg border border-gold-500/10 bg-earth-700/30 p-4 text-center"
            >
              <fact.icon className="mx-auto mb-2 h-5 w-5 text-gold-400" />
              <p className="text-sm font-semibold text-white">{fact.label}</p>
              <p className="text-xs text-muted-foreground">{fact.sub}</p>
            </div>
          ))}
        </motion.div>
      </Section>

      {/* ─────────── IMPACT ─────────── */}
      <Section id="impact">
        <SectionHeader
          label="Notre Impact"
          title="Des Résultats Concrets"
          description="Depuis 2019, le Centre Bemba Tagaçira oeuvre à la valorisation scientifique de la pharmacopée africaine au bénéfice des communautés ivoiriennes."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            icon={Users}
            value={3200}
            suffix="+"
            label="Communautés accompagnées"
            color="emerald"
          />
          <StatCard
            icon={FileText}
            value={47}
            label="Projets réalisés"
            color="gold"
          />
          <StatCard
            icon={Clock}
            value={5}
            suffix=" ans"
            label="D'activité depuis 2019"
            color="emerald"
          />
          <StatCard
            icon={GraduationCap}
            value={120}
            suffix="+"
            label="Sentinelles formées"
            color="gold"
          />
          <StatCard
            icon={Leaf}
            value={7}
            label="Espèces étudiées"
            color="emerald"
          />
          <StatCard
            icon={CheckCircle2}
            value={98}
            suffix="%"
            label="Taux de conformité"
            color="gold"
          />
        </div>

        {/* CTA Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: Heart,
              title: "Soutenir nos recherches",
              description:
                "Chaque contribution aide à financer nos recherches biochimiques et nos programmes de santé communautaire.",
              href: "#contact",
              color: "emerald" as const,
            },
            {
              icon: HandHeart,
              title: "Rejoindre les Sentinelles",
              description:
                "Devenez Sentinelle et engagez-vous dans la valorisation de la pharmacopée africaine.",
              href: "#adhesion",
              color: "gold" as const,
            },
            {
              icon: Mail,
              title: "Collaborer avec nous",
              description:
                "Institutions, chercheurs, ONG : nous sommes ouverts aux partenariats.",
              href: "#contact",
              color: "emerald" as const,
            },
          ].map((cta) => (
            <motion.a
              key={cta.title}
              href={cta.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`group rounded-xl border p-6 transition-all duration-300 ${
                cta.color === "emerald"
                  ? "border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40 hover:bg-emerald-500/10"
                  : "border-gold-500/20 bg-gold-500/5 hover:border-gold-500/40 hover:bg-gold-500/10"
              }`}
            >
              <cta.icon
                className={`mb-3 h-8 w-8 ${
                  cta.color === "emerald"
                    ? "text-emerald-400"
                    : "text-gold-400"
                }`}
              />
              <h3 className="mb-2 text-lg font-bold text-white">
                {cta.title}
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {cta.description}
              </p>
              <span
                className={`inline-flex items-center text-sm font-medium ${
                  cta.color === "emerald"
                    ? "text-emerald-400"
                    : "text-gold-400"
                }`}
              >
                En savoir plus
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.a>
          ))}
        </div>
      </Section>

      {/* ─────────── MISSIONS ─────────── */}
      <Section id="missions" dark>
        <SectionHeader
          label="Ce que nous faisons"
          title="Nos Missions"
          description="Six axes d'engagement pour valoriser la pharmacopée africaine et protéger les communautés."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <MissionCard
            number="01"
            icon={FlaskConical}
            title="Étude Biochimique"
            subtitle="Scoparia dulcis (Timitimi)"
            description="Analyse approfondie des propriétés biochimiques et microbiologiques des plantes médicinales africaines, avec un focus particulier sur le Scoparia dulcis, pour en garantir l'efficacité thérapeutique et la sécurité sanitaire."
            tags={["Microbiologie", "Biochimie", "Phytochimie"]}
            color="gold"
          />
          <MissionCard
            number="02"
            icon={BarChart3}
            title="Contrôle Qualité"
            subtitle="Normes & Traçabilité"
            description="Mise en place de standards rigoureux incluant la mesure du pH, le contrôle du microbiote commensal et la traçabilité complète de chaque lot de préparation médicinale pour garantir la reproductibilité des résultats."
            tags={["pH", "Microbiote", "Traçabilité"]}
            color="emerald"
          />
          <MissionCard
            number="03"
            icon={GraduationCap}
            title="Formation des Sentinelles"
            subtitle="Transmission du savoir"
            description="Programme de formation d'une nouvelle génération de Sentinelles engagées dans le respect des ressources naturelles, les protocoles d'hygiène stricts et la préservation des savoirs ethnobotaniques africains."
            tags={["Hygiène", "Ethnobotanique", "Protocoles"]}
            color="sky"
          />
          <MissionCard
            number="04"
            icon={Shield}
            title="Lutte contre la Biopiraterie"
            subtitle="Protection du patrimoine"
            description="Opposition ferme à toute exploitation commerciale des savoirs ancestraux qui ne bénéficierait pas aux communautés dépositaires. Défense du patrimoine intellectuel et naturel des peuples africains."
            tags={["Droit", "Communauté", "Protection"]}
            color="emerald"
          />
          <MissionCard
            number="05"
            icon={Globe}
            title="Santé Communautaire"
            subtitle="Développement durable"
            description="Intégration des solutions médicinales traditionnelles dans le paysage sanitaire national, avec une approche collaborative visant à améliorer la santé des communautés locales de manière durable et accessible."
            tags={["Santé publique", "Accessibilité", "Impact"]}
            color="gold"
          />
          <MissionCard
            number="06"
            icon={TreePine}
            title="Préservation des Espèces"
            subtitle="Cueillette responsable"
            description="Engagement strict à ne jamais prélever plus que ce que la nature peut régénérer, avec des normes de cueillette raisonnée pour assurer la pérennité des espèces végétales utilisées dans nos préparations."
            tags={["Écologie", "Régénération", "Durabilité"]}
            color="lime"
          />
        </div>

        {/* Ethics quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-xl border border-gold-500/15 bg-earth-700/30 p-6 text-center md:p-8"
        >
          <p className="mb-3 text-base italic text-gold-200/80 md:text-lg">
            &ldquo;La plante n'est pas qu'une simple ressource biologique &mdash;
            elle est une entité vivante porteuse d'une mémoire et d'une force.
            Notre mission est de servir de pont entre la rigueur du laboratoire
            et la profondeur de la tradition.&rdquo;
          </p>
          <p className="text-sm text-muted-foreground">
            Charte d'Éthique des Sentinelles &middot; Centre Bemba Tagaçira
          </p>
        </motion.div>
      </Section>

      {/* ─────────── CHARTE D'ÉTHIQUE ─────────── */}
      <Section id="charte">
        <SectionHeader
          label="Nos engagements"
          title="Charte d'Éthique & de Qualité"
          description="La charte qui régit l'engagement de chaque Sentinelle du Centre Bemba Tagaçira."
        />

        {/* Preamble */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl rounded-xl border border-gold-500/15 bg-earth-700/30 p-6 text-center md:p-8"
        >
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            En tant que membre de l'ONG Centre Bemba Tagaçira, je reconnais
            que la plante n'est pas qu'une simple ressource biologique, mais une
            entité vivante porteuse d'une mémoire et d'une force. Ma mission est
            de servir de pont entre la rigueur du laboratoire et la profondeur
            de la tradition.
          </p>
        </motion.div>

        <div className="space-y-6">
          <EthicsArticle
            number="I"
            icon={Leaf}
            title="Le Respect du Vivant"
            subtitle="Engagement ethnobotanique"
            commitments={[
              {
                heading: "La Permission de Cueillette",
                text: "Je m'engage à ne jamais prélever une plante sans avoir respecté les normes établies par l'ONG Centre Bemba Tagaçira, garantissant ainsi le respect de l'écosystème et des espèces.",
              },
              {
                heading: "La Préservation",
                text: "Je ne prélèverai jamais plus que ce que la nature peut régénérer, veillant à la survie de l'espèce et à l'équilibre de l'environnement.",
              },
            ]}
          />
          <EthicsArticle
            number="II"
            icon={Microscope}
            title="La Rigueur du Contrôleur"
            subtitle="Engagement scientifique"
            commitments={[
              {
                heading: "L'Hygiène Irréprochable",
                text: "Je m'engage à respecter les protocoles de propreté lors de chaque manipulation. La négligence compromet l'efficacité du remède et la sécurité des bénéficiaires.",
              },
              {
                heading: "La Conformité des Processus",
                text: "Je respecterai scrupuleusement les temps de macération, les mesures de pH et les protocoles fixés par le Centre pour garantir la qualité et la reproductibilité des préparations.",
              },
            ]}
          />
          <EthicsArticle
            number="III"
            icon={Lock}
            title="Le Sceau du Secret"
            subtitle="Engagement de confidentialité"
            commitments={[
              {
                heading: "Protection du Savoir",
                text: "Je m'engage à ne pas divulguer à des tiers les formulations spécifiques, les dosages ou les méthodes sans l'accord écrit du Bureau Exécutif.",
              },
              {
                heading: "Lutte contre la Biopiraterie",
                text: "Je m'oppose à toute exploitation commerciale des savoirs du Centre qui ne bénéficierait pas aux communautés dépositaires de ces connaissances ancestrales.",
              },
            ]}
          />
          <EthicsArticle
            number="IV"
            icon={Scale}
            title="L'Intégrité de la Sentinelle"
            subtitle="Engagement personnel"
            commitments={[
              {
                heading: "Vérité et Transparence",
                text: "Je m'interdis de falsifier les résultats d'une préparation ou d'utiliser des plantes de qualité douteuse. La transparence est le fondement de notre crédibilité.",
              },
              {
                heading: "Service à la Vie",
                text: "Mon action vise uniquement le bien-être holistique de l'individu et le renforcement des capacités de santé communautaire.",
              },
            ]}
          />
        </div>
      </Section>

      {/* ─────────── TRANSPARENCE ─────────── */}
      <Section id="transparence" dark>
        <SectionHeader
          label="Transparence & Gouvernance"
          title="Rapports d'Activités"
          description="Dans un souci de transparence, l'ONG Centre Bemba Tagaçira s'engage à publier ses rapports d'activités et à rendre compte de l'utilisation des fonds reçus."
        />

        {/* Governance badges */}
        <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            {
              icon: Eye,
              title: "Audit Indépendant",
              desc: "Contrôle financier annuel",
            },
            {
              icon: FileText,
              title: "Publication Publique",
              desc: "Rapports accessibles",
            },
            {
              icon: BarChart3,
              title: "Traçabilité des Dons",
              desc: "Fonds intégralement tracés",
            },
            {
              icon: Users,
              title: "Gouvernance Éthique",
              desc: "Bureau exécutif élu",
            },
          ].map((badge) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-lg border border-gold-500/10 bg-earth-700/30 p-4 text-center"
            >
              <badge.icon className="mx-auto mb-2 h-6 w-6 text-gold-400" />
              <p className="text-sm font-semibold text-white">{badge.title}</p>
              <p className="text-xs text-muted-foreground">{badge.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Reports */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ReportCard
            title="Rapport Annuel 2023"
            type="Rapport annuel"
            year={2023}
            pages={48}
            code="RA-2023"
            status="available"
          />
          <ReportCard
            title="Rapport Financier 2023"
            type="Rapport financier"
            year={2023}
            pages={24}
            code="RF-2023"
            status="available"
          />
          <ReportCard
            title="Étude Scoparia dulcis"
            type="Étude scientifique"
            year={2023}
            pages={72}
            code="ES-2023"
            status="available"
          />
          <ReportCard
            title="Rapport Annuel 2022"
            type="Rapport annuel"
            year={2022}
            pages={44}
            code="RA-2022"
            status="available"
          />
          <ReportCard
            title="Rapport Financier 2022"
            type="Rapport financier"
            year={2022}
            pages={20}
            code="RF-2022"
            status="available"
          />
          <ReportCard
            title="Rapport Annuel 2024"
            type="Rapport annuel"
            year={2024}
            pages={0}
            code="RA-2024"
            status="upcoming"
          />
        </div>

        {/* Fund allocation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-xl border border-gold-500/15 bg-earth-700/30 p-6 md:p-8"
        >
          <h3 className="mb-6 text-center text-xl font-bold text-white">
            Répartition des Fonds 2023
          </h3>
          <div className="space-y-4">
            {[
              {
                label: "Recherche & Laboratoire",
                pct: 42,
                color: "bg-gold-500",
              },
              {
                label: "Formation des Sentinelles",
                pct: 28,
                color: "bg-emerald-500",
              },
              {
                label: "Terrain & Cueillettes",
                pct: 20,
                color: "bg-sky-500",
              },
              {
                label: "Administration",
                pct: 10,
                color: "bg-earth-400",
              },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-semibold text-white">{item.pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-earth-600">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-full rounded-full ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Données issues du rapport financier 2023.
          </p>
        </motion.div>

        {/* Commitments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
        >
          {[
            "Aucun frais administratif > 15%",
            "Audit financier annuel",
            "Comptes publiés dans les 3 mois",
            "Traçabilité de chaque don",
            "Gouvernance collégiale",
          ].map((commitment) => (
            <div
              key={commitment}
              className="flex items-start gap-2 rounded-lg border border-gold-500/10 bg-earth-700/20 p-3"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <span className="text-xs text-muted-foreground">
                {commitment}
              </span>
            </div>
          ))}
        </motion.div>
      </Section>

      {/* ─────────── DEVENIR SENTINELLE ─────────── */}
      <Section id="adhesion">
        <SectionHeader
          label="Rejoindre le mouvement"
          title="Devenir Sentinelle"
          description="Rejoignez le réseau des Sentinelles de l'ONG Centre Bemba Tagaçira et engagez-vous dans la valorisation de la pharmacopée africaine."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl"
        >
          <form
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
            }}
            className="space-y-5 rounded-xl border border-gold-500/15 bg-earth-700/30 p-6 backdrop-blur-sm md:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="s-nom" className="mb-2 text-sm text-muted-foreground">
                  Nom <span className="text-gold-400">*</span>
                </Label>
                <Input
                  id="s-nom"
                  placeholder="Votre nom de famille"
                  required
                  className="border-gold-500/15 bg-earth-800/50 text-white placeholder:text-muted-foreground/50 focus:border-gold-500/40"
                />
              </div>
              <div>
                <Label htmlFor="s-prenom" className="mb-2 text-sm text-muted-foreground">
                  Prénom <span className="text-gold-400">*</span>
                </Label>
                <Input
                  id="s-prenom"
                  placeholder="Votre prénom"
                  required
                  className="border-gold-500/15 bg-earth-800/50 text-white placeholder:text-muted-foreground/50 focus:border-gold-500/40"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="s-email" className="mb-2 text-sm text-muted-foreground">
                  Email <span className="text-gold-400">*</span>
                </Label>
                <Input
                  id="s-email"
                  type="email"
                  placeholder="votre@email.com"
                  required
                  className="border-gold-500/15 bg-earth-800/50 text-white placeholder:text-muted-foreground/50 focus:border-gold-500/40"
                />
              </div>
              <div>
                <Label htmlFor="s-tel" className="mb-2 text-sm text-muted-foreground">
                  Téléphone
                </Label>
                <Input
                  id="s-tel"
                  type="tel"
                  placeholder="+225 07 XX XX XX XX"
                  className="border-gold-500/15 bg-earth-800/50 text-white placeholder:text-muted-foreground/50 focus:border-gold-500/40"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="s-ville" className="mb-2 text-sm text-muted-foreground">
                  Ville <span className="text-gold-400">*</span>
                </Label>
                <Input
                  id="s-ville"
                  placeholder="Votre ville"
                  required
                  className="border-gold-500/15 bg-earth-800/50 text-white placeholder:text-muted-foreground/50 focus:border-gold-500/40"
                />
              </div>
              <div>
                <Label htmlFor="s-pays" className="mb-2 text-sm text-muted-foreground">
                  Pays <span className="text-gold-400">*</span>
                </Label>
                <Select>
                  <SelectTrigger className="border-gold-500/15 bg-earth-800/50 text-white focus:border-gold-500/40">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent className="border-gold-500/15 bg-earth-800 text-white">
                    {[
                      "Côte d'Ivoire",
                      "Sénégal",
                      "Mali",
                      "Guinée",
                      "Burkina Faso",
                      "Ghana",
                      "Nigeria",
                      "Cameroun",
                      "RD Congo",
                      "Togo",
                      "Bénin",
                      "France",
                      "Belgique",
                      "Canada",
                      "Autre",
                    ].map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="s-motivation" className="mb-2 text-sm text-muted-foreground">
                Motivation & Parcours <span className="text-gold-400">*</span>
              </Label>
              <Textarea
                id="s-motivation"
                placeholder="Décrivez votre motivation et votre parcours (minimum 30 caractères)"
                required
                rows={4}
                minLength={30}
                className="border-gold-500/15 bg-earth-800/50 text-white placeholder:text-muted-foreground/50 focus:border-gold-500/40"
              />
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="s-charte"
                required
                className="mt-1 border-gold-500/30 data-[state=checked]:bg-gold-500 data-[state=checked]:text-earth-900"
              />
              <Label
                htmlFor="s-charte"
                className="text-xs leading-relaxed text-muted-foreground"
              >
                J'accepte les termes de la{" "}
                <a
                  href="#charte"
                  className="text-gold-400 underline hover:text-gold-300"
                >
                  Charte d'Éthique et de Qualité
                </a>{" "}
                et m'engage, par mon honneur et ma conscience, à agir en
                Sentinelle dévouée de l'ONG Centre Bemba Tagaçira.{" "}
                <span className="text-gold-400">*</span>
              </Label>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gold-500 text-earth-900 hover:bg-gold-400"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Soumettre ma candidature
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Champs obligatoires. Vos données sont traitées dans le strict
              respect de la vie privée.
            </p>
          </form>
        </motion.div>
      </Section>

      {/* ─────────── CONTACT ─────────── */}
      <Section id="contact" dark>
        <SectionHeader
          label="Nous écrire"
          title="Prendre Contact"
          description="Une question, un projet de collaboration, une demande d'information ? Notre équipe vous répond sous 48h ouvrables."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact info */}
          <div className="space-y-6">
            {[
              {
                icon: MapPin,
                title: "Siège Social",
                lines: ["Abidjan, Côte d'Ivoire", "ONG de droit ivoirien"],
              },
              {
                icon: Users,
                title: "Président Fondateur",
                lines: [
                  "Tounkara Al Foussein",
                  "Expert chimie alimentaire & Ethnobotaniste",
                ],
              },
              {
                icon: Clock,
                title: "Délai de Réponse",
                lines: ["Sous 48h ouvrables", "Du lundi au vendredi"],
              },
              {
                icon: Globe,
                title: "Collaboration",
                lines: [
                  "Institutions, chercheurs, ONG",
                  "Partenariats ouverts",
                ],
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-lg border border-gold-500/10 bg-earth-700/30 p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-500/10">
                  <item.icon className="h-5 w-5 text-gold-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    {item.title}
                  </h4>
                  {item.lines.map((line) => (
                    <p key={line} className="text-sm text-muted-foreground">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex flex-wrap gap-3">
              <a href="#adhesion">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                >
                  <HandHeart className="mr-2 h-4 w-4" />
                  Devenir Sentinelle
                </Button>
              </a>
            </div>

            <blockquote className="rounded-lg border-l-4 border-emerald-500/30 bg-earth-700/20 p-4">
              <p className="text-sm italic text-muted-foreground">
                &ldquo;Nous sommes ouverts à toute collaboration visant à
                intégrer ces solutions dans le paysage sanitaire national.&rdquo;
              </p>
              <footer className="mt-2 text-xs text-muted-foreground">
                ONG Centre Bemba Tagaçira
              </footer>
            </blockquote>
          </div>

          {/* Contact form */}
          <form
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
            }}
            className="space-y-5 rounded-xl border border-gold-500/15 bg-earth-700/30 p-6 backdrop-blur-sm md:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="c-nom" className="mb-2 text-sm text-muted-foreground">
                  Nom complet <span className="text-gold-400">*</span>
                </Label>
                <Input
                  id="c-nom"
                  placeholder="Votre nom complet"
                  required
                  className="border-gold-500/15 bg-earth-800/50 text-white placeholder:text-muted-foreground/50 focus:border-gold-500/40"
                />
              </div>
              <div>
                <Label htmlFor="c-email" className="mb-2 text-sm text-muted-foreground">
                  Email <span className="text-gold-400">*</span>
                </Label>
                <Input
                  id="c-email"
                  type="email"
                  placeholder="votre@email.com"
                  required
                  className="border-gold-500/15 bg-earth-800/50 text-white placeholder:text-muted-foreground/50 focus:border-gold-500/40"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="c-tel" className="mb-2 text-sm text-muted-foreground">
                  Téléphone
                </Label>
                <Input
                  id="c-tel"
                  type="tel"
                  placeholder="+225 07 XX XX XX XX"
                  className="border-gold-500/15 bg-earth-800/50 text-white placeholder:text-muted-foreground/50 focus:border-gold-500/40"
                />
              </div>
              <div>
                <Label htmlFor="c-org" className="mb-2 text-sm text-muted-foreground">
                  Organisation
                </Label>
                <Input
                  id="c-org"
                  placeholder="Votre organisation"
                  className="border-gold-500/15 bg-earth-800/50 text-white placeholder:text-muted-foreground/50 focus:border-gold-500/40"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="c-objet" className="mb-2 text-sm text-muted-foreground">
                Objet <span className="text-gold-400">*</span>
              </Label>
              <Select>
                <SelectTrigger className="border-gold-500/15 bg-earth-800/50 text-white focus:border-gold-500/40">
                  <SelectValue placeholder="Sélectionner l'objet" />
                </SelectTrigger>
                <SelectContent className="border-gold-500/15 bg-earth-800 text-white">
                  {[
                    "Demande d'information générale",
                    "Collaboration institutionnelle",
                    "Soutien financier",
                    "Bénévolat & Adhésion Sentinelle",
                    "Présentation technique",
                    "Presse & Communication",
                    "Autre",
                  ].map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="c-msg" className="mb-2 text-sm text-muted-foreground">
                Message <span className="text-gold-400">*</span>
              </Label>
              <Textarea
                id="c-msg"
                placeholder="Votre message"
                required
                rows={5}
                className="border-gold-500/15 bg-earth-800/50 text-white placeholder:text-muted-foreground/50 focus:border-gold-500/40"
              />
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="c-consent"
                required
                className="mt-1 border-gold-500/30 data-[state=checked]:bg-gold-500 data-[state=checked]:text-earth-900"
              />
              <Label
                htmlFor="c-consent"
                className="text-xs leading-relaxed text-muted-foreground"
              >
                J'accepte que mes données soient utilisées pour traiter ma
                demande conformément à la politique de confidentialité de l'ONG
                Centre Bemba Tagaçira. <span className="text-gold-400">*</span>
              </Label>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-emerald-600 text-white hover:bg-emerald-500"
            >
              <Send className="mr-2 h-4 w-4" />
              Envoyer le message
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Réponse sous 48h ouvrables &middot; Champs obligatoires
            </p>
          </form>
        </div>
      </Section>

      {/* ─────────── FOOTER ─────────── */}
      <footer className="border-t border-gold-500/10 bg-earth-900 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* CTA bar */}
          <div className="mb-12 rounded-xl border border-gold-500/15 bg-earth-700/20 p-6 text-center md:p-8">
            <h3 className="mb-2 text-2xl font-bold text-white">
              Rejoignez la Mission
            </h3>
            <p className="mb-6 text-muted-foreground">
              Soutenez la valorisation de la pharmacopée africaine.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#contact">
                <Button className="bg-emerald-600 text-white hover:bg-emerald-500">
                  <Heart className="mr-2 h-4 w-4" />
                  Soutenir l'ONG
                </Button>
              </a>
              <a href="#adhesion">
                <Button
                  variant="outline"
                  className="border-gold-500/30 text-gold-300 hover:bg-gold-500/10"
                >
                  <HandHeart className="mr-2 h-4 w-4" />
                  Devenir Sentinelle
                </Button>
              </a>
              <a href="#contact">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-white"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Nous Contacter
                </Button>
              </a>
            </div>
          </div>

          {/* Footer grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* About */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500/10">
                  <Leaf className="h-4 w-4 text-gold-400" />
                </div>
                <span className="text-sm font-bold text-white">
                  Centre Bemba Tagaçira
                </span>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                ONG de droit ivoirien dédiée à la valorisation de la pharmacopée
                africaine par la rigueur scientifique et la transmission des
                savoirs ancestraux.
              </p>
              <p className="text-xs italic text-gold-400/60">
                La science au service de la tradition, la tradition pour la
                protection de la vie.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="mb-4 text-sm font-semibold text-white">
                Navigation
              </h4>
              <nav className="space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-muted-foreground transition-colors hover:text-gold-400"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Actions */}
            <div>
              <h4 className="mb-4 text-sm font-semibold text-white">S'engager</h4>
              <nav className="space-y-2">
                <a
                  href="#adhesion"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold-400"
                >
                  <UserPlus className="h-4 w-4" />
                  Devenir Sentinelle
                </a>
                <a
                  href="#contact"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold-400"
                >
                  <Heart className="h-4 w-4" />
                  Soutenir l'ONG
                </a>
                <a
                  href="#transparence"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold-400"
                >
                  <FileText className="h-4 w-4" />
                  Rapports d'activités
                </a>
                <a
                  href="#charte"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold-400"
                >
                  <Scale className="h-4 w-4" />
                  Charte d'Éthique
                </a>
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-4 text-sm font-semibold text-white">
                Contact
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                  <span className="text-sm text-muted-foreground">
                    Abidjan, Côte d'Ivoire
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                  <span className="text-sm text-muted-foreground">
                    Réponse sous 48h ouvrables
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 border-t border-gold-500/10 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} ONG Centre Bemba Tagaçira &mdash;
                Tous droits réservés. Abidjan, Côte d'Ivoire.
              </p>
              <p className="text-xs text-muted-foreground">
                Pharmacopée Africaine &middot; Recherche & Développement
                &middot; Ethnobotanique
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* ─────────── BACK TO TOP ─────────── */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed right-6 bottom-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/30 bg-earth-800/90 text-gold-400 shadow-lg backdrop-blur-sm transition-colors hover:bg-earth-700"
            aria-label="Retour en haut"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
