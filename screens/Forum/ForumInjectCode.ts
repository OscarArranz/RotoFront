export const load = (forumNum: number) => `
  window.location.href = 'https://forocoches.com/foro/forumdisplay.php?f=${forumNum}'
`;

export const getLocation = () =>
  `window.ReactNativeWebView.postMessage(window.location.href);`;

export const getThreadList = () => `
  function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
  }

  waitForElm('.threads-list').then((threadListEl) => {
    const threadList = [...threadListEl.children];

    const threads = threadList.reduce((prev, cur) => {
      const isAd = cur.classList.contains('optidigital-wrapper-div') || cur.id.includes('optidigital');

      if(isAd) {
         return [...prev, 'ad']
      }

      return [...prev, {
        title: cur.children[0].children[0].children[1].innerText,
        uri: cur.children[0].children[0].children[1].href,
        author: cur.children[0].children[1].children[0].children[1].children[0].children[0].children[3].innerText,
        commentNum: cur.children[0].children[1].children[0].children[1].children[0].children[0].children[1].innerText.replaceAll('.', ''),
        date: cur.children[0].children[1].children[0].children[2].innerText.replace(/\\r?\\n|\\r/,'')
      }];
    }, []);

    window.ReactNativeWebView.postMessage(JSON.stringify(threads));
  });
`;
