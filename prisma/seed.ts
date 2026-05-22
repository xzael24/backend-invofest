
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "pg";
const { Pool } = pkg;
import "dotenv/config";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("Mulai seeding database...\n");


    console.log("Membersihkan data lama...");
    await prisma.user.deleteMany();
    await prisma.seminar.deleteMany();
    await prisma.event.deleteMany();
    await prisma.pembicara.deleteMany();
    await prisma.category.deleteMany();
    console.log("Data lama berhasil dihapus!\n");


    console.log("Membuat categories...");
    const catSeminar = await prisma.category.create({ data: { name: "Seminar" } });
    const catWorkshop = await prisma.category.create({ data: { name: "Workshop" } });
    const catTalkshow = await prisma.category.create({ data: { name: "Talkshow" } });
    const catCompetition = await prisma.category.create({ data: { name: "Competition" } });
    console.log(`    ${4} categories dibuat\n`);


    console.log(" Membuat pembicara...");

    const dery = await prisma.pembicara.create({
        data: {
            name: "Dery Agung Triyadi",
            title: "AWS Indonesia",
            bio: "Pembicara dari AWS Indonesia yang akan membahas tentang cloud computing dan AI integration.",
            photo: "/assets/Dery.png",
            expertise: ["Cloud Computing", "AWS", "AI Integration"],
        },
    });

    const sowam = await prisma.pembicara.create({
        data: {
            name: "Sowam Habibi",
            title: "Google Indonesia",
            bio: "Pembicara dari Google Indonesia yang akan membahas tentang AI dan machine learning.",
            photo: "/assets/Sowam.png",
            expertise: ["AI", "Machine Learning", "Google Cloud"],
        },
    });

    const lhuqita = await prisma.pembicara.create({
        data: {
            name: "Lhuqita Fazry",
            title: "Mobile Development",
            bio: "Developer, Founder Rumah Coding Indonesia. Spesialis mobile development.",
            photo: "/assets/lhuqita.png",
            expertise: ["Mobile Development", "React Native", "Flutter"],
        },
    });

    const dendi = await prisma.pembicara.create({
        data: {
            name: "M. Dendi Purwanto",
            title: "Artificial Intelligence",
            bio: "Software Engineer, PT. Mayar Kernel Supernova. Spesialis AI dan machine learning.",
            photo: "/assets/dendi.png",
            expertise: ["Artificial Intelligence", "Machine Learning", "Python"],
        },
    });

    const danang = await prisma.pembicara.create({
        data: {
            name: "Danang Avan M",
            title: "Cyber Security",
            bio: "Security Analyst, Founder | Contributor TegalSec. Spesialis cyber security.",
            photo: "/assets/danang.png",
            expertise: ["Cyber Security", "Penetration Testing", "Network Security"],
        },
    });

    const ichsan = await prisma.pembicara.create({
        data: {
            name: "Moh. Ichsan Maulana",
            title: "Human Capital Information System (HCIS)",
            bio: "Human Capital Information System (HCIS), PT. Garuda Daya Pratama Sejahtera.",
            photo: "/assets/ichsan.png",
            expertise: ["HCIS", "Human Resources", "Information System"],
        },
    });

    const zaim = await prisma.pembicara.create({
        data: {
            name: "M. Zaim Zamzami",
            title: "Programmer",
            bio: "Programmer, PT. Pertamina Drilling Service Indonesia.",
            photo: "/assets/zaim.png",
            expertise: ["Programming", "Backend Development", "Enterprise Software"],
        },
    });

    const daffa = await prisma.pembicara.create({
        data: {
            name: "Daffa Zuhdan Muhtar",
            title: "Android Developer",
            bio: "Android Developer, PT. Astra Internasional.",
            photo: "/assets/daffa.png",
            expertise: ["Android Development", "Kotlin", "Mobile Apps"],
        },
    });

    const bayu = await prisma.pembicara.create({
        data: {
            name: "Bayu Adi Prasetiyo",
            title: "Software Engineer",
            bio: "Software Engineer, KOMPAS.ID.",
            photo: "/assets/bayu.png",
            expertise: ["Software Engineering", "Web Development", "Media Tech"],
        },
    });

    console.log(`    ${9} pembicara dibuat\n`);


    console.log(" Membuat events...");

    await prisma.event.create({
        data: {
            name: "IT Seminar - Human-AI Integration",
            categoryId: catSeminar.id,
            pembicaraId: dery.id,
            location: "Aula Gedung C, Kampus 1 (Mataram) Universitas Harkat Negeri",
            dateEvent: new Date("2025-11-27"),
            description:
                'Seminar nasional bertajuk "Human-AI Integration: Merancang Arsitektur Kolaboratif, Bukan Kompetitif" membahas strategi dan arsitektur teknologi untuk menciptakan sistem di mana manusia dan AI bekerja sebagai mitra yang sinergis.',
        },
    });

    await prisma.event.create({
        data: {
            name: "IT Workshop - AI for a Sustainable Future",
            categoryId: catWorkshop.id,
            pembicaraId: lhuqita.id,
            location: "Lab Kom D.1 & D.2, Kampus 1 Universitas Harkat Negeri",
            dateEvent: new Date("2025-11-25"),
            description:
                'Workshop "AI for a Sustainable Future: The Role of Z Generation in the Digital Era" menjembatani antara potensi Generasi Z dan kekuatan AI untuk menciptakan masa depan yang berkelanjutan.',
        },
    });

    await prisma.event.create({
        data: {
            name: "IT Talkshow - Humanizing Technology",
            categoryId: catTalkshow.id,
            pembicaraId: ichsan.id,
            location: "Aula Gedung C, Kampus 1 (Mataram) Universitas Harkat Negeri",
            dateEvent: new Date("2025-11-24"),
            description:
                'Talkshow "Humanizing Technology: Kolaborasi Manusia dan AI di Masa Depan" — diskusi interaktif yang mengeksplorasi cara mengintegrasikan nilai-nilai kemanusiaan ke dalam pengembangan AI.',
        },
    });

    await prisma.event.create({
        data: {
            name: "IT Competition - From Creation to Innovation",
            categoryId: catCompetition.id,
            pembicaraId: sowam.id,
            location: "Kampus 1 Universitas Harkat Negeri",
            dateEvent: new Date("2025-11-20"),
            description:
                'Kompetisi IT bertema "From Creation to Innovation" menantang talenta digital untuk menciptakan solusi berdampak, berkelanjutan, dan bernilai guna tinggi.',
        },
    });

    console.log(`    ${4} events dibuat\n`);


    console.log("🎓 Membuat seminars...");

    await prisma.seminar.create({
        data: {
            title: "Human-AI Integration: Merancang Arsitektur Kolaboratif, Bukan Kompetitif",
            description: "Seminar nasional yang membahas strategi dan arsitektur teknologi untuk menciptakan sistem di mana manusia dan AI bekerja sebagai mitra yang sinergis.",
            date: new Date("2025-11-27"),
            time: "08.00 WIB - 12.00 WIB",
            location: "Aula Gedung C, Kampus 1 (Mataram) Universitas Harkat Negeri",
            speakerId: dery.id,
            categoryId: catSeminar.id,
            maxParticipants: 200,
        },
    });

    await prisma.seminar.create({
        data: {
            title: "Workshop Mobile Development",
            description: "Workshop hands-on Mobile Development bersama Lhuqita Fazry, Founder Rumah Coding Indonesia.",
            date: new Date("2025-11-25"),
            time: "08.00 WIB - 16.30 WIB",
            location: "Lab Kom D.1",
            speakerId: lhuqita.id,
            categoryId: catWorkshop.id,
            maxParticipants: 40,
        },
    });

    await prisma.seminar.create({
        data: {
            title: "Workshop Artificial Intelligence",
            description: "Workshop hands-on AI bersama M. Dendi Purwanto dari PT. Mayar Kernel Supernova.",
            date: new Date("2025-11-25"),
            time: "08.00 WIB - 16.30 WIB",
            location: "Lab Kom D.2",
            speakerId: dendi.id,
            categoryId: catWorkshop.id,
            maxParticipants: 40,
        },
    });

    await prisma.seminar.create({
        data: {
            title: "Workshop Cyber Security",
            description: "Workshop hands-on Cyber Security bersama Danang Avan M, Founder TegalSec.",
            date: new Date("2025-11-26"),
            time: "08.00 WIB - 16.30 WIB",
            location: "Lab Kom D.1",
            speakerId: danang.id,
            categoryId: catWorkshop.id,
            maxParticipants: 40,
        },
    });

    await prisma.seminar.create({
        data: {
            title: "Humanizing Technology: Kolaborasi Manusia dan AI di Masa Depan",
            description: "Diskusi interaktif mengeksplorasi cara mengintegrasikan nilai-nilai kemanusiaan ke dalam pengembangan AI.",
            date: new Date("2025-11-24"),
            time: "08.00 WIB - 12.00 WIB",
            location: "Aula Gedung C, Kampus 1 (Mataram) Universitas Harkat Negeri",
            speakerId: ichsan.id,
            categoryId: catTalkshow.id,
            maxParticipants: 200,
        },
    });

    console.log(`    ${5} seminars dibuat\n`);


    console.log("Membuat user...");


    const hashedPassword = await bcrypt.hash("password123", 10);

    await prisma.user.create({
        data: {
            name: "Mahasiswa Test",
            nim: "12345678",
            password: hashedPassword,
            bio: "Mahasiswa D4 Teknik Informatika Universitas Harkat Negeri, aktif dalam kegiatan teknologi dan pengembangan software.",
            event: "INVOFEST 2025",
        },
    });

    console.log(`    1 user dibuat (NIM: 12345678, Password: password123)\n`);

    console.log("Seeding selesai! Database sudah terisi data INVOFEST.");
}

main()
    .catch((e) => {
        console.error("Error saat seeding:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
