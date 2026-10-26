// Практичне завдання. Пошук героя із Зоряних війн.

import axios from "axios";
import { useState, useEffect } from "react";

import Timer from "./components/Timer/Timer";

import type { Character } from "./types/character";

function App() {
  const [character, setCharacter] = useState<Character | null>(null);
  // const [counter, setCounter] = useState<number>(1); // В useState окрім значення можна передати функцію і результат цієї функції буде першочерговим значенням яке запишиться в наш стан і якраз щоб нам зчитати значення з localStorage нам потрібна функція
  useState<Character | null>(null);
  const [counter, setCounter] = useState<number>(() => {
    const item = localStorage.getItem("my-counter");

    if (item === null) {
      // Це означає що користувач перший раз відкрив сторінку, ще ні чого не має в localstorage
      return 1;
    }

    return JSON.parse(item) as number;
  });
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // useEffect(() => {
  //   // const { data } = await axios.get<Character>(`https://swapi.info/api/people`);
  //   axios
  //     .get<Character>(`https://swapi.info/api/people/1`)
  //     .then(({ data }) => setCharacter(data))
  //     .catch((error) => console.error(error));
  // }, []); // 1 вид useEffect якщо в нас порожній масив залежностей, це означає що useEffect виконається один раз після монтування нашого компоненту

  // useEffect(async () => {
  //   try {
  //     const { data } = await axios.get<Character>(
  //       `https://swapi.info/api/people`,
  //     );
  //setCharacter(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []); // Ця функція Effect не може бути асинхронною, це зроблено для того щоб у нас не було рейс кондішенів, наприклад: один ефект обганяє інший ефект, в такому випадку відбувається перезатирання даних. Черезце вона має бути тільки синхронною. Але в середині useEffect ми можимо створити асинхронну функцію.

  useEffect(() => {
    async function fetchCharacter() {
      try {
        const { data } = await axios.get<Character>(
          `https://swapi.info/api/people/${counter}`,
        );
        setCharacter(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCharacter();
  }, [counter]); // Цей ефект потрібен щоб отримувати нових героїв

  useEffect(() => {
    // localStorage.setItem("my-counter", counter.toString()); // setItem() приймає два значення тільки типу string, це можна обійти методом конвертації значення (counter: number) в рядок метод toString()
    localStorage.setItem("my-counter", JSON.stringify(counter)); // Кращим варіантом буде цей counter зберегти як JSON, коли ми зберігаємо щось як JSON ми не втрачаємо його першочерговий тип. Коли в нас 1 і коли ми будемо JSON парсити то відповідно ця 1 буде number, як і до того як ми її конвертнули в JSON
  }, [counter]); // Цей ефект потрібен щоб зберігати значення counter в localStorage

  return (
    <>
      <h1>Effects</h1>

      <button
        onClick={() =>
          setCounter((prevCounter) =>
            prevCounter > 1 ? prevCounter - 1 : prevCounter,
          )
        }
      >
        -
      </button>
      <span>{counter}</span>
      <button
        onClick={() =>
          setCounter((prevCounter) =>
            prevCounter < 20 ? prevCounter + 1 : prevCounter,
          )
        }
      >
        +
      </button>
      <pre>{JSON.stringify(character, null, 2)}</pre>
      <button onClick={() => setIsVisible((prevIsVisible) => !prevIsVisible)}>
        Toggle
      </button>
      {/* Будемо сетапити протилежне поточному значенню. Якщо в нас зараз true то піде  false, якщо false то піде true, тобто перемикач включено - вимкнено */}
      {isVisible && <Timer />}
    </>
  );
}

export default App;

/**
 *
 *
 *
 *
 *
 *
 *
 */

// Практичне заняття. Пошуковий застосунок.

// https://hn.algolia.com/api/v1/search
// import { useState } from "react";

// import axios from "axios";

// import ArticleList from "./components/ArticleList/ArticleList";
// import SearchForm from "./components/SearchForm/SearchForm";

// import type { Article } from "./types/article";

// function App() {
//   const [articles, setArticles] = useState<Article[]>([]);
//   const handleSearch = async (topic: string) => {
//     try {
//       // axios.get(`https://hn.algolia.com/api/v1/search?query${topic}`);
//       const { data } = await axios.get<{ hits: Article[] }>(
//         "https://hn.algolia.com/api/v1/searchhhhh",
//         {
//           params: {
//             query: topic,
//           },
//         },
//       );

//       // console.log({ data });
//       setArticles(data.hits);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <h1>Forms</h1>

//       <SearchForm onSearch={handleSearch} />
//       <ArticleList articles={articles} />
//     </>
//   );
// }

// export default App;

// Якщо є метод в якому ми робимо http запит і данні з http запиту потрібно передати в якийсь компонент який знаходиться в середені компоненту в якому робимо http запит (App) який ми повертаємо, потрібно визначити стан, коли запит закінчився нам потрібно в цей стан пердати значення яке ми отримуємо з http запиту і вже ось цей стан передавати у видповідний пропс певного компоненту в який ви хочете ці данні передати

/**
 *
 *
 *
 *
 *
 *
 *
 */

// Заняття 6. Робота з LocalStorage

// import { useState, useEffect } from "react";

// export default function App() {
//   const [clicks, setClicks] = useState(0);

//   useEffect(() => {
//     localStorage.setItem("saved-clicks", JSON.stringify(clicks));
//   }, [clicks]);

//   return (
//     <div>
//       <button onClick={() => setClicks(clicks + 1)}>
//         You clicked {clicks} times
//       </button>
//       <button onClick={() => setClicks(0)}>Reset</button>
//     </div>
//   );
// }

/**
 *
 *
 *
 *
 *
 */

// Заняття 6. Модальне вікно

// src/components/App.tsx
// import { useState } from "react";
// import Modal from "./components/Modal/Modal";

// export default function App() {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);

//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <div>
//       <h1>Main content of the page</h1>
//       <button onClick={openModal}>Open modal</button>
//       {isModalOpen && (
//         <Modal onClose={closeModal}>
//           <h2>Custom Modal Content</h2>
//           <p>This is a reusable modal with dynamic content.</p>
//         </Modal>
//       )}
//     </div>
//   );
// }

/**
 *
 *
 *
 *
 */

// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function App() {
//   const [person, setPerson] = useState(null);

//   useEffect(() => {
//     console.log("Effect ran!");
//     axios
//       .get("https://swapi.info/api/people/1")
//       .then((response) => setPerson(response.data));
//   }, []);

//   console.log("App rendred!");

//   return (
//     <>
//       <pre>{JSON.stringify(person, null, 2)}</pre>
//     </>
//   );
// }

// import { useState } from "react";
// import "./App.css";
// import axios from "axios";

// export default function App() {
//   const [person, setPerson] = useState(null);

//   console.log("App rendred!");

//   axios
//     .get("https://swapi.info/api/people/1")
//     .then((response) => setPerson(response.data));

//   return (
//     <>
//       <pre>{JSON.stringify(person, null, 2)}</pre>
//     </>
//   );
// }

// import { useState, useEffect } from "react";

// export default function App() {
//   const [clicks, setClicks] = useState(0);

//   useEffect(() => {
//     console.log("You can see me only once!");
//   }, []);

//   return (
//     <button onClick={() => setClicks(clicks + 1)}>
//       You clicked {clicks} times
//     </button>
//   );
// }

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App
