<?php

namespace App\Http\Controllers;

use App\Models\Task;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;

class TasksController extends Controller
{
    public function index() {

        // Retrieve all of the tasks when we visit the homepage
        $tasks = Task::latest()->get();

        // Display / Render all of the tasks that we have

        
        // Pass the data to our index view
        return view('tasks.index', [
            'tasks' => $tasks,
        ]);
    }

    public function create() {
        return view('tasks.create');
    }

    public function store() {
        request()->validate([
            'description' => 'required | max:255',
        ]);

        // Create a new task
        Task::create([
            'description' => request('description'),
        ]);

        // Return to the homepage when a task is created

        return redirect('/');
    }

    // Mark a task as completed
    public function update($id) {
        $task = Task::where('id', $id)->first();

        $task->completed_at = now();
        $task->save();

        return redirect('/');
    }

    // Delete a task
    public function delete($id) {
        if($id != null) {
            $task = Task::where('id', $id)->first();

            $task->delete();

        }
        
        return redirect('/');
    }

    // Delete ALL tasks
    public function deleteAll() {
        DB::table('tasks')->delete();

        return redirect('/');
    }
}



