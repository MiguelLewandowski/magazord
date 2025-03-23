import { FaGithub } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="hidden sm:block text-white p-2 " style={{ backgroundColor: '#24292E' }} >
      <nav className='container mx-auto flex items-center py-4 px-35 gap-10'>
        <div className="logo flex gap-3">
          <FaGithub size={34} className="hover:text-gray-600" />
          <h2 className='text-3xl font-bold'>GitHub</h2>
          </div>
        <p className='text-3xl'>/</p>
        <p className='text-xl text-gray-100 opacity-80 hover:opacity-100 transition-opacity'>Profile</p>
      </nav>
    </header>
  );
}