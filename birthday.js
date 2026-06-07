// Кейс-задача №1 — Стилистическое преобразование чисел (дата рождения)

// Паттерны цифр для электронного табло (5 строк x 3 столбца)
const DIGITS = [
  ["***", "* *", "* *", "* *", "***"], // 0
  [" * ", " * ", " * ", " * ", " * "], // 1
  ["***", "  *", "***", "*  ", "***"], // 2
  ["***", "  *", "***", "  *", "***"], // 3
  ["* *", "* *", "***", "  *", "  *"], // 4
  ["***", "*  ", "***", "  *", "***"], // 5
  ["***", "*  ", "***", "* *", "***"], // 6
  ["***", "  *", "  *", "  *", "  *"], // 7
  ["***", "* *", "***", "* *", "***"], // 8
  ["***", "* *", "***", "  *", "***"], // 9
];

// Функция: определяет день недели по дате
function getDayOfWeek(day, month, year) {
  const days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  const date = new Date(year, month - 1, day);
  return days[date.getDay()];
}

// Функция: определяет високосный ли год
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Функция: определяет полный возраст пользователя
function getAge(day, month, year) {
  const today = new Date();
  let age = today.getFullYear() - year;
  const birthdayThisYear = new Date(today.getFullYear(), month - 1, day);
  if (today < birthdayThisYear) {
    age--;
  }
  return age;
}

// Функция: выводит число в виде звёздочек (электронное табло)
function renderScoreboard(numStr) {
  const chars = numStr.split("").map((ch) => DIGITS[parseInt(ch)]);
  let output = "";
  for (let row = 0; row < 5; row++) {
    output += chars.map((digit) => digit[row]).join("  ") + "\n";
  }
  return output;
}

// Функция: вывод даты в формате дд мм гггг на табло
function printDateScoreboard(day, month, year) {
  const dd = String(day).padStart(2, "0");
  const mm = String(month).padStart(2, "0");
  const yyyy = String(year).padStart(4, "0");

  const parts = [dd, mm, yyyy];
  const rendered = parts.map((p) => p.split("").map((ch) => DIGITS[parseInt(ch)]));

  console.log("\nДата рождения на электронном табло:\n");
  for (let row = 0; row < 5; row++) {
    let line = "";
    rendered.forEach((part, pi) => {
      line += part.map((digit) => digit[row]).join("  ");
      if (pi < rendered.length - 1) line += "    ";
    });
    console.log(line);
  }
}

// --- Основная программа ---

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  console.log("=== Программа: дата рождения ===\n");

  const day = parseInt(await ask("Введите день рождения: "));
  const month = parseInt(await ask("Введите месяц рождения: "));
  const year = parseInt(await ask("Введите год рождения: "));

  rl.close();

  // Проверка корректности даты
  const testDate = new Date(year, month - 1, day);
  if (
    isNaN(day) ||
    isNaN(month) ||
    isNaN(year) ||
    testDate.getDate() !== day ||
    month < 1 ||
    month > 12
  ) {
    console.log("Ошибка: введена некорректная дата.");
    return;
  }

  console.log("\n--- Результаты ---");
  console.log(`День недели: ${getDayOfWeek(day, month, year)}`);
  console.log(
    `Год ${year}: ${isLeapYear(year) ? "високосный" : "не високосный"}`
  );
  console.log(`Полных лет: ${getAge(day, month, year)}`);

  printDateScoreboard(day, month, year);
}

main();
