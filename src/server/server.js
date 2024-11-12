const express = require("express");
const app = express();
const fs = require("fs");
const convert = require("xml-js");
app.use(express.json());

app.use(express.json());
app.use(express.static("public"));

// GET-сервис /seatVariants
app.get("/seatVariants", (req, res) => {
  fs.readFile("dataPlace.json", (err, data) => {
    if (err) throw err;
    const variantsData = JSON.parse(data);

    // Отправляем список всех мест в автобусе по датам
    res.json(variantsData);
    console.log(variantsData);
  });
});

// GET-сервис /page
app.get("/page", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/vote", (req, res) => {
  const selectedPlaces = req.body.keys; // Массив ключей
  const name = req.body.name; // Имя пользователя
  const date = req.body.date; // Дата, переданная с запросом

  fs.readFile("dataPlace.json", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Ошибка при чтении файла dataPlace.json");
    }

    const dataPlace = JSON.parse(data);

    const variants = dataPlace[date]; // получаем считанный массив из файла только для указанной даты

    // это нужно для того что бы получить только новые заказнные места
    const availablePlaces = selectedPlaces.filter((key) => {
      const place = variants.find((variant) => variant.key === key);
      return place && !place.reserved;
    });

    // Обновляем статусы мест на зарезервированные
    availablePlaces.forEach((key) => {
      const place = variants.find((variant) => variant.key === key);
      if (place) {
        place.reserved = true; // Устанавливаем reserved в true
      }
    });

    // Записываем обновленную статистику в файл dataPlace.json
    fs.writeFile(
      "dataPlace.json",
      JSON.stringify(dataPlace, null, 2),
      (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Ошибка при записи файла dataPlace.json");
        }
      }
    );

    // Нужно обновить файл с билетами
    fs.readFile("personTicket.json", (err, ticketData) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send("Ошибка при чтении файла personTicket.json");
      }

      let personTickets = {};
      if (ticketData) {
        personTickets = JSON.parse(ticketData); // Если файл не пустой, парсим его
      }

      // Убедимся, что ключ 1_person существует
      if (!personTickets["1_person"]) {
        personTickets["1_person"] = {}; // Создаем ключ, если его нет
      }

      // Убедимся, что для данной даты существует массив
      if (!personTickets["1_person"][date]) {
        personTickets["1_person"][date] = []; // Создаем массив для данной даты, если его нет
      }
      console.log("Начало");
      console.log(personTickets["1_person"][date]);
      console.log("Конец");
      // Проверяем существующие записи, чтобы избежать дублирования
      const existingRecords = personTickets["1_person"][date];

      // Находим максимальный существующий ключ
      let newKey = 1;
      if (existingRecords.length > 0) {
        const existingKeys = existingRecords.map((entry) => entry.key);
        newKey = Math.max(...existingKeys) + 1; // Увеличиваем максимальный ключ на 1
      }

      // Добавляем новую запись для каждого места
      availablePlaces.forEach((key) => {
        const place = `${key}`; // Форматируем название места
        // Проверяем, существует ли уже запись с таким именем и местом
        const exists = existingRecords.some((entry) => entry.Place === place);

        // Если записи нет, создаем новую
        if (!exists) {
          existingRecords.push({
            key: newKey, // Уникальный ключ
            Name: name,
            Place: place,
          });
          newKey++; // Увеличиваем ключ для следующей записи
        }
      });

      // Записываем обновленную информацию в personTicket.json
      fs.writeFile(
        "personTicket.json",
        JSON.stringify(personTickets, null, 2),
        (err) => {
          if (err) {
            console.error(err);
            return res
              .status(500)
              .send("Ошибка при записи файла personTicket.json");
          }

          // Отправляем новую статистику в виде JSON-объекта
          res.json(personTickets);
        }
      );
    });
  });
});

// POST-сервис /info
app.post("/info", (req, res) => {
  // Считываем данные из файла dataPlace.json
  fs.readFile("dataPlace.json", "utf8", (err, data) => {
    if (err) {
      console.error("Ошибка при чтении файла:", err);
      return res.status(500).json({ error: "Ошибка сервера" });
    }

    try {
      const seatingData = JSON.parse(data); // Парсим JSON
      const availableSeats = {}; // Объект для хранения результатов

      // Проходим по каждому дню в данных
      for (const date in seatingData) {
        const places = seatingData[date]; // Места для конкретной даты
        // Считаем количество свободных мест (где reserved: false)
        const freeSeatsCount = places.reduce((count, place) => {
          return count + (place.reserved ? 0 : 1); // Увеличиваем счетчик, если место не зарезервировано
        }, 0);

        // Добавляем результат в объект
        availableSeats[date] = freeSeatsCount;
      }

      // Отправляем текущую статистику в виде JSON-объекта
      res.json(availableSeats);
    } catch (parseError) {
      console.error("Ошибка парсинга JSON:", parseError);
      return res.status(500).json({ error: "Ошибка парсинга данных" });
    }
  });
});

