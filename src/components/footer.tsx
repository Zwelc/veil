export default function Footer() {
  return (
    <footer className="h-4 bg-background  text-text  shadow  w-full">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm  sm:text-center">© 2024 Veil.</span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium   sm:mt-0">
          <li>
            Made by{" "}
            <a href="https://zwelc.dev" target="_blank">
              Zwelc
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
