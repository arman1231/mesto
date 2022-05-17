# Проект: Место
## _Проектная работа #4 для курса Яндекс.Практикум_

![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)
"Mesto" - это проектная работа, представленная на ресурсе Яндекс.Практикум и позволяющая закрепить знания и навыки, полученные учеником на курсе.
Проект представляет собой пользовательский сервис по загрузке авторских фотографий.
Проект адаптирован для просмотра с мобильных устройств.

В работе используются технологии:
- HTML5
- CSS3
- JavaScript ES6
- OOP
- BEM
- GIT

## Важно
Это версия проекта Mesto с применением парадигмы ООП.
С версией прокта с применением библиотеки React.JS и описанием реализованных функций можно ознакомиться здесь [https://github.com/arman1231/mesto-react](https://github.com/arman1231/mesto-react)

## Ссылка
Перейти на [сайт](https://arman1231.github.io/mesto/index.html)
* [Ссылка на макет в Figma](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1)

### UPD. 30.01.2022 (Внесение дополнительного функционала)
Список обновлений:
  1) Начальные карточки фографий генеритуются из массива с объектами из JS
  2) Добалена возможность добавлять новые карточки
  3) Добавлена возможность ставить лайки
  4) Добавлена функция удаления карточки
  5) Дабавлена функция увеличения картинки по клику
  6) Внесены плавные визульаные переходы при вызове модальных окон

### UPD. 08.02.2022 (Внесение дополнительного функционала)
Список обновлений:
  1) Встроена живая валидация всех форм
  2) Добавлена возможность закрывать модальные окна кликом на оверлей
  3) Теперь модальные окна можно закрыть на клавишу Escape

### UPD. 11.03.2022 (Рефакторинг кода в соответсвии со стандартами ООП)
Список обновлений:
  1) Создан ООП класс: Card (рендеринг карточек); FormValidator (живая валидация всех форм на странице)
  2) JS код разделен на отдельные модули

### UPD. 26.03.2022 (Рефакторинг кода в соответсвии со стандартами ООП)
Список обновлений:
  1) Создан ООП класс: Section (отрисовка элементов на странице); Popup (открытие и закрытие попапов); PopupWithImage (наследует от Popup, подтягивает данные о картинке); PopupWithForm (наследует от Popup, обрабатывает данные формы); UserInfo (отвечает за управление отображением информации о пользователе на странице)
  2) Настроена сборка проекта с помощью Webpack с использованием отдельных модулей, таких как Babel, Postcss, Minicss, и других, отвечающих за отптимизацию кода, сжатиже и полифил.
  3) Создан файл .gitignore

### UPD. 11.04.2022 (Подключение проекта к внешнему API и внесение дополнительного функционала)
  1) Загрузка информации о пользователе с сервера
  2) Загрузка карточек с сервера
  3) Редактирование профиля
  4) Добавление новой карточки
  5) Отображение количества лайков карточки
  6) Удаление карточки
  7) Постановка и снятие лайка
  8) Обновление аватара пользователя
  9) Улучшенный UX всех форм

## Автор
-Арман Черхаров (Arman Cherkharov)

## Лицензия

MIT

**Свободное копирование**

