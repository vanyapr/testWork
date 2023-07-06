// Ограничивает вызов функции не чаще, чем раз в wait (миллисекунд),
// переданной в аргументе всегда вызывает функцию хотя-бы 1 раз
function throttleEvent(wait: number) {
  // Стоит ли функция на паузе
  let isPaused: boolean = false;
  let lastCallback: Function;
  let lastArg: any;

  return function wrapper(callback: Function, arg?: any) {
    // Если на паузе
    if (isPaused) {
      // Записываем последние значения
      lastCallback = callback;
      lastArg = arg;
    } else {
      // При вызове врапер поставится на паузу
      isPaused = true;

      // Вызвали коллбэк
      if (arg) {
        callback(arg);
      } else {
        callback();
      }

      setTimeout(() => {
        // Сняли с паузы враппер по наступлению таймера
        isPaused = false;
        // Запустили последнее значение
        if (lastCallback) {
          lastCallback(lastArg);
        }
      }, wait);
    }
  };
}

export default throttleEvent;
