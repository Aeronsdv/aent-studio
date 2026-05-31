const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Clear any existing database records to maintain a clean seed environment
  await prisma.contact.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.project.deleteMany();

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
      },
      {
        title: "Atmospheric and Spatial Micro-interactions in React 19",
        slug: "atmospheric-spatial-microinteractions-react19",
        summary: "How to combine realistic spring physics, dark modes, and dynamic environment light morphs in premium mobile web pages.",
        content: "Standard linear UI transitions often feel cold and robotic. High-end user experiences leverage realistic tactile physics to create an organic, responsive interface that feels alive.\n\nUsing Next 15 and motion primitives, we can build spatial nodes that respond to mouse coordinates, ambient room presets, and subtle haptic dial inputs. In this walkthrough, we share our code patterns for constructing radial controller dials and atmospheric glow effects that morph fluidly based on system settings.",
        coverImage: "/images/solas-spatial.jpg",
        published: false,
        author: "Aent Studio",
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

