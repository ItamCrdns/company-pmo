import Image from 'next/image'
import NoPicture from '@/components/No profile picture/NoPicture'
import { getMyEmployee } from '@/api-calls/getMyEmployee'

/**
 * Displays a simple little banner with user profile picture, username and tier name. For both employee and admin.
 */

const EmployeeBanner: React.FC = async () => {
  const { data: employee } = await getMyEmployee()

  if (employee === null) {
    return
  }

  return (
    <div className='flex items-center justify-between gap-4 p-4 rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'>
      <div className='flex items-center gap-4'>
        {employee.profilePicture !== null
          ? (
          <Image
            src={employee.profilePicture}
            alt={employee.username}
            width={50}
            height={50}
            className='rounded-full'
          />
            )
          : (
          <NoPicture width='50px' height='50px' questionMarkSize='1.75rem' />
            )}
        <div>
          <h1 className='font-semibold'>
            Welcome, <span className='text-azure-radiance-500'>{employee?.username}</span>
          </h1>
          <p className='text-xs'>{employee.tier.name}</p>
        </div>
      </div>
    </div>
  )
}

export default EmployeeBanner
