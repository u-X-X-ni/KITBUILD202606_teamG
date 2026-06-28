//todoの取得・操作

import * as todoQueries from '@/db/queries/todos';
import { useCallback, useEffect, useState } from 'react';

export function useTodos(){
  const [todos, setTodos] = useState<todoQueries.Todo[]>([])

	//DB から全 ToDo を取得して todos を更新する関数
  const reload = useCallback(async () => {
	  const rows = await todoQueries.listAll();
    setTodos(rows);
  }, []);

	useEffect(() => { reload(); }, [reload]);

	//新しい ToDo を追加して state を最新にする関数
	const add = async (data: todoQueries.NewTodo) => {
		const rows = await todoQueries.create(data);
		await reload();
		return rows;
	};

	//ToDo の完了状態を切り替えて state を最新にする関数、todoのチェックマークをつける・消す
	const toggle = async (id: number, done: boolean) =>{
		await todoQueries.toggle(id, done);
		await reload();
	}

	//ToDo のタイトルや日付など、変えたいフィールドだけを更新して state を最新にする関数
	const update = async (id: number, data: Partial<todoQueries.NewTodo>) => {
		await todoQueries.update(id, data);
		await reload();
	};

	//指定した ID の ToDo を削除して state を最新にする関数
	const remove = async (id: number) => {
		await todoQueries.remove(id);
		await reload();
	};

	return { todos, reload, add, toggle, update, remove };
}