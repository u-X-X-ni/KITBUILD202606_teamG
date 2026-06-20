//一日の日付画面

import { router, useLocalSearchParams } from 'expo-router';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const  DayScreen  =  ( )  => {
  const { selected } = useLocalSearchParams();

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
        <Button  //移動の仕方わからないから後回し！！
          title='← 前の日'
        />
        <Text style={{fontSize: 25, marginBottom: 20, textAlign: 'center'}}>
          {selected}
        </Text>
        <Button
          title='次の日 →'
        />
      </View>
      <Text style={styles.title}>
        予定
      </Text>
      {/*仮置き（イメージ）、実際は文字薄めにして予定を入力したら消えるような設定にする*/}
      <Text style={styles.text}>
        まだ予定はありません
      </Text>
      {/*ここに保存した内容表示　まだeditで保存設定してないから表示できない*/}

      <Text style={styles.title}>
        日記
      </Text>
      {/*仮置き（イメージ）、実際は文字薄めにして日記を入力したら消えるような設定にする*/}
      <Text style={styles.text}>
        まだ日記はありません
      </Text>
      {/*ここに保存した日記　まだeditで保存設定してないから表示できない*/}

      <View style={[styles.row]}>
        <Button  //横幅いっぱいにつかってボタンで画面遷移する
          title='＋予定を追加'
          onPress={() => router.push({pathname:'/event/new', params:{selected}})}
        />
        <Button
          title='＋日記を追加'
        />
      </View>
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
		marginBottom: 18
	},
  row: {
    flexDirection: 'row',
    gap: 0,  //間隔を空ける設定（今は0にしている）
  },
});