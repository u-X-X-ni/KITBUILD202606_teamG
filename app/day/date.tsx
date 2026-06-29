//一日の日付画面

import { useDiary } from '@/hooks/use-diary';
import { useEvents } from '@/hooks/use-events';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, Keyboard, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

const  DayScreen  =  ( )  => {
  const { selected } = useLocalSearchParams();  //送られてきたselectedを受け取る
  const preDate = new Date(selected as string);  //前日に移動用
  preDate.setDate(preDate.getDate() - 1);
  const nextDate = new Date(selected as string);  //翌日に移動用
  nextDate.setDate(nextDate.getDate() + 1);
  const [ title, setTitle] = useState('');  //日記編集用
  const { body, save } = useDiary(selected as string);
  const { events } = useEvents();  //予定表示用
  // eventsの中から現在表示している日(selected)の予定だけを取得
  const todayEvents = events.filter(event => event.date === selected);

  //console.log(todayEvents);

  /*DBから読み込んだ日記(body)が変わったら、TextInputで表示するtitleを更新する。
   *日記が存在しない場合は空文字を表示する。*/
  useEffect(() => { setTitle(body ?? ''); }, [body]);

  return(
    <SafeAreaView style={{marginHorizontal: 12}}>
      <View style={[styles.row, {justifyContent: 'space-between'}]}>
      <Button
          title="< 戻る" 
          onPress={() => router.push('/')}  //バグったらtabs/index
      />
      </View>
      {/*見出し*/}
      <View style={[styles.row, {justifyContent: 'space-between'}]}>
        <Button
          title='← 前の日'
          //onPress={() => console.log ( date.toISOString().slice(0, 10) ) }  //日付を返す（sliceで初めの10文字みたいなやつ）（下の本来のonPressのparamsに書いているのもこれ）
          //onPress={() => console.log ( preDate ) }
          onPress={() => router.push({pathname:'/day/date', params:{selected: preDate.toISOString().slice(0, 10)}})}
        />
        <Text style={{fontSize: 25, marginBottom: 20, textAlign: 'center'}}>
          {selected}
        </Text>
        <Button
          title='次の日 →'
          onPress={() => router.push({pathname:'/day/date', params:{selected: nextDate.toISOString().slice(0, 10)}})}
        />
      </View>
      <Text style={styles.title}>
        予定
      </Text>
      {todayEvents.length === 0 ? (
        <Text style={styles.text}>
          まだ予定はありません
        </Text>
      ) : (
        todayEvents.map(event => (
          <Pressable
            key={event.id}
            onPress={() =>
              router.push({
                pathname: "/event/new",
                params: {
                  selected,
                  id: event.id,
                },
              })
            }
          >
            <Text style={styles.text}>・{event.title}</Text>
            {/*開始、終了時間表示しないことにした
            {event.start_time || event.end_time ? (
              <Text>
                {event.start_time}〜{event.end_time}
              </Text>
            ) : null}*/}
          </Pressable>
        ))
      )}

      <View style={[styles.row, {marginBottom: 20}]}>
        <Button  //横幅いっぱいにつかってボタンで画面遷移する
          title='＋予定を追加'
          onPress={() => router.push({pathname:'/event/new', params:{selected}})}
        />
      </View>

      <Text style={styles.title}>
        日記
      </Text>
      <TextInput
        multiline  //改行できる
        style={[styles.input, {marginBottom: 0}]}
        placeholder='日記を入力…'
        onChangeText={setTitle}
        value={title}
      />
      <Button
				title="保存" 
        onPress={ async() => {  //asyncがあるときは非同期関数(時間がかかる処理)、awaitで終わるまで待つ
          await save(title);
          Keyboard.dismiss();
        }}
			/>
    </SafeAreaView>
  );
};
export  default  DayScreen ;

const styles = StyleSheet.create({
  title:{  //小見出し
		fontSize: 22
	},
	text:{
		fontSize: 20,
		padding: 5,
		marginBottom: 5
	},
  row: {
    flexDirection: 'row',
    gap: 0,  //間隔を空ける設定（今は0にしている）
  },
  input:{  //入力欄
		fontSize: 19,
		marginTop: 5,
		marginBottom: 25,
		marginHorizontal: 5,
		borderWidth: 1,
		padding: 5,
    minHeight: 70,  // 最低でもこの高さにするということ
	},
});