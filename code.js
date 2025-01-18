"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Параметры плагина
const sectionWidth = 1350;
const sectionHeight = 2700;
const sectionSpacing = 100;
const borderWidth = 4;
const borderColor = { r: 122 / 255, g: 135 / 255, b: 255 / 255 }; // #7A87FF
const backgroundColor = { r: 68 / 255, g: 68 / 255, b: 68 / 255 }; // #444444
const pageBackgroundColor = { r: 30 / 255, g: 30 / 255, b: 30 / 255 }; // #1E1E1E
const sectionTitles = ["Задача", "Процесс", "Результат"];
// Создание секции
function createSection(x, y, title) {
    return __awaiter(this, void 0, void 0, function* () {
        const section = figma.createSection();
        section.resizeWithoutConstraints(sectionWidth, sectionHeight);
        section.x = x;
        section.y = y;
        section.name = title; // добавляем название секции
        figma.currentPage.appendChild(section); // добавляем секцию на страницу
        return section;
    });
}
// Базовая функция
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Устанавливаем цвет фона страницы
        figma.currentPage.backgrounds = [{ type: 'SOLID', color: pageBackgroundColor }];
        // Вычисляем начальные координаты для размещения секций в центре страницы
        const startX = figma.viewport.bounds.x;
        const startY = figma.viewport.bounds.y;
        // Массив для хранения созданных секций
        const createdSections = [];
        // Создание секций
        for (let i = 0; i < sectionTitles.length; i++) {
            const x = startX + (sectionWidth + sectionSpacing) * i;
            const y = startY;
            const section = yield createSection(x, y, sectionTitles[i]);
            createdSections.push(section); // Сохраняем ссылку на созданную секцию
        }
        figma.currentPage.selection = createdSections; // выделяет созданные секции
        figma.viewport.scrollAndZoomIntoView(figma.currentPage.selection); // подгоняет масштаб под выделенные объекты
        figma.closePlugin();
    });
}
// Старт плагина
main().catch(err => {
    console.error(err);
    figma.closePlugin("Произошла ошибка.");
});
