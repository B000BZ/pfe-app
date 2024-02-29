const {PrismaClient} = require("@prisma/client");


const database   = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                {name: "Computer Science"},
                {name: "Photography"},
                {name: "Accounting"},
                {name: "Engineering"},
                {name: "Video Editing"},
                {name: "Designing"}, 
            ]
        })

    } catch (error) {
        console.error("Error seeding the database", error);
    } finally {
        await database.$disconnect();
    }
} 


main();