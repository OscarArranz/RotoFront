import { Text, View } from 'react-native';

interface ThreadCardProps {
  title: string;
  author: string;
  commentNum: number;
  date: string;
  uri: string;
}

export default function ThreadCard({
  title,
  author,
  commentNum,
  date,
  uri,
}: ThreadCardProps) {
  return (
    <View style={styles.view}>
      <Text>{title}</Text>
      <Text>{author}</Text>
      <Text>{commentNum}</Text>
      <Text>{date}</Text>
    </View>
  );
}

const styles = {
  view: {
    marginBottom: 10,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
};
