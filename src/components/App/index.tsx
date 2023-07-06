// Мы ожидаем, что Вы исправите синтаксические ошибки, сделаете перехват возможных исключений и улучшите читаемость кода.
// А так же, напишите кастомный хук useThrottle и используете его там где это нужно.
// Желательно использование React.memo и React.useCallback там где это имеет смысл.
// Будет большим плюсом, если Вы сможете закэшировать получение случайного пользователя.
// Укажите правильные типы.
// По возможности пришлите Ваш вариант в https://codesandbox.io
import {TUser} from "@type/TUser";
import React, {ReactElement, useState} from "react";
import Button from "@blocks/Button";
import UserInformation from "@blocks/UserInformation";
import Loading from "@blocks/Loading";
import reportError from "@utils/reportError";
import stopEventPropagation from "@utils/stopEventPropagation";
import {TButtonClickEvent} from "@type/TButtonClickEvent";
import Error from "@blocks/Error";
import useThrottle from "@hooks/useThrottle";
import styles from './app.module.scss';
import 'normalize.css';

const URL = "https://jsonplaceholder.typicode.com/users";

export default function App(): ReactElement {
  const [userData, setUserData] = useState<TUser | null>(null);
  const [isDataLoading, setDataLoading] = useState<boolean>(false);
  const [displayError, setDisplayError] = useState<boolean>(false);

  // Задержка срабатываний в 1 секунду
  const throttledPress = useThrottle(1000);

  // В данном случае возврат промисов не требуется
  const receiveRandomUser = () => {
    const randomUserID = Math.floor(Math.random() * (10 - 1)) + 1;
    setDisplayError(() => false);

    // Я бы сделал через промис, потому что проще строить очередность событий и ловить ошибки
    fetch(`${URL}/${randomUserID}`)
      .then((response: Response) => response.json())
      .then((userData: TUser) => {
        // Сперва запишем данные в стейт, потом скроем лоадер
        setDataLoading(() => {
          setUserData(() => userData);
          return false;
        })
      })
      .catch((error) => {
        setDataLoading(() => {
          setDisplayError(() => true);
          return false;
        });

        reportError(error)
      })
  };

  const handleButtonClick = (event: TButtonClickEvent) => {
    setDataLoading(() => true);
    // Отменим всплытие если это требуется
    stopEventPropagation(event);
    // Обрабатываем клик по кнопке с задержкой
    throttledPress(receiveRandomUser);
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Get a random user</h1>
          <Button className={styles.button} onClick={handleButtonClick} isDataLoading={isDataLoading}/>
        </header>

        {!userData ?
          (isDataLoading && <Loading/>)
          :
          <UserInformation userData={userData!}/>
        }

        {displayError && <Error/>}
      </div>
    </div>
  );
}
