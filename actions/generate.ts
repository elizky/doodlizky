// generate.ts
'use server';

import { createCanvas, loadImage } from 'canvas';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; // Librería para generar UUIDs

// Función para asegurar que los directorios existen o se crean
async function ensureDirectoryExists(dir: string) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    console.error(`Error creando el directorio ${dir}:`, error);
  }
}

// Definir los elementos con rarezas y probabilidades
const elements = {
  figures: [
    { src: 'body1.png', rarity: 'common', probability: 0.7 },
    { src: 'body2.png', rarity: 'common', probability: 0.7 },
    { src: 'body3.png', rarity: 'rare', probability: 0.2 },
    { src: 'body4.png', rarity: 'rare', probability: 0.2 },
    { src: 'body5.png', rarity: 'legendary', probability: 0.05 },
    { src: 'body6.png', rarity: 'legendary', probability: 0.05 },
    { src: 'body7.png', rarity: 'common', probability: 0.7 },
    { src: 'body8.png', rarity: 'rare', probability: 0.2 },
    { src: 'body9.png', rarity: 'legendary', probability: 0.05 },
  ],
  eyes: [
    { src: 'ojos1.png', rarity: 'common', probability: 0.8 },
    { src: 'ojos2.png', rarity: 'rare', probability: 0.15 },
    { src: 'ojos3.png', rarity: 'legendary', probability: 0.05 },
    { src: 'ojos4.png', rarity: 'common', probability: 0.8 },
    { src: 'ojos5.png', rarity: 'rare', probability: 0.15 },
    { src: 'ojos6.png', rarity: 'legendary', probability: 0.05 },
    { src: 'ojos7.png', rarity: 'common', probability: 0.8 },
    { src: 'ojos8.png', rarity: 'rare', probability: 0.15 },
    { src: 'ojos9.png', rarity: 'legendary', probability: 0.05 },
  ],
  mouths: [
    { src: 'bocas1.png', rarity: 'common', probability: 0.75 },
    { src: 'bocas2.png', rarity: 'rare', probability: 0.2 },
    { src: 'bocas3.png', rarity: 'legendary', probability: 0.05 },
    { src: 'bocas4.png', rarity: 'common', probability: 0.75 },
    { src: 'bocas5.png', rarity: 'rare', probability: 0.2 },
    { src: 'bocas6.png', rarity: 'legendary', probability: 0.05 },
    { src: 'bocas7.png', rarity: 'common', probability: 0.75 },
    { src: 'bocas8.png', rarity: 'rare', probability: 0.2 },
    { src: 'bocas9.png', rarity: 'legendary', probability: 0.05 },
  ],
  accessories1: [
    { src: 'acc11.png', rarity: 'common', probability: 0.05 },
    { src: 'acc12.png', rarity: 'rare', probability: 0.03 },
    { src: 'acc13.png', rarity: 'legendary', probability: 0.02 },
    { src: 'acc14.png', rarity: 'common', probability: 0.05 },
    { src: 'acc15.png', rarity: 'rare', probability: 0.03 },
    { src: 'acc16.png', rarity: 'legendary', probability: 0.02 },
    { src: 'acc17.png', rarity: 'common', probability: 0.05 },
    { src: 'acc18.png', rarity: 'rare', probability: 0.03 },
    { src: 'acc19.png', rarity: 'legendary', probability: 0.02 },
  ],
  accessories2: [
    { src: 'acc21.png', rarity: 'common', probability: 0.05 },
    { src: 'acc22.png', rarity: 'rare', probability: 0.03 },
    { src: 'acc23.png', rarity: 'legendary', probability: 0.02 },
    { src: 'acc24.png', rarity: 'common', probability: 0.05 },
    { src: 'acc25.png', rarity: 'rare', probability: 0.03 },
    { src: 'acc26.png', rarity: 'legendary', probability: 0.02 },
    { src: 'acc27.png', rarity: 'common', probability: 0.05 },
    { src: 'acc28.png', rarity: 'rare', probability: 0.03 },
    { src: 'acc29.png', rarity: 'legendary', probability: 0.02 },
  ],
};

// Función para seleccionar un elemento basado en su probabilidad
const getRandomElementByRarity = (
  array: {
    rarity: string;
    src: string;
    probability: number;
  }[]
) => {
  const random = Math.random();
  let cumulativeProbability = 0;

  for (const element of array) {
    cumulativeProbability += element.probability;
    if (random < cumulativeProbability) {
      return element;
    }
  }
  return array[0];
};

