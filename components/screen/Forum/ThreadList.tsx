import { useContext, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { WebViewMessageEvent } from 'react-native-webview';
import WebContext from '../../../contexts/WebContext';
import { setOnLoadEnd, setOnMessage } from '../../../GlobalWebViewProps';
import { getThreadList, load } from '../../../screens/Forum/ForumInjectCode';
import ThreadCard from './ThreadCard';

interface ThreadListProps {
  forumNum: number;
}

interface Thread {
  title: string;
  author: string;
  commentNum: number;
  date: string;
  uri: string;
}

function instanceOfThread(object: any) {
  if (typeof object === 'string' || typeof object === 'undefined') return false;
  return (function instanceOfThread(object: any): object is Thread {
    return 'title' in object;
  })(object);
}

const renderThreadItem = ({ item, index }: any) => {
  if (instanceOfThread(item)) {
    const { title, author, commentNum, date, uri } = item;

    return (
      <ThreadCard
        key={index}
        title={title}
        author={author}
        commentNum={commentNum}
        date={date}
        uri={uri}
      />
    );
  }

  return null;
};

export default function ThreadList({ forumNum }: ThreadListProps) {
  const webViewRef = useContext(WebContext);

  const [threadList, setThreadList] = useState([]);

  useEffect(() => {
    webViewRef?.current?.injectJavaScript(load(forumNum));

    setOnMessage((event: WebViewMessageEvent) => {
      setThreadList(JSON.parse(event.nativeEvent.data));
    });

    setOnLoadEnd(() => {
      webViewRef?.current?.injectJavaScript(getThreadList());
    });
  }, []);

  return (
    <View style={styles.threadList}>
      {threadList.length > 0 ? (
        <FlatList data={threadList} renderItem={renderThreadItem} />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = {
  threadList: {
    marginTop: 15,
  },
};
