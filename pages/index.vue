<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold mb-4 text-center">To-Do List</h1>
        
        <form @submit.prevent="submitTodo" class="space-y-4">
          <div>
            <label for="todo" class="block text-gray-700 font-medium mb-2">New Task</label>
            <input
              type="text"
              id="todo"
              v-model="newTodo"
              placeholder="Enter your task"
              class="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button 
            type="submit"
            class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Add Task
          </button>
        </form>

        <ul class="mt-6">
          <li
            v-for="todo of todos"
            :key="todo.id"
            class="flex items-center justify-between py-2 border-b"
          >
            <span>{{ todo.name }}</span>
            <span>{{ todo.id }}</span>
            <button
              @click.prevent="deleTodo(todo.id)"
              class="text-red-500 hover:text-red-700 transition duration-200"
            >
              Remove
            </button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  
  
  
  <script setup>
  
  
    

  
  const { data: todos, refresh } = await useFetch('/api/todos')
  
  const newTodo = ref('')
  
  async function submitTodo(){
    if (!newTodo.value.trim()) return
    await $fetch('/api/todos', {
      method: 'POST',
      body: {
        todo:{
          name: newTodo.value,
        }
  
      }
    })
    newTodo.value = ''
    await refresh()
  }
  
  async function deleTodo(id){
    await $fetch(`/api/todos/${id}`, {
      method: 'DELETE'
    })
    await refresh()
  }
  </script>
