export const addTodo = (list, item) => [...list, item]

export const generateId = () => Math.floor(Math.random() * 100000)

export const findById = (id, list) => list.find(item => item.id === id)

export const toggleTodo = (todo) => ({...todo, isComplete: !todo.isComplete})

export const updateTodo = (list, updated) => {
  return list.map(item => {
    if (item.id === updated.id) {
      return updated;
    }
    return item;
  })
}

export const removeTodo = (list, id) => {
  return list.filter(todo => todo.id !== id);
}

export const filterTodos = (list, route) => {
  switch (route) {
    case '/active':
      return list.filter(item => !item.isComplete)

    case '/complete':
        return list.filter(item => item.isComplete)

    default:
      return list
  }
}
