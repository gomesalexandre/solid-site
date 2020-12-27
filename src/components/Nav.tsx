import { Component, For } from 'solid-js';
import { onMount, createSignal } from 'solid-js';
import { Link } from 'solid-app-router';

import logo from '../assets/logo.svg';
import github from '../assets/github.svg';
import discord from '../assets/discord.svg';
import reddit from '../assets/reddit.svg';

const links = [
  { title: 'Get Started', path: '/' },
  { title: 'Docs', path: '/docs/latest/api' },
  { title: 'Resources', path: '/resources' },
  { title: 'Examples', path: '/examples' },
  { title: 'Playground', path: 'https://playground.solidjs.com' },
  { title: 'Media', path: '/media' },
];

const Nav: Component<{ showLogo?: boolean }> = ({ showLogo = false }) => {
  const [unlocked, setUnlocked] = createSignal(showLogo);
  let intersectorRef!: HTMLDivElement;
  onMount(() => {
    const observer = new IntersectionObserver(
      ([firstEntry]) => {
        if (firstEntry.intersectionRatio === 0) {
          setUnlocked(false);
        } else if (firstEntry.intersectionRatio === 1) {
          setUnlocked(true);
        }
      },
      { threshold: [0, 1] },
    );
    observer.observe(intersectorRef);
  });
  return (
    <>
      <div ref={intersectorRef} class="h-0" />
      <nav
        class="sticky top-0 z-50 nav"
        classList={{
          'nav--locked text-white': !unlocked(),
          'nav--unlocked': unlocked(),
          'border-b': !showLogo,
        }}
      >
        <div class="container grid grid-cols-10 mx-auto relative z-20">
          <ul class="flex items-center col-span-7">
            <li
              class={`py-3 transition-all overflow-hidden ${
                showLogo === true || unlocked() === false ? 'w-10 mr-4' : 'w-0'
              }`}
            >
              <Link href="/">
                <span class="sr-only">Go back to the home page</span>
                <img class="w-14" src={logo} alt="Solid logo" />
              </Link>
            </li>
            <For each={links}>
              {(item) => (
                <li>
                  <Link
                    class="block transition px-4 py-7 hover:text-white hover:bg-solid-medium"
                    href={item.path}
                  >
                    {item.title}
                  </Link>
                </li>
              )}
            </For>
          </ul>
          <ul class="flex items-center col-span-3 flex-row-reverse">
            <li class="ml-3">
              <a href="https://github.com/ryansolid/solid" rel="noopener" target="_blank">
                <img alt="Github logo" class="h-8 w-8 transition hover:opacity-50" src={github} />
              </a>
            </li>
            <li class="ml-3">
              <a href="https://www.reddit.com/r/solidjs/" rel="noopener" target="_blank">
                <img alt="Reddit logo" class="h-8 w-8 transition hover:opacity-50" src={reddit} />
              </a>
            </li>
            <li>
              <a href="https://discord.com/invite/solidjs" rel="noopener" target="_blank">
                <img
                  alt="Discord logo"
                  class="h-9 w-13 transition hover:opacity-50"
                  src={discord}
                />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Nav;