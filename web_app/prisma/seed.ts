const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prism = new PrismaClient();
const roleList = [
  "SystemAdmin",
  "STSManager",
  "LandfillManager",
  "ContractorManager",
  "Unassigned",
  "Citizen",
];

const populate = async () => {
  // populate the roles
  for (const role of roleList) {
    const roleExist = await prism.role.findUnique({ where: { name: role } });
    if (!roleExist)
      await prism.role.create({
        data: { name: role },
      });
    console.log(role, ": Role added");
  }

  // make an admin user
  const adminRole = await prism.role.findUnique({
    where: { name: roleList[0] },
  });
  const adminExist = await prism.user.findUnique({
    where: { email: "amadeus@gmail.com" },
  });
  if (adminRole && !adminExist) {
    await prism.user.create({
      data: {
        name: "Admin",
        email: "amadeus@gmail.com",
        password: await bcrypt.hash("amadeus999", 10),
        role: { connect: adminRole },
      },
    });
    console.log("Admin account created");
  } else console.error("Failed to create Admin account");

  // diconnect
  await prism.$disconnect();
};

populate();
