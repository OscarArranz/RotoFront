import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import ThreadList from '../../components/screen/Forum/ThreadList';
import { RootStackParamList } from '../RootStackParams';

type ForumScreenProps = NativeStackScreenProps<RootStackParamList, 'Forum'>;
type ForumScreenRouteProp = ForumScreenProps['route'];

export default function ForumScreen() {
  const route = useRoute<ForumScreenRouteProp>();
  const { forum, forumNum } = route.params;

  return (
    <View style={styles.view}>
      <Text>{forum}</Text>
      <ThreadList forumNum={forumNum} />
    </View>
  );
}

const styles = {
  view: {
    marginTop: 20,
  },
  forum: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
};
