import React from 'react';
import { Flowbite } from 'flowbite-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FileUpload from './components/FileUpload';

function App() {
  return (
    <Flowbite>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-grow flex items-center justify-center container mx-auto px-4 py-8">
          <FileUpload />
        </main>
        <Footer />
      </div>
    </Flowbite>
  );
}

export default App;