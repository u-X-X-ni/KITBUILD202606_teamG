//日記入力画面

import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
//import Storage from 'expo-sqlite/kv-store';  きさらがDB終わってから

const  EditScreen  =  ( )  =>  { 
	const { selected } = useLocalSearchParams();
	const [ title, setTitle] = useState('');

	return(
		<SafeAreaView style={{marginHorizontal: 12}}>
			<View style={[styles.row, {justifyContent: 'space-between'}]}>
			{/*ボタン（戻る）*/}
				<Button
					title="< 戻る" 
					onPress={() => router.push({pathname:'/day/date', params:{selected}})}
				/>
				<Button  //保存できるような処理を書かないといけないはず！！
					title="保存" 
					onPress={() => router.push({pathname:'/day/date', params:{selected}})}
					//onPress={() => console.log(selected, title, startTime, endTime)}
				/>
			</View>
			{/*見出し*/}
				<Text style={{fontSize: 25, marginBottom: 20}}>
					日記を追加
				</Text>
			{/*テキスト（日付の表示）*/}
				<Text style={styles.title}>
					日付
				</Text>
				<Text style={styles.text}>
					{selected}{/* ←←選択した日付を受け取る（Text中のコメントアウトはこの書き方）*/}
				</Text>
			{/*予定*/}
				<Text style={styles.title}>
					日記
				</Text>
				<TextInput
					style={styles.input}
					placeholder='日記を入力…'
					onChangeText={setTitle}
					value={title}
				/>
		</SafeAreaView>
	);
};
export  default  EditScreen ;

//TextとかTextInputのスタイル
const styles = StyleSheet.create({
	title:{  //小見出し
		fontSize: 22
	},
	text:{
		fontSize: 20,
		padding: 5,
		marginBottom: 18
	},
	input:{  //入力欄
		fontSize: 19,
		marginTop: 5,
		marginBottom: 25,
		marginHorizontal: 5,
		borderWidth: 1,
		padding: 5
	},
	row: {
		flexDirection: 'row',
		gap: 0,  //間隔を空ける設定（今は0にしている）
	},
});