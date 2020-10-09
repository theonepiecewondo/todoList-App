import { Component } from '@angular/core';
import { TodoListService } from '../todo-list.service';
import { TodoList } from '../todo-list';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public todos: Array<TodoList> = [];
  constructor(public todoService: TodoListService) {}
  async ngOnInit(){

    this.todos = await this.todoService.read();

  }
  getIcon(todo){
    if(todo.completed) return 'checkmark-circle';
    else return 'stopwatch';
  }
  public async createTodo(){
    let key = await this.todoService.generateKey();
    let todo = {
      title: `${key}`,
      note: "A new todo",
      completed: true
    };
    await this.todoService.create(key,todo);
    this.todos = await this.todoService.read();
  }
}

