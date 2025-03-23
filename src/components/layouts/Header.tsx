import MainNavigation from './MainNavigation'

const Header = () => {
  return (
    <header className=' border-b w-full'>
     <div className=" container flex items-center h-16">
          <MainNavigation/>
     </div>
    </header>
  )
}

export default Header