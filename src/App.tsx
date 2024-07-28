import React, { useState, useRef, useEffect } from 'react';
import { 
  Navbar, 
  Button, 
  DarkThemeToggle, 
  Flowbite, 
  Card, 
  Footer,
  Toast
} from 'flowbite-react';
import { HiCheck } from 'react-icons/hi';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [boilerplateText, setBoilerplateText] = useState(`I have a ReactVET+F (React + Vite + Electron + Tailwind + Flowbite React) project that I want to modify. Here's my current file structure:
APPNAME
├── dist-electron
│   └── electron.js
├── node_modules
├── public
│   └── vite.svg
├── src
│   ├── assets
│   ├── components
│   ├── utils
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .eslintrc.cjs
├── .gitignore
├── electron.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

My project uses TypeScript, Vite for building, Electron for desktop app creation, Tailwind CSS with Flowbite React for styling and components, and React for the user interface.
The main application logic is in src/App.tsx, Electron configuration is in electron.js, and Vite/build configuration is in vite.config.ts.  I want to keep the project as modular as possible and easy to organize.
I want to :

-

Can you guide me through the process, explaining each step?`);

  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(boilerplateText);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
  };

  return (
    <Flowbite>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar fluid rounded className="bg-white dark:bg-gray-800">
          <Navbar.Brand href="https://flowbite-react.com">
            <img src="public\vite.svg" className="mr-3 h-6 sm:h-9" alt="Logo" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              ReactVET+F
            </span>
          </Navbar.Brand>
          <div className="flex md:order-2">
            <DarkThemeToggle />
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <Navbar.Link href="#" active className="text-blue-700 dark:text-blue-500">
              Home
            </Navbar.Link>
            <Navbar.Link href="#">About</Navbar.Link>
            <Navbar.Link href="#">Services</Navbar.Link>
            <Navbar.Link href="#">Contact</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>

        <main className="flex-grow flex items-center justify-center container mx-auto px-4 py-8">
          <Card className="max-w-lg w-full">
            <div className="text-center">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                ReactVET+F Boilerplate Generator
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400 mb-4">
                This is a simple boilerplate generator built with React, Vite, Electron, Tailwind, and Flowbite.
              </p>
              <div className="flex justify-center">
                <Button color="blue" onClick={() => setIsModalOpen(true)}>
                  Generate Prompt
                  <svg className="ml-2 -mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Button>
              </div>
            </div>
          </Card>
        </main>

        <Footer container className="bg-white dark:bg-gray-800">
          <Footer.Copyright href="#" by="ReactVET+F™" year={2023} />
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </Footer>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div ref={modalRef} className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-4xl w-600 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Prompt Text</h3>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 mb-4">
                Here's your Prompt Text. You can edit it before copying to clipboard.
              </p>
              <textarea
                className="w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                value={boilerplateText}
                onChange={(e) => setBoilerplateText(e.target.value)}
                rows={10}
              />
              <div className="flex justify-center">
                <Button color="green" onClick={copyToClipboard}>
                  Copy to Clipboard
                </Button>
              </div>
            </div>
          </div>
        )}

        {showToast && (
          <div className="fixed top-5 right-5 z-50">
            <Toast>
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                <HiCheck className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-normal">
                Copied to clipboard successfully.
              </div>
              <Toast.Toggle onDismiss={() => setShowToast(false)} />
            </Toast>
          </div>
        )}
      </div>
    </Flowbite>
  );
}

export default App;