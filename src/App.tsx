import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FileUpload from './components/FileUpload';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      <Navbar />
      <main className="flex-grow flex items-center justify-center container mx-auto px-4 py-8">
        <FileUpload />
      </main>
      <Footer />
    </div>
  );
}

export default App;