// Función para asignar valores numéricos a las rarezas
const rarityValues: Record<string, number> = {
  common: 1,
  rare: 3,
  legendary: 5,
};

// Función para calcular la rareza total del doodle
const calculateRarity = (components: { rarity: string }[]) => {
  const totalRarityValue = components.reduce(
    (acc, component) => acc + rarityValues[component.rarity],
    0
  );
  if (totalRarityValue <= 5) return 'Common';
  if (totalRarityValue <= 10) return 'Rare';
  return 'Legendary';
};

// Función para generar un nombre aleatorio
const generateRandomName = () => {
  const adjectives = ['Mighty', 'Sneaky', 'Brave', 'Gloomy', 'Dazzling', 'Mysterious'];
  const nouns = ['Tiger', 'Phoenix', 'Dragon', 'Unicorn', 'Wolf', 'Gryphon'];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective} ${randomNoun}`;
};

// Definición de la estructura de un Doodle
interface Doodle {
  id: string;
  name: string;
  rarity: string;
  path: string;
}

export async function generateDoodles(): Promise<Doodle[]> {
  const width = 500;
  const height = 500;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  const totalDoodles = 1; // Total de doodles a generar
  const doodles: Doodle[] = []; // Array para almacenar los objetos de los doodles generados

  // Asegurarse de que los directorios existen
  const generatedDir = path.join(process.cwd(), 'doodles/generated');
  await ensureDirectoryExists(generatedDir);

  for (let i = 0; i < totalDoodles; i++) {
    const figure = getRandomElementByRarity(elements.figures);
    const eye = getRandomElementByRarity(elements.eyes);
    const mouth = getRandomElementByRarity(elements.mouths);
    const accessory1 = Math.random() < 0.1 ? getRandomElementByRarity(elements.accessories1) : null;
    const accessory2 =
      Math.random() < 0.05 ? getRandomElementByRarity(elements.accessories2) : null;

    const figureImg = await loadImage(
      path.join(process.cwd(), 'doodles/layers/figures', figure.src)
    );
    const eyeImg = await loadImage(path.join(process.cwd(), 'doodles/layers/eyes', eye.src));
    const mouthImg = await loadImage(path.join(process.cwd(), 'doodles/layers/mouths', mouth.src));
    const accessory1Img = accessory1
      ? await loadImage(path.join(process.cwd(), 'doodles/layers/accessories', accessory1.src))
      : null;
    const accessory2Img = accessory2
      ? await loadImage(path.join(process.cwd(), 'doodles/layers/accessories', accessory2.src))
      : null;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(figureImg, 0, 0, width, height);
    ctx.drawImage(eyeImg, 0, 0, width, height);
    ctx.drawImage(mouthImg, 0, 0, width, height);
    if (accessory1Img) ctx.drawImage(accessory1Img, 0, 0, width, height);
    if (accessory2Img) ctx.drawImage(accessory2Img, 0, 0, width, height);

    const id = uuidv4();
    const name = generateRandomName();
    const rarity = calculateRarity([
      { rarity: figure.rarity },
      { rarity: eye.rarity },
      { rarity: mouth.rarity },
      accessory1 ? { rarity: accessory1.rarity } : { rarity: 'common' },
      accessory2 ? { rarity: accessory2.rarity } : { rarity: 'common' },
    ]);

    const doodlePath = `/doodles/generated/doodle_${id}.png`;
    await fs.writeFile(
      path.join(process.cwd(), `public${doodlePath}`),
      canvas.toBuffer('image/png')
    );

    const doodle: Doodle = { id, name, rarity, path: doodlePath };
    doodles.push(doodle);

    console.log(`Doodle generado: ${name} (ID: ${id}) - Rareza: ${rarity}`);
  }

  // Escribir los detalles de los doodles generados en un archivo de texto
  const logPath = path.join(generatedDir, 'doodle_log.txt');
  const logData = doodles
    .map(
      (doodle) =>
        `ID: ${doodle.id}, Name: ${doodle.name}, Rarity: ${doodle.rarity}, Path: ${doodle.path}`
    )
    .join('\n');
  await fs.appendFile(logPath, logData + '\n');

  return doodles; // Retornar los objetos Doodle
}
