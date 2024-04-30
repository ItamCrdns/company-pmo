import { getMyTeam } from '@/api-calls/getMyTeam'
import QueryParamsPagination from '@/components/Advanced query params based pagination/QueryParamsPagination'
import { BadgeComponent } from '@/components/UI/ProjectUI/BadgeComponent'
import { DateBadge } from '@/components/UI/ProjectUI/Badges/DateBadge'
import { Table, TableBody, TableCell, TableRow } from '@tremor/react'
import Image from 'next/image'
import Link from 'next/link'

const MyTeam: React.FC<{ page: string, pageSize: string }> = async (props) => {
  const { data: team } = await getMyTeam(props.page, props.pageSize)

  const paginationProps = {
    totalPages: team?.pages ?? 0,
    entityName: 'Employees',
    totalEntitesCount: team?.count ?? 0,
    defaultPageSize: 5
  }

  return (
    <>
      <QueryParamsPagination paginationProps={paginationProps} />
      <section className='bg-theming-white100 dark:bg-theming-dark300 rounded-md p-8 flex flex-col gap-4 shadow-md mt-8'>
        <Table>
          <TableBody>
            {team?.data.map((employee) => (
              <TableRow
                key={employee.employeeId}
                className='flex justify-center items-center'
              >
                <TableCell className='flex gap-4 items-center justify-center w-[300px]'>
                  <Image
                    src={employee.profilePicture}
                    alt={employee.username}
                    width={35}
                    height={35}
                    className='rounded-full'
                  ></Image>
                  <Link
                    className='text-sm font-bold text-theming-dark100 dark:text-theming-white100 text-center'
                    href={`/employee/${employee.username}`}
                  >
                    {employee.username}
                  </Link>
                </TableCell>
                <TableCell className='flex justify-center w-[300px]'>
                  <DateBadge
                    date={employee.lastLogin}
                    showCustomColor={true}
                    text=''
                    textSize='text-sm'
                  />
                </TableCell>
                <TableCell className='flex justify-center w-[300px]'>
                  {employee.tier.name}
                </TableCell>
                <TableCell className='flex justify-center w-[300px]'>
                  {employee.tier.duty}
                </TableCell>
                {employee.workload !== undefined && (
                  <TableCell className='flex justify-center w-[300px]'>
                    <BadgeComponent
                      content={employee.workload.workload}
                      tooltip={`Working on ${employee.workload.count} projects, tasks or issues`}
                      color={(() => {
                        switch (employee.workload.workload) {
                          case 'None':
                            return 'blue'
                          case 'Low':
                            return 'green'
                          case 'Medium':
                            return 'yellow'
                          case 'High':
                            return 'orange'
                          case 'Very High':
                            return 'red'
                          default:
                            return 'blue'
                        }
                      })()}
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </>
  )
}

export { MyTeam }
