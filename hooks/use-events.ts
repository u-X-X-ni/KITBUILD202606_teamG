//予定データ取得・操作のhooks（たぶん）

import { useCallback, useEffect, useState } from 'react';
/*events.ts の中身全部呼び出してるだけ！
 *eventQueries.___って書くことによって、eventQueriesの___を呼び出せるよってこと*/
import * as eventQueries from '@/db/queries/events';

export function useEvents(){
	//全ての予定を保持するstate,reload が呼ばれるたびにDBから読み直した内容で更新される
	const [events, setEvents] = useState<eventQueries.Event[]>([])

	/*DBから全予定を取得してeventsを更新する関数
	 *useCallback：reload関数を毎回作り直さないためのやつ
	 *listAll：eventsテーブルにある全ての予定を作成日時が新しい順で返す関数
	 *async = この関数は待つ処理を使います、await = 実際に待つ*/
	const reload = useCallback(async () => {
		const rows = await eventQueries.listAll();  //dbから予定を全部取得してrowに入れる
    setEvents(rows);  //上のやつによってeventsを更新
	}, []);  // 何にも依存しないので依存配列は []

	//初回マウント時に自動で読み込む　⭐︎あんまり分かってない
  useEffect(() => { reload(); }, [reload]);

	/*新しいユーザーを追加して state を最新にする。作成した行（id 付き）を返す
	 *create(data)：新しい予定を1件DBに保存して、保存した行を返す関数*/
  const add = async (data: eventQueries.NewEvent) => {  //async(___)の___は引数
    const rows = await eventQueries.create(data);
    await reload();
    return rows;
  };

	/*指定したidのユーザーを更新してstateを最新にする
	 *update：指定した ID の予定を部分的(全部じゃなくて一部分だけ)に更新して、更新後の行を返す関数*/
  const update = async (id: number, data: Partial<eventQueries.NewEvent>) => {
    await eventQueries.update(id, data);
    await reload();
  };

	// 指定したidのユーザーを削除してstateを最新にする
  const remove = async (id: number) => {
    await eventQueries.remove(id);
    await reload();
  };

	/*カレンダーのドット表示用の関数
	 *eventQueries.dateInMonth(ym)で2026-06-25みたいな配列を受け取る→dateだけ取り出す→setに変換→return
	 *型がvoidじゃないからreturn必要
	 *dateInMonth：カレンダーの「この日に予定がある」ドット表示に使う関数(dbにあるやつ)
	 *ym：'2026-06' のような「年-月」の文字列
	 *mapの書き方：配列.map(1個ずつ取り出すもの => どう変えるか)*/
	const getDatesInMonth = async (ym: string) => {
		const rows = await eventQueries.datesInMonth(ym);
		const set = new Set(rows.map( (item:any) => item.date ));
		return set;
	}

	return { events, reload, add, update, remove, getDatesInMonth };
}