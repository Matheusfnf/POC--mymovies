import prisma from "../src/database/database.js";

async function main() {
  await prisma.categorias.createMany({
    data: [
      {
        nome: "Terror",
      },
      {
        nome: "Comédia",
      },
      {
        nome: "Ação",
      },
      {
        nome: "Aventura",
      },
      {
        nome: "Drama",
      },
    ],
  });

  await prisma.films.createMany({
    data: [
      {
        nome: "Homem-Aranha 3",
        descricao: "Muitoo massa",
        avaliacao: "8",
        categoria_id: 3,
      },
      {
        nome: "MazeRunner",
        descricao: "Incrivel",
        avaliacao: "8.2",
        categoria_id: 4,
      },
      {
        nome: "Minions",
        descricao: "Muito engraçado",
        avaliacao: "9",
        categoria_id: 2,
      },
    ],
  });
}

main()
  .then(() => {
    console.log("Registro feito com sucesso!!!");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
