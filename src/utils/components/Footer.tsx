import type React from "react";

interface IProps {
  children?: React.ReactNode;
  year?: string;
  by?: string;
  description?: string;
}

export default function Footer({ children, by, description, year }: IProps) {
  return (
    <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {year}{" "}
          <a
            href="https://github.com/jorgeluis2000/management-companies-nextjs"
            className="hover:underline"
          >
            {by}
          </a>
          . {description}
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          {children}
        </ul>
      </div>
    </footer>
  );
}
