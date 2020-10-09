import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TodoList } from './todo-list';


@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(public storage: Storage) { }

  public async generateKey(): Promise<string>{
    let key = `todo${ parseInt(`${Math.random() * 100}`)}`;
    let ret = await this.storage.get(key);

    while(ret){
      key = `todo${ parseInt(`${Math.random() * 100}`)}`;
      ret = await this.storage.get(key);
    }
    return key;
  }
  public async read(): Promise<TodoList[]>{

    let todos: Array<TodoList> = [];
    await this.storage.forEach((v, key, i)=>{
      if(key.startsWith("todo")){
          todos.push(v);
      }
    });

    return todos;
  }

  public async create(key: string , todo: TodoList){
    console.log("Creating todo: ", todo);
    return await this.storage.set(key, todo);
  }

  public async update(todo: TodoList){
    return await this.storage.set(todo.key, todo);
  }

  public async delete(key: string){
    return await this.storage.remove(key);
  }
}

