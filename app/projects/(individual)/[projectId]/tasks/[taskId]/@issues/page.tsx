import { getTaskIssues } from '@/api-calls/getTaskIssues'
import EachIssue from '@/app/issues/EachIssue'
import { NotFound } from '@/components/404 Not Found/NotFound'
import { Button } from '@/components/Button/Button'
import { ArrowRightCircle } from '@/svg/ArrowRightCircle'

const IssuesParallel: React.FC<{
  params: { projectId: string, taskId: string }
}> = async (props) => {
  const { taskId, projectId } = props.params
  const { data } = await getTaskIssues(taskId, {
    page: '1',
    pageSize: '5',
    orderBy: 'Created',
    sort: 'descending'
  })

  const noIssues = data?.entity.count === 0
  const isTaskCreator = data?.isTaskOwner ?? false

  if (noIssues) {
    if (isTaskCreator) {
      return (
        <NotFound
          text='No issues found'
          buttonText='Create an issue'
          href={`/projects/${projectId}/tasks/${taskId}/issues/create`}
        />
      )
    } else {
      return <NotFound text='No issues found' />
    }
  }

  const issues = data?.entity.data

  if (Array.isArray(issues) && issues.length > 0) {
    return (
      <div className='space-y-4 flex flex-col'>
        <ul className='space-y-4 items-stretch'>
          {issues.map((issue, index) => (
            <li
              className='relative flex items-center justify-center flex-row rounded-md shadow-md bg-theming-white100 dark:bg-theming-dark300'
              key={index}
            >
              <EachIssue issue={issue} showTaskName={false} />
            </li>
          ))}
        </ul>
        <p className='text-right text-xs'>
          Total {data?.entity.data?.[0]?.task?.name} issues:{' '}
          {data?.entity.count}
        </p>
        <div className='flex self-end'>
          <Button
            text='All issues'
            href={`/projects/${projectId}/tasks/${taskId}/issues`}
            icon={<ArrowRightCircle />}
          />
        </div>
      </div>
    )
  }
}

export default IssuesParallel
