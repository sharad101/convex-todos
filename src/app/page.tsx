"use client";

import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react';
import { NewToDoForm } from './components/new-todo-form';
import { ToDoList } from './components/to-do-list';
import { SignInButton, UserButton } from '@clerk/nextjs';
import { GenerateTodosForm } from './components/generate-todos-form';




export default function Home() {


  return (
    <div className='max-w-screen-md mx-auto p-4 sapce-y-4'>
      <Authenticated>
        <div className="flex items-center justify-between">
        <h1 className='text-xl font-bold'>To-Do List</h1>
        <UserButton />
        </div>
      <ToDoList />
      <GenerateTodosForm />
      <NewToDoForm />
      </Authenticated>
      <Unauthenticated>
        <p className='text-gray-600'>Please sign in to continue</p>
        <SignInButton>
          <button className='p-1 bg-blue-500 text-white rounded'>Sign In</button>
        </SignInButton>
      </Unauthenticated>
      <AuthLoading>
        <p>Loading ...</p>
      </AuthLoading>
    </div>
  );
};

