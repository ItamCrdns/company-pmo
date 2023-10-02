import getTasks from './getTasks'
import Link from 'next/link'
import styles from '../banner.module.css'

const Tasks = async (): Promise<JSX.Element> => {
  const data = await getTasks('1', '5')
  const tasks = data.data

  return (
    <article className={styles.banner}>
      <ul>
        {Array.isArray(tasks) &&
          tasks.map((task) => (
            <li key={task.taskId}>
              <h2>
                <Link href={`/tasks/${task.taskId}`}>{task.name}</Link>
              </h2>
              <p>{task.description}</p>
            </li>
          ))}
      </ul>
    </article>
  )
}

export default Tasks
