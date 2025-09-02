import Sidebar from './components/Sidebar'
import Header from './components/Header'
import TableBMN from './components/TableBMN'

export default function Home() {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6">
          <TableBMN />
        </main>
      </div>
    </div>
  )
}
