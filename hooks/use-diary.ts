//日記データ取得・操作

import * as diaryQueries from '@/db/queries/diaries';
import { useCallback, useEffect, useState } from 'react';

export function useDiary(date: string){
  /*その日の日記の本文を保持するstate。日記がまだ書かれていない日はnullになる。
   *「文字列かnullのどちらか」なので型は string | null、初期値は null。*/
  const [body, setBody] = useState<string | null>(null)

	//dateに対応する日記をDBから読み込んでbodyを更新する関数
  const reload = useCallback(async () => {
		const rows = await diaryQueries.getByDate(date);
		if(rows.length === 0){
      setBody(null);
		}else{
			setBody(rows[0].body);
		}
	}, [date]);

	useEffect(() => { reload(); }, [reload]);

	//日記を保存する関数
	const save = async(newBody: string) => {
		await diaryQueries.upsert(date, newBody);
		await reload();
	}

	return { body, reload, save };
}