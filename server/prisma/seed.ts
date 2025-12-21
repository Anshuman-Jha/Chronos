import "dotenv/config";
import { prisma } from "./client";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

async function deleteAllData(orderedFileNames: string[]) {
  const modelNames = orderedFileNames.map((fileName) => {
    const modelName = path.basename(fileName, path.extname(fileName));
    return modelName.charAt(0).toUpperCase() + modelName.slice(1);
  });

  for (const modelName of modelNames) {
    const model: any = prisma[modelName as keyof typeof prisma];
    try {
      await model.deleteMany({});
      console.log(`Cleared data from ${modelName}`);
    } catch (error) {
      console.error(`Error clearing data from ${modelName}:`, error);
    }
  }
}

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  const orderedFileNames = [
    "team.json",
    "project.json",
    "projectTeam.json",
    "user.json",
    "task.json",
    "attachment.json",
    "comment.json",
    "taskAssignment.json",
  ];

  await deleteAllData(orderedFileNames);

  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = path.basename(fileName, path.extname(fileName));
    const model: any = prisma[modelName as keyof typeof prisma];

    try {
      for (const data of jsonData) {
        // Special handling for User model - hash passwords and ensure email exists
        if (modelName === "User") {
          const userData: any = { ...data };
          // Remove cognitoId if present
          if (userData.cognitoId) {
            delete userData.cognitoId;
          }
          // Add email if not present (use username + @example.com)
          if (!userData.email) {
            userData.email = `${userData.username.toLowerCase()}@example.com`;
          }
          // Hash password if not already hashed (default password: "password123")
          if (!userData.password || !userData.password.startsWith("$2")) {
            userData.password = await bcrypt.hash(userData.password || "password123", 10);
          }
          await model.create({ data: userData });
        } else {
          await model.create({ data });
        }
      }
      console.log(`Seeded ${modelName} with data from ${fileName}`);
    } catch (error) {
      console.error(`Error seeding data for ${modelName}:`, error);
    }
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