app.delete("/cancellation", (req, res) => {
  const date = req.body.date;
  const placeKey = req.body.placeKey; // Исправлено на placeKey

  const personKey = "1_person";

  // Чтение файла personTicket.json
  fs.readFile("personTicket.json", "utf8", (err, data) => {
    if (err) {
      console.error("Ошибка при чтении файла:", err);
      return res.status(500).send("Ошибка при чтении файла personTicket.json");
    }

    let bookings;
    try {
      bookings = JSON.parse(data);
    } catch (parseError) {
      console.error("Ошибка при парсинге JSON:", parseError);
      return res.status(500).send("Ошибка при парсинге данных.");
    }

    if (!bookings[personKey]) {
      console.log("Такого пользователя нет.");
      return res.status(404).send("Такого пользователя нет.");
    }

    const recordsForDate = bookings[personKey][date];

    if (!recordsForDate) {
      console.log("Нет записей на указанную дату для пользователя:", personKey);
      return res.status(404).send("Нет записей на указанную дату.");
    }

    const updatedRecords = recordsForDate.filter(
      (record) => record.Place !== placeKey // Исправлено на placeKey
    );

    if (updatedRecords.length < recordsForDate.length) {
      bookings[personKey][date] = updatedRecords.length
        ? updatedRecords
        : undefined;

      fs.writeFile(
        "personTicket.json",
        JSON.stringify(bookings, null, 2),
        (err) => {
          if (err) {
            console.error("Ошибка при записи файла:", err);
            return res.status(500).send("Ошибка при записи файла.");
          }

          console.log("Запись успешно удалена для пользователя:", personKey);

          // Теперь обновляем статус места
          updatePlaceStatus(date, placeKey, res);
        }
      );
    } else {
      console.log(
        "Запись с указанным местом не найдена для пользователя:",
        personKey
      );
      return res.status(404).send("Запись с указанным местом не найдена.");
    }
  });
});

// Функция для обновления статуса места
function updatePlaceStatus(date, placeKey, res) {
  fs.readFile("dataPlace.json", "utf-8", (err, data) => {
    if (err) {
      console.error("Ошибка при чтении файла:", err);
      return res.status(500).send("Ошибка при чтении файла dataPlace.json");
    }

    let dataPlace;
    try {
      dataPlace = JSON.parse(data);
    } catch (parseError) {
      console.error("Ошибка при парсинге JSON:", parseError);
      return res.status(500).send("Ошибка при парсинге данных.");
    }

    // Проверяем, существует ли дата в данных
    if (!dataPlace[date]) {
      console.log("Дата не найдена:", date);
      return res.status(404).send("Дата не найдена.");
    }

    // Получаем места для указанной даты
    const places = dataPlace[date];

    // Находим место по ключу и изменяем статус
    const placeToUpdate = places.find((ourPlace) => ourPlace.key === placeKey); // Исправлено на ourPlace.key

    if (placeToUpdate) {
      placeToUpdate.reserved = false; // Меняем статус на незарезервировано
      console.log(
        `Статус места ${placeKey} изменен на незарезервировано для даты ${date}`
      );

      // Записываем обновлённые данные обратно в файл
      fs.writeFile(
        "dataPlace.json",
        JSON.stringify(dataPlace, null, 2),
        (err) => {
          if (err) {
            console.error("Ошибка при записи файла:", err);
            return res.status(500).send("Ошибка при записи файла.");
          }

          console.log("Данные успешно обновлены в dataPlace.json.");
          return res
            .status(200)
            .send("Запись успешно удалена и статус места обновлен.");
        }
      );
    } else {
      console.log("Место не найдено:", placeKey);
      return res.status(404).send("Место не найдено.");
    }
  });
}

function generateHtmlContent(jsonData) {
  return `
  <html>
    <head>
      <title>Stat Voting results</title>
    </head>
    <body>
      <pre>${JSON.stringify(jsonData, null, 2)}</pre>
    </body>
  </html>
`;
}

//GET-сервис /voteDownload
app.get("/voteDownload", (req, res) => {
  // res.setHeader("Content-Disposition", 'attachment');

  const acceptHeader = req.headers.accept;

  fs.readFile("personTicket.json", (err, data) => {
    if (err) {
      console.error("Ошибка при чтении файла:", err);
      res.status(500).send("Ошибка сервера");
      return;
    }

    const jsonData = JSON.parse(data);
    let resData = "";
    if (acceptHeader.includes("text/html")) {
      resData = generateHtmlContent(jsonData);
    } else if (acceptHeader.includes("text/xml")) {
      resData = convert.js2xml(jsonData, { compact: true, spaces: 2 });
    } else if (acceptHeader.includes("application/json")) {
      resData = data;
    }
    res.send(resData);
  });
});

app.listen(7280, () => {
  console.log("Сервер запущен на порту 7280");
});
