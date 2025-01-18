// Определяем параметры секций
const sectionWidth = 1350;
const sectionHeight = 2700;
const sectionSpacing = 100;
const borderWidth = 4;
const borderColor = { r: 122 / 255, g: 135 / 255, b: 255 / 255 }; // #7A87FF
const backgroundColor = { r: 68 / 255, g: 68 / 255, b: 68 / 255 }; // #444444
const pageBackgroundColor = { r: 30 / 255, g: 30 / 255, b: 30 / 255 }; // #1E1E1E
const sectionTitles = ["Задача", "Процесс", "Результат"];

// Функция для создания секции
async function createSection(x, y, title) {
    const section = figma.createFrame();
    section.resize(sectionWidth, sectionHeight);
    section.x = x;
    section.y = y;
    section.fills = [{ type: 'SOLID', color: backgroundColor }];
    section.strokes = [{ type: 'SOLID', color: borderColor }];
    section.strokeWeight = borderWidth;

    // Устанавливаем имя фрейма
    section.name = title; // Название фрейма будет таким же, как и заголовок

    // const textNode = figma.createText();
    // await figma.loadFontAsync({ family: "Inter", style: "Regular" }); // Замените на нужный вам шрифт
    // textNode.characters = title;
    // textNode.fontSize = 48; // размер шрифта
    // textNode.x = (sectionWidth - textNode.width) / 2; // центрируем текст по горизонтали
    // textNode.y = (sectionHeight - textNode.height) / 2; // центрируем текст по вертикали

    // section.appendChild(textNode);
    figma.currentPage.appendChild(section); // Добавляем секцию на страницу
}

// Основная функция плагина
async function main() {
  // Убедимся, что у нас есть выбранный слой
  const selection = figma.currentPage.selection;
  if (selection.length === 0) {
      figma.notify("Пожалуйста, выберите слой для размещения секций.");
      return;
  }

  const selectedLayer = selection[0];

  // Проверяем, является ли выбранный узел фреймом или другим узлом с координатами
  if ("x" in selectedLayer && "y" in selectedLayer) {
      // Устанавливаем цвет фона страницы
      figma.currentPage.backgrounds = [{ type: 'SOLID', color: pageBackgroundColor }];

      // Создаем три секции
      for (let i = 0; i < sectionTitles.length; i++) {
          const x = selectedLayer.x + (sectionWidth + sectionSpacing) * i;
          const y = selectedLayer.y;
          await createSection(x, y, sectionTitles[i]); // Добавляем await здесь
      }
  } else {
      figma.notify("Выбранный слой не поддерживает координаты.");
  }

  figma.closePlugin();
}


// Запускаем основную функцию
main().catch(err => {
    console.error(err);
    figma.closePlugin("Произошла ошибка.");
});
