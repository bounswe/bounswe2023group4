'use client'
import ApiHrefBox from '@/components/mainpage/ApiHrefBox'
import { useRouter } from 'next/navigation'

type Route = {
  apiName: string
  student: string
  path: string
}

const StudentRoutes: Route[] = [
  { student: 'Ali Nasra', path: '/ali-nasra', apiName: 'API' },
  {
    student: 'Selin Işık',
    path: '/selin-isik',
    apiName: 'Regres API',
  },
  { student: 'Yusuf Suat Polat', path: '/yusuf-suat-polat', apiName: 'API' },
  {
    student: 'Ali Alperen Sönmez',
    path: '/ali-alperen-sonmez',
    apiName: 'Exchange Rate API',
  },
  {
    student: 'Enes Furkan Arslan',
    path: '/enes-furkan-arslan',
    apiName: 'Weather API',
  },
  { student: 'Halil Özkan', path: '/halil-ozkan', apiName: 'API' },
  { student: 'Ahmet Emre Şafak', path: '/ahmet-emre-safak', apiName: 'API' },
  {
    student: 'Emre Batuhan Göç',
    path: '/emre-batuhan-goc',
    apiName: 'Country API',
  },
  { student: 'Yiğit Şekerci', path: '/yigit-sekerci', apiName: 'Sports-API' },
]

export default function Home() {
  const router = useRouter()

  return (
    <div className="grid mx-auto gap-4">
      <div className="mx-auto text-center w-full bg-black text-white text-2xl py-8 sticky top-0">
        BounSwe Group 4 Practice App
      </div>
      {StudentRoutes.map((route) => (
        <ApiHrefBox
          apiName={route.apiName}
          student={route.student}
          key={route.path}
          onClick={() => {
            router.push(route.path)
          }}
        />
      ))}
    </div>
  )
}
