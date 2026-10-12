import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Seed default demo user
  const demoEmail = "demo@example.com";
  const existingUser = await prisma.user.findUnique({
    where: { email: demoEmail },
  });

  const passwordHash = await bcrypt.hash("demo123456", 10);

  const user = existingUser
    ? existingUser
    : await prisma.user.create({
        data: {
          name: "Alex Morgan",
          email: demoEmail,
          passwordHash,
          role: "USER",
          plan: "PRO",
        },
      });

  console.log(`User ensured: ${user.email} (ID: ${user.id})`);

  // Seed sample resume if user has none
  const resumeCount = await prisma.resume.count({
    where: { userId: user.id },
  });

  if (resumeCount === 0) {
    const resume = await prisma.resume.create({
      data: {
        userId: user.id,
        title: "Senior Full Stack Software Architect",
        templateId: "modern",
        themeColor: "#2563eb",
        fontFamily: "Inter",
        fontSize: "base",
        pageMargin: "normal",
        sectionOrder: [
          "summary",
          "experience",
          "education",
          "projects",
          "skills",
          "certifications",
          "languages",
        ],
        personalInfo: {
          create: {
            fullName: "Alex Morgan",
            headline: "Senior Full Stack & Cloud Architect",
            email: "alex.morgan@example.com",
            phone: "+1 (555) 234-5678",
            location: "San Francisco, CA",
            website: "https://alexmorgan.dev",
            linkedin: "https://linkedin.com/in/alexmorgan",
            github: "https://github.com/alexmorgan",
            summary:
              "Results-driven Software Architect with 8+ years of experience designing, scaling, and maintaining high-throughput SaaS platforms and distributed cloud systems. Specialized in TypeScript, React, Next.js, Node.js, and PostgreSQL.",
          },
        },
        experiences: {
          create: [
            {
              company: "CloudScale Technologies",
              position: "Lead Full Stack Engineer",
              location: "San Francisco, CA",
              startDate: "2022-03",
              endDate: "Present",
              isCurrent: true,
              description:
                "• Architected and migrated legacy monolith to modular Next.js and event-driven microservices, improving P99 API response times by 42%.\n• Mentored a high-performing engineering squad of 8 engineers and introduced end-to-end integration testing with Vitest and Playwright.\n• Designed multi-tenant PostgreSQL partitioning and Prisma schema reducing DB load by 35%.",
              order: 0,
            },
            {
              company: "Nexus Digital Labs",
              position: "Senior Software Engineer",
              location: "Austin, TX",
              startDate: "2019-06",
              endDate: "2022-02",
              isCurrent: false,
              description:
                "• Built responsive client-facing web applications with React, TypeScript, and Tailwind CSS serving 500k+ monthly active users.\n• Developed resilient payment webhooks and automated billing pipelines with Stripe.\n• Implemented secure JWT session authentication and role-based access control.",
              order: 1,
            },
          ],
        },
        educations: {
          create: [
            {
              institution: "University of California, Berkeley",
              degree: "Bachelor of Science in Computer Science",
              fieldOfStudy: "Computer Science & Systems",
              startDate: "2015-09",
              endDate: "2019-05",
              score: "3.85 GPA",
              location: "Berkeley, CA",
              order: 0,
            },
          ],
        },
        projects: {
          create: [
            {
              title: "AI-Powered Resume Engine",
              subtitle: "Full-Stack SaaS Platform",
              url: "https://resume-demo.dev",
              githubUrl: "https://github.com/alexmorgan/resume-builder",
              startDate: "2024-01",
              endDate: "2024-04",
              description:
                "Engineered a high-performance CV builder with real-time A4 rendering, structured LLM extraction, and dynamic multi-page PDF generation.",
              technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
              order: 0,
            },
          ],
        },
        skills: {
          create: [
            {
              category: "Frontend & UI",
              skills: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "HTML5/CSS3"],
              order: 0,
            },
            {
              category: "Backend & Cloud",
              skills: ["Node.js", "PostgreSQL", "Prisma ORM", "Docker", "REST & GraphQL", "Redis"],
              order: 1,
            },
          ],
        },
        certs: {
          create: [
            {
              name: "AWS Certified Solutions Architect – Associate",
              issuer: "Amazon Web Services",
              issueDate: "2023-08",
              expiryDate: "2026-08",
              url: "https://aws.amazon.com/verification",
              order: 0,
            },
          ],
        },
        languages: {
          create: [
            {
              name: "English",
              proficiency: "Native / Bilingual",
              order: 0,
            },
            {
              name: "Spanish",
              proficiency: "Conversational",
              order: 1,
            },
          ],
        },
      },
    });

    console.log(`Created sample resume: "${resume.title}" (ID: ${resume.id})`);
  }

  console.log("Seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
