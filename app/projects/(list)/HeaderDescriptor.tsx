'use client'
import {
  type IFilterProperties,
  type IFilter
} from '@/interfaces/props/context props/IFilter'
import styles from './projectslist.module.css'
import {
  type HeaderDescriptorProps,
  type Style
} from '@/interfaces/props/HeaderDescriptorProps'
import HeaderItem from './HeaderItem'
import { useEffect, useState } from 'react'
import {
  orderInitialState,
  type Order
} from '@/context/Filter/filterInitialState'

const HeaderDescriptor: React.FC<HeaderDescriptorProps> = (props) => {
  const [order, setOrder] = useState<Order>(orderInitialState)

  const handleSortChange = (sortValue: string): void => {
    setOrder({
      column: sortValue,
      order:
        order.order === 'ascending' && order.column === sortValue
          ? 'descending'
          : 'ascending'
    })
  }

  useEffect(() => {
    const newFilter: IFilterProperties = {
      orderBy: order.column,
      sort: order.order
    }

    props.updateFilter !== undefined &&
      props.updateFilter(props.entity as keyof IFilter, newFilter)
  }, [order])

  const style: Style = {
    width: props.width
  }

  return (
    <header className={styles.descriptor}>
      <HeaderItem
        style={style}
        handleSortChange={handleSortChange}
        ascending={order.order}
        toggleSortBy={order.column}
        icon="signature"
        label="Name"
        sortValue="Name"
      />
      <HeaderItem
        style={style}
        handleSortChange={handleSortChange}
        ascending={order.order}
        toggleSortBy={order.column}
        icon="person"
        label="Creator"
        sortValue="ProjectCreator"
      />
      <HeaderItem
        style={style}
        handleSortChange={handleSortChange}
        ascending={order.order}
        toggleSortBy={order.column}
        icon="group"
        label="Team"
        sortValue="Employees"
      />
      {props.entity === 'projects' && (
        <HeaderItem
          style={style}
          handleSortChange={handleSortChange}
          ascending={order.order}
          toggleSortBy={order.column}
          icon="priority_high"
          label="Priority"
          sortValue="Priority"
        />
      )}
      <HeaderItem
        style={style}
        handleSortChange={handleSortChange}
        ascending={order.order}
        toggleSortBy={order.column}
        icon="calendar_month"
        label="Created"
        sortValue="Created"
      />
      {props.dashboard && props.entity === 'projects' && (
        <HeaderItem
          style={style}
          handleSortChange={handleSortChange}
          ascending={order.order}
          toggleSortBy={order.column}
          icon="store"
          label="Company"
          sortValue="Company"
        />
      )}
      {props.dashboard && props.entity === 'tasks' && (
        <HeaderItem
          style={style}
          handleSortChange={handleSortChange}
          ascending={order.order}
          toggleSortBy={order.column}
          icon="emoji_objects"
          label="Project"
          sortValue="Project"
        />
      )}
      {props.dashboard && props.entity === 'issues' && (
        <HeaderItem
          style={style}
          handleSortChange={handleSortChange}
          ascending={order.order}
          toggleSortBy={order.column}
          icon="note_stack"
          label="Task"
          sortValue="Task"
        />
      )}
    </header>
  )
}

export default HeaderDescriptor
