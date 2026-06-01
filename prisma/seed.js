/* eslint-disable */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


async function main() {
  // Clear any existing database records to maintain a clean seed environment
  await prisma.contact.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.project.deleteMany();
  await prisma.roadmapItem.deleteMany();

  // Create hydrated contact inquiries representing client profiles
  await prisma.contact.createMany({
    data: [
      {
        name: "Ahmet Yılmaz",
        email: "ahmet@gmail.com",
        subject: "Yeni E-Ticaret Tasarım Sistemi",
        message: "Merhaba Aent ekibi, markamız için özel bir tasarım sistemi ve Next.js tabanlı yüksek hızlı bir e-ticaret paneli yaptırmak istiyoruz. Bütçemiz ve süreç hakkında detaylı görüşmek mümkün mü?",
        status: "UNREAD",
      },
      {
        name: "Jessica Miller",
        email: "jessica.m@uxlabs.io",
        subject: "Collaboration Inquiry",
        message: "Hi Aent Studio, I really admire your Krona Brand System and spatial mobile concepts. We have a premium real estate platform launching in autumn and would love to collaborate on the brand geometry and custom interactive WebGL shaders. Let's arrange a call!",
        status: "UNREAD",
      },
      {
        name: "Mert Karaca",
        email: "mert@fintechflow.co",
        subject: "SaaS Dashboard Development",
        message: "Mevcut finans panelimizi daha modern, glassmorphic ve animasyonlu bir tasarıma taşımak istiyoruz. Performans ve hız bizim için çok kritik. Referanslarınızı inceledik ve tam aradığımız kaliteyi gördük.",
        status: "READ",
      },
      {
        name: "Elena Rostova",
        email: "elena@artverse.net",
        subject: "Web App Refactoring",
        message: "We need our portfolio application refactored to next 15 for faster TTFB. The UI must match our exact Figma layouts pixel-by-pixel with responsive custom layouts.",
        status: "ARCHIVED",
      },
    ],
  });

  // Create hydrated blog records representing mock content
  await prisma.blogPost.createMany({
    data: [
      {
        title: "The Geometry of Luxury Branding",
        slug: "geometry-of-luxury-branding",
        summary: "An in-depth study of mathematical layout grids and golden ratio blueprints in high-end kurumsal visual architecture.",
        content: "Luxury branding is not about decorations; it is about architectural mathematical rigor. In this article, we break down how structural vector schemas, golden ratio proportions (1.618), and precise bezier alignments establish an subconscious perception of stability, elegance, and extreme visual prestige.\n\nWhen we crafted the Krona Brand System, we utilized pure mathematical grid coordinates to map out the logo vector lines, ensuring that every curve matches golden grids across print, physical product packages, and ultra-high resolution digital screens.",
        coverImage: "/images/krona-construction.jpg",
        published: true,
        author: "Aent Studio",
        tags: "Design, Geometry, Math, Branding",
      },
      {
        title: "Atmospheric and Spatial Micro-interactions in React 19",
        slug: "atmospheric-spatial-microinteractions-react19",
        summary: "How to combine realistic spring physics, dark modes, and dynamic environment light morphs in premium mobile web pages.",
        content: "Standard linear UI transitions often feel cold and robotic. High-end user experiences leverage realistic tactile physics to create an organic, responsive interface that feels alive.\n\nUsing Next 15 and motion primitives, we can build spatial nodes that respond to mouse coordinates, ambient room presets, and subtle haptic dial inputs. In this walkthrough, we share our code patterns for constructing radial controller dials and atmospheric glow effects that morph fluidly based on system settings.",
        coverImage: "/images/solas-spatial.jpg",
        published: false,
        author: "Aent Studio",
        tags: "React, Motion, Physics, UI/UX",
      },
    ],
  });

  // Hydrate high-fidelity showcase projects/products with premium colors and typography
  await prisma.project.createMany({
    data: [
      {
        title: "Edebî Haritam",
        titleTr: "Edebî Haritam",
        slug: "edebi-haritam",
        category: "Web Platform",
        categoryTr: "Web Platformu",
        desc: "An interactive community and culture platform based on Next.js + Tailwind CSS that connects literature with geography, bridging readers and authors. Explore the world of books through maps.",
        descTr: "Edebiyatı coğrafya ile birleştiren, okurlarla yazarları köprüleyen Next.js + Tailwind CSS tabanlı interaktif topluluk ve kültür platformu. Kitapların dünyasını haritalarla keşfedin.",
        bgGradient: "from-blue-600 via-indigo-650 to-cyan-500",
        glowColor: "rgba(59, 130, 246, 0.45)",
        demoUrl: "https://edebiharitam.com",
        published: true,
      },
      {
        title: "Krona Brand System",
        titleTr: "Krona Marka Sistemi",
        slug: "krona-brand-system",
        category: "Branding & Identity",
        categoryTr: "Marka & Kurumsal Kimlik",
        desc: "A highly comprehensive, high-end visual architecture crafted for a luxury investment syndicate. Built on meticulous geometric frameworks, mathematical layouts, and custom packaging systems.",
        descTr: "Lüks bir yatırım sendikası için titizlikle tasarlanmış kapsamlı ve yüksek segmentli görsel mimari. Milimetrik geometrik yapılar, matematiksel şemalar ve özel ambalaj sistemleri.",
        bgGradient: "from-amber-600 via-yellow-600 to-amber-900",
        glowColor: "rgba(245, 158, 11, 0.45)",
        demoUrl: "https://krona.co",
        published: true,
      },
      {
        title: "Solas Mobile",
        titleTr: "Solas Mobil",
        slug: "solas-mobile",
        category: "UI/UX & Mobile Design",
        categoryTr: "UI/UX & Mobil Tasarım",
        desc: "A premium, spatially aware smart home management ecosystem. Engineered with highly responsive physics, realistic micro-interactions, and visual transitions that morph fluidly.",
        descTr: "Mekansal farkındalığa sahip, premium bir akıllı ev yönetim ekosistemi. Son derece duyarlı fizik kuralları, gerçekçi mikro etkileşimler ve çevresel değişimlerle akıcı bir şekilde uyum sağlayan görsel geçişler.",
        bgGradient: "from-rose-500 via-purple-600 to-indigo-950",
        glowColor: "rgba(239, 68, 68, 0.4)",
        demoUrl: "https://solas-home.app",
        published: true,
      }
    ]
  });

  // Hydrate high-fidelity roadmap items with colorful, pulsing checkpoints representing sprints
  await prisma.roadmapItem.createMany({
    data: [
      {
        title: "Interactive Brand Systems",
        titleTr: "İnteraktif Marka Sistemleri",
        description: "Enabling responsive math grid visualizers and Golden Ratio layout blueprints dynamically rendered on Figma and digital dashboards.",
        descriptionTr: "Figma ve dijital panellerde dinamik olarak işlenen duyarlı matematiksel kılavuz görselleştiricileri ve Altın Oran kurumsal yerleşim taslaklarını etkinleştirme.",
        quarter: "Q1 2026",
        quarterTr: "1. Çeyrek 2026",
        targetDate: new Date("2026-03-31"),
        status: "COMPLETED",
        bgGradient: "from-emerald-500 via-teal-500 to-cyan-600",
        glowColor: "rgba(16, 185, 129, 0.45)",
      },
      {
        title: "SaaS Dashboard Presets",
        titleTr: "SaaS Kontrol Paneli Hazır Tasarımları",
        description: "Launching state-of-the-art glassmorphic, interactive, and speed-optimized SaaS dashboard templates powered by Prisma and SQLite.",
        descriptionTr: "Prisma ve SQLite ile güçlendirilmiş, son teknoloji buzlu cam (glassmorphic), etkileşimli ve hız açısından optimize edilmiş SaaS kontrol paneli şablonlarının yayına alınması.",
        quarter: "Q2 2026",
        quarterTr: "2. Çeyrek 2026",
        targetDate: new Date("2026-06-30"),
        status: "IN_PROGRESS",
        bgGradient: "from-blue-600 via-indigo-650 to-purple-600",
        glowColor: "rgba(59, 130, 246, 0.45)",
      },
      {
        title: "WebGL & 3D Interactive Assets",
        titleTr: "WebGL & 3D İnteraktif Varlıklar",
        description: "Integrating fluid simulation shaders, mathematical bezier path visual nodes, and custom 3D spatial controllers inside React portfolios.",
        descriptionTr: "React portföyleri içerisine akışkan simülasyon gölgelendiricileri (shaders), matematiksel bezier yolu görsel düğümleri ve özel 3D uzamsal kontrolörlerin entegre edilmesi.",
        quarter: "Q3 2026",
        quarterTr: "3. Çeyrek 2026",
        targetDate: new Date("2026-09-30"),
        status: "PLANNED",
        bgGradient: "from-orange-500 via-pink-500 to-rose-600",
        glowColor: "rgba(249, 115, 22, 0.45)",
      },
      {
        title: "Global Serverless DB Distribution",
        titleTr: "Küresel Sunucusuz Veri Tabanı Dağıtımı",
        description: "Fine-tuning SQLite engines with serverless edge caching nodes to guarantee single-digit millisecond latency scores across millions of queries.",
        descriptionTr: "Milyonlarca sorguda tek haneli milisaniye gecikme sürelerini garanti etmek için SQLite motorlarını sunucusuz uç önbellekleme (edge caching) düğümleri ile ince ince optimize etme.",
        quarter: "Q4 2026",
        quarterTr: "4. Çeyrek 2026",
        targetDate: new Date("2026-12-31"),
        status: "PLANNED",
        bgGradient: "from-indigo-600 via-indigo-950 to-blue-950",
        glowColor: "rgba(99, 102, 241, 0.4)",
      }
    ]
  });

  console.log("Database successfully seeded with demo items!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

